import { Trash, Edit3 } from "lucide-react";
import EditStyle from "./EditStyle";
import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

const base_url = import.meta.env.VITE_BASE_API_URL;

const StyleItem = ({
  item,
  setStyleList,
  styleList,
//   isChecked,
//   onCheckboxChange,
}) => {
  const [isEdit, setIsEdit] = useState(false);

  // Handle delete logic
  const handleDelete = async () => {
    const confirmed = window.confirm(`Are you sure you want to delete "${item.DepartmentName}"?`);
    if (!confirmed) return;

    const id = item._id;
    try {
      await axios.delete(`${base_url}/api/styles/${id}`, {
        withCredentials: true,
      });
      const newList = styleList.filter((i) => i._id !== id);
      setStyleList(newList);
      toast.success("Style deleted successfully.");
    } catch (error) {
      console.error("Error deleting Style:", error);
      toast.error("Failed to delete Style.");
    }
  };

  return (
    <>
      {/* Conditional Rendering of Edit Department Modal */}
      {isEdit && (
        <EditStyle
          isEdit={isEdit}
          setIsEdit={setIsEdit}
          itemId={item._id}
          styleList={styleList}
          setStyleList={setStyleList}
        />
      )}

      <tr className="border-b border-gray-200">
        {/* Checkbox to select department */}
        {/* <td className="px-3 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
          <input
            type="checkbox"
            checked={isChecked}
            onChange={onCheckboxChange}
            className="accent-violet-500"
          />
        </td> */}

    
        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
          {item.styleName}
        </td>

        {/* Department Status */}
        <td className="px-6 py-4 whitespace-nowrap">
          <span
            className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
              item.status === "Active"
                ? "bg-green-100 text-green-800 border border-green-800"
                : "bg-red-100 text-red-800 border border-red-700"
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
              className="text-yellow-600 hover:text-yellow-900"
            >
              <Edit3 size={18} />
            </button>

            {/* Delete Button */}
            <button
              onClick={handleDelete}
              className="text-red-600 hover:text-red-900"
            >
              <Trash size={18} />
            </button>
          </div>
        </td>
      </tr>
    </>
  );
};

export default StyleItem;
