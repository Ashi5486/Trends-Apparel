import React, { useState } from 'react';
import axios from 'axios';
import { Edit3, Trash } from 'lucide-react';
import EditSection from './EditSection'; // Reusable component

const base_url = import.meta.env.VITE_BASE_API_URL;

const SectionItem = ({ line, sectionId, sections, setSections }) => {
  const [isEdit, setIsEdit] = useState(false);

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this line?")) return;

    try {
      await axios.delete(`${base_url}/api/sections/${line._id}`, {
        withCredentials: true,
      });

      setSections((prevSections) =>
        prevSections
          .map((section) =>
            section._id === sectionId
              ? {
                  ...section,
                  lines: section.lines.filter((l) => l._id !== line._id),
                }
              : section
          )
          .filter((section) => section.lines.length > 0)
      );
    } catch (err) {
      console.error('Delete failed:', err.message);
    }
  };

  return (
    <>
      <EditSection
        isEdit={isEdit}
        setIsEdit={setIsEdit}
        itemId={line._id}
        itemList={sections
          .find((section) => section._id === sectionId)
          ?.lines || []}
        setItemList={(updatedLines) => {
          setSections((prev) =>
            prev.map((section) =>
              section._id === sectionId
                ? { ...section, lines: updatedLines }
                : section
            )
          );
        }}
        apiEndpoint={`/api/sections`} // Backend endpoint for lines
        title="Edit Line"
        nameField="lineName"
      />

      <div className="flex justify-between items-center py-2 border-b">
        <span className="px-6 py-4">{line.lineName}</span>
        <div className="px-6 py-4 flex gap-4">
          <button onClick={() => setIsEdit(true)} className="text-yellow-500">
            <Edit3 size={18} />
          </button>
          <button onClick={handleDelete} className="text-red-600">
            <Trash size={18} />
          </button>
        </div>
      </div>
    </>
  );
};

export default SectionItem;
