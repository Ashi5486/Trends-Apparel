import React, { useState } from 'react';
import axios from 'axios';
import { Edit3, Trash } from 'lucide-react';
import EditTidno from './EditTidno';

const base_url = import.meta.env.VITE_BASE_API_URL;

const TidnoItem = ({ line, TidnoId, Tidno, setTidno }) => {
  const [isEdit, setIsEdit] = useState(false);

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this TID NO.?")) return;

    try {
      await axios.delete(`${base_url}/api/tidnos/${Tidno._id}`);
      setTidno((prevTidnos) =>
        prevTidnos
          .map((t) =>
            t._id === TidnoId
              ? {
                  ...t,
                  lines: t.lines.filter((l) => l._id !== line._id),
                }
              : t
          )
          .filter((t) => t.lines.length > 0)
      );
    } catch (err) {
      console.error("Delete failed:", err.message);
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
          TidnoId={TidnoId}
        />
      )}

      <tr className="border-b border-gray-200 text-sm">
        {/* Tidno Name */}
        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
          {Tidno.TidnoName}
        </td>

        {/* Status Badge */}
        <td className="px-6 py-4 whitespace-nowrap">
          <span
            className={`px-3 py-1 inline-flex text-md leading-5 font-semibold rounded-sm ${
              Tidno.status === "Active"
                ? "bg-green-500 text-white hover:bg-green-600 cursor-pointer"
                : "bg-red-500 text-white hover:bg-red-600 cursor-pointer"
            }`}
          >
            {Tidno.status}
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

export default TidnoItem;
