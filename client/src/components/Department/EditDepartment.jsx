import axios from 'axios';
import { X } from 'lucide-react';
import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';

const base_url = import.meta.env.VITE_BASE_API_URL;

const EditDepartment = ({ isEdit, setIsEdit, itemId, departmentList, setDepartmentList }) => {
    const [input, setInput] = useState('');
    const [status, setStatus] = useState('Active');

    useEffect(() => {
        const currentDepartment = departmentList.find(dept => dept._id === itemId);
        if (currentDepartment) {
            setInput(currentDepartment.DepartmentName);
            setStatus(currentDepartment.status);
        }
    }, [itemId, departmentList]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const updatedName = input.trim().toUpperCase();

        if (!updatedName) {
            toast.error("Department name can't be empty");
            return;
        }

        const toastId = toast.loading("Updating department...");

        try {
            await axios.patch(`${base_url}/api/departments/${itemId}`, {
                departmentName: updatedName,
                status
            }, {
                withCredentials: true,
                headers: { 'Content-Type': 'application/json' }
            });

            const updatedList = departmentList.map(dept =>
                dept._id === itemId ? { ...dept, departmentName: updatedName, status } : dept
            );

            setDepartmentList(updatedList);
            setIsEdit(false);
            setInput('');
            toast.update(toastId, {
                render: "Department updated successfully!",
                type: "success",
                isLoading: false,
                autoClose: 2000
            });
        } catch (error) {
            console.error("Error updating department:", error);
            toast.update(toastId, {
                render: "Something went wrong. Please try again.",
                type: "error",
                isLoading: false,
                autoClose: 3000
            });
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
                    <h1 className="text-xl font-semibold">Edit Department</h1>
                    <button onClick={() => setIsEdit(false)} className="text-gray-500 hover:text-black">
                        <X />
                    </button>
                </div>

                <hr />

                {/* Form */}
                <form onSubmit={handleSubmit} className="p-4 space-y-4">
                    {/* Name */}
                    <div>
                        <label htmlFor="department" className="text-sm text-gray-600">Department Name</label>
                        <input
                            type="text"
                            name="department"
                            placeholder="Type here..."
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            className="w-full h-10 px-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                        />
                    </div>

                    {/* Status */}
                    <div>
                        <label htmlFor="ActiveOrInactive" className="text-sm text-gray-600">Select Status</label>
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

export default EditDepartment;
