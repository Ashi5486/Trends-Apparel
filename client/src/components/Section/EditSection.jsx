import axios from 'axios';
import { X } from 'lucide-react';
import React, { useState, useEffect, useRef } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const EditSection = ({
  isEdit,
  setIsEdit,
  itemId,
  itemList,
  setItemList,
  apiEndpoint,               // Example: '/api/departments'
  title = "Edit Item",       // Modal title
  nameField = "name",        // The key to edit, e.g., "DepartmentName"
}) => {
  const [input, setInput] = useState('');
  const [status, setStatus] = useState('Active');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const inputRef = useRef();

  const base_url = import.meta.env.VITE_BASE_API_URL;

  useEffect(() => {
    const currentItem = itemList.find(item => item._id === itemId);
    if (currentItem) {
      setInput(currentItem[nameField] || '');
      setStatus(currentItem.status || 'Active');
    }
  }, [itemId, itemList, nameField]);

  useEffect(() => {
    if (isEdit && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isEdit]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const updatedName = input.trim().toUpperCase();
    if (!updatedName) {
      setError(`${nameField} can't be empty`);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      await axios.patch(`${base_url}${apiEndpoint}/${itemId}`, {
        [nameField]: updatedName,
        status
      }, {
        withCredentials: true,
        headers: { 'Content-Type': 'application/json' }
      });

      const updatedList = itemList.map(item =>
        item._id === itemId ? { ...item, [nameField]: updatedName, status } : item
      );

      setItemList(updatedList);
      setIsEdit(false);
      toast.success(`${title} updated successfully!`);
    } catch (err) {
      console.error(err);
      setError("Failed to update. Please try again.");
      toast.error("Update failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar />

      {isEdit && (
        <div
          onClick={() => setIsEdit(false)}
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
        />
      )}

      <div
        className={`fixed top-0 right-0 h-screen min-w-[350px] bg-white z-50 transform transition-transform duration-300 ease-in-out ${
          isEdit ? 'translate-x-0' : 'translate-x-full'
        } overflow-y-auto shadow-lg`}
        role="dialog"
        aria-modal="true"
        tabIndex={-1}
      >
        {/* Header */}
        <div className="flex justify-between items-center p-4">
          <h1 className="text-xl font-semibold">{title}</h1>
          <button onClick={() => setIsEdit(false)} className="text-gray-500 hover:text-black">
            <X />
          </button>
        </div>

        <hr />

        {/* Error Message */}
        {error && (
          <div className="py-2 px-4 mb-4 bg-red-200 text-red-800 rounded-md border border-red-500">
            {error}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-4 space-y-4">
          {/* Name */}
          <div>
            <label htmlFor="nameField" className="text-sm text-gray-600 capitalize">
              {nameField.replace(/([A-Z])/g, ' $1')}
            </label>
            <input
              ref={inputRef}
              type="text"
              name="nameField"
              placeholder="Type here..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="w-full h-10 px-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          {/* Status */}
          <div>
            <label htmlFor="status" className="text-sm text-gray-600">Select Status</label>
            <select
              id="status"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="w-full h-10 px-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="bg-violet-500 hover:bg-violet-600 text-white px-6 py-2 rounded-md font-medium disabled:opacity-50"
          >
            {loading ? "Saving..." : "Submit"}
          </button>
        </form>
      </div>
    </>
  );
};

export default EditSection;
