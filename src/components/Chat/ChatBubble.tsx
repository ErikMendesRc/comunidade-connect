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
    <div className={`chat ${isCurrentUser ? 'chat-end' : 'chat-start'} mb-4`}>
      <div className="chat-image avatar">
        <div className="w-10 rounded-full">
          <img alt="User Avatar" src={message.photoURL || 'https://via.placeholder.com/50'} />
        </div>
      </div>
      <div className="chat-header">
        {displayName}
        <time className="text-xs opacity-50 ml-2">{formattedDate}</time>
      </div>
      <div className="chat-bubble bg-white text-black">
        {message.text}
      </div>
      <div className="chat-footer opacity-50">{isCurrentUser ? 'Entregue' : 'Visto'}</div>
    </div>
  );
};

export default ChatBubble;