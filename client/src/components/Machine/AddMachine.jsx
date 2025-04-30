// import axios from "axios";
// import { X } from "lucide-react";
// import { useState } from "react";
// import toast from "react-hot-toast";

// const base_url = import.meta.env.VITE_BASE_API_URL;

// const AddMachine = ({ isOpen, setIsOpen, input, setInput, setMachineList }) => {
//     const [loading, setLoading] = useState(false);

//     const handleSubmit = async (e) => {
//         e.preventDefault();

//         const machineName = e.target.machine.value.trim();
//         const status = e.target.ActiveOrInactive.value;

//         if (!machineName) {
//             toast.error("Machine name is required");
//             return;
//         }

//         try {
//             setLoading(true);
//             const { data } = await axios.post(
//                 `${base_url}/api/machines`,
//                 { MachineName: machineName, status },
//                 { withCredentials: true }
//             );

//             // Add new machine to the machine list without clearing the search input
//             setMachineList((prev) => [
//                 ...prev,
//                 { MachineName: machineName.toUpperCase(), status, _id: data?.id },
//             ]);

//             toast.success("Machine added successfully!");

//             setIsOpen(false); // Close the modal
//         } catch (error) {
//             console.error(error);
//             toast.error("Failed to add machine");
//         } finally {
//             setLoading(false);
//         }
//     };

//     return (
//         <>
//             {isOpen && (
//                 <div
//                     onClick={() => setIsOpen(false)}
//                     className="fixed inset-0 bg-black bg-opacity-50 z-40"
//                 />
//             )}

//             <div
//                 className={`fixed top-0 right-0 h-screen w-[394px] bg-white z-50 transform transition-transform duration-300 ease-in-out ${
//                     isOpen ? "translate-x-0" : "translate-x-full"
//                 } overflow-y-auto shadow-lg`}
//                 role="dialog"
//                 aria-modal="true"
//             >
//                 {/* Header */}
//                 <div className="flex justify-between items-center p-5 pb-4">
//                     <h1 className="text-xl font-semibold">Add New Machine</h1>
//                     <button onClick={() => setIsOpen(false)} className="text-gray-500 hover:text-black">
//                         <X />
//                     </button>
//                 </div>

//                 <hr />

//                 {/* Form */}
//                 <form onSubmit={handleSubmit} className="p-5 space-y-5">
//                     <div>
//                         <label htmlFor="machine" className="block text-sm font-medium text-gray-700 mb-1">
//                             Machine Name
//                         </label>
//                         <input
//                             type="text"
//                             name="machine"
//                             placeholder="Please enter machine name"
//                             value={input} // Correctly bind the input value
//                             onChange={(e) => setInput(e.target.value)} // Update the input value on change
//                             className="w-full h-10 px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-violet-500 cursor-pointer outline-none transition-colors duration-200"
//                         />
//                     </div>

//                     <div>
//                         <label htmlFor="ActiveOrInactive" className="block text-sm font-medium text-gray-700 mb-1">
//                             Select Status
//                         </label>
//                         <select
//                             name="ActiveOrInactive"
//                             id="ActiveOrInactive"
//                             className="w-full h-10 px-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-violet-500 cursor-pointer outline-none transition-colors duration-200"
//                         >
//                             <option value="Active">Active</option>
//                             <option value="Inactive">Inactive</option>
//                         </select>
//                     </div>

//                     <div className="flex space-x-4 pt-2">
//                         <button
//                             type="submit"
//                             disabled={loading}
//                             className={`${
//                                 loading ? "bg-violet-400" : "bg-violet-500 hover:bg-violet-600"
//                             } text-white px-6 py-2 rounded-md font-medium flex items-center justify-center`}
//                         >
//                             {loading ? "Submitting..." : "Submit"}
//                         </button>
//                         <button
//                             type="button"
//                             onClick={() => setIsOpen(false)}
//                             className="bg-red-100 hover:bg-red-200 text-red-600 px-6 py-2 rounded-md font-medium"
//                         >
//                             Cancel
//                         </button>
//                     </div>
//                 </form>
//             </div>
//         </>
//     );
// };

// export default AddMachine;
import React, { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { X } from "lucide-react";

const base_url = import.meta.env.VITE_BASE_API_URL;

const AddMachine = ({ isOpen, setIsOpen, setMachineList }) => {
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const machineName = e.target.machineName.value.trim();
    const machineCode = e.target.machineCode.value.trim();
    const machineValue = e.target.machineValue.value.trim();
    const status = e.target.status.value;

    // Check for empty fields
    if (!machineName || !machineCode || !machineValue) {
      toast.error("All fields are required");
      return;
    }

    console.log({ machineName, machineCode, machineValue, status });

    try {
      setLoading(true);
      // Send POST request to the server
      const { data } = await axios.post(
        `${base_url}/api/machines`,
        { machineName, machineCode, machineValue, status },
        { withCredentials: true }
      );

      setMachineList((prev) => [
        ...prev,
        { machineName, machineCode, machineValue, status, _id: data?.id },
      ]);
      e.target.reset(); // Reset the form

      toast.success("Machine added successfully!");
      setIsOpen(false); // Close modal
    } catch (error) {
      if (error.response) {
        console.error("Error response:", error.response);
        toast.error(`Failed to add machine: ${error.response.data.message || 'Unknown error'}`);
      } else {
        console.error("Error:", error);
        toast.error("Failed to add machine");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
        />
      )}
      <div
        className={`fixed top-0 right-0 h-screen w-[394px] bg-white z-50 transform transition-transform duration-300 ease-in-out ${isOpen ? "translate-x-0" : "translate-x-full"
          }`}
        role="dialog"
        aria-modal="true"
      >
        <div className="flex justify-between items-center p-5 pb-4">
          <h1 className="text-xl font-semibold">Add New Machine</h1>
          <button
            onClick={() => setIsOpen(false)}
            className="text-gray-500 hover:text-black"
          >
            <X />
          </button>
        </div>
        <hr />
        <form onSubmit={handleSubmit} className="p-5 space-y-5">
          <div>
            <label htmlFor="machineName" className="block text-sm font-medium text-gray-700 mb-1">Machine Name</label>
            <input type="text" name="machineName" id="machineName" placeholder="Please Enter Machine Name" className="w-full h-10 px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-violet-500" required />
          </div>
          <div>
            <label htmlFor="machineCode" className="block text-sm font-medium text-gray-700 mb-1">Machine Code</label>
            <input type="text" name="machineCode" id="machineCode" placeholder="Please Enter Machine Code" className="w-full h-10 px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-violet-500" required />
          </div>
          <div>
            <label htmlFor="machineValue" className="block text-sm font-medium text-gray-700 mb-1">Machine Value</label>
            <input type="text" name="machineValue" id="machineValue" placeholder="Please Enter Machine Value" className="w-full h-10 px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-violet-500" required />
          </div>
          <div>
            <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-1">Status</label>
            <select name="status" id="status" className="w-full h-10 px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-violet-500" required>
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
          </div>
          <div className="flex space-x-4 pt-2">
            <button type="submit" disabled={loading} className={`${loading ? "bg-violet-400" : "bg-violet-500 hover:bg-violet-600"} text-white px-6 py-2 rounded-md font-medium`}>
              {loading ? "Submitting..." : "Submit"}
            </button>
            <button type="button" onClick={() => setIsOpen(false)} className="bg-red-100 hover:bg-red-200 text-red-600 px-6 py-2 rounded-md font-medium">Cancel</button>
          </div>
        </form>
      </div>
    </>
  );
};

export default AddMachine;
