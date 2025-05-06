import React, { useState } from 'react';
import axios from 'axios';
import { Edit3, Trash } from 'lucide-react';
import EditTidno from './EditTidno';
import toast from 'react-hot-toast';

const base_url = import.meta.env.VITE_BASE_API_URL;

const TidnoItem = ({ line, Tidno, setTidno }) => {
  const [isEdit, setIsEdit] = useState(false);

  // Delete handler
  const handleDelete = async () => {
    if (!window.confirm(`Are you sure you want to delete this TID NO. ${Tidno.TidnoName}?`)) return;

    try {
      // Delete the Tidno from the database
      await axios.delete(`${base_url}/api/tidnos/${Tidno._id}`);
      
      // Update the state to remove the Tidno from the list
      setTidno((prevTidnos) =>
        prevTidnos
          .map((t) =>
            t._id === Tidno._id
              ? {
                  ...t,
                  lines: t.lines.filter((l) => l._id !== line._id), // Remove specific line
                }
              : t
          )
          .filter((t) => t.lines.length > 0) // Ensure Tidno still has lines after removal
      );

      toast.success("Deleted successfully");
    } catch (err) {
      console.error("Delete failed:", err.message);
      toast.error("Failed to delete");
    }
  };

  // Toggle status between Active and Inactive
  const handleToggleStatus = async () => {
    const newStatus = Tidno.status === "Active" ? "Inactive" : "Active";
    try {
      // Update the Tidno status in the database
      await axios.patch(`${base_url}/api/tidnos/${Tidno._id}`, { status: newStatus });
      
      // Update the status in the state
      setTidno((prevTidnos) =>
        prevTidnos.map((t) =>
          t._id === Tidno._id ? { ...t, status: newStatus } : t
        )
      );

      toast.success(`Status changed to ${newStatus}`);
    } catch (err) {
      console.error("Status toggle failed:", err.message);
      toast.error("Failed to update status");
    }
  };

  return (
    <>
      {isEdit && (
        <EditTidno
          isEdit={isEdit}
          setIsEdit={setIsEdit}
          itemId={Tidno._id}
          Tidno={Tidno}
          setTidno={setTidno}
        />
      )}

      <tr className="border-b border-gray-200 text-sm">
        {/* Tidno Name */}
        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
          {Tidno.TidnoName}
        </td>

        {/* Status */}
        <td className="px-6 py-4 whitespace-nowrap">
          <span
            onClick={handleToggleStatus}
            className={`px-3 py-1 inline-flex text-md leading-5 font-semibold rounded-sm ${
              Tidno.status === 'Active'
                ? 'bg-green-500 text-white hover:bg-green-600 cursor-pointer'
                : 'bg-red-500 text-white hover:bg-red-600 cursor-pointer'
            }`}
          >
            {Tidno.status}
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

export default TidnoItem;
