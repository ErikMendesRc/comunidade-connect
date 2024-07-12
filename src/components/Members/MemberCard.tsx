import React from 'react';
import { useNavigate } from 'react-router-dom';
import { User } from '../../models/User';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faMapMarkerAlt, faCircle } from '@fortawesome/free-solid-svg-icons';
import { getAuth } from 'firebase/auth';
import { getChatsForUser, createChat } from '../../services/firebaseService';

interface MemberCardProps {
  user: User;
}

const MemberCard: React.FC<MemberCardProps> = ({ user }) => {
  const userStatusColor = user.status === 'online' ? 'text-green-500' : 'text-red-500';
  const navigate = useNavigate();

  const handleStartChat = async (otherUserId: string) => {
    try {
      const auth = getAuth();
      const currentUser = auth.currentUser;
      if (currentUser) {
        const userChats = await getChatsForUser(currentUser.uid);
        const existingChat = userChats.find(chat => chat.participants.includes(otherUserId));

        if (existingChat) {
          navigate(`/message/${existingChat.id}`);
        } else {
          const chatId = await createChat(currentUser.uid, otherUserId);
          console.log('Chat criado com sucesso:', chatId);
          navigate(`/message/${chatId}`);
        }
      }
    } catch (error) {
      console.error('Erro ao iniciar o chat:', error);
    }
  };

  return (
    <div className="max-w-sm bg-gray-800 text-white shadow-lg rounded-lg overflow-hidden my-4 relative flex flex-col justify-between">
      <div className="absolute top-2 right-2">
        <FontAwesomeIcon icon={faCircle} className={`h-4 w-4 ${userStatusColor}`} />
      </div>
      <div className="flex flex-col items-center bg-gray-900 py-4">
        <div className="relative">
          <img className="w-24 h-24 object-cover object-center rounded-full" src={user.profilePicture || 'https://via.placeholder.com/150'} alt="avatar" />
        </div>
        <h1 className="text-xl font-bold mt-2">{user.role.toUpperCase()}</h1>
      </div>
      <div className="py-4 px-6 flex-grow">
        <h1 className="text-xl font-bold">{user.name.toUpperCase()} {user.lastName.toUpperCase()}</h1>
        <p className="text-lg text-gray-400">{user.company}</p>
        <div className="mt-4">
          <h3 className="text-sm font-medium text-gray-400">Cidade</h3>
          <div className="flex items-center text-gray-400">
            <FontAwesomeIcon icon={faMapMarkerAlt} className="mr-2" />
            <span>{user.city}, {user.country}</span>
          </div>
        </div>
        <div className="mt-4">
          <h3 className="text-sm font-medium text-gray-400">Email</h3>
          <div className="flex items-center text-gray-400">
            <FontAwesomeIcon icon={faEnvelope} className="mr-2" />
            <span>{user.email}</span>
          </div>
        </div>
      </div>
      <button onClick={() => handleStartChat(user.uid)} className="bg-blue-500 text-center text-white px-4 py-2 rounded-b hover:bg-blue-400 transition duration-200">
        Enviar Mensagem
      </button>
    </div>
  );
};

export default MemberCard;