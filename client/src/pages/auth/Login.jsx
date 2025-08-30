import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useLogin } from "../../api/auth";
import {toast} from "react-toastify"

const Login = () => {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    password: "",
  });

  const navigate=useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const{fetchData,loading,error}=useLogin();

  const handleSubmit = async(e) => {
    e.preventDefault();
    console.log("Login Data: " ,form)
    
      await fetchData(form);
      toast.success("Login Success")
      navigate("/");
    
  };

  const isFormValid = form.name && form.phone && form.password;

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-8 mx-4 md:mx-0">
        <h2 className="text-3xl font-semibold text-center mb-6">Login
        <br />
        <span className="pt-8 text-xl">Lib-mgmt</span>
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <label className="block text-sm font-medium mb-2">Name</label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your name"
              required
            />
          </div>
          <div className="mb-6">
            <label className="block text-sm font-medium mb-2">Phone</label>
            <input
              type="text"
              name="phone"
              value={form.phone}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your phone"
              required
            />
          </div>
          <div className="mb-6">
            <label className="block text-sm font-medium mb-2">Password</label>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your password"
              required
            />
          </div>
          <button
            type="submit"
            disabled={!isFormValid || loading}
            className={`w-full text-white py-2 rounded-md  transition duration-200 
              ${!isFormValid ||loading ?
                 "bg-gray-500 cursor-not-allowed":
                 "bg-blue-600 hover:bg-blue-700"}`}
          >
            {loading? "Loging In...": "Login"}
          </button>
        </form>
        {error && (
          <p className="text-center text-sm text-orange-600 mt-4">
          {error || "An error occurred. Please try again."}
        </p>
        )}
        <p className="text-center text-sm mt-4">
          Don't have an account?{" "}
          <Link to="/signup" className="text-blue-600 hover:underline">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
