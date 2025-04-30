import { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";

const base_url = import.meta.env.VITE_BASE_API_URL;

const EditMachineIssue = ({ isEdit, setIsEdit, itemId, machineIssueList, setMachineIssueList }) => {
  const [formData, setFormData] = useState({
    issueName: "",
    issueCode: "",
    status: "Active",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchIssue = async () => {
      setLoading(true);
      try {
        const { data } = await axios.get(`${base_url}/api/machineissues/${itemId}`, {
          withCredentials: true,
        });
        setFormData(data);
        setError(null);
      } catch (err) {
        console.error("Error fetching machine issue:", err);
        toast.error("Failed to fetch issue data.");
        setError("Could not fetch machine issue data.");
        setIsEdit(false);
      } finally {
        setLoading(false);
      }
    };

    if (isEdit && itemId) {
      fetchIssue();
    }
  }, [isEdit, itemId,setIsEdit]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async (e) => {
    e.preventDefault();

    if (!formData.issueName || !formData.issueCode) {
      toast.error("Please fill in all fields.");
      return;
    }

    setLoading(true);
    try {
      const { data } = await axios.put(`${base_url}/api/machineissues/${itemId}`, formData, {
        withCredentials: true,
      });

      const updatedList = machineIssueList.map((issue) =>
        issue._id === itemId ? data : issue
      );
      setMachineIssueList(updatedList);

      toast.success("Machine Issue updated successfully.");
      setIsEdit(false);
    } catch (err) {
      console.error("Error updating machine issue:", err);
      toast.error("Failed to update issue.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (loading) return;

    setLoading(true);
    try {
      await axios.delete(`${base_url}/api/machineissues/${itemId}`, {
        withCredentials: true,
      });

      const updatedList = machineIssueList.filter((issue) => issue._id !== itemId);
      setMachineIssueList(updatedList);

      toast.success("Machine Issue deleted successfully.");
      setIsEdit(false);
    } catch (err) {
      console.error("Error deleting machine issue:", err);
      toast.error("Failed to delete issue.");
    } finally {
      setLoading(false);
    }
  };

  if (!isEdit) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-md w-full max-w-md shadow-lg">
        <h2 className="text-lg font-semibold mb-4">Edit Machine Issue</h2>

        {error && (
          <div className="bg-red-100 text-red-800 p-2 rounded mb-4 border border-red-400">
            {error}
          </div>
        )}

        <form onSubmit={handleSave} className="space-y-4">
          <div>
            <label className="block text-sm font-medium">Issue Name</label>
            <input
              type="text"
              name="issueName"
              value={formData.issueName}
              onChange={handleChange}
              className="mt-1 block w-full border rounded-md p-2"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium">Issue Code</label>
            <input
              type="text"
              name="issueCode"
              value={formData.issueCode}
              onChange={handleChange}
              className="mt-1 block w-full border rounded-md p-2"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium">Status</label>
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="mt-1 block w-full border rounded-md p-2"
              required
            >
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
          </div>

          <div className="flex justify-end gap-2 pt-4">
            <button
              type="button"
              onClick={() => setIsEdit(false)}
              className="bg-gray-300 text-black px-4 py-2 rounded-md"
              disabled={loading}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-violet-600 text-white px-4 py-2 rounded-md"
              disabled={loading}
            >
              {loading ? "Saving..." : "Save"}
            </button>
          </div>
        </form>

        <button
          type="button"
          onClick={handleDelete}
          className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded mt-4 w-full"
          disabled={loading}
        >
          {loading ? "Deleting..." : "Delete Machine Issue"}
        </button>
      </div>
    </div>
  );
};

export default EditMachineIssue;
