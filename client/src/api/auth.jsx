import axios from 'axios';
import { useState } from 'react';
import { useDispatch} from 'react-redux'
import { logout, setUserInfo } from '../redux/Slice/authSlice';

const AUTH_URL= `${import.meta.env.VITE_API_URL}/auth`

export const useSignup=()=>{
    const dispatch=useDispatch()
    const [loading,setLoading]=useState(false);
    const [error,setError]=useState(null);
    const [success,setSuccess]=useState(false);

    const fetchData=async(signupData)=>{
        setError(null);
        setLoading(true);
        setSuccess(false);

        try {
            const res= await axios.post(
                `${AUTH_URL}/signup`,
                signupData,
                {withCredentials: true}
            )
            console.log(res.data);
            dispatch(setUserInfo(res.data));
            setSuccess(true)
        } catch (error) {
            setError( error.response?.data||"Something went wrong");	
        }finally{
            setLoading(false);
        }
    };
    return {loading,error,success,fetchData};
}

export const useLogin=()=>{
    const dispatch=useDispatch()
    // const {currentUser}= useSelector((state)=>state.auth)
    const [loading,setLoading]=useState(false);
    const [error,setError]=useState(null);
    const [success,setSuccess]=useState(false);

    const fetchData=async(loginData)=>{
        setError(null);
        setLoading(true);
        setSuccess(false);

        try {
            const res= await axios.post(
                `${AUTH_URL}/login`,
                loginData,
                {withCredentials: true}
            )
            console.log(res.data);
            dispatch(setUserInfo(res.data));
            setSuccess(true);
        } catch (error) {
            setError( error.response?.data||"Something went wrong");	
        }finally{
            setLoading(false);
        }
    };
    return {loading,error,success,fetchData};
}

export const useLogout=()=>{
    const dispatch=useDispatch();
    const [loading,setLoading]=useState(false);
    const [error,setError]=useState(null);
    const [success,setSuccess]=useState(false);
    
    const fetchData=async()=>{
        setError(null);
        setLoading(true);
        setSuccess(false);
        try {
            await axios.post(`${AUTH_URL}/logout`,
                {withCredentials:true}
            );
            dispatch(logout());
            setSuccess(true);
        } catch (error) {
            setError( error.response?.data||"Something went wrong");	
        }finally{
            setLoading(false);
        }
    }

    return {fetchData,loading,error,success};
}


export const useGetAllUser=()=>{
    const [loading,setLoading]=useState(false);
    const [error,setError]=useState(null);
    const [allUsers,setAllUsers]=useState({});
    const [success,setSuccess]=useState(false);

    const fetchAllUser=async()=>{
        setLoading(true);
        setError(null);
        setSuccess(false);
        try {
            const res=await axios.get(`${AUTH_URL}/all-users`,
                {withCredentials: true}
            )
            console.log(res.data);
            setAllUsers(res.data)
            setSuccess(true);
        } catch (error) {
            setError( error.response?.data||"Something went wrong");	
        }finally{
            setLoading(false)
        }
    }
    return {fetchAllUser,allUsers,loading,error,success};
}