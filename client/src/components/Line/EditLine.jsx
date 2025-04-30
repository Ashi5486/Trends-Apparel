import axios from 'axios';
import { X } from 'lucide-react';
import React, { useEffect, useState } from 'react';

const base_url = import.meta.env.VITE_BASE_API_URL;

const EditLine = ({ isEdit, setIsEdit, itemId, lineList, setLineList }) => {
    const [input, setInput] = useState('');
    const [status, setStatus] = useState('Inactive'); // Default status set to "Inactive"
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);

    useEffect(() => {
        const currentLine = lineList.find(line => line._id === itemId);
        if (currentLine) {
            setInput(currentLine.lineName);
            setStatus(currentLine.status);
        }
    }, [itemId, lineList]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const updatedName = input.trim().toUpperCase();

        // Validate input
        if (!updatedName) {
            setError("Line name can't be empty");
            return;
        }

        try {
            // Send PATCH request to update line details
            await axios.patch(`${base_url}/api/lines/${itemId}`, {
                lineName: updatedName
            }, {
                withCredentials: true,
                headers: { 'Content-Type': 'application/json' }
            });

            // Update lineList state with the new line data
            const updatedList = lineList.map(line =>
                line._id === itemId ? { ...line, lineName: updatedName, status } : line
            );

            setLineList(updatedList);
            setIsEdit(false);
            setInput('');
            setError(null);
            setSuccess("Line updated successfully!");

            // Clear success message after a few seconds
            setTimeout(() => setSuccess(null), 3000);

        } catch (error) {
            console.error("Error updating line:", error);
            setError("Something went wrong. Please try again.");
            setTimeout(() => setError(null), 3000); // Clear error after 3 seconds
        }
    };

    return (
        <>
            {isEdit && (
                <div
                    onClick={() => setIsEdit(false)}
                    className="fixed inset-0 bg-black bg-opacity-50 z-40"
                />
            )}

            <div
                className={`fixed top-0 right-0 h-screen min-w-[350px] bg-white z-50 transform transition-transform duration-300 ease-in-out ${isEdit ? 'translate-x-0' : 'translate-x-full'} overflow-y-auto shadow-lg`}
                role="dialog"
                aria-modal="true"
            >
                <div className="flex justify-between items-center p-4">
                    <h1 className="text-xl font-semibold">Edit Line</h1>
                    <button onClick={() => setIsEdit(false)} className="text-gray-500 hover:text-black">
                        <X />
                    </button>
                </div>

                <hr />

                {/* Display error message */}
                {error && (
                    <div className="py-2 px-4 mb-4 bg-red-200 text-red-800 rounded-md border border-red-500">
                        {error}
                    </div>
                )}

                {/* Display success message */}
                {success && (
                    <div className="py-2 px-4 mb-4 bg-green-200 text-green-800 rounded-md border border-green-500">
                        {success}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="p-4 space-y-4">
                    <div>
                        <label htmlFor="lineName" className="text-sm text-gray-600">Line Name</label>
                        <input
                            type="text"
                            name="lineName"
                            placeholder="Type here..."
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            className="w-full h-10 px-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                        />
                    </div>

                    <button
                        type="submit"
                        className="bg-violet-500 hover:bg-violet-600 text-white px-6 py-2 rounded-md font-medium"
                    >
                        Submit
                    </button>
                </form>
            </div>
        </>
    );
};

export default EditLine;
