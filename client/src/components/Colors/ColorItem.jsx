

import React, { useState } from 'react';
import axios from 'axios';
import { Edit3, Trash } from 'lucide-react';

const ColorItem = ({ line, ColorId, Color,setColor }) => {
  const [isEdit, setIsEdit] = useState(false);

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this line?")) return;

    try {
      await axios.delete(`http://localhost:5000/api/tidnos/${Color._id}`);
      setColor((prevColor) =>
        prevColor
          .map((Color) =>
            Color._id === ColorId
              ? {
                  ...Color,
                  lines: Color.lines.filter((l) => l._id !== line._id),
                }
              : Color
          )
          .filter((Color) => Color.lines.length > 0)
      );
    } catch (err) {
      console.error('Delete failed:', err.message);
    }
  };

  return (
    <>
      <EditColor
        isEdit={isEdit}
        setIsEdit={setIsEdit}
        itemId={line._id}
        Color={Color}
        setColor={setColor}
        ColorId={ColorId}
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

export default ColorItem;