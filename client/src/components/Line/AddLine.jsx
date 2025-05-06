import axios from "axios";
import { X } from "lucide-react";
import { useState } from "react";
import { toast } from "react-toastify";

const base_url = import.meta.env.VITE_BASE_API_URL;

const AddLine = ({ isOpen, setIsOpen, setLineList }) => {
  const [lineName, setLineName] = useState('');
  const [loading, setLoading] = useState(false);

const handleSubmit = async (e) => {
  e.preventDefault();

  const trimmedName = lineName.trim();
  if (!trimmedName) {
    toast.error("Line name is required");
    return;
  }

  const toastId = toast.loading("Adding line...");

  try {
    setLoading(true);

    // Assuming you have userId from the authentication system
    const userId = 'someUserId'; // Replace with actual userId

    const { data } = await axios.post(
      `${base_url}/api/lines`, 
      { lineName: trimmedName, userId }, // Send userId here
      { withCredentials: true }
    );

    setLineList((prev) => [
      ...prev,
      { lineName: trimmedName, _id: data?.data?._id }, // Update line item based on returned data
    ]);

    toast.update(toastId, {
      render: "Line added successfully!",
      type: "success",
      isLoading: false,
      autoClose: 2000,
    });

    setIsOpen(false);
    setLineName('');
  } catch (error) {
    console.error(error);
    toast.update(toastId, {
      render: "Failed to add line.",
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
      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
        />
      )}

      <div
        className={`fixed top-0 right-0 h-screen w-[394px] bg-white z-50 transform transition-transform duration-300 ease-in-out ${isOpen ? "translate-x-0" : "translate-x-full"} overflow-y-auto shadow-lg`}
        role="dialog"
        aria-modal="true"
      >
        <div className="flex justify-between items-center p-5 pb-4">
          <h1 className="text-xl font-semibold">Add New Line</h1>
          <button onClick={() => setIsOpen(false)} className="text-gray-500 hover:text-black">
            <X />
          </button>
        </div>

        <hr />

        <form onSubmit={handleSubmit} className="p-5 space-y-5">
          <div>
            <label htmlFor="lineName" className="block text-sm font-medium text-gray-700 mb-1">
              Line Name
            </label>
            <input
              type="text"
              id="lineName"
              name="lineName"
              value={lineName}
              onChange={(e) => setLineName(e.target.value)}
              placeholder="Enter line name"
              className="w-full h-10 px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-violet-500 outline-none"
              required
            />
          </div>

          <div className="flex space-x-4 pt-2">
            <button
              type="submit"
              disabled={loading}
              className={`${loading ? "bg-violet-400" : "bg-violet-500 hover:bg-violet-600"} text-white px-6 py-2 rounded-md font-medium`}
            >
              {loading ? "Submitting..." : "Submit"}
            </button>
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="bg-red-100 hover:bg-red-200 text-red-600 px-6 py-2 rounded-md font-medium"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default AddLine;
