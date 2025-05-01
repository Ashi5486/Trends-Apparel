import React, { useEffect, useState } from 'react';
import axios from 'axios';
import AddTidno from './AddTidno';
import { Trash, Edit3 } from "lucide-react";
import { FaPlus, FaUpload, FaDownload } from 'react-icons/fa';
import { toast } from 'react-toastify';

const base_url = import.meta.env.VITE_BASE_API_URL;

const TidnoList = () => {
  const [tidnos, setTidnos] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [editTidno, setEditTidno] = useState(null);
  const [entriesPerPage, setEntriesPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(true);

  const fetchTidno = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${base_url}/api/tidnos`, { withCredentials: true });
      const data = Array.isArray(res.data.data) ? res.data.data : [];
      setTidnos(data);
    } catch (err) {
      console.error('Failed to fetch TID NO.:', err.message);
      toast.error('Failed to fetch TID NO.');
      setTidnos([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTidno();
  }, []);

  const filteredTidnos = tidnos.filter((t) =>
    t.TidnoName.toLowerCase().includes(input.toLowerCase())
  );

  const isAll = entriesPerPage === 'all';
  const itemsPerPage = isAll ? filteredTidnos.length : parseInt(entriesPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentTidno = filteredTidnos.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = isAll ? 1 : Math.ceil(filteredTidnos.length / itemsPerPage);

  const handlePageChange = (page) => setCurrentPage(page);
  const handleAddTidno = () => {
    setEditTidno(null);
    setIsOpen(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this TID NO.?")) return;

    try {
      await axios.delete(`${base_url}/api/tidnos/${id}`);
      setTidnos((prev) => prev.filter((t) => t._id !== id));
      toast.success("TID NO. deleted successfully");
    } catch (error) {
      console.error("Failed to delete TID NO.:", error.message);
      toast.error("Failed to delete TID NO.");
    }
  };

  if (loading) {
    return <div className="p-4 text-center text-gray-600">Loading...</div>;
  }

  return (
    <div className="flex flex-col gap-6 mt-2 bg-white rounded-lg">
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-2xl p-2 font-semibold text-gray-600">TID NO. List</h2>
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 gap-4 px-4">
        <div className="flex flex-wrap items-center gap-2">
          <label className="text-lg text-gray-600">Show</label>
          <select
            className="border border-gray-300 rounded px-2 py-1 text-lg focus:ring-2 focus:ring-violet-500 cursor-pointer"
            value={entriesPerPage}
            onChange={(e) =>
              setEntriesPerPage(e.target.value === 'all' ? 'all' : parseInt(e.target.value))
            }
          >
            <option value="10">10</option>
            <option value="25">25</option>
            <option value="50">50</option>
            <option value="100">100</option>
            <option value="all">All</option>
          </select>

          <input
            type="text"
            placeholder="Search TID NO."
            className="border border-gray-300 focus:outline-none focus:ring-2 focus:ring-violet-500 rounded-md px-3 py-2 text-sm w-60"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
        </div>

        <div className="flex flex-wrap gap-2 justify-end">
          <button
            className="bg-violet-500 hover:bg-violet-600 text-white px-4 py-2 rounded-md text-sm"
            onClick={handleAddTidno}
          >
            <FaPlus className="inline mr-1" /> Add New TID NO.
          </button>
          <button className="bg-violet-500 hover:bg-violet-600 text-white px-4 py-2 rounded-md text-sm">
            <FaUpload className="inline mr-1" /> Import Data
          </button>
          <button className="bg-violet-500 hover:bg-violet-600 text-white px-4 py-2 rounded-md text-sm">
            <FaDownload className="inline mr-1" /> Export Data
          </button>
        </div>
      </div>

      <AddTidno
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        setTidno={setTidnos}
        fetchTidno={fetchTidno}
        editTidno={editTidno}
        setEditTidno={setEditTidno}
      />

      <div className="overflow-x-auto px-4">
        <table className="min-w-full text-sm text-left border border-gray-200">
          <thead className="bg-gray-50 text-xs text-gray-600 uppercase">
            <tr>
              <th className="p-4">TID NO.</th>
              <th className="p-4">Status</th>
              <th className="p-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentTidno.length > 0 ? (
              currentTidno.map((t) => (
                <tr key={t._id} className="hover:bg-gray-50">
                  <td className="p-4 font-medium text-gray-800">{t.TidnoName}</td>
                  <td className="p-4">
                    <span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-700">
                      Active
                    </span>
                  </td>
                  <td className="p-4">
                    <div className="flex gap-2">
                      <button
                        onClick={() => {
                          setEditTidno(t);
                          setIsOpen(true);
                        }}
                        className="text-orange-400 hover:text-orange-600 transition-colors duration-200"
                      >
                        <Edit3 size={20} />
                      </button>

                      <button
                        onClick={() => handleDelete(t._id)}
                        className="text-red-400 hover:text-red-600 transition-colors duration-200"
                      >
                        <Trash size={20} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="3" className="text-center p-4 text-gray-500">
                  No TID NO. found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {!isAll && (
        <div className="flex flex-col sm:flex-row justify-between items-center px-4 py-3 text-l text-gray-400">
          <span>
            Showing {indexOfFirstItem + 1} to {Math.min(indexOfLastItem, filteredTidnos.length)} of{' '}
            {filteredTidnos.length} entries
          </span>
          <div className="flex gap-1 mt-2 sm:mt-0">
            <button
              onClick={() => handlePageChange(1)}
              disabled={currentPage === 1}
              className="px-2 py-1 rounded bg-gray-100 hover:bg-gray-200"
            >
              {'<<'}
            </button>
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="px-2 py-1 rounded bg-gray-100 hover:bg-gray-200"
            >
              {'<'}
            </button>
            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i + 1}
                onClick={() => handlePageChange(i + 1)}
                className={`px-2 py-1 rounded ${
                  currentPage === i + 1
                    ? 'bg-violet-100 text-violet-700'
                    : 'bg-gray-100 hover:bg-gray-200'
                }`}
              >
                {i + 1}
              </button>
            ))}
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="px-2 py-1 rounded bg-gray-100 hover:bg-gray-200"
            >
              {'>'}
            </button>
            <button
              onClick={() => handlePageChange(totalPages)}
              disabled={currentPage === totalPages}
              className="px-2 py-1 rounded bg-gray-100 hover:bg-gray-200"
            >
              {'>>'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TidnoList;
