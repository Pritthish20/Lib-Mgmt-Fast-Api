import React, { useEffect, useState } from 'react';
import Select from 'react-tailwindcss-select';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import { useGetAllBooks } from '../../api/book';
import BorrowBook from '../../components/BorrowBook'
import { useNavigate } from 'react-router';

const options = [
    { value: "newest", label: "Newest" },
    { value: "oldest", label: "Oldest" },
    { value: "available", label: "Available" },
    { value: "none", label: "None" },
];

const AllBooks = () => {
    const { fetchAllBooks, allBooks, loading, error } = useGetAllBooks();
    const userInfo=useSelector((state)=>state.auth.userInfo);
    const navigate=useNavigate();
    const [Modal,setModal]=useState(false);
    const [bookId,setBookId]=useState("");
    const [searchTerm, setSearchTerm] = useState("");
    const [sortOrder, setSortOrder] = useState(null);

    const filteredBooks = (Array.isArray(allBooks) ? allBooks:[]).filter((book) =>
            book.title.toLowerCase().includes(searchTerm) ||
            book.author.toLowerCase().includes(searchTerm)
        )
        .sort((a, b) => {
            if (sortOrder?.value === "newest") {
                return b.year - a.year;
            }
            if (sortOrder?.value === "oldest") {
                return a.year - b.year;
            }
            if(sortOrder?.value === "available") {
                return a.status === "Available" && b.status !== "Available" ? -1 : 
                b.status === "Available" && a.status !== "Available" ? 1 : 0;
            }
            return 0;
        });



    useEffect(() => {
        fetchAllBooks({});
        if (error) {
            toast.error("Error Loading Books");
        }
    }, []);


    const handleSearch=(e) => {
        setSearchTerm(e.target.value.toLowerCase());
    }

    const handleSort = (value) => {
        setSortOrder(value);
    };

    return (
        <div className="w-full h-full max-w-[1100px] mx-auto mt-4 px-4 overflow-hidden rounded-lg shadow-lg font-poppins">
            {/* Header */}
            <div className="flex flex-col mb-4 gap-2">
                <h2 className="text-2xl font-bold text-gray-800">All Books</h2>
                <div className="flex flex-col sm:flex-row gap-4">
                    {/* Search Input */}
                    <input
                        placeholder="Search"
                        value={searchTerm}
                        onChange={handleSearch}
                        className="flex-grow border border-gray-300 hover:border-gray-400 focus:border-blue-400 p-2 px-4 focus:outline-none bg-white focus:ring focus:ring-blue-500/20 rounded text-gray-500 text-sm shadow-sm"
                    />
                    {/* Select Input */}
                    <div className="w-full sm:w-[200px]">
                        <Select
                            value={sortOrder}
                            onChange={handleSort}
                            options={options}
                            classNames="w-full"
                            placeholder="Sort By"
                        />
                    </div>
                </div>
            </div>

            {/* Scrollable Container */}
            <div className="h-full overflow-y-auto border rounded-lg">
                {loading ? (
                    <p className="text-center text-gray-600">Loading...</p>
                ) : (
                    <table className="min-w-full bg-white border-collapse border border-gray-200">
                        <thead>
                            <tr className="bg-gray-100 text-gray-700 text-sm font-bold uppercase tracking-wider">
                                <th className="px-4 py-3">Name</th>
                                <th className="px-4 py-3">Author</th>
                                <th className="px-4 py-3">Publish Year</th>
                                <th className="px-4 py-3">Status</th>
                                <th className="px-4 py-3">Options</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredBooks.map((b) => (
                                    <tr
                                        className="text-gray-800 hover:bg-gray-100 text-sm"
                                        key={b._id}
                                    >
                                        <td className="px-4 py-3 border">
                                            <div className="flex items-center">
                                                <div className="w-8 h-8 mr-3 rounded-full bg-gray-200"></div>
                                                <div>
                                                    <p className="font-medium">{b.title}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-4 py-3 border text-center">
                                            {b.author}
                                        </td>
                                        <td className="px-4 py-3 border text-center">
                                            {b.year}
                                        </td>
                                        <td className="px-4 py-3 border text-center">
                                            <button
                                                className={`px-2 py-1 rounded cursor-default ${
                                                    b.status === "Available"
                                                        ? "bg-green-100 text-green-600"
                                                        : "bg-orange-200 text-red-700"
                                                }`}
                                            >
                                                {b.status}
                                            </button>
                                        </td>
                                        <td className="px-4 py-3 border text-center">
                                            <button
                                            onClick={()=>{
                                                if(!userInfo){
                                                    toast.error("Login To Borrow Book");
                                                    navigate("/login")
                                                }
                                                setModal(true);
                                                setBookId(b._id);
                                            }}
                                                className={`px-2 py-1 rounded ${
                                                    b.status === "Available"
                                                        ? "bg-green-100 text-green-800"
                                                        : "bg-gray-300 text-slate-900 cursor-not-allowed"
                                                }`}
                                                disabled={b.status === "Not Available"}
                                            >
                                                {b.status === "Available"
                                                    ? "Borrow"
                                                    : "Can't Borrow"}
                                            </button>
                                        </td>
                                       
                                    </tr>
                                ))}
                        </tbody>
                    </table>
                )}
            </div>
            {Modal && (
                <BorrowBook
                setModal={setModal}
                bookId={bookId}
                userId={userInfo._id}
                />
            )}
        </div>
    );
};

export default AllBooks;
