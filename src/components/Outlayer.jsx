import React from 'react'
import { Navigate, Outlet } from "react-router-dom";
import Sidebar from '../dashboard/Sidebar';
import Footer from './Footer';
import Navbar from './Navbar';

function Outlayer() {
  return (
    <div>
        <Navbar/>
        <Outlet/>
        <Footer/>
    </div>
  )
}

export default Outlayer