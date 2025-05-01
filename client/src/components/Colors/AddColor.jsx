import axios from "axios";
import { X } from "lucide-react";
import { useState } from "react";

const base_url = import.meta.env.VITE_BASE_API_URL;

const AddColor = ({ isOpen, setIsOpen, fetchColor }) => {
  const [ColorName, setColorName] = useState("");
  const [status, setStatus] = useState("Active"); // Added state for status
  const [, setIsFocused] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!ColorName) return;

    try {
      // Send the color name and status in the request
      await axios.post(
        `${base_url}/api/colors`,
        { colorName: ColorName, status }, // Using proper naming for the payload
        { withCredentials: true }
      );
      fetchColor(); // Re-fetch colors after adding the new color
      setColorName(""); // Clear the color name input
      setStatus("Active"); // Reset the status to default
      setIsOpen(false); // Close the modal
    } catch (err) {
      console.error(err);
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
          <h1 className="text-xl font-semibold">Add New Color</h1>
          <button onClick={() => setIsOpen(false)} className="text-gray-500 hover:text-black">
            <X />
          </button>
        </div>

        <hr />

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-5 space-y-5">
          {/* Color Name Section */}
          <div>
            <label htmlFor="color" className="block text-sm font-medium text-gray-700 mb-1">
              Color Name
            </label>
            <input
              type="text"
              name="Color"
              placeholder="Please Enter Color name."
              value={ColorName}
              onChange={(e) => setColorName(e.target.value)}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              className="w-full h-10 px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-violet-500 outline-none transition-colors duration-200"
            />
          </div>

          {/* Status Section */}
          <div>
            <label htmlFor="ActiveOrInactive" className="block text-sm font-medium text-gray-700 mb-1">
              Select Status
            </label>
            <select
              name="ActiveOrInactive"
              id="ActiveOrInactive"
              value={status}
              onChange={(e) => setStatus(e.target.value)} // Update the status when selection changes
              className="w-full h-10 px-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-violet-500 outline-none transition-colors duration-200"
            >
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
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

export default AddColor;
