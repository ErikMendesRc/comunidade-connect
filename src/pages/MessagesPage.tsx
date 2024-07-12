import React, { useEffect, useState } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { useParams } from 'react-router-dom';
import { getChatsForUser } from '../services/firebaseService';
import { Chat } from '../models/Chat';
import ChatItem from '../components/Chat/ChatItem';
import ChatMessages from '../components/Chat/ChatMessages';

const MessagesPage: React.FC = () => {
  const [chats, setChats] = useState<Chat[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState<any>(null);
  const { chatId } = useParams<{ chatId: string }>();

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setCurrentUser(user);
        const userChats = await getChatsForUser(user.uid);
        setChats(userChats);
      } else {
        setCurrentUser(null);
        setChats([]);
      }
      setIsLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex min-h-screen bg-neutral-light">
      <div className="w-1/4 bg-gray-900 p-4">
        <h1 className="text-2xl font-bold text-white mb-4">Messages</h1>
        <div className="space-y-4">
          {chats.length === 0 ? (
            <div className="text-white">No chats found</div>
          ) : (
            chats.map((chat) => <ChatItem key={chat.id} chat={chat} />)
          )}
        </div>
      </div>
      <div className="flex-1 flex items-center justify-center bg-neutral-dark p-4">
        {chatId ? (
          <ChatMessages chatId={chatId} />
        ) : (
          <div className="text-center text-white">
            <img src="/connect-login.svg" alt="Site Logo" className="mx-auto mb-4" />
            <h1 className="text-3xl font-bold mb-2">Bem-vindo ao Connect</h1>
            <p className="text-lg">Selecione um chat para começar a conversar.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MessagesPage;