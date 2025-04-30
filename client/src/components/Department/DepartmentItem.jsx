
import { Trash, Edit3 } from "lucide-react";
import EditDepartment from "./EditDepartment";
import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

const base_url = import.meta.env.VITE_BASE_API_URL;

const DepartmentItem = ({
  item,
  setDepartmentList,
  departmentList,
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
      await axios.delete(`${base_url}/api/departments/${id}`, {
        withCredentials: true,
      });
      const newList = departmentList.filter((i) => i._id !== id);
      setDepartmentList(newList);
      toast.success("Department deleted successfully.");
    } catch (error) {
      console.error("Error deleting department:", error);
      toast.error("Failed to delete department.");
    }
  };

  return (
    <>
      {/* Conditional Rendering of Edit Department Modal */}
      {isEdit && (
        <EditDepartment
          isEdit={isEdit}
          setIsEdit={setIsEdit}
          itemId={item._id}
          departmentList={departmentList}
          setDepartmentList={setDepartmentList}
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

        {/* Department Name */}
        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
          {item.departmentName}
        </td>

        {/* Department Status */}
        {/* Department Status */}
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

export default DepartmentItem;
