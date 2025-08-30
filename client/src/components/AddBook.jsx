import React, { useState } from 'react';
import { useAddBook } from '../api/book';
import {toast} from "react-toastify"
import { useNavigate } from 'react-router';

const AddBook = ({setModal}) => {
    const [form, setForm] = useState({
        title: '',
        author: '',
        year: '',
    });
    const {fetchAddBook,loading,error,success}=useAddBook();

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    };
    const navigate=useNavigate();

    const handleSubmit = async(e) => {
        e.preventDefault();
        console.log("New Book: ",form)
        await fetchAddBook(form)
        toast.success("Book added successfully")
        navigate("/dashboard")
        setModal(false);
        
    };

    const isFormValid = form.title && form.author && form.year;

    return (
        <div className="flex items-center justify-center min-h-screen bg-blue-50">
            {/* Button to open the modal */}

            {/* Modal */}
            {setModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white w-full max-w-3xl p-8 rounded-lg shadow-lg relative">
                        <button
                            onClick={() => setModal(false)}
                            className="absolute top-4 right-4  text-gray-500 hover:text-gray-800"
                        >
                            &times;
                        </button>
                        <h1 className="text-3xl font-bold text-blue-900 text-center mb-6">Add a New Book</h1>
                        <form className="flex flex-col items-center gap-5" onSubmit={handleSubmit}>
                            <input
                                name="title"
                                value={form.title}
                                onChange={handleChange}
                                placeholder="Book Title"
                                className="w-full border border-blue-300 hover:border-blue-400 focus:border-blue-500 p-3 focus:outline-none bg-white focus:ring focus:ring-blue-200 rounded-lg text-gray-700 text-base shadow-sm"
                            />
                            <input
                                name="author"
                                value={form.author}
                                onChange={handleChange}
                                placeholder="Author"
                                className="w-full border border-blue-300 hover:border-blue-400 focus:border-blue-500 p-3 focus:outline-none bg-white focus:ring focus:ring-blue-200 rounded-lg text-gray-700 text-base shadow-sm"
                            />
                            <input
                                name="year"
                                value={form.year}
                                onChange={handleChange}
                                placeholder="Publication Year"
                                className="w-full border border-blue-300 hover:border-blue-400 focus:border-blue-500 p-3 focus:outline-none bg-white focus:ring focus:ring-blue-200 rounded-lg text-gray-700 text-base shadow-sm"
                            />
                            <button
                                type="submit"
                                disabled={!isFormValid || loading}
                                className="p-3 bg-blue-800 text-white w-80 rounded-lg hover:bg-blue-700 transition duration-200 shadow-md"
                            >
                                Add Book
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AddBook;
