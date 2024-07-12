import React from 'react';
import { Message } from '../../models/Message';

interface ChatBubbleProps {
  message: Message;
  isCurrentUser: boolean;
  participants: { [key: string]: any };
}

const ChatBubble: React.FC<ChatBubbleProps> = ({ message, isCurrentUser, participants }) => {
  const formattedDate = message.createdAt ? new Date(message.createdAt).toLocaleTimeString() : 'Invalid Date';
  const displayName = participants[message.uid]?.name || 'Anonymous';

  return (
    <div className={`flex ${isCurrentUser ? 'justify-end' : 'justify-start'} mb-4`}>
      {!isCurrentUser && (
        <div className="w-10 h-10 rounded-full overflow-hidden mr-2">
          <img alt="User Avatar" src={message.photoURL || 'https://via.placeholder.com/50'} />
        </div>
      )}
      <div className="max-w-xs bg-white text-black p-3 rounded-lg">
        <div className="flex justify-between items-center mb-1">
          <span className="text-sm font-bold">{displayName}</span>
          <time className="text-xs opacity-50 ml-2">{formattedDate}</time>
        </div>
        <div>{message.text}</div>
        <div className="text-xs opacity-50 mt-1">{isCurrentUser ? 'Entregue' : 'Visto'}</div>
      </div>
      {isCurrentUser && (
        <div className="w-10 h-10 rounded-full overflow-hidden ml-2">
          <img alt="User Avatar" src={message.photoURL || 'https://via.placeholder.com/50'} />
        </div>
      )}
    </div>
  );
};

export default ChatBubble;