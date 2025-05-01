import axios from 'axios';
import { X } from 'lucide-react';
import React, { useState, useEffect } from 'react';

const base_url = import.meta.env.VITE_BASE_API_URL;

const EditColor = ({ isEdit, setIsEdit, itemId, ColorList, setColorList }) => {
    const [input, setInput] = useState('');
    const [status, setStatus] = useState('Active');
    const [error, setError] = useState(null);

    useEffect(() => {
        const currentColor = ColorList.find(Color => Color._id === itemId);
        if (currentColor) {
            setInput(currentColor.ColorName); 
            setStatus(currentColor.status);
        }
    }, [itemId, ColorList]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const updatedName = input.trim().toUpperCase();

        if (!updatedName) {
            setError("Color name can't be empty");
            return;
        }

        try {
            await axios.patch(`${base_url}/api/colors/${itemId}`, {
                ColorName: updatedName,
                status
            }, {
                withCredentials: true,
                headers: { 'Content-Type': 'application/json' }
            });

            const updatedList = ColorList.map(color =>
                color._id === itemId ? { ...color, colorName: updatedName, status } : color
            );

            setColorList(updatedList);
            setIsEdit(false);
            setInput('');
            setError(null);
            alert("Color updated successfully!");
        } catch (error) {
            console.error("Error updating Color:", error);
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
                <div className="flex justify-between items-center p-4">
                    <h1 className="text-xl font-semibold">Edit Tidno</h1>
                    <button onClick={() => setIsEdit(false)} className="text-gray-500 hover:text-black">
                        <X />
                    </button>
                </div>

                <hr />

                {error && (
                    <div className="py-2 px-4 mb-4 bg-red-200 text-red-800 rounded-md border border-red-500">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="p-4 space-y-4">
                    <div>
                        <label htmlFor="tidno" className="text-sm text-gray-600">Tidno Name</label>
                        <input
                            type="text"
                            name="color"
                            placeholder="Type here..."
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            className="w-full h-10 px-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                        />
                    </div>

                    <div>
                        <label htmlFor="status" className="text-sm text-gray-600">Select Status</label>
                        <select
                            name="status"
                            id="status"
                            value={status}
                            onChange={(e) => setStatus(e.target.value)}
                            className="w-full h-10 px-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                        >
                            <option value="Active">Active</option>
                            <option value="Inactive">Inactive</option>
                        </select>
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

export default EditColor;
