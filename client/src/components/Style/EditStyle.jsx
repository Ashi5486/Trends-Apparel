
import axios from 'axios';
import { X } from 'lucide-react';
import React, { useState, useEffect } from 'react';

const base_url = import.meta.env.VITE_BASE_API_URL;

const EditStyle = ({ isEdit, setIsEdit, itemId, styleList, setStylelist }) => {
    const [input, setInput] = useState('');
    const [status, setStatus] = useState('Active');
    const [error, setError] = useState(null);

    useEffect(() => {
        const currentStyle = styleList.find(dept => dept._id === itemId);
        if (currentStyle) {
            setInput(currentStyle.DepartmentName);
            setStatus(currentStyle.status);
        }
    }, [itemId, styleList]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const updatedName = input.trim().toUpperCase();

        // Basic validation for empty department name
        if (!updatedName) {
            setError("Styles name can't be empty");
            return;
        }

        try {
            await axios.patch(`${base_url}/api/styles/${itemId}`, {
                StyleName: updatedName,
                status
            }, {
                withCredentials: true,
                headers: { 'Content-Type': 'application/json' }
            });

            const updatedList = styleList.map(style =>
                style._id === itemId ? { ...style, StyleName: updatedName, status } : style
            );

            setStylelist(updatedList);
            setIsEdit(false);
            setInput('');
            setError(null);
            alert("Style updated successfully!");  // Toast notification (you can replace with any custom solution)
        } catch (error) {
            console.error("Error updating Style:", error);
            setError("Something went wrong. Please try again.");
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
                className={`fixed top-0 right-0 h-screen min-w-[350px] bg-white z-50 transform transition-transform duration-300 ease-in-out ${
                    isEdit ? 'translate-x-0' : 'translate-x-full'
                } overflow-y-auto shadow-lg`}
                role="dialog"
                aria-modal="true"
            >
                {/* Header */}
                <div className="flex justify-between items-center p-4">
                    <h1 className="text-xl font-semibold">Edit Style</h1>
                    <button onClick={() => setIsEdit(false)} className="text-gray-500 hover:text-black">
                        <X />
                    </button>
                </div>

                <hr />

                {/* Error Message */}
                {error && (
                    <div className="py-2 px-4 mb-4 bg-red-200 text-red-800 rounded-md border border-red-500">
                        {error}
                    </div>
                )}

                {/* Form */}
                <form onSubmit={handleSubmit} className="p-4 space-y-4">
                    {/* Name */}
                    <div>
                        <label htmlFor="department" className="text-sm text-gray-600">Department Name</label>
                        <input
                            type="text"
                            name="style"
                            placeholder="Type here..."
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            className="w-full h-10 px-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                        />
                    </div>

                    {/* Status */}
                    <div>
                        <label htmlFor="ActiveOrInactive" className="text-sm text-gray-600">Select Style</label>
                        <select
                            name="ActiveOrInactive"
                            id="ActiveOrInactive"
                            value={status}
                            onChange={(e) => setStatus(e.target.value)}
                            className="w-full h-10 px-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                        >
                            <option value="Active">Active</option>
                            <option value="Inactive">Inactive</option>
                        </select>
                    </div>

                    {/* Submit */}
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

export default EditStyle;
