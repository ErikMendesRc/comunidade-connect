import { getAuth, GoogleAuthProvider, signInWithPopup, createUserWithEmailAndPassword, User, signInWithEmailAndPassword as firebaseSignInWithEmailAndPassword, updateProfile, sendPasswordResetEmail as firebaseSendPasswordResetEmail } from "firebase/auth";
import { ref, uploadBytes, getDownloadURL, getStorage } from "firebase/storage";
import { getFirestore, collection, query, where, getDocs, setDoc, doc, updateDoc, serverTimestamp, onSnapshot, getDoc, orderBy, arrayUnion, arrayRemove } from "firebase/firestore";
import { getDatabase, ref as dbRef, onDisconnect, onValue, set } from 'firebase/database';
import { auth, firestore, storage } from '../firebaseConfig';
import { Message } from "../models/Message";
import { Chat } from "../models/Chat";

const db = getFirestore();
const realtimeDatabase = getDatabase();

// Função para verificar whitelist
export const checkWhitelist = async (email: string) => {
    const whitelistQuery = query(collection(firestore, 'whitelist'), where('email', '==', email));
    const whitelistSnapshot = await getDocs(whitelistQuery);
    return !whitelistSnapshot.empty;
};

// Função para criar usuário
export const createUser = async (email: string, password: string) => {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const currentUser = userCredential.user;

    if (currentUser && !currentUser.displayName) {
        await updateProfile(currentUser, { displayName: 'Default Name' });
    }

    monitorUserStatus(currentUser);  // Atualizar status ao criar usuário
    return currentUser;
};

// Função para fazer upload da imagem de perfil
export const uploadProfilePicture = async (user: User, file: File): Promise<string> => {
    const storageRef = ref(storage, `profile_pictures/${user.uid}`);
    await uploadBytes(storageRef, file);
    const downloadURL = await getDownloadURL(storageRef);
    
    await updateProfile(user, {
      photoURL: downloadURL
    });
  
    const userDocRef = doc(firestore, 'users', user.uid);
    await setDoc(userDocRef, { profilePicture: downloadURL }, { merge: true });
  
    return downloadURL;
};

// Função para salvar dados do usuário
export const saveUserData = async (user: User, data: any) => {
    await setDoc(doc(firestore, 'users', user.uid), data);
};

// Função para fazer login com Google
export const signInWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    const result = await signInWithPopup(auth, provider);
    const currentUser = result.user;

    if (currentUser && !currentUser.displayName) {
        await updateProfile(currentUser, { displayName: 'Default Name' });
    }

    monitorUserStatus(currentUser);
    return currentUser;
};

// Função para deslogar
export const signOut = async () => {
    const user = auth.currentUser;
    if (user) {
        await updateUserStatus(user.uid, 'offline');  // Atualizar status ao deslogar
    }
    await auth.signOut();
};

export const isUserLoggedIn = () => {
    return auth.currentUser;
};

export const updateUserProfile = async (userData: { [key: string]: any }) => {
    const auth = getAuth();
    const currentUser = auth.currentUser;

    if (!currentUser) {
        console.error('No user is currently logged in');
        return;
    }

    const userRef = doc(firestore, 'users', currentUser.uid);
    try {
        await setDoc(userRef, {
            ...userData,
            updatedAt: serverTimestamp()
        }, { merge: true });
        console.log('User profile updated successfully');
    } catch (error) {
        console.error('Error updating user profile:', error);
    }
};

