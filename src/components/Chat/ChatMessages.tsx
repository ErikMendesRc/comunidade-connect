import React, { useEffect, useState } from 'react';
import { getAuth } from 'firebase/auth';
import { sendMessage, listenForMessages, markMessagesAsRead, getUserProfile } from '../../services/firebaseService';
import { Message } from '../../models/Message';
import ChatBubble from './ChatBubble';

interface ChatMessagesProps {
  chatId: string;
}

const ChatMessages: React.FC<ChatMessagesProps> = ({ chatId }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [participants, setParticipants] = useState<{ [key: string]: any }>({});
  const auth = getAuth();

  useEffect(() => {
    console.log("Setting up listener for messages");
    const unsubscribe = listenForMessages(chatId, async (messages, participants) => {
      console.log("Received messages:", messages);
      setMessages(messages);

      // Fetch participant profiles
      const participantsData: { [key: string]: any } = {};
      for (const participant of participants) {
        const profile = await getUserProfile(participant);
        participantsData[participant] = profile;
      }
      setParticipants(participantsData);
    });

    // Marcar as mensagens como lidas quando o componente é montado
    if (auth.currentUser) {
      console.log("Marking messages as read for user:", auth.currentUser.uid);
      markMessagesAsRead(chatId, auth.currentUser.uid);
    }

    return () => unsubscribe();
  }, [chatId, auth]);

  const handleSendMessage = async () => {
    if (newMessage.trim() === '' || !chatId) return;

    const user = auth.currentUser;
    if (user) {
      const message: Message = {
        uid: user.uid,
        text: newMessage,
        displayName: user.displayName || 'Anonymous',
        photoURL: user.photoURL || '',
        createdAt: new Date().toISOString()
      };
      console.log("Sending message:", message);
      await sendMessage(chatId, message, [user.uid]);
      setNewMessage('');
    }
  };

  return (
    <div className="flex flex-col h-full w-full bg-gray-800">
      <div className="flex-1 overflow-y-auto p-4 bg-gray-800">
        {messages.map((message) => (
          <ChatBubble
            key={message.id}
            message={message}
            isCurrentUser={message.uid === auth.currentUser?.uid}
            participants={participants}
          />
        ))}
      </div>
      <div className="p-4 bg-gray-700 flex">
        <input 
          type="text" 
          value={newMessage} 
          onChange={(e) => setNewMessage(e.target.value)} 
          placeholder="Type your message..." 
          className="flex-1 p-2 border border-gray-600 rounded-lg bg-gray-800 text-white"
        />
        <button onClick={handleSendMessage} className="ml-2 px-4 py-2 bg-blue-500 text-white rounded-lg">
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatMessages;