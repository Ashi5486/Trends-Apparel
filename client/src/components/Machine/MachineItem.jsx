import React, { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { Trash, Edit3 } from "lucide-react";
import EditMachine from "./EditMachine"; // Assuming this component is available

const base_url = import.meta.env.VITE_BASE_API_URL;

const MachineItem = ({ item, setMachineList, machineList }) => {
  const [isEdit, setIsEdit] = useState(false);

  // Handle delete action
  const handleDelete = async () => {
    const confirmed = window.confirm(`Are you sure you want to delete "${item.machineName}"?`);
    if (!confirmed) return;

    const id = item._id;
    try {
      // Delete the machine from the backend
      await axios.delete(`${base_url}/api/machines/${id}`, {
        withCredentials: true,
      });

      // Remove the deleted machine from the local machine list
      const newList = machineList.filter((i) => i._id !== id);
      setMachineList(newList); // Update the state

      // Save updated list to localStorage
      localStorage.setItem('machines', JSON.stringify(newList));

      toast.success("Machine deleted successfully.");
    } catch (error) {
      console.error("Error deleting machine:", error);
      toast.error("Failed to delete machine.");
    }
  };

  return (
    <>
      {isEdit && (
        <EditMachine
          isEdit={isEdit}
          setIsEdit={setIsEdit}
          itemId={item._id}
          machineList={machineList}
          setMachineList={setMachineList}
        />
      )}

      <tr key={item._id} className="border-b border-gray-200">
        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
          {item.machineName}
        </td>
        <td className="px-6 py-4 whitespace-nowrap">
          {item.machineCode}
        </td>
        <td className="px-6 py-4 whitespace-nowrap">
          {item.machineValue}
        </td>
        <td className="px-6 py-4 whitespace-nowrap">
          <span
            className={`px-3 py-1 inline-flex text-md leading-5 font-semibold rounded-sm ${
              item.status === "Active"
                ? "bg-green-500 text-white hover:bg-green-600 cursor-pointer"
                : "bg-red-500 text-white hover:bg-red-600 cursor-pointer"
            }`}
          >
            {item.status}
          </span>
        </td>
        <td className="px-6 py-4 whitespace-nowrap text-start text-sm font-medium">
          <div className="flex justify-start space-x-3">
            <button
              onClick={() => setIsEdit(true)}
              className="text-orange-400 hover:text-orange-600 transition-colors duration-200"
            >
              <Edit3 size={20} />
            </button>
            <button
              onClick={handleDelete}
              className="text-red-400 hover:text-red-600 transition-colors duration-200"
            >
              <Trash size={20} />
            </button>
          </div>
        </td>
      </tr>
    </>
  );
};

export default MachineItem;