export const sendMessage = async (chatId: string, message: Message, participants: string[]) => {
  const auth = getAuth();
  const currentUser = auth.currentUser;

  if (currentUser && !currentUser.displayName) {
    console.log("No display name found, setting default name");
    await updateProfile(currentUser, { displayName: 'Default Name' });
  }

  console.log("Sending message with displayName:", currentUser?.displayName || 'Anonymous');

  const messageRef = doc(collection(firestore, `chats/${chatId}/messages`));
  await setDoc(messageRef, {
    ...message,
    displayName: currentUser?.displayName || 'Anonymous',
    createdAt: serverTimestamp()
  });

  const chatRef = doc(firestore, 'chats', chatId);
  const chatDoc = await getDoc(chatRef);
  if (chatDoc.exists()) {
    const chatData = chatDoc.data();
    const existingParticipants = chatData?.participants || [];

    const unreadMessagesUpdate = existingParticipants.filter((participant: string) => participant !== message.uid);

    await updateDoc(chatRef, {
      lastMessage: message.text,
      lastMessageTime: serverTimestamp(),
      unreadMessages: arrayUnion(...unreadMessagesUpdate)
    });
  } else {
    await setDoc(chatRef, {
      lastMessage: message.text,
      lastMessageTime: serverTimestamp(),
      participants: participants,
      unreadMessages: participants.filter(participant => participant !== message.uid)
    });
  }
};
  
export const listenForMessages = (chatId: string, callback: (messages: Message[], participants: string[]) => void) => {
  const messagesRef = collection(getFirestore(), `chats/${chatId}/messages`);
  const messagesQuery = query(messagesRef, orderBy('createdAt'));

  const unsubscribe = onSnapshot(messagesQuery, async (snapshot) => {
    const messages = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
      createdAt: doc.data().createdAt?.toDate() || new Date() // Convertendo Firestore timestamp para Date
    })) as Message[];

    const chatDoc = await getDoc(doc(getFirestore(), 'chats', chatId));
    const participants = chatDoc.exists() ? chatDoc.data()?.participants || [] : [];

    callback(messages, participants);
  });

  return unsubscribe;
};

// Função para atualizar status online/offline do usuário
export const updateUserStatus = async (uid: string, status: 'online' | 'offline') => {
    const userRef = doc(firestore, 'users', uid);
    try {
        await updateDoc(userRef, { status });
        console.log('User status updated successfully');
    } catch (error) {
        console.error('Error updating user status:', error);
    }
};

// Função para escutar mudanças de status do usuário em tempo real
export const listenForUserStatus = (uid: string, callback: (status: string) => void) => {
    const userRef = doc(firestore, 'users', uid);
    return onSnapshot(userRef, (doc) => {
        if (doc.exists()) {
            const userData = doc.data();
            callback(userData?.status);
        }
    });
};

export const signInWithEmailAndPassword = async (email: string, password: string) => {
    const result = await firebaseSignInWithEmailAndPassword(auth, email, password);
    const currentUser = result.user;

    if (currentUser && !currentUser.displayName) {
        await updateProfile(currentUser, { displayName: 'Default Name' });
    }

    monitorUserStatus(currentUser);
    return currentUser;
};

export const getUserData = async (uid: string) => {
    const userDoc = await getDoc(doc(firestore, 'users', uid));
    if (userDoc.exists()) {
        return userDoc.data();
    }
    return null;
};

export const subscribeToUserData = (uid: string, callback: (userData: any) => void, p0?: (error: any) => void) => {
    const userDocRef = doc(firestore, 'users', uid);
    return onSnapshot(userDocRef, (doc) => {
        if (doc.exists()) {
            callback(doc.data());
        }
    });
};

export const getAllUsers = async (): Promise<User[]> => {
    const usersCollection = collection(db, 'users');
    const usersSnapshot = await getDocs(usersCollection);
    const usersList = usersSnapshot.docs.map(doc => ({
      uid: doc.id,
      ...doc.data()
    })) as User[];
    return usersList;
};

