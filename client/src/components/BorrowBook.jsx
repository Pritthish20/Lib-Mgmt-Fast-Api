import React, { useEffect } from 'react';
import { useGetSpecificBook } from '../api/book';
import{useNewTransaction} from '../api/transactions'
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router';

const BorrowBook = ({ setModal, bookId,userId }) => {
  const { fetchBookData, specificBook } = useGetSpecificBook();

  const loadBookData = async () => {
    await fetchBookData(bookId);
  };

  useEffect(() => {
    if (bookId) loadBookData();
  }, [bookId]);

  const {fetchNewTransactions}=useNewTransaction();
  const navigate = useNavigate();

  const handleBorrow = async (e) => {
    e.preventDefault();
    await fetchNewTransactions({
      userId: userId,
      bookId: bookId,
      type:'borrow'
    })
    toast.success('Book borrowed successfully');
    navigate('/borrowed');
    setModal(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white w-full max-w-md p-6 rounded-lg shadow-lg relative">
        {/* Close button */}
        <button
          onClick={() => {
            setModal(false);
          }}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-800"
        >
          &times;
        </button>

        {/* Modal content */}
        <h2 className="text-xl font-bold text-gray-800 text-center mb-4">
          Confirm Borrow
        </h2>
        <p className="text-center text-gray-600 mb-6">
          Are you sure you want to borrow the following book? Please confirm your action.
        </p>
        {/* Book details */}
        <div className="p-4 bg-gray-100 rounded-lg shadow-inner mb-6">
          <p className="text-lg font-semibold text-gray-800">
            Title: <span className="text-blue-700">{specificBook.title}</span>
          </p>
          <p className="text-sm text-gray-700 mt-2">
            Author: <span className="text-gray-800">{specificBook.author}</span>
          </p>
          <p className="text-sm text-gray-700">
            Year: <span className="text-gray-800">{specificBook.year}</span>
          </p>
        </div>

        {/* Buttons */}
        <div className="flex justify-center gap-4">
          <button
            onClick={() => {
              setModal(false);
            }}
            className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition duration-200"
          >
            Cancel
          </button>
          <button
            onClick={handleBorrow}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-200"
          >
            Borrow
          </button>
        </div>
      </div>
    </div>
  );
};

export default BorrowBook;
