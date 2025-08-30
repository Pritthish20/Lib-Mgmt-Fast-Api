import React from 'react'
import { Outlet, useLocation } from 'react-router';
import {ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import Navbar from './components/Navbar';


const App = () => {
  const location=useLocation();
  const noNavbarRoutes=["/login", "/signup"]
  return (
    <>
      <ToastContainer/>
      {!noNavbarRoutes.includes(location.pathname) && <Navbar/>}
      <main className='py-3'>
        <Outlet/>
      </main>
    </>
    
  )
}
export default App;