
// DepartmentItem.jsx
import { Trash, Edit3 } from "lucide-react";
import EditDepartment from "./EditDepartment";
import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify"; 

const base_url = import.meta.env.VITE_BASE_API_URL;

const DepartmentItem = ({
  item,
  setDepartmentList,
  departmentList,
}) => {
  const [isEdit, setIsEdit] = useState(false);

  const handleDelete = async () => {
    const confirmed = window.confirm(`Are you sure you want to delete "${item.departmentName}"?`);
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
        <td className="px-6 py-4 text-sm font-medium text-gray-900">{item.departmentName}</td>

        <td className="px-6 py-4">
          <span
            className={`px-3 py-1 inline-flex text-md font-semibold rounded-sm ${
              item.status === "Active"
                ? "bg-green-500 text-white hover:bg-green-600"
                : "bg-red-500 text-white hover:bg-red-600"
            }`}
          >
            {item.status}
          </span>
        </td>

        <td className="px-6 py-4 text-start text-sm font-medium">
          <div className="flex space-x-3">
            <button
              onClick={() => setIsEdit(true)}
              className="text-orange-400 hover:text-orange-600"
            >
              <Edit3 size={20} />
            </button>
            <button
              onClick={handleDelete}
              className="text-red-400 hover:text-red-600"
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



