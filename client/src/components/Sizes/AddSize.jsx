import axios from "axios";
import { X } from "lucide-react";
import { useState } from "react";

const base_url = import.meta.env.VITE_BASE_API_URL;

const AddSize = ({ isOpen, setIsOpen, fetchSize }) => {
  const [sizeName, setSizeName] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!sizeName) return;

    try {
      await axios.post(
        `${base_url}/api/sizes`,
        { sizeName },  // Only send sizeName to the backend
        { withCredentials: true }  // Send the credentials (cookies or session) if needed
      );
      fetchSize();  // Fetch the updated list of sizes
      setSizeName("");  // Reset the form field after submitting
      setIsOpen(false);  // Close the modal
    } catch (err) {
      console.error("Failed to add size:", err.message);  // Log error to console if something goes wrong
    }
  };

  return (
    <>
      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
        />
      )}

      <div
        className={`fixed top-0 right-0 h-screen w-[394px] bg-white z-50 transform transition-transform duration-300 ease-in-out
        ${isOpen ? "translate-x-0" : "translate-x-full"} overflow-y-auto shadow-lg`}
        role="dialog"
        aria-modal="true"
      >
        {/* Header */}
        <div className="flex justify-between items-center p-5 pb-4">
          <h1 className="text-xl font-semibold">Add New Size</h1>
          <button onClick={() => setIsOpen(false)} className="text-gray-500 hover:text-black">
            <X />
          </button>
        </div>

        <hr />

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-5 space-y-5">
          {/* Size Name */}
          <div>
            <label htmlFor="size" className="block text-sm font-medium text-gray-700 mb-1">
              Size Name / Code
            </label>
            <input
              type="text"
              name="size"
              placeholder="Please enter size name."
              value={sizeName}
              onChange={(e) => setSizeName(e.target.value)}
              className="w-full h-10 px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-violet-500 outline-none transition-colors duration-200"
            />
          </div>

          {/* Buttons */}
          <div className="flex space-x-4 pt-2">
            <button
              type="submit"
              className="bg-violet-500 hover:bg-violet-600 text-white px-6 py-2 rounded-md font-medium"
            >
              Submit
            </button>
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="bg-gray-200 hover:bg-gray-300 text-violet-600 px-6 py-2 rounded-md font-medium border-shadow-sm"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default AddSize;
