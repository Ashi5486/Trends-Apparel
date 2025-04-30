// import axios from "axios";
// import { X } from "lucide-react";
// import { useState } from "react";
// import toast from "react-hot-toast";

// const base_url = import.meta.env.VITE_BASE_API_URL;

// const AddDepartment = ({ isOpen, setIsOpen, input, setInput, setDepartmentList }) => {
//     const [loading, setLoading] = useState(false);

//     const handleSubmit = async (e) => {
//         e.preventDefault();

//         const departmentName = e.target.department.value.trim();
//         const status = e.target.ActiveOrInactive.value;

//         if (!departmentName) {
//             toast.error("Department name is required");
//             return;
//         }

//         try {
//             setLoading(true);
//             const { data } = await axios.post(
//                 `${base_url}/api/departments`,
//                 { DepartmentName: departmentName, status },
//                 { withCredentials: true }
//             );

//             // Add new department to the department list without clearing the search input
//             setDepartmentList((prev) => [
//                 ...prev,
//                 { DepartmentName: departmentName.toUpperCase(), status, _id: data?.id },
//             ]);

//             toast.success("Department added successfully!");

//             setIsOpen(false); // Close the modal
//         } catch (error) {
//             console.error(error);
//             toast.error("Failed to add department");
//         } finally {
//             setLoading(false);
//         }
//     };

// return (
//     <>
//         {isOpen && (
//             <div
//                 onClick={() => setIsOpen(false)}
//                 className="fixed inset-0 bg-black bg-opacity-50 z-40"
//             />
//         )}

//         <div
//             className={`fixed top-0 right-0 h-screen w-[394px] bg-white z-50 transform transition-transform duration-300 ease-in-out ${
//                 isOpen ? "translate-x-0" : "translate-x-full"
//             } overflow-y-auto shadow-lg`}
//             role="dialog"
//             aria-modal="true"
//         >
//             {/* Header */}
//             <div className="flex justify-between items-center p-5 pb-4">
//                 <h1 className="text-xl font-semibold">Add New Department</h1>
//                 <button onClick={() => setIsOpen(false)} className="text-gray-500 hover:text-black">
//                     <X />
//                 </button>
//             </div>

//             <hr />

//             {/* Form */}
//             <form onSubmit={handleSubmit} className="p-5 space-y-5">
//                 <div>
//                     <label htmlFor="department" className="block text-sm font-medium text-gray-700 mb-1">
//                         Department Name
//                     </label>
//                     <input
//                         type="text"
//                         name="department"
//                         placeholder="Please enter department name"
//                         value={input} // Correctly bind the input value
//                         onChange={(e) => setInput(e.target.value)} // Update the input value on change
//                         className="w-full h-10 px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-violet-500 cursor-pointer outline-none transition-colors duration-200"
//                     />
//                 </div>

//                 <div>
//                     <label htmlFor="ActiveOrInactive" className="block text-sm font-medium text-gray-700 mb-1">
//                         Select Status
//                     </label>
//                     <select
//                         name="ActiveOrInactive"
//                         id="ActiveOrInactive"
//                         className="w-full h-10 px-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-violet-500 cursor-pointer outline-none transition-colors duration-200"
//                     >
//                         <option value="Active">Active</option>
//                         <option value="Inactive">Inactive</option>
//                     </select>
//                 </div>

//                 <div className="flex space-x-4 pt-2">
//                     <button
//                         type="submit"
//                         disabled={loading}
//                         className={`${
//                             loading ? "bg-violet-400" : "bg-violet-500 hover:bg-violet-600"
//                         } text-white px-6 py-2 rounded-md font-medium flex items-center justify-center border-none`}
//                     >
//                         {loading ? "Submitting..." : "Submit"}
//                     </button>
//                     <button
//                         type="button"
//                         onClick={() => setIsOpen(false)}
//                         className="bg-red-100 hover:bg-red-200 text-red-600 px-6 py-2 rounded-md font-medium"
//                     >
//                         Cancel
//                     </button>
//                 </div>
//             </form>
//         </div>
//     </>
// );
// };

// export default AddDepartment;
import axios from "axios";
import { X } from "lucide-react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const base_url = import.meta.env.VITE_BASE_API_URL;

