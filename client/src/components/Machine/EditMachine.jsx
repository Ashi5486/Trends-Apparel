import { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";

const base_url = import.meta.env.VITE_BASE_API_URL;

const EditMachine = ({ isEdit, setIsEdit, itemId, machineList, setMachineList }) => {
  const [machineData, setMachineData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch machine data when in edit mode
  useEffect(() => {
    const fetchMachineData = async () => {
      setLoading(true);
      try {
        const { data } = await axios.get(`${base_url}/api/machines/${itemId}`);
        setMachineData(data);
      } catch (error) {
        console.error("Error fetching machine data:", error);
        setError("Failed to fetch machine data.");
      } finally {
        setLoading(false);
      }
    };

    if (isEdit && itemId) {
      fetchMachineData();
    }
  }, [isEdit, itemId]);

  // Save edited machine data
  const handleSave = async (e) => {
    e.preventDefault();

    if (!machineData.MachineName || !machineData.status) {
      toast.error("Please fill in all fields.");
      return;
    }

    setLoading(true);
    try {
      const { data } = await axios.put(
        `${base_url}/api/machines/${itemId}`,
        {
          MachineName: machineData.MachineName,
          status: machineData.status,
        },
        { withCredentials: true }
      );

      // Update machine list with the modified machine data
      const updatedList = machineList.map((machine) =>
        machine._id === itemId ? data : machine
      );
      setMachineList(updatedList);

      toast.success("Machine updated successfully!");
      setIsEdit(false); // Close the edit modal
    } catch (error) {
      console.error("Error updating machine:", error);
      setError("Failed to update machine.");
      toast.error("Failed to update machine.");
    } finally {
      setLoading(false);
    }
  };

  // Handle form changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setMachineData((prevData) => ({ ...prevData, [name]: value }));
  };

  // Handle machine deletion
  const handleDelete = async () => {
    if (loading) return;

    setLoading(true);
    try {
      await axios.delete(`${base_url}/api/machines/${itemId}`, { withCredentials: true });

      // Remove the deleted machine from the list
      const updatedList = machineList.filter((machine) => machine._id !== itemId);
      setMachineList(updatedList);

      toast.success("Machine deleted successfully!");
      setIsEdit(false); // Close the edit modal
    } catch (error) {
      console.error("Error deleting machine:", error);
      setError("Failed to delete machine.");
      toast.error("Failed to delete machine.");
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div>Loading...</div>;

  if (!machineData) return null;

  return (
    <div className="modal">
      <h2>Edit Machine</h2>
      {error && (
        <div className="py-2 px-4 mb-4 bg-red-200 text-red-800 rounded-md border border-red-500">
          {error}
        </div>
      )}
      <form onSubmit={handleSave}>
        <div>
          <label>Machine Name</label>
          <input
            type="text"
            name="MachineName"
            placeholder="Please Enter Machine Name"
            value={machineData.MachineName}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Status</label>
          <select
            name="status"
            value={machineData.status}
            onChange={handleChange}
            required
          >
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>
        </div>
        <button type="submit" disabled={loading}>
          {loading ? "Saving..." : "Save Changes"}
        </button>
        <button type="button" onClick={() => setIsEdit(false)}>
          Cancel
        </button>
      </form>

      {/* Delete button */}
      <button
        type="button"
        onClick={handleDelete}
        className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md mt-4"
        disabled={loading}
      >
        {loading ? "Deleting..." : "Delete Machine"}
      </button>
    </div>
  );
};

export default EditMachine;
