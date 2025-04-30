// import React, { useEffect, useState } from 'react';
// import MachineItem from './MachineItem';
// import AddMachine from './AddMachine';
// import useFetch from '../../hooks/useFetch';
// import { FaPlus, FaUpload, FaDownload } from 'react-icons/fa';

// const base_url = import.meta.env.VITE_BASE_API_URL;

// const MachineList = () => {
//   const [machineList, setMachineList] = useState([]);
//   const [filteredMachines, setFilteredMachines] = useState([]);
//   const [input, setInput] = useState('');
//   const [isOpen, setIsOpen] = useState(false);
//   const [entriesPerPage, setEntriesPerPage] = useState(10);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [selectedMachines, setSelectedMachines] = useState([]);

//   const { data, isLoading, error } = useFetch(`${base_url}/api/machines`);

//   const handleAddList = () => setIsOpen(prev => !prev);

//   useEffect(() => {
//     if (data) {
//       const machines = data.machineData || data;
//       setMachineList(machines);
//       setFilteredMachines(machines);
//     }
//   }, [data]);

//   useEffect(() => {
//     const filtered = machineList.filter(machine =>
//       (machine.MachineName || '').toLowerCase().includes(input.toLowerCase())
//     );
//     setFilteredMachines(filtered);
//     setCurrentPage(1);
//   }, [input, machineList]);

//   const indexOfLast =
//     entriesPerPage === 'all'
//       ? filteredMachines.length
//       : currentPage * entriesPerPage;

//   const indexOfFirst =
//     entriesPerPage === 'all' ? 0 : indexOfLast - entriesPerPage;

//   const currentMachines = filteredMachines.slice(indexOfFirst, indexOfLast);

//   const totalPages =
//     entriesPerPage === 'all'
//       ? 1
//       : Math.ceil(filteredMachines.length / entriesPerPage);

//   const handlePageChange = page => {
//     if (page >= 1 && page <= totalPages) setCurrentPage(page);
//   };

//   // Checkbox logic
//   const toggleSelectOne = (id) => {
//     setSelectedMachines(prev =>
//       prev.includes(id)
//         ? prev.filter(item => item !== id)
//         : [...prev, id]
//     );
//   };

//   if (isLoading) return <h1>Loading...</h1>;

//   if (error) {
//     return (
//       <h1 className="py-12 px-5 bg-red-200 rounded-lg text-red-600 text-2xl border-red-500 border-[2px]">
//         Something Went Wrong. Please Try Again Later...
//       </h1>
//     );
//   }

//   return (
//     <div className="flex flex-col gap-6 mt-2 bg-white rounded-lg">
//       <div className="flex justify-between items-center mb-2">
//         <h2 className="text-2xl font-semibold text-gray-600">Machine List</h2>
//       </div>

//       <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 gap-4">
//         <div className="flex flex-wrap items-center gap-2">
//           <div className="flex items-center space-x-2">
//             <label className="text-lg text-gray-600">Show</label>
//             <select
//               className="border border-gray-300 rounded px-2 py-1 text-lg focus:ring-2 focus:ring-violet-500 cursor-pointer outline-none transition-colors duration-200"
//               value={entriesPerPage}
//               onChange={e =>
//                 setEntriesPerPage(
//                   e.target.value === 'all' ? 'all' : parseInt(e.target.value)
//                 )
//               }
//             >
//               <option value="10">10</option>
//               <option value="25">25</option>
//               <option value="50">50</option>
//               <option value="100">100</option>
//               <option value="all">All</option>
//             </select>
//           </div>

//           <input
//             type="text"
//             placeholder="Search Machine"
//             className="border border-gray-300 hover:border-violet-500 focus:outline-none focus:ring-2 focus:ring-violet-500 rounded-md px-3 py-2 text-sm w-60"
//             value={input}
//             onChange={e => setInput(e.target.value)}
//           />
//         </div>

//         <div className="flex flex-wrap gap-2 justify-end">
//           <button
//             className="bg-violet-500 hover:bg-violet-600 text-white px-4 py-2 rounded-md text-sm"
//             onClick={handleAddList}
//           >
//             <FaPlus className="inline mr-1" /> Add New Machine
//           </button>
//           <button className="bg-violet-500 hover:bg-violet-600 text-white px-4 py-2 rounded-md text-sm">
//             <FaUpload className="inline mr-1" /> Import Data
//           </button>
//           <button className="bg-violet-500 hover:bg-violet-600 text-white px-4 py-2 rounded-md text-sm">
//             <FaDownload className="inline mr-1" /> Export Data
//           </button>
//         </div>
//       </div>

