import React, { useEffect, useState } from 'react';
import axios from 'axios';
import SectionItem from './SectionItem'; // Assuming you have a SectionItem component
import AddSection from './AddSection'; // Assuming you have an AddSection component
import { FaPlus, FaUpload, FaDownload } from 'react-icons/fa'; // Import icons

const base_url = import.meta.env.VITE_BASE_API_URL; // Make sure this is correctly set

const SectionList = () => {
  const [sections, setSections] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [entriesPerPage, setEntriesPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(true);

  const fetchSections = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${base_url}/api/sections`, { withCredentials: true });
      const data = Array.isArray(res.data) ? res.data : [];
      setSections(data);
    } catch (err) {
      console.error('Failed to fetch sections:', err.message);
      setSections([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSections();
  }, []);

  // Filter sections based on search input
  const filteredSections = sections.filter((section) =>
    section.name.toLowerCase().includes(input.toLowerCase())
  );

  const isAll = entriesPerPage === 'all';
  const itemsPerPage = isAll ? filteredSections.length : parseInt(entriesPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentSections = filteredSections.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = isAll ? 1 : Math.ceil(filteredSections.length / itemsPerPage);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleAddSection = () => {
    setIsOpen(true);
  };

  if (loading) {
    return <div className="p-4 text-center text-gray-600">Loading...</div>;
  }

  return (
    <div className="flex flex-col gap-6 mt-2 bg-white rounded-lg">
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-2xl p-2 font-semibold text-gray-600">Section List</h2>
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 gap-4">
        <div className="flex flex-wrap items-center gap-2">
          <div className="flex items-center space-x-2">
            <label className="text-lg text-gray-600">Show</label>
            <select
              className="border border-gray-300 rounded px-2 py-1 text-lg focus:outline-none focus:ring-2 focus:ring-violet-500 cursor-pointer transition-colors duration-200"
              value={entriesPerPage}
              onChange={(e) =>
                setEntriesPerPage(
                  e.target.value === 'all' ? 'all' : parseInt(e.target.value)
                )
              }
            >
              <option value="10">10</option>
              <option value="25">25</option>
              <option value="50">50</option>
              <option value="100">100</option>
              <option value="all">All</option>
            </select>
          </div>

          <input
            type="text"
            placeholder="Search Section"
            className="border border-gray-300 focus:outline-none focus:ring-2 focus:ring-violet-500 rounded-md px-3 py-2 text-sm w-60"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
        </div>

        <div className="flex flex-wrap gap-2 justify-end">
          <button
            className="bg-violet-500 hover:bg-violet-600 text-white px-4 py-2 rounded-md text-sm"
            onClick={handleAddSection}
          >
            <FaPlus className="inline mr-1" /> Add New Section
          </button>
          <button className="bg-violet-500 hover:bg-violet-600 text-white px-4 py-2 rounded-md text-sm">
            <FaUpload className="inline mr-1" /> Import Data
          </button>
          <button className="bg-violet-500 hover:bg-violet-600 text-white px-4 py-2 rounded-md text-sm">
            <FaDownload className="inline mr-1" /> Export Data
          </button>
        </div>
      </div>

      <AddSection
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        setSections={setSections}
        fetchSections={fetchSections}
      />

      <div className="overflow-x-auto px-5">
        <table className="min-w-full text-sm text-left border border-gray-200">
          <thead className="bg-gray-50 text-xs text-gray-500 uppercase">
            <tr>
              <th className="p-3">
                <input type="checkbox" />
              </th>
              <th className="p-4">Section Name</th>
              <th className="p-4">Line</th>
              <th className="p-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentSections.length > 0 ? (
              currentSections.map((section, index) => (
                <tr key={index}>
                  <td className="p-4">{section.name}</td>
                  <td className="p-4">
                    <button className="text-violet-500 hover:text-violet-600">Edit</button>
                    <button className="text-red-500 hover:text-red-600 ml-4">Delete</button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="text-center p-4 text-gray-500">
                  No sections found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {!isAll && (
        <div className="flex flex-col sm:flex-row justify-between items-center px-4 py-3 text-l text-gray-400">
          <span>
            Showing {indexOfFirstItem + 1} to{' '}
            {Math.min(indexOfLastItem, filteredSections.length)} of{' '}
            {filteredSections.length} entries
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

export default SectionList;
