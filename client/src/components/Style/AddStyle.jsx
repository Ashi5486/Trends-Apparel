import axios from "axios";
import { X } from "lucide-react";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";

const base_url = import.meta.env.VITE_BASE_API_URL;

const AddStyle = ({ isOpen, setIsOpen, input, setInput, setStyleList }) => {
    const [loading, setLoading] = useState(false);
    const [selectedTidno, setSelectedTidno] = useState(""); // State for selected Tidno
    const [tidnoOptions, setTidnoOptions] = useState([]); // State to hold Tidno options

    useEffect(() => {
        const fetchTidnos = async () => {
            try {
                const { data } = await axios.get(`${base_url}/api/tidnos`, { withCredentials: true });
                
                if (Array.isArray(data)) {
                    setTidnoOptions(data); 
                } else {
                    throw new Error("Invalid response from the API");
                }
            } catch (error) {
                console.error("Failed to fetch Tidnos:", error);
                toast.error("Failed to fetch Tidnos");
            }
        };

        fetchTidnos();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const styleName = e.target.style.value.trim();
        const status = e.target.ActiveOrInactive.value;

        if (!styleName) {
            toast.error("Style name is required");
            return;
        }

        if (!selectedTidno) {
            toast.error("Tidno is required");
            return;
        }

        try {
            setLoading(true);
            const { data } = await axios.post(
                `${base_url}/api/styles`,
                { StyleName: styleName, status, Tidno: selectedTidno },
                { withCredentials: true }
            );

            // Add new style to the style list
            setStyleList((prev) => [
                ...prev,
                { StyleName: styleName.toUpperCase(), status, _id: data._id, Tidno: selectedTidno },
            ]);

            toast.success("Style added successfully!");

            setIsOpen(false); // Close the modal
        } catch (error) {
            console.error(error);
            toast.error("Failed to add style");
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
                {/* Header */}
                <div className="flex justify-between items-center p-5 pb-4">
                    <h1 className="text-xl font-semibold">Add New Style</h1>
                    <button onClick={() => setIsOpen(false)} className="text-gray-500 hover:text-black">
                        <X />
                    </button>
                </div>

                <hr />

                {/* Form */}
                <form onSubmit={handleSubmit} className="p-5 space-y-5">
                    <div>
                        <label htmlFor="style" className="block text-sm font-medium text-gray-700 mb-1">
                            Style Name
                        </label>
                        <input
                            type="text"
                            name="style"
                            placeholder="Please Enter Style name"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            className="w-full h-10 px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-violet-500 outline-none transition-colors duration-200"
                        />
                    </div>

                    {/* Tidno Select */}
                    <div>
                        <label htmlFor="tidno" className="block text-sm font-medium text-gray-700 mb-1">
                            Select Tidno
                        </label>
                        <select
                            name="tidno"
                            id="tidno"
                            value={selectedTidno}
                            onChange={(e) => setSelectedTidno(e.target.value)}
                            className="w-full h-10 px-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-violet-500 outline-none transition-colors duration-200"
                        >
                            <option value="">Please Select TID NO.</option>
                            {Array.isArray(tidnoOptions) &&
                                tidnoOptions.map((tidno) => (
                                    <option key={tidno._id} value={tidno._id}>
                                        {tidno.name}
                                    </option>
                                ))}
                        </select>
                    </div>

                    {/* Status Select */}
                    <div>
                        <label htmlFor="ActiveOrInactive" className="block text-sm font-medium text-gray-700 mb-1">
                            Select Status
                        </label>
                        <select
                            name="ActiveOrInactive"
                            id="ActiveOrInactive"
                            className="w-full h-10 px-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-violet-500 outline-none transition-colors duration-200"
                        >
                            <option value="Active">Active</option>
                            <option value="Inactive">Inactive</option>
                        </select>
                    </div>

                    {/* Submit and Cancel Buttons */}
                    <div className="flex space-x-4 pt-2">
                        <button
                            type="submit"
                            disabled={loading}
                            className={`${
                                loading ? "bg-violet-400" : "bg-violet-500 hover:bg-violet-600"
                            } text-white px-6 py-2 rounded-md font-medium flex items-center justify-center`}
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

export default AddStyle;
