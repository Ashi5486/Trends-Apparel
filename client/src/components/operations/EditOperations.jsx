// import axios from 'axios';
// import { X } from 'lucide-react';
// import React, { useState, useEffect } from 'react';

// const base_url = import.meta.env.VITE_BASE_API_URL;

// const EditOperation = ({ isEdit, setIsEdit, itemId, operationList, setOperationList }) => {
//     const [operationName, setOperationName] = useState('');
//     const [rate, setRate] = useState('');
//     const [unitType, setUnitType] = useState('Minutes');
//     const [status, setStatus] = useState('Active');
//     const [error, setError] = useState(null);

//     useEffect(() => {
//         const currentOperation = operationList.find(op => op._id === itemId);
//         if (currentOperation) {
//             setOperationName(currentOperation.operationName);
//             setRate(currentOperation.rate);
//             setUnitType(currentOperation.unitType);
//             setStatus(currentOperation.status);
//         }
//     }, [itemId, operationList]);

//     const handleSubmit = async (e) => {
//         e.preventDefault();
        
//         const updatedName = operationName.trim();
//         const updatedRate = rate.trim();

//         // Basic validation
//         if (!updatedName || !updatedRate) {
//             setError("Please fill in all fields.");
//             return;
//         }

//         try {
//             await axios.patch(`${base_url}/api/operations/${itemId}`, {
//                 operationName: updatedName,
//                 rate: updatedRate,
//                 unitType,
//                 status
//             }, {
//                 withCredentials: true,
//                 headers: { 'Content-Type': 'application/json' }
//             });

//             const updatedList = operationList.map(op =>
//                 op._id === itemId ? { ...op, operationName: updatedName, rate: updatedRate, unitType, status } : op
//             );

//             setOperationList(updatedList);
//             setIsEdit(false);
//             setError(null);
//             alert("Operation updated successfully!"); // Toast notification (you can replace with any custom solution)
//         } catch (error) {
//             console.error("Error updating operation:", error);
//             setError("Something went wrong. Please try again.");
//         }
//     };

//     return (
//         <>
//             {isEdit && (
//                 <div
//                     onClick={() => setIsEdit(false)}
//                     className="fixed inset-0 bg-black bg-opacity-50 z-40"
//                 />
//             )}

//             <div
//                 className={`fixed top-0 right-0 h-screen min-w-[350px] bg-white z-50 transform transition-transform duration-300 ease-in-out ${
//                     isEdit ? 'translate-x-0' : 'translate-x-full'
//                 } overflow-y-auto shadow-lg`}
//                 role="dialog"
//                 aria-modal="true"
//             >
//                 {/* Header */}
//                 <div className="flex justify-between items-center p-4">
//                     <h1 className="text-xl font-semibold">Edit Operation</h1>
//                     <button onClick={() => setIsEdit(false)} className="text-gray-500 hover:text-black">
//                         <X />
//                     </button>
//                 </div>

//                 <hr />

//                 {/* Error Message */}
//                 {error && (
//                     <div className="py-2 px-4 mb-4 bg-red-200 text-red-800 rounded-md border border-red-500">
//                         {error}
//                     </div>
//                 )}

//                 {/* Form */}
//                 <form onSubmit={handleSubmit} className="p-4 space-y-4">
//                     {/* Operation Name */}
//                     <div>
//                         <label htmlFor="operationName" className="text-sm text-gray-600">Operation Name</label>
//                         <input
//                             type="text"
//                             name="operationName"
//                             placeholder="Enter operation name"
//                             value={operationName}
//                             onChange={(e) => setOperationName(e.target.value)}
//                             className="w-full h-10 px-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
//                         />
//                     </div>

//                     {/* Rate */}
//                     <div>
//                         <label htmlFor="rate" className="text-sm text-gray-600">Rate</label>
//                         <input
//                             type="text"
//                             name="rate"
//                             placeholder="Enter rate"
//                             value={rate}
//                             onChange={(e) => setRate(e.target.value)}
//                             className="w-full h-10 px-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
//                         />
//                     </div>

