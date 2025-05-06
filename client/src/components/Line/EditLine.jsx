import axios from 'axios';
import { X } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

const base_url = import.meta.env.VITE_BASE_API_URL;

const EditLine = ({ isEdit, setIsEdit, itemId, lineList, setLineList }) => {
  const [input, setInput] = useState('');
  const [status, setStatus] = useState('Inactive');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const currentLine = lineList.find(line => line._id === itemId);
    if (currentLine) {
      setInput(currentLine.lineName.toUpperCase());
      setStatus(currentLine.status);
    }
  }, [itemId, lineList]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const updatedName = input.trim().toUpperCase();
    if (!updatedName) {
      toast.error("Line name can't be empty");
      return;
    }

    const toastId = toast.loading("Updating line...");
    setLoading(true);

    try {
      await axios.patch(
        `${base_url}/api/lines/${itemId}`,
        { lineName: updatedName },  // No need to send userId now
        {
          withCredentials: true,
          headers: { 'Content-Type': 'application/json' },
        }
      );

      const updatedList = lineList.map(line =>
        line._id === itemId ? { ...line, lineName: updatedName, status } : line
      );

      setLineList(updatedList);
      toast.update(toastId, {
        render: "Line updated successfully!",
        type: "success",
        isLoading: false,
        autoClose: 2000,
      });

      setIsEdit(false);
    } catch (error) {
      console.error(error);
      toast.update(toastId, {
        render: "Something went wrong. Please try again.",
        type: "error",
        isLoading: false,
        autoClose: 3000,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {isEdit && (
        <div
          onClick={() => setIsEdit(false)}
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
        />
      )}

      <div
        className={`fixed top-0 right-0 h-screen min-w-[350px] bg-white z-50 transform transition-transform duration-300 ease-in-out ${isEdit ? 'translate-x-0' : 'translate-x-full'} overflow-y-auto shadow-lg`}
        role="dialog"
        aria-modal="true"
      >
        <div className="flex justify-between items-center p-4">
          <h1 className="text-xl font-semibold">Edit Line</h1>
          <button onClick={() => setIsEdit(false)} className="text-gray-500 hover:text-black">
            <X />
          </button>
        </div>

        <hr />

        <form onSubmit={handleSubmit} className="p-4 space-y-4">
          <div>
            <label htmlFor="lineName" className="text-sm text-gray-600">
              Line Name
            </label>
            <input
              type="text"
              name="lineName"
              placeholder="TYPE HERE..."
              value={input}
              onChange={(e) => setInput(e.target.value.toUpperCase())}
              className="w-full h-10 px-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-violet-500 uppercase"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`${loading ? 'bg-violet-400' : 'bg-violet-500 hover:bg-violet-600'} text-white px-6 py-2 rounded-md font-medium`}
          >
            {loading ? 'Updating...' : 'Submit'}
          </button>
        </form>
      </div>
    </>
  );
};

export default EditLine;
