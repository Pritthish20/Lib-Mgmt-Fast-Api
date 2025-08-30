import React, { useEffect ,useState} from "react";
import {useGetAllUser} from '../../api/auth'
import { useGetAllBooks } from "../../api/book";
import { useGetAllTransactions } from "../../api/transactions";
import AddBook from "../../components/AddBook";
import UpdateBook from "../../components/UpdateBook";
import DeleteBook from "../../components/DeleteBook";


const Dashboard = () => {
    const [bookId,setBookId] = useState("")

    const [addBookModel,setAddBookModel] =useState(false);
    const [updateBookModel,setUpdateBookModel] =useState(false);
    const [deleteBookModel,setDeleteBookModel] =useState(false);

    const {fetchAllUser ,allUsers} =useGetAllUser();

    const {fetchAllBooks,allBooks,loading}=useGetAllBooks();

    const {fetchAllTransactions,allTransactions}=useGetAllTransactions();
    
     useEffect(()=>{

        fetchAllUser();
        fetchAllBooks();
        fetchAllTransactions();
    },[])
    return (
        <div className="flex flex-col mt-4 gap-6 px-4 md:px-8 ">
            {/* Summary Cards */}
            <div className="flex justify-center flex-wrap gap-4">
                <div className="h-48 w-48 flex flex-col items-center justify-center rounded-lg bg-blue-100 shadow-lg border">
                    <span className="text-3xl font-semibold text-blue-600">{allBooks.length}</span>
                    <span className="text-gray-600 font-normal text-xl">Total Books</span>
                </div>
                <div className="h-48 w-48 flex flex-col items-center justify-center rounded-lg bg-blue-100 shadow-lg border">
                    <span className="text-3xl font-semibold text-blue-600">{allTransactions.length}</span>
                    <span className="text-gray-600 font-normal text-xl">Total Transactions</span>
                </div>
                <div className="h-48 w-48 flex flex-col items-center justify-center rounded-lg bg-blue-100 shadow-lg border">
                    <span className="text-3xl font-semibold text-blue-600">{allUsers.length}</span>
                    <span className="text-gray-600 font-normal text-xl">Total Users</span>
                </div>
                <div className="h-48 w-48 flex flex-col items-center justify-center bg-blue-200 rounded-lg shadow-lg border ">
                    <button onClick={()=>{setAddBookModel(true)}} className="h-16 w-36 bg-blue-700 hover:bg-blue-600 hover:text-white rounded-2xl text-2xl font-semibold text-gray-200 shadow-md shadow-blue-900 border-blue-800">Add Book</button>
                   
                </div>
            </div>

            {/* Responsive Tables */}
            <div className="flex flex-wrap gap-6">
                {/* Transaction Table */}
                <div className="flex-1 bg-white rounded-lg shadow-lg p-4 border border-gray-200">
                    <h2 className="text-lg font-bold text-gray-800 mb-4">Transactions</h2>
                    <div className="overflow-y-auto max-h-96">
                        <table className="min-w-full border-collapse border border-gray-300">
                            <thead>
                                <tr className="bg-gray-100 text-gray-700 text-sm font-bold uppercase tracking-wide">
                                    <th className="px-4 py-3 border">User</th>
                                    <th className="px-4 py-3 border">Book</th>
                                    <th className="px-4 py-3 border">Date</th>
                                    <th className="px-4 py-3 border">Type</th>

                                </tr>
                            </thead>
                           {loading ? ("loading") :(
                             <tbody>
                             {Array.isArray(allTransactions) &&
                                allTransactions.map((tra, index) => (
                                 <tr
                                     className="text-gray-800 hover:bg-gray-100 text-sm"
                                     key={index}
                                 >
                                     <td className="px-4 py-3 border">{tra?.userId?.name || 'User does not exist anymore'}</td>
                                     <td className="px-4 py-3 border">{tra?.bookId?.title || 'Book does not exist anymore'} </td>
                                     <td className="px-4 py-3 border">{tra?.date?.substring(0,10)}</td>
                                     <td className="px-4 py-3 border">{tra?.type}</td>
                                 </tr>
                             ))}
                         </tbody>
                           )}
                        </table>
                    </div>
                </div>

                {/* Books Table */}
                <div className="flex-1 bg-white rounded-lg shadow-lg p-4 border border-gray-200">
                    <h2 className="text-lg font-bold text-gray-800 mb-4">Books</h2>
                    <div className="overflow-y-auto max-h-96">
                        <table className="min-w-full border-collapse border border-gray-300">
                            <thead>
                                <tr className="bg-gray-100 text-gray-700 text-sm font-bold uppercase tracking-wide">
                                    <th className="px-4 py-3 border">Name</th>
                                    <th className="px-4 py-3 border">Author</th>
                                    <th className="px-4 py-3 border">Year</th>
                                    <th className="px-4 py-3 border">Update</th>
                                    <th className="px-4 py-3 border">Delete</th>
                                </tr>
                            </thead>
                            {loading ? ("loading") :(
                                <tbody>
                                {Array.isArray(allBooks) &&
                                allBooks.map((b, index) => (
                                    <tr
                                        className="text-gray-800 hover:bg-gray-100 text-sm"
                                        key={index}
                                    >
                                        <td className="px-4 py-3 border">{b.title}</td>
                                        <td className="px-4 py-3 border">{b.author}</td>
                                        <td className="px-4 py-3 border">{b.year}</td>
                                        <td className="px-4 py-3 border text-center">
                                            <button onClick={()=>{setUpdateBookModel(true); setBookId(b._id);}} className="px-2 py-1 bg-blue-100 text-blue-600 rounded cursor-pointer">
                                                Update
                                            </button>
                                        </td>
                                        <td className="px-4 py-3 border text-center">
                                            <button onClick={()=>{setDeleteBookModel(true); setBookId(b._id);}}className="px-2 py-1 bg-red-100 text-red-600 rounded cursor-pointer">
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                            )}
                        </table>
                    </div>
                </div>
            </div>
            {addBookModel && (
                <AddBook
                setModal={setAddBookModel}
                />
            )}
            {updateBookModel && (
                <UpdateBook
                setModal={setUpdateBookModel}
                bookId={bookId}
                />
            )}
            {deleteBookModel && (
                <DeleteBook
                setModal={setDeleteBookModel}
                bookId={bookId}
                />
            )}
        </div>
    );
};

export default Dashboard;
