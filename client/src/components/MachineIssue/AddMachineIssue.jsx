import React, { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { X } from "lucide-react";

const base_url = import.meta.env.VITE_BASE_API_URL;

const AddMachineIssue = ({ isOpen, setIsOpen, setMachineIssueList }) => {
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const issueName = e.target.issueName.value.trim();
    const issueCode = e.target.issueCode.value.trim();

    if (!issueName || !issueCode) {
      toast.error("Issue Name and Issue Code are required");
      return;
    }

    try {
      setLoading(true);
      const { data } = await axios.post(
        `${base_url}/api/machineissues`,
        { issueName, issueCode },
        { withCredentials: true }
      );

      setMachineIssueList((prev) => [
        ...prev,
        { issueName, issueCode, _id: data?.id },
      ]);

      toast.success("Machine issue added successfully!");
      setIsOpen(false); // Close the form after success
    } catch (error) {
      console.error("AddMachineIssue error:", error);
      toast.error("Failed to add machine issue");
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
          <h1 className="text-xl font-semibold">Add Machine Issue</h1>
          <button
            onClick={() => setIsOpen(false)}
            className="text-gray-500 hover:text-black"
          >
            <X />
          </button>
        </div>
        <hr />

        <form onSubmit={handleSubmit} className="p-5 space-y-5">
          <div>
            <label htmlFor="issueName" className="block text-sm font-medium text-gray-700 mb-1">
              Issue Name
            </label>
            <input
              type="text"
              name="issueName"
              id="issueName"
              placeholder="Enter Issue Name"
              className="w-full h-10 px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-violet-500 outline-none transition-colors duration-200"
              required
            />
          </div>

          <div>
            <label htmlFor="issueCode" className="block text-sm font-medium text-gray-700 mb-1">
              Issue Code
            </label>
            <input
              type="text"
              name="issueCode"
              id="issueCode"
              placeholder="Enter Issue Code"
              className="w-full h-10 px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-violet-500 outline-none transition-colors duration-200"
              required
            />
          </div>

          <div className="flex space-x-4 pt-2">
            <button
              type="submit"
              disabled={loading}
              className={`${loading ? "bg-violet-400" : "bg-violet-500 hover:bg-violet-600"} text-white px-6 py-2 rounded-md font-medium flex items-center justify-center`}
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

export default AddMachineIssue;
