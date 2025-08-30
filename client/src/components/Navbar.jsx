import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { PiStudentDuotone } from "react-icons/pi";
import { useLogout } from "../api/auth";
import  {toast} from "react-toastify"
import { useSelector } from "react-redux";

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const userInfo=useSelector((state)=>state.auth.userInfo)
    const {fetchData,loading,error}=useLogout();
    // console.log(userInfo)

    const userMenu=[
        {label:"Books", to:"/",icon:""},
        ...(userInfo?.isAdmin ? [{label:"Dashboard", to:"/dashboard",icon:""}] :[]),
        {label:"Borrowed", to:"/borrowed",icon:""},
        {label:`${userInfo?.name || "Login"}`, to:"",icon:""},
        {label:`${loading? "Loging Out":"Logout"}`, to:"/",icon:""}
    ]
        
    const nonUserMenu=[
        {label: "Login", to:"/login", icon:""},
        {label: "Signup", to:"/signup", icon:""}
    ]


    const handleLogout = ()=>{
        fetchData();
    }
    useEffect(()=>{
        if(error){
            toast.error("Error in Loging Out")
        }
    },[error]);

    return (
        <nav className="bg-blue-950 text-white p-4 shadow-md">
            <div className="container mx-auto flex justify-between items-center">
                {/* Logo Section */}
                <div className="flex items-center justify-self-start gap-2">
                    <PiStudentDuotone size={30} color="#ffffff" />
                    <span className="text-2xl font-semibold">Lib-mgmt</span>
                </div>

                {/* Navigation Links */}
                
                    <div className="hidden md:flex gap-6">
                    {(userInfo? userMenu:nonUserMenu).map((menu,index)=>(
                        <Link
                        key={index}
                        to={menu.to}
                        onClick={menu.label==="Logout" ? handleLogout : ()=>{} }
                        className="text-xl font-medium hover:text-blue-400 transition duration-200"
                    >
                        {menu.label}
                    </Link>
                    ))}
                    
                </div>

                
                {/* Mobile Menu (Hamburger Icon) */}
                <div className="md:hidden">
                    <button
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        className="text-gray-300 hover:text-white focus:outline-none focus:ring-2 focus:ring-blue-400 rounded"
                    >
                        <svg
                            className="w-6 h-6"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M4 6h16M4 12h16M4 18h16"
                            />
                        </svg>
                    </button>
                </div>
            </div>

            {/* Mobile Menu Dropdown */}
            {isMenuOpen && (
                        <div className="md:hidden bg-blue-900 text-white">
                    {(userInfo ? userMenu:nonUserMenu).map((menu, index)=>(
                        <Link
                        key={index}
                        to={menu.to}
                        onClick={() => {
                            if (menu.label === "Logout") {
                                handleLogout();
                            }
                            setIsMenuOpen(false);
                        }}
                        className="block px-4 py-2 text-sm font-medium hover:bg-blue-200 hover:text-blue-800 transition duration-200"
                    >
                        {menu.label}
                    </Link>
                    ))}
                    
                </div>
                   
            )}
            
        </nav>
    );
};

export default Navbar;
