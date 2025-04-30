
// import React, { useState } from "react";
// import { Outlet } from "react-router-dom";
// import Sidebar from "./Sidebar";
// import Header from "./Header";
// import Footer from "./Footer";

// const Layout = () => {
//   const [isCollapsed, setIsCollapsed] = useState(false);

//   const toggleSidebar = () => setIsCollapsed(prev => !prev);

//   return (
//     <div className="flex min-h-screen bg-gray-100">
//       {/* Sidebar */}
//       <Sidebar isCollapsed={isCollapsed} toggleSidebar={toggleSidebar} />

//       {/* Main Content */}
//       <div
//         className={`flex flex-col flex-1 transition-all duration-300 ${
//           isCollapsed ? "ml-20":"ml-64"
//         }`}
//       >
//         <Header isCollapsed={isCollapsed} />

//         <main className=" mt-16 ">
//           <Outlet />
//         </main>

//         <Footer />
//       </div>
//     </div>
//   );
// };

// export default Layout;


import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Header from "./Header";
import Footer from "./Footer";

const Layout = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const toggleSidebar = () => setIsCollapsed((prev) => !prev);

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <Sidebar isCollapsed={isCollapsed} toggleSidebar={toggleSidebar} />

      {/* Right Side: Header, Content, Footer */}
      <div className="flex flex-col flex-1 min-h-screen">
        {/* Header */}
        <div
          className={`fixed top-0 w-full z-10 transition-all duration-300 ${
            isCollapsed ? "ml-20" : "ml-64"
          }`}
        >
          <Header isCollapsed={isCollapsed} />
        </div>

        {/* Page Content */}
        <main
          className={`flex-1 pt-16 px-4 pb-20 transition-all duration-300 ${
            isCollapsed ? "ml-20" : "ml-64"
          }`}
        >
          <Outlet />
        </main>

        {/* Footer */}
        <div
          className={`transition-all duration-300 ${
            isCollapsed ? "ml-20" : "ml-64"
          }`}
        >
          <Footer sidebarOpen={!isCollapsed} />
        </div>
      </div>
    </div>
  );
};

export default Layout;
