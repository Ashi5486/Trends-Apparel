import React, { useState } from 'react';
import axios from 'axios';
import { Edit3, Trash } from 'lucide-react';
import EditSize from './EditSize';

const base_url = import.meta.env.VITE_BASE_API_URL;

const SizeItem = ({ line, SizeId, Size, setSize }) => {
  const [isEdit, setIsEdit] = useState(false);

  const handleDelete = async () => {
    if (!window.confirm('Are you sure you want to delete this line?')) return;

    try {
      await axios.delete(`${base_url}/api/styles/${SizeId}/lines/${line._id}`, {
        withCredentials: true,
      });

      // Update state by removing the deleted line
      setSize((prevSize) =>
        prevSize
          .map((s) =>
            s._id === SizeId
              ? {
                  ...s,
                  lines: s.lines.filter((l) => l._id !== line._id),
                }
              : s
          )
          .filter((s) => s.lines.length > 0)
      );
    } catch (err) {
      console.error('Delete failed:', err.message);
    }
  };

  return (
    <>
      <EditSize
        isEdit={isEdit}
        setIsEdit={setIsEdit}
        itemId={line._id}
        Size={Size}
        setSize={setSize}
        SizeId={SizeId}
      />

      <tr className="border-b border-gray-200">
        {/* Line Name */}
        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
          {line.styleName}
        </td>

        {/* Line Status */}
        <td className="px-6 py-4 whitespace-nowrap">
          <span
            className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
              line.status === 'Active'
                ? 'bg-green-100 text-green-800 border border-green-800'
                : 'bg-red-100 text-red-800 border border-red-700'
            }`}
          >
            {line.status}
          </span>
        </td>

        {/* Actions */}
        <td className="px-6 py-4 whitespace-nowrap text-start text-sm font-medium">
          <div className="flex justify-start space-x-3">
            <button
              onClick={() => setIsEdit(true)}
              className="text-yellow-600 hover:text-yellow-900"
            >
              <Edit3 size={18} />
            </button>

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

export default SizeItem;