const AddOperation = ({ isOpen, setIsOpen, setOperationList, editItem }) => {
    const [form, setForm] = useState({
        operationName: "",
        rate: "",
        unitType: "Minutes",
        status: "Active"
    });

    const [loading, setLoading] = useState(false);
    const isEditMode = !!editItem;

    useEffect(() => {
        if (editItem) {
            setForm({
                operationName: editItem.operationName,
                rate: editItem.rate,
                unitType: editItem.unitType,
                status: editItem.status
            });
        } else {
            setForm({
                operationName: "",
                rate: "",
                unitType: "Minutes",
                status: "Active"
            });
        }
    }, [editItem]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!form.operationName.trim() || !form.rate.trim()) {
            toast.error("Please fill in all fields");
            return;
        }

        try {
            setLoading(true);
            if (isEditMode) {
                const { data } = await axios.put(
                    `${base_url}/api/operations/${editItem._id}`,
                    form,
                    { withCredentials: true }
                );

                setOperationList(prev =>
                    prev.map(op => (op._id === editItem._id ? data : op))
                );
                toast.success("Operation updated successfully!");
            } else {
                const { data } = await axios.post(
                    `${base_url}/api/operations`,
                    form,
                    { withCredentials: true }
                );

                setOperationList(prev => [...prev, data]);
                toast.success("Operation added successfully!");
            }

            setIsOpen(false);
        } catch (error) {
            console.error(error);
            toast.error(isEditMode ? "Failed to update" : "Failed to add");
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            {isOpen && (
                <div
                    onClick={() => setIsOpen(false)}
                    className="fixed inset-0 bg-black bg-opacity-40 z-40"
                />
            )}
            <div
                className={`fixed top-0 right-0 h-screen w-[400px] bg-white z-50 transform transition-transform duration-300 ease-in-out ${isOpen ? "translate-x-0" : "translate-x-full"
                    } overflow-y-auto shadow-lg`}
            >
                {/* Header */}
                <div className="flex justify-between items-center p-5 pb-4">
                    <h1 className="text-xl font-semibold">{isEditMode ? "Edit Operation" : "Add Operation"}</h1>
                    <button onClick={() => setIsOpen(false)} className="text-gray-500 hover:text-black">
                        <X />
                    </button>
                </div>

                <hr />

                {/* Form */}
                <form onSubmit={handleSubmit} className="p-5 space-y-5">
                    <div>
                        <label htmlFor="operationName" className="block text-sm font-medium text-gray-700 mb-1">
                            Operation Name
                        </label>
                        <input
                            type="text"
                            name="operationName"
                            value={form.operationName}
                            onChange={handleChange}
                            placeholder="Please Enter operation name"
                            className="w-full h-10 px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-violet-500 outline-none"
                        />
                    </div>
                    <div>
                        <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                            Description
                        </label>
                        <input
                            type="text"
                            name="description"
                            value={form.description}
                            onChange={handleChange}
                            placeholder=" Please Enter operation description"
                            className="w-full h-10 px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-violet-500 outline-none"
                        />
                    </div>
                    <div>
                        <label htmlFor="rate" className="block text-sm font-medium text-gray-700 mb-1">
                            Rate
                        </label>
                        <input
                            type="text"
                            name="rate"
                            value={form.rate}
                            onChange={handleChange}
                            placeholder="Please Enter rate"
                            className="w-full h-10 px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-violet-500 outline-none"
                        />
                    </div>

                    <div>
                        <label htmlFor="unitType" className="block text-sm font-medium text-gray-700 mb-1">
                            Unit Type
                        </label>
                        <select
                            name="unitType"
                            value={form.unitType}
                            onChange={handleChange}
                            className="w-full h-10 px-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-violet-500 outline-none"
                        >
                            {/* <option value="Minutes">Minutes</option>
              <option value="Pieces">Pieces</option> */}
                        </select>

                    </div>
                    <div>
                        <label htmlFor="department" className="block text-sm font-medium text-gray-700 mb-1">
                            Department
                        </label>
                        <select
                            name="Department"
                            value={form.department}
                            onChange={handleChange}
                            className="w-full h-10 px-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-violet-500 outline-none"
                        >
                        </select>
                    </div>
                    <div>
                        <label htmlFor="garment" className="block text-sm font-medium text-gray-700 mb-1">
                            Garment
                        </label>
                        <select
                            name="Garment"
                            value={form.garment}
                            onChange={handleChange}
                            className="w-full h-10 px-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-violet-500 outline-none"
                        >
                        </select>
                    </div>
                    <div>
                        <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                    SAM(Standard Allowed Minutes)
                        </label>
                        <input
                            type="text"
                            name="description"
                            value={form.description}
                            onChange={handleChange}
                            placeholder=" Please Enter SAM Value"
                            className="w-full h-10 px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-violet-500 outline-none"
                        />
                    </div>
                    <div>
                        <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                    TGT per Hour (calculated)
                        </label>
                        <input
                            type="text"
                            name="description"
                            value={form.description}
                            onChange={handleChange}
                            placeholder=" "
                            className="w-full h-10 px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-violet-500 outline-none"
                        />
                    </div>
                    <div>
                        <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                        TGT per Day (calculated)
                        </label>
                        <input
                            type="text"
                            name="description"
                            value={form.description}
                            onChange={handleChange}
                            placeholder=" "
                            className="w-full h-10 px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-violet-500 outline-none"
                        />
                    </div>


                    <div>
                        <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-1">
                            Status
                        </label>
                        <select
                            name="status"
                            value={form.status}
                            onChange={handleChange}
                            className="w-full h-10 px-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-violet-500 outline-none"
                        >
                            <option value="Active">Active</option>
                            <option value="Inactive">Inactive</option>
                        </select>
                    </div>

                    <div className="flex space-x-4 pt-2">
                        <button
                            type="submit"
                            disabled={loading}
                            className={`${loading ? "bg-violet-400" : "bg-violet-500 hover:bg-violet-600"
                                } text-white px-6 py-2 rounded-md font-medium`}
                        >
                            {loading ? "Submitting..." : isEditMode ? "Update" : "Submit"}
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

export default AddOperation;