// Função para monitorar e atualizar status do usuário
export const monitorUserStatus = (user: User) => {
  const userStatusDatabaseRef = dbRef(realtimeDatabase, `/status/${user.uid}`);

  const isOfflineForDatabase = {
    state: 'offline',
    last_changed: serverTimestamp(),
  };

  const isOnlineForDatabase = {
    state: 'online',
    last_changed: serverTimestamp(),
  };

  onValue(dbRef(realtimeDatabase, '.info/connected'), (snapshot) => {
    if (snapshot.val() === false) {
      return;
    }

    onDisconnect(userStatusDatabaseRef).set(isOfflineForDatabase).then(() => {
      set(userStatusDatabaseRef, isOnlineForDatabase);
    });
  });

  const userStatusFirestoreRef = doc(firestore, `users/${user.uid}`);

  const isOfflineForFirestore = {
    status: 'offline',
    last_changed: serverTimestamp(),
  };

  const isOnlineForFirestore = {
    status: 'online',
    last_changed: serverTimestamp(),
  };

  onValue(dbRef(realtimeDatabase, '.info/connected'), (snapshot) => {
    if (snapshot.val() === false) {
      setDoc(userStatusFirestoreRef, isOfflineForFirestore, { merge: true });
      return;
    }

    onDisconnect(userStatusDatabaseRef).set(isOfflineForDatabase).then(() => {
      set(userStatusDatabaseRef, isOnlineForDatabase);
      setDoc(userStatusFirestoreRef, isOnlineForFirestore, { merge: true });
    });
  });
};

export const getAllChats = async (userId: string): Promise<Chat[]> => {
    const chatsRef = collection(firestore, 'chats');
    const chatsQuery = query(chatsRef, where('participants', 'array-contains', userId));
    const chatsSnapshot = await getDocs(chatsQuery);
    return chatsSnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })) as Chat[];
  };

  export const markMessagesAsRead = async (chatId: string, userId: string) => {
    const chatRef = doc(firestore, 'chats', chatId);
    await updateDoc(chatRef, {
      unreadMessages: arrayRemove(userId) // Remove o ID do usuário das mensagens não lidas
    });
  };

  export const hasUnreadMessages = async (userId: string): Promise<boolean> => {
    const chatsRef = collection(firestore, 'chats');
    const chatsQuery = query(chatsRef, where('unreadMessages', 'array-contains', userId));
    const chatsSnapshot = await getDocs(chatsQuery);
    return !chatsSnapshot.empty;
  };

  export const createChat = async (user1Id: string, user2Id: string): Promise<string> => {
    const chatRef = doc(collection(firestore, 'chats'));
    const chatData: Chat = {
      id: chatRef.id,
      name: '',
      lastMessage: '',
      lastMessageTime: new Date(),
      participants: [user1Id, user2Id]
    };
    await setDoc(chatRef, chatData);
    return chatRef.id;
  };

  export const getChatsForUser = async (userId: string): Promise<Chat[]> => {
    const chatsRef = collection(firestore, 'chats');
    const q = query(chatsRef, where('participants', 'array-contains', userId));
    const querySnapshot = await getDocs(q);
    const chats = querySnapshot.docs.map(doc => {
      const data = doc.data();
      return {
        id: doc.id,
        name: '',
        lastMessage: data.lastMessage,
        lastMessageTime: data.lastMessageTime.toDate(),
        participants: data.participants
      } as Chat;
    });
    return chats;
  };

  export const getUserProfile = async (userId: string) => {
    const userDoc = await getDoc(doc(firestore, 'users', userId));
    if (userDoc.exists()) {
        return userDoc.data();
    }
    return null;
};

export const isNewUser = async (userId: string) => {
  const userDoc = await getDoc(doc(db, "users", userId));
  return !userDoc.exists();
};

export const getUserId = async () => {
  const auth = getAuth();
  const user = auth.currentUser;
  return user ? user.uid : null;
};

export const sendPasswordResetEmail = async (email: string) => {
  const auth = getAuth();
  try {
    await firebaseSendPasswordResetEmail(auth, email);
    console.log('Password reset email sent successfully');
  } catch (error) {
    console.error('Error sending password reset email:', error);
    throw error;
  }
};