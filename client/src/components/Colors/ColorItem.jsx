import { Trash, Edit3 } from "lucide-react";
import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import EditColor from "./EditColor";

const base_url = import.meta.env.VITE_BASE_API_URL;

const ColorItem = ({ item, colorList, setColorList }) => {
  const [isEdit, setIsEdit] = useState(false);

  const handleDelete = async () => {
    const confirmed = window.confirm(`Are you sure you want to delete "${item.colorName}"?`);
    if (!confirmed) return;

    try {
      await axios.delete(`${base_url}/api/colors/${item._id}`, {
        withCredentials: true,
      });
      const updatedList = colorList.filter((color) => color._id !== item._id);
      setColorList(updatedList);
      toast.success("Color deleted successfully.");
    } catch (error) {
      console.error("Error deleting color:", error);
      toast.error("Failed to delete color.");
    }
  };

  return (
    <>
      {isEdit && (
        <EditColor
          isEdit={isEdit}
          setIsEdit={setIsEdit}
          itemId={item._id}
          colorList={colorList}
          setColorList={setColorList}
        />
      )}

      <tr className="border-b border-gray-200">
        {/* Color Name */}
        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
          {item.colorName}
        </td>

        {/* Color Status */}
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

export default ColorItem;
