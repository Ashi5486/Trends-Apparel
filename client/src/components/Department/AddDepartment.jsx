import axios from "axios";
import { X } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";

const base_url = import.meta.env.VITE_BASE_API_URL;

const AddDepartment = ({ isOpen, setIsOpen, setDepartmentList }) => {
  const [loading, setLoading] = useState(false);
  const [input, setInput] = useState(""); // Department input state

  const handleSubmit = async (e) => {
    e.preventDefault();

    const departmentName = e.target.department.value.trim();
    const status = e.target.ActiveOrInactive.value;

    // Check if department name is empty
    if (!departmentName) {
      toast.error("Department name is required");
      return;
    }

    try {
      setLoading(true);

      // Make the API request to add a new department
      const { data } = await axios.post(
        `${base_url}/api/departments`,
        { departmentName: input, status },
        { withCredentials: true }
      );

      // If successful, update the department list
      if (data && data.data) {
        setDepartmentList((prev) => [
          ...prev,
          { departmentName: departmentName.toUpperCase(), status, _id: data.data._id },
        ]);

        // Show success toast notification
        toast.success("Department added successfully!");
      } else {
        // If the response structure is unexpected, show an error toast
        toast.error("Unexpected response data.");
      }

      setIsOpen(false); // Close the modal after adding the department
    } catch (error) {
      console.error(error);
      toast.error("Failed to add department");
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
        className={`fixed top-0 right-0 h-screen w-[394px] bg-white z-50 transform transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        } overflow-y-auto shadow-lg`}
        role="dialog"
        aria-modal="true"
      >
        {/* Modal Header */}
        <div className="flex justify-between items-center p-5 pb-4">
          <h1 className="text-xl font-semibold">Add New Department</h1>
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
          <div>
            <label
              htmlFor="department"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Department Name
            </label>
            <input
              type="text"
              name="department"
              placeholder="Please enter department name"
              value={input} // Correctly bind the input value
              onChange={(e) => setInput(e.target.value)} // Update the input value on change
              className="w-full h-10 px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-violet-500 cursor-pointer outline-none transition-colors duration-200"
            />
          </div>

          <div>
            <label
              htmlFor="ActiveOrInactive"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Select Status
            </label>
            <select
              name="ActiveOrInactive"
              id="ActiveOrInactive"
              className="w-full h-10 px-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-violet-500 cursor-pointer outline-none transition-colors duration-200"
            >
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
          </div>

          <div className="flex space-x-4 pt-2">
            <button
              type="submit"
              disabled={loading}
              className={`${
                loading ? "bg-violet-400" : "bg-violet-500 hover:bg-violet-600"
              } text-white px-6 py-2 rounded-md font-medium flex items-center justify-center border-none`}
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

export default AddDepartment;
