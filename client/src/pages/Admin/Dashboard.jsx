import React from "react";

const Dashboard = () => {
  return (
    <div className="min-h-screen w-full bg-gray-100 ">
      {/* Dashboard Content */}
      <div className="p-1overflow-y-auto">
        <div className="bg-white p-3 rounded-2xl shadow-md">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            Welcome to the Dashboard
          </h1>

          {/* 2x2 Box Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Box 1 */}
            <div className="bg-gray-200 rounded-xl p-6 shadow-md">
              <h2 className="text-lg font-semibold text-gray-800 mb-2">
                Task status hour wise
              </h2>
              <p className="text-gray-600 text-sm mb-2">2025-04-11</p>
              <div className="w-full h-40 bg-gray-300 flex items-center justify-center rounded-lg">
                <span className="text-gray-700 font-bold text-xl">100%</span>
              </div>
            </div>

            {/* Box 2 */}
            <div className="bg-gray-200 rounded-xl p-6 shadow-md">
              <h2 className="text-lg font-semibold text-gray-800 mb-2">
                Task status day wise
              </h2>
              <p className="text-gray-600 text-sm mb-2">2025-04-11</p>
              <div className="w-full h-40 bg-gray-300 flex items-center justify-center rounded-lg">
                <span className="text-gray-700 font-bold text-xl">100%</span>
              </div>
            </div>

            {/* Box 3 */}
            <div className="bg-gray-200 rounded-xl p-6 shadow-md">
              <h2 className="text-lg font-semibold text-gray-800 mb-2">
                Weekly Overview
              </h2>
              <p className="text-gray-600 text-sm mb-2">2025-04-11</p>
              <div className="w-full h-40 bg-gray-300 flex items-center justify-center rounded-lg">
                <span className="text-gray-700 font-bold text-xl">75%</span>
              </div>
            </div>

            {/* Box 4 */}
            <div className="bg-gray-200 rounded-xl p-6 shadow-md">
              <h2 className="text-lg font-semibold text-gray-800 mb-2">
                Monthly Progress
              </h2>
              <p className="text-gray-600 text-sm mb-2">2025-04-11</p>
              <div className="w-full h-40 bg-gray-300 flex items-center justify-center rounded-lg">
                <span className="text-gray-700 font-bold text-xl">90%</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
