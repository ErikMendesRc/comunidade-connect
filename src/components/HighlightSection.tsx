import React, { useEffect, useState } from 'react';
import useStrings from '../hooks/useStrings';
import { getFirestore, collection, getDocs } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';

const HighlightSection: React.FC = () => {
  const { highlightSection } = useStrings();
  const [memberCount, setMemberCount] = useState(0);
  const [chatCount, setChatCount] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCounts = async () => {
      const firestore = getFirestore();

      // Contar número de usuários
      const usersCollection = collection(firestore, 'users');
      const usersSnapshot = await getDocs(usersCollection);
      setMemberCount(usersSnapshot.size);

      // Contar número de chats
      const chatsCollection = collection(firestore, 'chats');
      const chatsSnapshot = await getDocs(chatsCollection);
      setChatCount(chatsSnapshot.size);
    };

    fetchCounts();
  }, []);

  return (
    <div className="relative isolate overflow-hidden bg-gray-900 py-24 sm:py-32">
      <img 
        src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&crop=focalpoint&fp-y=.8&w=2830&h=1500&q=80&blend=111827&sat=-100&exp=15&blend-mode=multiply" 
        alt="" 
        className="absolute inset-0 -z-10 h-full w-full object-cover object-right md:object-center" 
      />
      <div className="hidden sm:absolute sm:-top-10 sm:right-1/2 sm:-z-10 sm:mr-10 sm:block sm:transform-gpu sm:blur-3xl" aria-hidden="true">
        <div className="aspect-[1097/845] w-[68.5625rem] bg-gradient-to-tr from-[#ff4694] to-[#776fff] opacity-20" style={{ clipPath: 'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)' }}></div>
      </div>
      <div className="absolute -top-52 left-1/2 -z-10 -translate-x-1/2 transform-gpu blur-3xl sm:top-[-28rem] sm:ml-16 sm:translate-x-0 sm:transform-gpu" aria-hidden="true">
        <div className="aspect-[1097/845] w-[68.5625rem] bg-gradient-to-tr from-[#ff4694] to-[#776fff] opacity-20" style={{ clipPath: 'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)' }}></div>
      </div>
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:mx-0">
          <h2 className="text-4xl font-bold tracking-tight text-white sm:text-6xl">{highlightSection.title}</h2>
          <p className="mt-6 text-lg leading-8 text-gray-300">{highlightSection.description}</p>
        </div>
        <div className="mx-auto mt-10 max-w-2xl lg:mx-0 lg:max-w-none">
          <div className="grid grid-cols-1 gap-x-8 gap-y-6 text-base font-semibold leading-7 text-white sm:grid-cols-2 md:flex lg:gap-x-10">
            <a 
              href="/about-us"
              onClick={(e) => {
                e.preventDefault();
                navigate('/about-us');
              }}
            >
              {highlightSection.links[0]} <span aria-hidden="true">&rarr;</span>
            </a>
          </div>
          <div className="mt-8 flex gap-8 sm:mt-10">
            <div className="flex flex-col">
              <dt className="text-base leading-7 text-gray-300">Membros na comunidade</dt>
              <dd className="text-2xl font-bold leading-9 tracking-tight text-white">{memberCount}</dd>
            </div>
            <div className="flex flex-col">
              <dt className="text-base leading-7 text-gray-300">Networks criados</dt>
              <dd className="text-2xl font-bold leading-9 tracking-tight text-white">{chatCount}</dd>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HighlightSection;