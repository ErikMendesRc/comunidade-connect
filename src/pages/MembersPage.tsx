import React, { useEffect, useState } from 'react';
import { getAllUsers } from '../services/firebaseService';
import MemberCard from '../components/Members/MemberCard';
import { User } from '../models/User';
import ReactPaginate from 'react-paginate';
import { Link } from 'react-router-dom';

const MembersPage: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 9; // Número de itens por página

  useEffect(() => {
    const fetchUsers = async () => {
      const usersData = await getAllUsers();
      setUsers(usersData as unknown as User[]);
      setIsLoading(false);
    };

    fetchUsers();
  }, []);

  const handlePageClick = (data: { selected: number }) => {
    setCurrentPage(data.selected);
  };

  const offset = currentPage * itemsPerPage;
  const currentPageData = users.slice(offset, offset + itemsPerPage);
  const pageCount = Math.ceil(users.length / itemsPerPage);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-neutral-dark p-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {currentPageData.map(user => (
          <Link key={user.uid} to={`/profile/${user.uid}`} className="no-underline">
            <MemberCard user={user} />
          </Link>
        ))}
      </div>
      <div className="flex justify-center mt-4">
        <ReactPaginate
          previousLabel={'<'}
          nextLabel={'>'}
          breakLabel={'...'}
          breakClassName={'break-me'}
          pageCount={pageCount}
          marginPagesDisplayed={2}
          pageRangeDisplayed={5}
          onPageChange={handlePageClick}
          containerClassName={'flex justify-center space-x-2 mt-4'}
          pageClassName={'page-item'}
          pageLinkClassName={'px-3 py-1 border border-gray-300 rounded-md hover:bg-gray-200 text-white'}
          previousClassName={'page-item'}
          nextClassName={'page-item'}
          previousLinkClassName={'px-3 py-1 border border-gray-300 rounded-md hover:bg-gray-200 text-white'}
          nextLinkClassName={'px-3 py-1 border border-gray-300 rounded-md hover:bg-gray-200 text-white'}
          breakLinkClassName={'px-3 py-1 border border-gray-300 rounded-md hover:bg-gray-200 text-white'}
          activeClassName={'bg-primary text-white'}
        />
      </div>
    </div>
  );
};

export default MembersPage;