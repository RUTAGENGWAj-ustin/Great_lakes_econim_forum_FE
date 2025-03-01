import React from 'react'
import Sidebar,{SidebarItem} from './Sidebar'
import { BarChart, BarChart2, LayoutDashboard } from "lucide-react";

function Dashboard() {
  return (
 <div className='w-full'>
   <div className="w-full">
    <div className="grid grid-cols-4 gap-4">
      <div className="flex justify-center items-center bg-white h-20 " >Events</div>
      <div className="flex justify-center items-center bg-white h-20" ></div>
      <div className="flex justify-center items-center bg-white h-20">dsv</div>
      <div className="flex justify-center items-center bg-white h-20">sv</div>
    </div>
   </div>
 </div>
  )
}

export default Dashboard