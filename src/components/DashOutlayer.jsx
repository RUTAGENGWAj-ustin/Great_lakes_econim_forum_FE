import React from 'react'
import Sidebar,{SidebarItem} from '../dashboard/Sidebar'
import { NavLink, Outlet } from 'react-router-dom'
import { BarChart, BarChart2, LayoutDashboard } from "lucide-react";

function DashOutlayer() {
  return (
    <div className='flex'>
        <div className=''>
           <main className='App flex'>
        <Sidebar>
            <SidebarItem icon={<LayoutDashboard size={20} />} text={"Dashboard"} active />
      <NavLink to={"dashboard/dash_events"}> <SidebarItem icon={<BarChart2 size={20} />} text={"Events"} /></NavLink>
      <NavLink to={"dashboard/dash_speakers"}><SidebarItem icon={<LayoutDashboard size={20} />} text={"speakers"} /></NavLink>
      <NavLink to={"dashboard/dash_news"}> <SidebarItem icon={<LayoutDashboard size={20} />} text={"news"} /></NavLink>
      <NavLink to={"dashboard/dash_Sponsors"}> <SidebarItem icon={<LayoutDashboard size={20} />} text={"Sponsors"} /></NavLink>
      <NavLink to={"dashboard/dash_Gallery"}> <SidebarItem icon={<LayoutDashboard size={20} />} text={"Gallery"} /></NavLink>
      <NavLink to={"dashboard/dash_Topic"}><SidebarItem icon={<LayoutDashboard size={20} />} text={"Topic"} /></NavLink>

    </Sidebar>
  {/* <main className="flex flex-col  overflow-y-scroll h-screen w-full flex-grow p-4">
    {children}
  </main> */}
</main>
</div>
<div className="max-h-screen w-screen overflow-x-auto snap-none md:snap-x p-10 bg-gray-50">
  <div className="flex space-x-10 min-w-full">
    <Outlet />
  </div>
</div>
            </div>
  )
}

export default DashOutlayer