//       <AddMachine
//         isOpen={isOpen}
//         setIsOpen={setIsOpen}
//         setMachineList={setMachineList}
//         input={input}
//         setInput={setInput}
//       />

//       <div className="overflow-x-auto">
//         <table className="min-w-full text-sm text-left border border-gray-200">
//           <thead className="bg-gray-50 text-md text-gray-600 uppercase">
//             <tr>
//               <th className="p-4">Machine Name</th>
//               <th className="p-4">Status</th>
//               <th className="p-4">Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {currentMachines.length > 0 ? (
//               currentMachines.map((item) => (
//                 <MachineItem
//                   key={item._id}
//                   item={item}
//                   setMachineList={setMachineList}
//                   machineList={machineList}
//                   isChecked={selectedMachines.includes(item._id)}
//                   onCheckboxChange={() => toggleSelectOne(item._id)}
//                 />
//               ))
//             ) : (
//               <tr>
//                 <td colSpan="4" className="text-center p-4 text-gray-500">
//                   No machines found
//                 </td>
//               </tr>
//             )}
//           </tbody>
//         </table>
//       </div>

//       {/* Pagination */}
//       <div className="flex flex-col sm:flex-row justify-between items-center px-3 py-3 text-l text-gray-400">
//         <span>
//           Showing {indexOfFirst + 1} to{' '}
//           {Math.min(indexOfLast, filteredMachines.length)} of{' '}
//           {filteredMachines.length} entries
//         </span>
//         <div className="flex gap-1 mt-2 sm:mt-0">
//           <button onClick={() => handlePageChange(1)} disabled={currentPage === 1} className="px-2 py-1 rounded bg-gray-100 hover:bg-gray-200">{'<<'}</button>
//           <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1} className="px-2 py-1 rounded bg-gray-100 hover:bg-gray-200">{'<'}</button>
//           {Array.from({ length: totalPages }, (_, i) => (
//             <button
//               key={i + 1}
//               onClick={() => handlePageChange(i + 1)}
//               className={`px-2 py-1 rounded ${
//                 currentPage === i + 1
//                   ? 'bg-violet-100 text-violet-700'
//                   : 'bg-gray-100 hover:bg-gray-200'
//               }`}
//             >
//               {i + 1}
//             </button>
//           ))}
//           <button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages} className="px-2 py-1 rounded bg-gray-100 hover:bg-gray-200">{'>'}</button>
//           <button onClick={() => handlePageChange(totalPages)} disabled={currentPage === totalPages} className="px-2 py-1 rounded bg-gray-100 hover:bg-gray-200">{'>>'}</button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default MachineList;
import React, { useState, useEffect } from 'react';
import MachineItem from './MachineItem'; // This component handles individual machine display
import AddMachine from './AddMachine'; // This component is for adding a new machine
import useFetch from '../../hooks/useFetch'; // Hook for data fetching
import { FaPlus, FaUpload, FaDownload } from 'react-icons/fa';

const base_url = import.meta.env.VITE_BASE_API_URL;

