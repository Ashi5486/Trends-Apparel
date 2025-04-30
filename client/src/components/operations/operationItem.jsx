// src/components/operations/operationItem.jsx

import { Trash, Edit3 } from "lucide-react";
import EditOperation from "./EditOperations"
import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

const base_url = import.meta.env.VITE_BASE_API_URL;

const OperationItem = ({ item, setOperationList, operationList }) => {
  const [isEdit, setIsEdit] = useState(false);

  // Handle delete logic
  const handleDelete = async () => {
    const confirmed = window.confirm(`Are you sure you want to delete "${item.operationName}"?`);
    if (!confirmed) return;

    const id = item._id;
    try {
      await axios.delete(`${base_url}/api/operations/${id}`, {
        withCredentials: true,
      });
      const newList = operationList.filter((i) => i._id !== id);
      setOperationList(newList);
      toast.success("Operation deleted successfully.");
    } catch (error) {
      console.error("Error deleting operation:", error);
      toast.error("Failed to delete operation.");
    }
  };

  return (
    <>
      {/* Conditional Rendering of Edit Operation Modal */}
      {isEdit && (
        <EditOperation
          isEdit={isEdit}
          setIsEdit={setIsEdit}
          itemId={item._id}
          operationList={operationList}
          setOperationList={setOperationList}
        />
      )}

      <tr className="border-b border-gray-200">
        {/* Operation Name */}
        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
          {item.operationName}
        </td>

        {/* Operation Rate */}
        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
          {item.rate}
        </td>

        {/* Operation Unit Type */}
        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
          {item.unitType}
        </td>

        {/* Operation Status */}
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

        {/* Action Buttons */}
        <td className="px-6 py-4 whitespace-nowrap text-start text-sm font-medium">
          <div className="flex justify-start space-x-3">
            {/* Edit Button */}
            <button
              onClick={() => setIsEdit(true)}
              className="text-orange-400 hover:text-orange-600 transition-colors duration-200"
            >
              <Edit3 size={20} />
            </button>

            {/* Delete Button */}
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

export default OperationItem;
