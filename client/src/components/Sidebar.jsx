import React, { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { ChevronDown, ChevronRight, Menu as MenuIcon } from "lucide-react";
import { sidebarData } from "/lib/SidebarOptions";

const SidebarItem = ({ item, level = 0, isCollapsed }) => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const hasChildren = item.options?.length > 0;
  const IconComponent = item.icon;

  const isActive =
    item.path === location.pathname ||
    (hasChildren && item.options.some((child) => child.path === location.pathname));

  const handleItemClick = (e) => {
    if (hasChildren) {
      e.preventDefault(); // Prevent route change
      setIsOpen(!isOpen);
    }
  };

  return (
    <div className={`${level > 0 ? "ml-4" : ""}`}>
      <NavLink
        to={item.path || "#"}
        onClick={handleItemClick}
        className={`flex items-center justify-between px-2 py-2 rounded-md transition-colors duration-150 w-full ${
          isActive
            ? "bg-violet-500 text-white font-semibold"
            : "text-gray-800 hover:bg-gray-200"
        }`}
      >
        <div className="flex items-center space-x-2">
          {IconComponent && (
            <IconComponent size={22} className="shrink-0 min-w-[22px]" />
          )}
          {!isCollapsed && <span className="truncate">{item.name}</span>}
        </div>

        {hasChildren && !isCollapsed && (
          <div className="p-1 rounded">
            {isOpen ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
          </div>
        )}
      </NavLink>

      {hasChildren && isOpen && !isCollapsed && (
        <div className="mt-1 space-y-1">
          {item.options.map((child) => (
            <SidebarItem
              key={child.id}
              item={child}
              level={level + 1}
              isCollapsed={isCollapsed}
            />
          ))}
        </div>
      )}
    </div>
  );
};

const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <div
      className={`h-screen bg-white shadow-md p-4 fixed left-0 top-0 flex flex-col transition-all duration-300 ${
        isCollapsed ? "w-20" : "w-64"
      }`}
    >
      {/* Toggle Button */}
      <div className="flex justify-end mb-4">
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="p-2 rounded-md hover:bg-gray-200"
        >
          <MenuIcon size={22} />
        </button>
      </div>

      {/* Logo */}
      <div className="flex items-center space-x-2 mb-6">
        <div className="bg-violet-500 text-white text-2xl font-bold w-8 h-8 flex items-center justify-center rounded-md cursor-pointer">
          T
        </div>
        {!isCollapsed && (
          <h2 className="text-lg font-semibold text-gray-800 cursor-pointer">
            Trends Apparel
          </h2>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto space-y-1">
        {sidebarData.map((item) => (
          <SidebarItem
            key={item.id}
            item={item}
            isCollapsed={isCollapsed}
          />
        ))}
      </nav>

      {/* Footer
      {!isCollapsed && (
        <div className="text-xs text-gray-500 border-t pt-3">
          <span className="font-semibold text-gray-800">Trends Apparel</span> &copy; 2025 All Rights Reserved
        </div>
      )} */}
     
    </div>
  );
};

export default Sidebar;











// this is my wokring code for static sidebar
// import {
//   ChevronDown,
//   ChevronRight,
//   House,
//   Menu,
//   Users,
//   Package,
//   FileText,
//   BarChart,
// } from "lucide-react";
// import { LuCircle } from "react-icons/lu";

// const Sidebar = () => {
//   const [isMasterOpen, setIsMasterOpen] = useState(false);

//   return (
//     <div className="w-64 h-screen bg-white shadow-md p-4 fixed left-0 top-0">
//       {/* Logo */}
//       <div className="flex items-center space-x-2 mb-6">
//         <div className="bg-indigo-400 text-white text-2xl font-bold w-8 h-8 flex items-center justify-center rounded-md cursor-pointer">
//           T
//         </div>
//         <h2 className="text-lg font-semibold cursor-pointer">Trends Apparel</h2>
//       </div>

//       {/* Sidebar Items */}
//       <nav className="space-y-1">
//         <div className="flex items-center space-x-2 p-3 bg-indigo-400 text-white rounded-md cursor-pointer">
//           <House size={25} />
//           <span>Dashboard</span>
        
// </div>
//         {/* Master Toggle */}
//         <button
//           onClick={() => setIsMasterOpen(!isMasterOpen)}
//           className="flex justify-between items-center w-full p-3 bg-gray-100 rounded-md hover:bg-gray-200 cursor-pointer"
//         >
//           <div className="flex items-center space-x-2">
//             <Menu size={25} />
//             <span>Master</span>
//           </div>
//           {isMasterOpen ? <ChevronDown size={18} /> : <ChevronRight size={18} />}
//         </button>

//         {/* Master Submenu */}
//         {isMasterOpen && (
//           <div className="ml-6 space-y-2">
//             {["Organization", "Design", "Production", "Maintenance"].map((item, index) => (
//               <div
//                 key={index}
//                 className="flex justify-between items-center p-2 hover:bg-gray-200 rounded-md cursor-pointer"
//               >
//                 <div className="flex items-center space-x-2">
//                   <LuCircle size={14} />
//                   <span>{item}</span>
//                 </div>
//                 <ChevronRight size={16} />
//               </div>
//             ))}
//           </div>
//         )}
        

//         {/* Other Menu Items */}

//         {[
//           { icon: <Users size={25} />, label: "Workers" },
//           { icon: <Users size={25} />, label: "Supervisors" },
//           { icon: <Package size={25} />, label: "Bundles" },
//           { icon: <BarChart size={25} />, label: "Tasks" },
//           { icon: <FileText size={20} />, label: "Reports" },
//         ].map((item, index) => (
//           <div
//             key={index}
//             className="flex items-center space-x-2 p-3 hover:bg-gray-200 rounded-md cursor-pointer"
//           >
//             {item.icon}
//             <span>{item.label}</span>
//           </div>
//         ))}
//       </nav>
//     </div>
//   );
// };

// export default Sidebar;
