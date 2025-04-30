import axios from "axios";
import { X } from "lucide-react";
import { useState } from "react";

const base_url = import.meta.env.VITE_BASE_API_URL;

const AddSection = ({ isOpen, setIsOpen, fetchSections, lines = [] }) => {
  const [sectionName, setSectionName] = useState("");
  const [lineId, setLineId] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!sectionName || !lineId) return;

    try {
      await axios.post(
        `${base_url}/api/sections`,
        { sectionName, lineId },
        { withCredentials: true }
      );
      fetchSections();
      setSectionName("");
      setLineId("");
      setIsOpen(false);
    } catch (err) {
      console.error("Failed to add section:", err.message);
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
        className={`fixed top-0 right-0 h-screen w-[394px] bg-white z-50 transform transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        } overflow-y-auto shadow-lg`}
        role="dialog"
        aria-modal="true"
      >
        {/* Header */}
        <div className="flex justify-between items-center p-5 pb-4">
          <h1 className="text-xl font-semibold">Add New Section</h1>
          <button
            onClick={() => setIsOpen(false)}
            className="text-gray-500 hover:text-black"
          >
            <X />
          </button>
        </div>

        <hr />

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-5 space-y-5">
          {/* Section Name */}
          <div>
            <label
              htmlFor="sectionName"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Section Name
            </label>
            <input
              id="sectionName"
              type="text"
              name="section"
              placeholder="Please Enter Section Name"
              value={sectionName}
              onChange={(e) => setSectionName(e.target.value)}
              className="w-full h-10 px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-violet-500 outline-none transition-colors duration-200"
            />
          </div>

          {/* Select Line */}
          <div>
            <label
              htmlFor="lineSelect"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Select Line
            </label>
            <select
              id="lineSelect"
              value={lineId}
              onChange={(e) => setLineId(e.target.value)}
              className="w-full h-10 px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-violet-500 outline-none"
            >
              <option value="">-- Select a Line --</option>
              {lines.map((line) => (
                <option key={line._id} value={line._id}>
                  {line.lineName}
                </option>
              ))}
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

export default AddSection;
