import { MoreVertical, ChevronLast, ChevronFirst, LogOut } from "lucide-react"
import { useContext, createContext, useState } from "react"
import { GlobalDataContext } from "../context/GlobalDataContext";
import { useNavigate } from "react-router-dom";

const SidebarContext = createContext()

export default function Sidebar({ children }) {
  const {authprofileData} = useContext(GlobalDataContext);
  const [expanded, setExpanded] = useState(true)
const navigate = useNavigate();


  const handleLogout = () => {
    // 1. Clear the user's token or session data
    localStorage.removeItem('token');
    sessionStorage.removeItem('token'); 
    navigate('/login'); 
  
};
  
  return (
    <aside className="h-screen">
      <nav className="h-full w-fit flex flex-col bg-white border-r shadow-sm">
        <div className="p-4 pb-2 flex justify-between items-center">
          <img
            src="../public/logo/logo.png"
            className={`overflow-hidden transition-all ${
              expanded ? 'w-32 ': 'w-0'
            }`}
            alt=""
            onClick={()=> navigate('/') }
          />
          <button
            onClick={() => setExpanded((curr) => !curr)}
            className="p-1.5 rounded-lg bg-gray-50 hover:bg-gray-100"
          >
            {expanded ? <ChevronFirst /> : <ChevronLast />}
          </button>
        </div>

        <SidebarContext.Provider value={{ expanded }}>
          <ul className="flex-1 px-3">{children}</ul>
        </SidebarContext.Provider>

        <div className="border-t flex p-3">
          <img
            src="https://ui-avatars.com/api/?background=c7d2fe&color=3730a3&bold=true"
            alt=""
            className="w-10 h-10 rounded-md"
          />
          <div
            className={`
              flex justify-between items-center
              overflow-hidden transition-all ${expanded ? "w-52 ml-3" : "w-0"}
          `}
          >
            <div className="leading-4">
              <h4 className="font-semibold">Role:{authprofileData?.role}</h4>
              <span className="text-xs text-gray-600">{authprofileData?.email}</span>
            </div>
           <button 
           className="p-1.5 rounded-lg bg-gray-50 hover:bg-red-100 text-red-600"
           onClick={() => handleLogout()}
           ><LogOut size={20} /></button>
          </div>
        </div>
      </nav>
    </aside>
  )
}

export function SidebarItem({ icon, text, active, alert }) {
  const { expanded } = useContext(SidebarContext)
  
  return (
    <li
      className={`
        relative flex items-center py-2 px-3 my-1
        font-medium rounded-md cursor-pointer
        transition-colors group
        ${
          active
            ? "bg-gradient-to-tr from-green-200 to-green-100 text-green-800"
            : "hover:bg-green-50 text-gray-600"
        }
    `}
    >
      {icon}
      <span
        className={`overflow-hidden transition-all ${
          expanded ? "w-52 ml-3" : "w-0"
        }`}
      >
        {text}
      </span>
      {alert && (
        <div
          className={`absolute right-2 w-2 h-2 rounded bg-green-400 ${
            expanded ? "" : "top-2"
          }`}
        />
      )}

      {!expanded && (
        <div
          className={`
          absolute left-full rounded-md px-2 py-1 ml-6
          bg-green-100 text-green-800 text-sm
          invisible opacity-20 -translate-x-3 transition-all
          group-hover:visible group-hover:opacity-100 group-hover:translate-x-0
      `}
        >
          {text}
        </div>
      )}
    </li>
  )
}