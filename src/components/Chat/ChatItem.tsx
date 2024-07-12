import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Chat } from '../../models/Chat';
import { getUserProfile } from '../../services/firebaseService';
import { getAuth } from 'firebase/auth';

interface ChatItemProps {
  chat: Chat;
}

const ChatItem: React.FC<ChatItemProps> = ({ chat }) => {
  const [profile, setProfile] = useState<any>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      const auth = getAuth();
      const currentUser = auth.currentUser?.uid;
      const otherParticipantId = chat.participants.find(participant => participant !== currentUser);
      if (otherParticipantId) {
        const profileData = await getUserProfile(otherParticipantId);
        setProfile(profileData);
      }
    };

    fetchProfile();
  }, [chat.participants]);

  const handleChatClick = () => {
    navigate(`/message/${chat.id}`);
  };

  return (
    <div 
      onClick={handleChatClick} 
      className="flex items-center p-4 bg-gray-800 text-white rounded-lg shadow-md cursor-pointer hover:bg-gray-700 transition duration-200"
    >
      <img 
        src={profile?.profilePicture || 'https://via.placeholder.com/50'} 
        alt="Chat Avatar" 
        className="w-12 h-12 rounded-full object-cover mr-4"
      />
      <div className="flex-1">
        <h2 className="text-xl font-bold">{profile?.name || 'Unknown User'}</h2>
        <p className="text-sm text-gray-400 truncate">{chat.lastMessage}</p>
        <p className="text-xs text-gray-500">{chat.lastMessageTime ? new Date(chat.lastMessageTime).toLocaleString() : 'No messages yet'}</p>
      </div>
    </div>
  );
};

export default ChatItem;