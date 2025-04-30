import React, { useState } from "react";
import { Trash, Edit3 } from "lucide-react";
import axios from "axios";
import toast from "react-hot-toast";
import EditLine from "./EditLine"; // Assuming you have a similar EditLine component as EditDepartment

const base_url = import.meta.env.VITE_BASE_API_URL;

const LineItem = ({ item, setLineList, lineList }) => {
  const [isEdit, setIsEdit] = useState(false);

  // Handle delete logic
  const handleDelete = async () => {
    const confirmed = window.confirm(`Are you sure you want to delete "${item.lineName}"?`);
    if (!confirmed) return;

    const id = item._id;
    try {
      await axios.delete(`${base_url}/api/lines/${id}`, {
        withCredentials: true,
      });
      const newList = lineList.filter((line) => line._id !== id);
      setLineList(newList);
      toast.success("Line deleted successfully.");
    } catch (error) {
      console.error("Error deleting line:", error);
      toast.error("Failed to delete line.");
    }
  };

  return (
    <>
      {/* Conditional Rendering of Edit Line Modal */}
      {isEdit && (
        <EditLine
          isEdit={isEdit}
          setIsEdit={setIsEdit}
          itemId={item._id}
          lineList={lineList}
          setLineList={setLineList}
        />
      )}

      <tr className="border-b border-gray-200">
        {/* Capitalized line Name */}
        <td className="px-4 py-4 whitespace-nowrap text-md font-semibold text-gray-700">
          {item.lineName.toUpperCase()} {/* Capitalizing all characters */}
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

export default LineItem;