const MachineList = () => {
  const [machineList, setMachineList] = useState([]);
  const [filteredMachines, setFilteredMachines] = useState([]);
  const [input, setInput] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [entriesPerPage, setEntriesPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  const { data, isLoading, error } = useFetch(`${base_url}/api/machines`);

  // Load data from localStorage on mount
  useEffect(() => {
    const storedMachines = localStorage.getItem('machines');
    if (storedMachines) {
      setMachineList(JSON.parse(storedMachines));
      setFilteredMachines(JSON.parse(storedMachines));
    }
  }, []);

  useEffect(() => {
    if (data) {
      const machines = data.machineData || data;
      console.log(data)
      setMachineList(machines);
      setFilteredMachines(machines);

      // Save to localStorage when data is fetched
      localStorage.setItem('machines', JSON.stringify(machines));
    }
  }, [data]);

  useEffect(() => {
    const filtered = machineList.filter((machine) =>
      (machine.machineName || "").toLowerCase().includes(input.toLowerCase())
    );
    setFilteredMachines(filtered);
    setCurrentPage(1); // Reset to first page when searching
  }, [input, machineList]);

  // Pagination logic
  const indexOfLast = currentPage * entriesPerPage;
  const indexOfFirst = indexOfLast - entriesPerPage;
  const currentMachines = entriesPerPage === 'all' ? filteredMachines : filteredMachines.slice(indexOfFirst, indexOfLast);
  const totalPages = entriesPerPage === 'all' ? 1 : Math.ceil(filteredMachines.length / entriesPerPage);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) setCurrentPage(page);
  };

  const handleAddList = () => setIsOpen((prev) => !prev);

  if (isLoading) return <h1>Loading...</h1>;

  if (error) {
    return (
      <h1 className="py-12 px-5 bg-red-200 rounded-lg text-red-600 text-2xl border-red-500 border-[2px]">
        Something Went Wrong. Please Try Again Later...
      </h1>
    );
  }

  return (
    <div className="flex flex-col gap-6 mt-2 bg-white rounded-lg">
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-2xl font-semibold text-gray-600">Machine List</h2>
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 gap-4">
        <div className="flex flex-wrap items-center gap-2">
          <div className="flex items-center space-x-2">
            <label className="text-lg text-gray-600">Show</label>
            <select
              className="border border-gray-300 rounded px-2 py-1 text-lg focus:ring-2 focus:ring-violet-500 cursor-pointer outline-none transition-colors duration-200"
              value={entriesPerPage}
              onChange={e => setEntriesPerPage(e.target.value === 'all' ? 'all' : parseInt(e.target.value))}
            >
              <option value="10">10</option>
              <option value="25">25</option>
              <option value="50">50</option>
              <option value="100">100</option>
              <option value="all">All</option>
            </select>
          </div>
          <input
            type="text"
            placeholder="Search Machine"
            className="border border-gray-300 hover:border-violet-500 focus:outline-none focus:ring-2 focus:ring-violet-500 rounded-md px-3 py-2 text-sm w-60"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
        </div>

        <div className="flex flex-wrap gap-2 justify-end">
          <button
            className="bg-violet-500 hover:bg-violet-600 text-white px-4 py-2 rounded-md text-sm"
            onClick={handleAddList}
          >
            <FaPlus className="inline mr-1" /> Add New Machine
          </button>
          <button className="bg-violet-500 hover:bg-violet-600 text-white px-4 py-2 rounded-md text-sm">
            <FaUpload className="inline mr-1" /> Import Data
          </button>
          <button className="bg-violet-500 hover:bg-violet-600 text-white px-4 py-2 rounded-md text-sm">
            <FaDownload className="inline mr-1" /> Export Data
          </button>
        </div>
      </div>

      <AddMachine
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        setMachineList={setMachineList}
      />

      <div className="overflow-x-auto">
        <table className="min-w-full text-sm text-left border border-gray-200">
        <thead className="bg-gray-50 text-xs text-gray-500 uppercase">
        <tr>
              <th className="p-4">Name</th>
              <th className="p-4">Machine Code</th>
              <th className="p-4">Machine Value</th>
              <th className="p-4">Status</th>
              <th className="p-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentMachines.length > 0 ? (
              currentMachines.map((item) => (
                <MachineItem
                  key={item._id || item.machineCode} // Ensure that _id or machineCode is unique
                  item={item}
                  setMachineList={setMachineList}
                  machineList={machineList}
                />
              ))
            ) : (
              <tr>
                <td colSpan="5" className="text-center p-4 text-gray-500">
                  No machines found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {entriesPerPage !== 'all' && (
        <div className="flex flex-col sm:flex-row justify-between items-center px-3 py-3 text-l text-gray-400">
          <span>
            Showing {indexOfFirst + 1} to {Math.min(indexOfLast, filteredMachines.length)} of{" "}
            {filteredMachines.length} entries
          </span>
          <div className="flex gap-1 mt-2 sm:mt-0">
            <button onClick={() => handlePageChange(1)} disabled={currentPage === 1} className="px-2 py-1 rounded bg-gray-100 hover:bg-gray-200">
              {"<<"}
            </button>
            <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1} className="px-2 py-1 rounded bg-gray-100 hover:bg-gray-200">
              {"<"}
            </button>
            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i + 1}
                onClick={() => handlePageChange(i + 1)}
                className={`px-2 py-1 rounded ${
                  currentPage === i + 1
                    ? "bg-violet-100 text-violet-700"
                    : "bg-gray-100 hover:bg-gray-200"
                }`}
              >
                {i + 1}
              </button>
            ))}
            <button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages} className="px-2 py-1 rounded bg-gray-100 hover:bg-gray-200">
              {">"}
            </button>
            <button onClick={() => handlePageChange(totalPages)} disabled={currentPage === totalPages} className="px-2 py-1 rounded bg-gray-100 hover:bg-gray-200">
              {">>"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MachineList;
