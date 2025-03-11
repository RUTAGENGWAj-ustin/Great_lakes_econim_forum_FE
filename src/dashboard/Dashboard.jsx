import React, { useContext } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, CartesianGrid } from "recharts";
import Sidebar, { SidebarItem } from "./Sidebar";
import { BarChart as BarChartIcon, LayoutDashboard } from "lucide-react";
import { GlobalDataContext } from "../context/GlobalDataContext";

const Dashboard = () => {
  const {
    eventsData ,
    speakersData ,
    topicsData ,
    newsData ,
    sponsorsData ,
    categoryData ,
    galleryData 
  } = useContext(GlobalDataContext);

  // Prepare data for the bar chart
  const chartData = [
    { name: "Events", value: eventsData?.length },
    { name: "Speakers", value: speakersData?.length },
    { name: "Topics", value: topicsData?.length },
    { name: "News", value: newsData?.length },
    { name: "Sponsors", value: sponsorsData?.length },
    { name: "Categories", value: categoryData?.length },
    { name: "Gallery", value: galleryData?.length },
  ];

  return (
    <div className="flex">

      {/* Main Content */}
      <div className="flex-1 p-2">
        {/* Data Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="bg-white p-4 rounded-lg shadow-md">
            <h2 className="text-lg font-semibold">Events</h2>
            <p className="text-2xl font-bold">{eventsData?.length}</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-md">
            <h2 className="text-lg font-semibold">Speakers</h2>
            <p className="text-2xl font-bold">{speakersData?.length}</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-md">
            <h2 className="text-lg font-semibold">Topics</h2>
            <p className="text-2xl font-bold">{topicsData?.length}</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-md">
            <h2 className="text-lg font-semibold">News</h2>
            <p className="text-2xl font-bold">{newsData?.length}</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-md">
            <h2 className="text-lg font-semibold">Sponsors</h2>
            <p className="text-2xl font-bold">{sponsorsData?.length}</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-md">
            <h2 className="text-lg font-semibold">Categories</h2>
            <p className="text-2xl font-bold">{categoryData?.length}</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-md">
            <h2 className="text-lg font-semibold">Gallery</h2>
            <p className="text-2xl font-bold">{galleryData?.length}</p>
          </div>
        </div>

        {/* Bar Chart */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Data Overview</h2>
          <BarChart width={800} height={400} data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="value" fill="#8884d8" />
          </BarChart>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;