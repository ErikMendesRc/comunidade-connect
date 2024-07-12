import React, { useEffect, useState } from 'react';
import { getFirestore, deleteDoc, doc } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { User } from '../models/User';
import { getAllUsers } from '../services/firebaseService';

const ManageUsers: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 20;
  const firestore = getFirestore();
  const auth = getAuth();
  const currentUser = auth.currentUser;

  useEffect(() => {
    const fetchUsers = async () => {
      const usersData = await getAllUsers();
      setUsers(usersData as unknown as User[]);
    };
    fetchUsers();
  }, []);

  const handleDeleteUser = async (userId: string) => {
    if (currentUser && currentUser.uid === userId) {
      alert('Você não pode deletar a si mesmo.');
      return;
    }

    try {
      await deleteDoc(doc(firestore, 'users', userId));
      setUsers(users.filter(user => user.uid !== userId));
      alert('Usuário deletado com sucesso.');
    } catch (error) {
      console.error('Erro ao deletar o usuário:', error);
      alert('Erro ao deletar o usuário.');
    }
  };

  const filteredUsers = users.filter(user =>
    (`${user.name} ${user.lastName}`).toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  return (
    <div className="min-h-screen flex flex-col">
      <div className="container mx-auto p-4 flex-grow">
        <h1 className="text-2xl font-bold mb-4 text-white">Gerenciar Membros</h1>
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg p-4 bg-gray-800">
          <div className="flex items-center justify-between flex-col md:flex-row space-y-4 md:space-y-0 pb-4 bg-white dark:bg-gray-900 rounded-lg">
            <div className="relative mt-2 ml-2">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <svg
                  className="w-4 h-4 text-gray-500 dark:text-gray-400"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 20"
                >
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                  />
                </svg>
              </div>
              <input
                type="text"
                id="table-search-users"
                className="block p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Search for users"
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400 mt-4">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Profile Picture
                </th>
                <th scope="col" className="px-6 py-3">
                  Name
                </th>
                <th scope="col" className="px-6 py-3">
                  Email
                </th>
                <th scope="col" className="px-6 py-3">
                  Position
                </th>
                <th scope="col" className="px-6 py-3">
                  Company
                </th>
                <th scope="col" className="px-6 py-3">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {currentUsers.map(user => (
                <tr
                  key={user.uid}
                  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                >
                  <td className="px-6 py-4">
                    <img
                      className="w-10 h-10 rounded-full"
                      src={user.profilePicture || 'https://via.placeholder.com/150'}
                      alt={`${user.name} image`}
                    />
                  </td>
                  <td className="px-6 py-4 text-gray-900 dark:text-white">
                    {user.name} {user.lastName}
                  </td>
                  <td className="px-6 py-4 text-gray-500 dark:text-gray-400">
                    {user.email}
                  </td>
                  <td className="px-6 py-4 text-gray-500 dark:text-gray-400">
                    {user.role}
                  </td>
                  <td className="px-6 py-4 text-gray-500 dark:text-gray-400">
                    {user.company}
                  </td>
                  <td className="px-6 py-4">
                    <button
                      onClick={() => handleDeleteUser(user.uid)}
                      className="font-medium text-red-600 dark:text-red-500 hover:underline"
                    >
                      Delete User
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="flex justify-center items-center py-4">
            <button
              onClick={() => paginate(currentPage - 1)}
              disabled={currentPage === 1}
              className="px-3 py-1 bg-gray-700 text-white rounded-lg mr-2 disabled:opacity-50"
            >
              {'<'}
            </button>
            <span className="px-3 py-1 bg-gray-700 text-white rounded-lg">{currentPage}</span>
            <button
              onClick={() => paginate(currentPage + 1)}
              disabled={currentPage === Math.ceil(filteredUsers.length / usersPerPage)}
              className="px-3 py-1 bg-gray-700 text-white rounded-lg ml-2 disabled:opacity-50"
            >
              {'>'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManageUsers;