import React from 'react';
import Sidebar, { SidebarItem } from '../dashboard/Sidebar';
import { NavLink, Outlet } from 'react-router-dom';
import {
  BarChart,
  BarChart2,
  HeartHandshake,
  Image,
  LayoutDashboard,
  Newspaper,
  Speech,
  SquareStack,
  TentTree,
} from 'lucide-react';

function DashOutlayer() {
  return (
    <div className="flex">
      <div>
        <main className="App flex">
          <Sidebar>
            {/* Dashboard */}
            <NavLink
              to="dashboard"
              className={({ isActive }) => (isActive ? 'active' : '')}
            >
              {({ isActive }) => (
                <SidebarItem
                  icon={<LayoutDashboard size={20} />}
                  text="Dashboard"
                  active={isActive}
                />
              )}
            </NavLink>

            {/* Events */}
            <NavLink
              to="dashboard/dash_events"
              className={({ isActive }) => (isActive ? 'active' : '')}
            >
              {({ isActive }) => (
                <SidebarItem
                  icon={<TentTree size={20} />}
                  text="Events"
                  active={isActive}
                />
              )}
            </NavLink>

            {/* Category */}
            <NavLink
              to="dashboard/dash_category"
              className={({ isActive }) => (isActive ? 'active' : '')}
            >
              {({ isActive }) => (
                <SidebarItem
                  icon={<SquareStack size={20} />}
                  text="Category"
                  active={isActive}
                />
              )}
            </NavLink>

            {/* Speakers */}
            <NavLink
              to="dashboard/dash_speakers"
              className={({ isActive }) => (isActive ? 'active' : '')}
            >
              {({ isActive }) => (
                <SidebarItem
                  icon={<Speech size={20} />}
                  text="Speakers"
                  active={isActive}
                />
              )}
            </NavLink>

            {/* News */}
            <NavLink
              to="dashboard/dash_news"
              className={({ isActive }) => (isActive ? 'active' : '')}
            >
              {({ isActive }) => (
                <SidebarItem
                  icon={<Newspaper size={20} />}
                  text="News"
                  active={isActive}
                />
              )}
            </NavLink>

            {/* Sponsors */}
            <NavLink
              to="dashboard/dash_Sponsors"
              className={({ isActive }) => (isActive ? 'active' : '')}
            >
              {({ isActive }) => (
                <SidebarItem
                  icon={<HeartHandshake size={20} />}
                  text="Sponsors"
                  active={isActive}
                />
              )}
            </NavLink>

            {/* Gallery */}
            <NavLink
              to="dashboard/dash_Gallery"
              className={({ isActive }) => (isActive ? 'active' : '')}
            >
              {({ isActive }) => (
                <SidebarItem
                  icon={<Image size={20} />}
                  text="Gallery"
                  active={isActive}
                />
              )}
            </NavLink>
          </Sidebar>
        </main>
      </div>
      <div className="max-h-screen w-screen overflow-x-auto snap-none md:snap-x p-10 bg-gray-50">
        <div className="flex space-x-10 min-w-full">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default DashOutlayer;