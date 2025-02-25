import React from 'react'
import Sidebar,{SidebarItem} from '../dashboard/Sidebar'
import { Outlet } from 'react-router-dom'
import { BarChart, BarChart2, LayoutDashboard } from "lucide-react";

function DashOutlayer() {
  return (
    <div className='flex'>
        <div className=''>
           <main className='App flex'>
        <Sidebar>
            <SidebarItem icon={<LayoutDashboard size={20} />} text={"Dashboard"} active />
      <SidebarItem icon={<BarChart2 size={20} />} text={"Events"} />
      <SidebarItem icon={<LayoutDashboard size={20} />} text={"speakers"} />
      <SidebarItem icon={<LayoutDashboard size={20} />} text={"news"} />
      <SidebarItem icon={<LayoutDashboard size={20} />} text={"Sponsors"} />
      <SidebarItem icon={<LayoutDashboard size={20} />} text={"Dashgaboard"} />

    </Sidebar>
  {/* <main className="flex flex-col  overflow-y-scroll h-screen w-full flex-grow p-4">
    {children}
  </main> */}
</main>
</div>
<div className="max-h-screen overflow-x-auto snap-none md:snap-x p-10">
  <div className="flex space-x-10 min-w-full">
    <Outlet />
  </div>
</div>
        
    </div>
  )
}

export default DashOutlayer