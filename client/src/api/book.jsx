import axios from 'axios';
import { useState } from 'react';

const BOOK_URL=`${import.meta.env.VITE_API_URL}/books`
export const useAddBook=()=>{   
    const[loading,setLoading]=useState(false);
    const[error,setError]=useState(null);
    const[success,setSuccess]=useState(false);

    const fetchAddBook = async(addBookData)=>{
        try {
            setLoading(true);
            setError(null);
            setSuccess(false);

            const res=await axios.post(`${BOOK_URL}/add`,
                addBookData,
                {withCredentials: true}
            )
            console.log(res.data);
            setSuccess(true);
        } catch (error) {
            setError( error.response?.data||"Something went wrong");
        }finally{
            setLoading(false);
        }
    }

    return {fetchAddBook,loading,error,success};
}

export const useGetAllBooks=()=>{
    const [loading,setLoading]=useState(false);
    const [error,setError]=useState(null);
    const [success,setSuccess]=useState(false);
    const [allBooks,setAllBooks]=useState({});

    const fetchAllBooks=async()=>{
        setLoading(true);
        setError(null);
        setSuccess(false);
        try {
            const res=await axios.get(`${BOOK_URL}/all-books`,)
            console.log(res.data);
            setAllBooks(res.data);
            setSuccess(true);
        } catch (error) {
            setError( error.response?.data||"Something went wrong");	
        }finally{
            setLoading(false)
        }
    }
    return {fetchAllBooks,allBooks,loading,error,success};
}

export const useDeleteBook=()=>{
    const [loading,setLoading]=useState(false);
    const [error,setError]=useState(null);
    const [success,setSuccess]=useState(false);
    
    const fetchData=async(bookId)=>{
        setError(null);
        setLoading(true);
        setSuccess(false);
        try {
            const res=await axios.delete(`${BOOK_URL}/delete/${bookId}`,
                {withCredentials: true}
            )
            console.log(res.data);
            setSuccess(true);
        } catch (error) {
            setError( error.response?.data||"Something went wrong");
        }finally{
            setLoading(false);
        }
    };
    return {fetchData,loading,error,success};
}

export const useGetSpecificBook=()=>{
    const [loading,setLoading]=useState(false);
    const [error,setError]=useState(null);
    const [success,setSuccess]=useState(false);
    const [specificBook,setSpecificBook]=useState({});

    const fetchBookData=async(bookId)=>{
        setLoading(true);
        setError(null);
        setSuccess(false);
        try {
            const res=await axios.get(`${BOOK_URL}/${bookId}`,
                {withCredentials:true}
            )
            console.log(res.data);
            setSpecificBook(res.data);
            setSuccess(true);
        } catch (error) {
            setError( error.response?.data||"Something went wrong");    
        }finally{
            setLoading(false)
        }
    }
    return {fetchBookData,specificBook,loading,error,success};
}

export const useUpdateBook=()=>{
    const [loading,setLoading]=useState(false);
    const [error,setError]=useState(null);
    const [success,setSuccess]=useState(false);
    
    const fetchUpdateBook=async(bookId,updateBookData)=>{
        setError(null);
        setLoading(true);
        setSuccess(false);
        try {
            const res=await axios.put(`${BOOK_URL}/update/${bookId}`,
                updateBookData,
                {withCredentials: true}
            )
            console.log(res.data);
            setSuccess(true);
        } catch (error) {
            setError( error.response?.data||"Something went wrong");
        }finally{
            setLoading(false);
        }
    };
    return {fetchUpdateBook,loading,error,success};
}
