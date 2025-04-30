// import React, { useState } from "react";
// import axios from "axios";
// import toast from "react-hot-toast";
// import { Trash, Edit3 } from "lucide-react";
// import EditMachineIssue from "./EditMachineIssue";

// const base_url = import.meta.env.VITE_BASE_API_URL;

// const MachineIssueItem = ({ item, setMachineIssueList, machineIssueList }) => {
//   const [isEdit, setIsEdit] = useState(false);

//   // Handle delete action
//   const handleDelete = async () => {
//     const confirmed = window.confirm(`Are you sure you want to delete "${item.issueName}"?`);
//     if (!confirmed) return;

//     const id = item._id;
//     try {
//       // Corrected API endpoint for deletion
//       await axios.delete(`${base_url}/api/machineissues/${id}`, {
//         withCredentials: true,
//       });

//       // Remove the deleted machine issue from the list
//       const newList = machineIssueList.filter((i) => i._id !== id);
//       setMachineIssueList(newList); // Update the state

//       toast.success("Machine Issue deleted successfully.");
//     } catch (error) {
//       console.error("Error deleting machine issue:", error);
//       toast.error("Failed to delete machine issue.");
//     }
//   };

//   return (
//     <>
//       {isEdit && (
//         <EditMachineIssue
//           isEdit={isEdit}
//           setIsEdit={setIsEdit}
//           itemId={item._id}
//           machineIssueList={machineIssueList}
//           setMachineIssueList={setMachineIssueList}
//         />
//       )}

//       <tr className="border-b border-gray-200">
//         <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
//           {item.issueName}
//         </td>
//         <td className="px-6 py-4 whitespace-nowrap">{item.issueCode}</td>

//         <td className="px-6 py-4 whitespace-nowrap">
//           <span
//             className={`px-3 py-1 inline-flex text-md leading-5 font-semibold rounded-sm ${
//               item.status === "Active"
//                 ? "bg-green-500 text-white hover:bg-green-600 cursor-pointer"
//                 : "bg-red-500 text-white hover:bg-red-600 cursor-pointer"
//             }`}
//           >
//             {item.status}
//           </span>
//         </td>
//         <td className="px-6 py-4 whitespace-nowrap text-start text-sm font-medium">
//           <div className="flex justify-start space-x-3">
//             <button
//               onClick={() => setIsEdit(true)}
//               className="text-orange-400 hover:text-orange-600 transition-colors duration-200"
//             >
//               <Edit3 size={20} />
//             </button>
//             <button
//               onClick={handleDelete}
//               className="text-red-400 hover:text-red-600 transition-colors duration-200"
//             >
//               <Trash size={20} />
//             </button>
//           </div>
//         </td>
//       </tr>
//     </>
//   );
// };

// export default MachineIssueItem;


// components/Maintenance/MachineIssue/MachineIssueList.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Plus } from "lucide-react";
import AddMachineIssue from "./AddMachineIssue";
import MachineIssueItem from "./MachineIssueItem";

const base_url = import.meta.env.VITE_BASE_API_URL;

const MachineIssueList = () => {
  const [machineIssueList, setMachineIssueList] = useState([]);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get(`${base_url}/api/machineissues`, {
          withCredentials: true,
        });
        setMachineIssueList(data);
      } catch (error) {
        console.error("Error fetching machine issues:", error);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Machine Issues</h2>
        <button
          onClick={() => setIsOpen(true)}
          className="bg-violet-600 text-white px-4 py-2 rounded-md flex items-center gap-2"
        >
          <Plus size={18} />
          Add Issue
        </button>
      </div>

      <AddMachineIssue
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        setMachineIssueList={setMachineIssueList}
      />

      <table className="min-w-full bg-white border rounded">
        <thead>
          <tr className="bg-gray-100 text-gray-700">
            <th className="px-6 py-3 text-left">Name</th>
            <th className="px-6 py-3 text-left">Issue Code</th>
            <th className="px-6 py-3 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {machineIssueList.map((item) => (
            <MachineIssueItem
              key={item._id}
              item={item}
              setMachineIssueList={setMachineIssueList}
              machineIssueList={machineIssueList}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MachineIssueList;
