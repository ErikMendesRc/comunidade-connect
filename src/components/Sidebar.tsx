import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaUser, FaUsers, FaEnvelope, FaSignOutAlt, FaEdit, FaCircle, FaComment, FaBars, FaTimes } from 'react-icons/fa';
import useStrings from '../hooks/useStrings';
import { signOut, hasUnreadMessages } from '../services/firebaseService';
import { getAuth } from 'firebase/auth';
import { useAuth } from '../context/AuthContext';

const Sidebar: React.FC = () => {
  const { sidebar } = useStrings();
  const navigate = useNavigate();
  const [unread, setUnread] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const auth = getAuth();
  const { isSuperAdmin } = useAuth();

  useEffect(() => {
    const fetchUnreadMessages = async () => {
      if (auth.currentUser) {
        const hasUnread = await hasUnreadMessages(auth.currentUser.uid);
        setUnread(hasUnread);
      }
    };

    fetchUnreadMessages();
  }, [auth.currentUser]);

  const handleLogout = async () => {
    try {
      await signOut();
      console.log('Logout successful');
      navigate('/login');
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <button onClick={toggleSidebar} className="md:hidden p-4 text-white">
        {isOpen ? <FaTimes /> : <FaBars />}
      </button>
      <aside className={`fixed top-0 left-0 z-40 w-64 h-full bg-neutral-dark transform ${isOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 md:translate-x-0`} aria-label="Sidebar">
        <div className="h-full px-3 py-4 overflow-y-auto">
          <a href="/" className="flex items-center pl-2.5 mb-5">
            <img src="/connect.svg" className="h-6 mr-3 sm:h-7" alt="Connect Logo" />
          </a>
          <ul className="space-y-2 font-medium">
            <li>
              <a href="/profile" className="flex items-center p-2 text-white rounded-lg hover:bg-highlight">
                <FaUser className="w-5 h-5 text-white" />
                <span className="ml-3">{sidebar.profile}</span>
              </a>
            </li>
            <li>
              <a href="/edit-profile" className="flex items-center p-2 text-white rounded-lg hover:bg-highlight">
                <FaEdit className="w-5 h-5 text-white" />
                <span className="ml-3">{sidebar.editProfile}</span>
              </a>
            </li>
            {isSuperAdmin && (
              <>
                <li>
                  <a href="/manage-whitelist" className="flex items-center p-2 text-white rounded-lg hover:bg-highlight">
                    <FaUsers className="w-5 h-5 text-white" />
                    <span className="ml-3">Gerenciar Whitelist</span>
                  </a>
                </li>
                <li>
                  <a href="/manage-users" className="flex items-center p-2 text-white rounded-lg hover:bg-highlight">
                    <FaUsers className="w-5 h-5 text-white" />
                    <span className="ml-3">Gerenciar Membros</span>
                  </a>
                </li>
              </>
            )}
            <li>
              <a href="/members" className="flex items-center p-2 text-white rounded-lg hover:bg-highlight">
                <FaUsers className="w-5 h-5 text-white" />
                <span className="ml-3">{sidebar.members}</span>
              </a>
            </li>
            <li>
              <a href="/messages" className="flex items-center p-2 text-white rounded-lg hover:bg-highlight relative">
                <FaEnvelope className="w-5 h-5 text-white" />
                <span className="ml-3">{sidebar.messages}</span>
                {unread && <FaCircle className="w-3 h-3 text-red-500 absolute top-0 right-0" />}
              </a>
            </li>
            <li>
              <a href="/submit-testimonial" className="flex items-center p-2 text-white rounded-lg hover:bg-highlight">
                <FaComment className="w-5 h-5 text-white" />
                <span className="ml-3">Enviar Depoimento</span>
              </a>
            </li>
          </ul>
          <div className="border-t border-gray-700 mt-6 pt-6">
            <button 
              onClick={handleLogout} 
              className="flex items-center p-2 text-white rounded-lg hover:bg-alert w-full">
              <FaSignOutAlt className="w-5 h-5 text-white" />
              <span className="ml-3">{sidebar.signOut}</span>
            </button>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;