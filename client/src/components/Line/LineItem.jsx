import React, { useState } from "react";
import { Trash, Edit3 } from "lucide-react";
import axios from "axios";
import { toast } from "react-toastify"; // ✅ Using react-toastify
import EditLine from "./EditLine";

const base_url = import.meta.env.VITE_BASE_API_URL;

const LineItem = ({ item, setLineList, lineList }) => {
  const [isEdit, setIsEdit] = useState(false);

  const handleDelete = async () => {
    const confirmed = window.confirm(`Are you sure you want to delete "${item.lineName}"?`);
    if (!confirmed) return;

    const toastId = toast.loading("Deleting line..."); 

    try {
      await axios.delete(`${base_url}/api/lines/${item._id}`, {
        withCredentials: true,
      });

      const updatedList = lineList.filter((line) => line._id !== item._id);
      setLineList(updatedList);

      toast.update(toastId, {
        render: "Line deleted successfully!",
        type: "success",
        isLoading: false,
        autoClose: 2000,
      });
    } catch (error) {
      console.error("Error deleting line:", error);
      toast.update(toastId, {
        render: "Failed to delete line.",
        type: "error",
        isLoading: false,
        autoClose: 3000,
      });
    }
  };

  return (
    <>
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
        <td className="px-4 py-4 whitespace-nowrap text-md font-semibold text-gray-700">
          {item.lineName?.toUpperCase()}
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

export default LineItem;