//                     {/* Unit Type */}
//                     <div>
//                         <label htmlFor="unitType" className="text-sm text-gray-600">Unit Type</label>
//                         <select
//                             name="unitType"
//                             value={unitType}
//                             onChange={(e) => setUnitType(e.target.value)}
//                             className="w-full h-10 px-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
//                         >
//                             <option value="Minutes">Minutes</option>
//                             <option value="Pieces">Pieces</option>
//                         </select>
//                     </div>

//                     {/* Status */}
//                     <div>
//                         <label htmlFor="status" className="text-sm text-gray-600">Select Status</label>
//                         <select
//                             name="status"
//                             value={status}
//                             onChange={(e) => setStatus(e.target.value)}
//                             className="w-full h-10 px-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
//                         >
//                             <option value="Active">Active</option>
//                             <option value="Inactive">Inactive</option>
//                         </select>
//                     </div>

//                     {/* Submit */}
//                     <button
//                         type="submit"
//                         className="bg-violet-500 hover:bg-violet-600 text-white px-6 py-2 rounded-md font-medium"
//                     >
//                         Submit
//                     </button>
//                 </form>
//             </div>
//         </>
//     );
// };

// export default EditOperation;


import React, { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";

const base_url = import.meta.env.VITE_BASE_API_URL;

const EditOperation = ({
  isEdit,
  setIsEdit,
  itemId,
  operationList,
  setOperationList,
}) => {
  const [operationData, setOperationData] = useState({
    operationName: "",
    rate: "",
    unitType: "",
    department: "",
    style: "",
    garment: "",
    sam: "",
  });

  // Fetch operation data by ID when the modal opens
  useEffect(() => {
    if (isEdit && itemId) {
      const fetchData = async () => {
        try {
          const response = await axios.get(`${base_url}/api/operations/${itemId}`, {
            withCredentials: true,
          });
          setOperationData(response.data);
        } catch (error) {
          console.error("Error fetching operation data:", error);
          toast.error("Failed to fetch operation data.");
        }
      };

      fetchData();
    }
  }, [isEdit, itemId]);

  // Handle form submission to update the operation
  const handleUpdate = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.put(`${base_url}/api/operations/${itemId}`, operationData, {
        withCredentials: true,
      });

      // Update the operation in the list
      const updatedList = operationList.map((operation) =>
        operation._id === itemId ? response.data : operation
      );
      setOperationList(updatedList);

      toast.success("Operation updated successfully.");
      setIsEdit(false); // Close the edit modal
    } catch (error) {
      console.error("Error updating operation:", error);
      toast.error("Failed to update operation.");
    }
  };

  return (
    <div className="modal">
      <form onSubmit={handleUpdate} className="edit-operation-form">
        <h2>Edit Operation</h2>
        <div>
          <label>Operation Name:</label>
          <input
            type="text"
            value={operationData.operationName}
            onChange={(e) => setOperationData({ ...operationData, operationName: e.target.value })}
          />
        </div>
        <div>
          <label>Rate:</label>
          <input
            type="number"
            value={operationData.rate}
            onChange={(e) => setOperationData({ ...operationData, rate: e.target.value })}
          />
        </div>
        <div>
          <label>Unit Type:</label>
          <input
            type="text"
            value={operationData.unitType}
            onChange={(e) => setOperationData({ ...operationData, unitType: e.target.value })}
          />
        </div>
        <div>
          <label>Department:</label>
          <input
            type="text"
            value={operationData.department}
            onChange={(e) => setOperationData({ ...operationData, department: e.target.value })}
          />
        </div>
        <div>
          <label>Style:</label>
          <input
            type="text"
            value={operationData.style}
            onChange={(e) => setOperationData({ ...operationData, style: e.target.value })}
          />
        </div>
        <div>
          <label>Garment:</label>
          <input
            type="text"
            value={operationData.garment}
            onChange={(e) => setOperationData({ ...operationData, garment: e.target.value })}
          />
        </div>
        <div>
          <label>SAM:</label>
          <input
            type="number"
            value={operationData.sam}
            onChange={(e) => setOperationData({ ...operationData, sam: e.target.value })}
          />
        </div>

        <div>
          <button type="submit">Update</button>
          <button type="button" onClick={() => setIsEdit(false)}>Cancel</button>
        </div>
      </form>
    </div>
  );
};

export default EditOperation;
