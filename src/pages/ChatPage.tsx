import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getAuth } from 'firebase/auth';
import { sendMessage, listenForMessages, markMessagesAsRead } from '../services/firebaseService';
import { Message } from '../models/Message';

const ChatPage: React.FC = () => {
  const { chatId } = useParams<{ chatId: string }>();
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [participants, setParticipants] = useState<string[]>([]);
  const auth = getAuth();

  useEffect(() => {
    if (chatId) {
      const unsubscribe = listenForMessages(chatId, (messages, participants) => {
        setMessages(messages);
        setParticipants(participants);
      });
      return () => unsubscribe();
    }
  }, [chatId]);

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
      await sendMessage(chatId, message, participants);
      setNewMessage('');
    }
  };

  useEffect(() => {
    if (chatId && auth.currentUser) {
      markMessagesAsRead(chatId, auth.currentUser.uid);
    }
  }, [chatId, auth.currentUser]);

  return (
    <div className="flex flex-col h-full w-full">
      <div className="flex-1 overflow-y-auto p-4">
        {messages.map((message) => (
          <div key={message.id} className={`flex ${message.uid === auth.currentUser?.uid ? 'justify-end' : 'justify-start'} mb-4`}>
            <div className="flex items-center space-x-2">
              <img className="w-10 h-10 rounded-full" src={message.photoURL || 'https://via.placeholder.com/50'} alt={message.displayName} />
              <div className={`p-4 rounded-lg ${message.uid === auth.currentUser?.uid ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-900'}`}>
                <p>{message.text}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="p-4 bg-gray-100 flex">
        <input 
          type="text" 
          value={newMessage} 
          onChange={(e) => setNewMessage(e.target.value)} 
          placeholder="Type your message..." 
          className="flex-1 p-2 border border-gray-300 rounded-lg"
        />
        <button onClick={handleSendMessage} className="ml-2 px-4 py-2 bg-blue-500 text-white rounded-lg">
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatPage;