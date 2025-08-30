import axios from "axios";
import { useState } from "react";

const TRANSACTION_URL=`${import.meta.env.VITE_API_URL}/transaction`
export const useGetAllTransactions = ()=>{
    const [allTransactions,setAllTransactions]=useState({});
    const [loading,setLoading]=useState(false);
    const [error,setError]=useState(null);
    const [success,setSuccess]=useState(false);

    const fetchAllTransactions=async()=>{
        setLoading(true);
        setError(null);
        setSuccess(false);
        try {
            const res=await axios.get(`${TRANSACTION_URL}/all`,
                {withCredentials:true}
            );
            console.log(res.data);
            setAllTransactions(res.data);
            setSuccess(true);
        } catch (error) {
            setError(error.response?.data||"Something went wrong");
        }finally{
            setLoading(false);
        }
    }

    return {fetchAllTransactions,allTransactions,loading,error,success};
};

export const useSpecificTransactions = ()=>{
    const [specificTransactions,setSpecificTransactions]=useState({});
    const [loading,setLoading]=useState(false);
    const [error,setError]=useState(null);
    const [success,setSuccess]=useState(false);

    const fetchSpecificTransactions=async(userId)=>{
        setLoading(true);
        setError(null);
        setSuccess(false);
        try {
            const res=await axios.get(`${TRANSACTION_URL}/${userId}`,
                {withCredentials:true}
            );
            console.log(res.data);
            setSpecificTransactions(res.data);
            setSuccess(true);
        } catch (error) {
            setError(error.response?.data||"Something went wrong");
        }finally{
            setLoading(false);
        }
    };
    return {fetchSpecificTransactions,specificTransactions,loading,error,success};
};

export const useNewTransaction = ()=>{
    const [loading,setLoading]=useState(false);
    const [error,setError]=useState(null);
    const [success,setSuccess]=useState(false);
    

    const fetchNewTransactions =async(TransactionData)=>{
        try {
            setLoading(true);
            setError(null);
            setSuccess(false);
            
            const res= await axios.post(`${TRANSACTION_URL}/new`,
                TransactionData,
                {withCredentials:true}
            );
            console.log(res.data);
            setSuccess(true);
        } catch (error) {
            setError(error.response?.data||"Something went wrong");
        }finally{
            setLoading(false);
        }
    };

    return {fetchNewTransactions,loading,error,success};
}