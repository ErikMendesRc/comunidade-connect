import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getAuth } from 'firebase/auth';
import { getAllChats } from '../../services/firebaseService';
import { Chat } from '../../models/Chat';

const ChatList: React.FC = () => {
  const [chats, setChats] = useState<Chat[]>([]);
  const auth = getAuth();

  useEffect(() => {
    const fetchChats = async () => {
      if (auth.currentUser) {
        const chatList = await getAllChats(auth.currentUser.uid);
        setChats(chatList);
      }
    };

    fetchChats();
  }, [auth.currentUser]);

  return (
    <div className="w-1/4 bg-gray-800 text-white h-full p-4 overflow-y-auto">
      <h2 className="text-lg font-bold mb-4">Chats</h2>
      {chats.map(chat => (
        <Link key={chat.id} to={`/chat/${chat.id}`} className="block mb-4 p-2 bg-gray-700 rounded-lg hover:bg-gray-600">
          <div className="font-bold">{chat.name}</div>
          <div className="text-sm text-gray-400">{chat.lastMessage}</div>
        </Link>
      ))}
    </div>
  );
};

export default ChatList;