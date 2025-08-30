import React, { useEffect, useState } from 'react'
import { useSpecificTransactions } from '../../api/transactions'
import {useSelector} from 'react-redux'
import ReturnBook from '../../components/ReturnBook'


const Borrowed = () => {

    const userInfo=useSelector((state)=>state.auth.userInfo);

    const {fetchSpecificTransactions,specificTransactions,loading,error}=useSpecificTransactions();
    
    const borrowCount=specificTransactions.countBooks;
    const borrowBooks=specificTransactions.booksBorrowed;
    const [Modal,setModal]=useState(false);
    const [bookId,setBookId]=useState("");

    useEffect(() =>{
        fetchSpecificTransactions(userInfo._id);
        if (error) {
                    toast.error("Error Loading Books");
                }
    },[])

    


  return (

    <div className="flex flex-col justify-center items-center w-full h-full py-2 px-4">
        <div className=" mb-4 h-28 w-36 flex flex-col items-center justify-center rounded-lg bg-blue-100 shadow-lg border">
                    <span className="text-3xl font-semibold text-blue-600">{borrowCount || 0}</span>
                    <span className="text-gray-600 font-normal text-lg">Books Borrowed</span>
                </div>
    <div className="w-full max-w-[800px] bg-white shadow-lg rounded-lg border">
        <h2 className="text-center text-2xl font-bold text-gray-800 py-4 border-b">
           Your Borrowings 
        </h2>
        <div className="overflow-x-auto">
           {borrowCount === 0 ? (
            <h2 className="text-center text-lg  text-gray-600 py-4 border-b">
            No Borrow Books, Borrow a book now.
         </h2>
           ): (
             <table className="w-full bg-white border-collapse border border-gray-200">
             <thead>
                 <tr className="bg-gray-100 text-gray-700 text-sm font-bold uppercase">
                     <th className="px-4 py-3">Name</th>
                     <th className="px-4 py-3">Author</th>
                     <th className="px-4 py-3">Publish Year</th>
                     <th className="px-4 py-3">Return</th>
                 </tr>
             </thead>
             {loading ? ("loading..." ) : (
                 <tbody>
                 {Array.isArray(borrowBooks) && 
                 borrowBooks.map((st, index) => (
                         <tr
                             className="text-gray-800 hover:bg-gray-100 text-sm"
                             key={index}
                         >
                             <td className="px-4 py-3 border">
                                 <div className="flex items-center">
                                     <div className="w-8 h-8 mr-3 rounded-full bg-gray-200"></div>
                                     <div>
                                         <p className="font-medium">
                                             {st.title}
                                         </p>
                                         
                                     </div>
                                 </div>
                             </td>
                             <td className="px-4 py-3 border text-center">
                                 {st.author}
                             </td>
                             <td className="px-4 py-3 border text-center">
                                 {st.year}
                             </td>
                             <td className="px-4 py-3 border text-center">
                                 <button onClick={()=>{setBookId(st._id); setModal(true);}} 
                                 className="px-3 py-1 text-sm bg-green-100 text-green-600 rounded hover:bg-green-200">
                                     Return
                                 </button>
                             </td>
                         </tr>
                     ))}
             </tbody>
             )}
         </table>
           )}
        </div>
    </div>
    {Modal && (
        <ReturnBook
        setModal={setModal}
        bookId={bookId}
        userId={userInfo._id}
        />
    )}
</div>
  )
}

export default Borrowed