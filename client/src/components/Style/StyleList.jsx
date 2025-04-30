
import React, { useEffect, useState } from 'react';
import StyleItem from './StyleItem';
import AddStyle from './AddStyle';
import useFetch from '../../hooks/useFetch';
import { FaPlus, FaUpload, FaDownload } from 'react-icons/fa';

const base_url = import.meta.env.VITE_BASE_API_URL;

const StyleList = () => {
  const [StyleList, setStyleList] = useState([]);
  const [filteredStyle, setfilteredStyle] = useState([]);
  const [input, setInput] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [entriesPerPage, setEntriesPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedStyle, setSelectedStyle] = useState([]);

  const { data, isLoading, error } = useFetch(`${base_url}/api/departments`);

  const handleAddList = () => setIsOpen(prev => !prev);

  useEffect(() => {
    if (data) {
      const Style = data.styleData || data;
      setStyleList(Style);
      setfilteredStyle(Style);
    }
  }, [data]);

  useEffect(() => {
    const filtered = StyleList.filter(style =>
      (style.StyleName || '').toLowerCase().includes(input.toLowerCase())
    );
    setfilteredStyle(filtered);
    setCurrentPage(1);
  }, [input, StyleList]);

  const indexOfLast =
    entriesPerPage === 'all'
      ? filteredStyle.length
      : currentPage * entriesPerPage;

  const indexOfFirst =
    entriesPerPage === 'all' ? 0 : indexOfLast - entriesPerPage;

  const currentStyle = filteredStyle.slice(indexOfFirst, indexOfLast);

  const totalPages =
    entriesPerPage === 'all'
      ? 1
      : Math.ceil(filteredStyle.length / entriesPerPage);

  const handlePageChange = page => {
    if (page >= 1 && page <= totalPages) setCurrentPage(page);
  };

  // Checkbox logic
  const toggleSelectOne = (id) => {
    setSelectedStyle(prev =>
      prev.includes(id)
        ? prev.filter(item => item !== id)
        : [...prev, id]
    );
  };

  if (isLoading) return <h1>Loading...</h1>;

  if (error) {
    return (
      <h1 className="py-12 px-5 bg-red-200 rounded-lg text-red-600 text-2xl border-red-500 border-[2px]">
        Something Went Wrong. Please Try Again Later...
      </h1>
    );
  }

  return (
    <div className="flex flex-col gap-6 mt-2 bg-white rounded-lg">
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-2xl font-semibold text-gray-600">Style List</h2>
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 gap-4">
        <div className="flex flex-wrap items-center gap-2">
          <div className="flex items-center space-x-2">
            <label className="text-lg text-gray-600">Show</label>
            <select
              className="border border-gray-300 rounded px-2 py-1 text-lg focus:ring-2 focus:ring-violet-500 cursor-pointer outline-none transition-colors duration-200"
              value={entriesPerPage}
              onChange={e =>
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
            placeholder="Search Style"
            className="border border-gray-300 hover:border-violet-500 focus:outline-none focus:ring-2 focus:ring-violet-500 rounded-md px-3 py-2 text-sm w-60"
            // value={input}
            input={input}
            
            onChange={e => setInput(e.target.value)}
          />
        </div>

        <div className="flex flex-wrap gap-2 justify-end">
          <button
            className="bg-violet-500 hover:bg-violet-600 text-white px-4 py-2 rounded-md text-sm"
            onClick={handleAddList}
          >
            <FaPlus className="inline mr-1" /> Add New Style
          </button>
          <button className="bg-violet-500 hover:bg-violet-600 text-white px-4 py-2 rounded-md text-sm">
            <FaUpload className="inline mr-1" /> Import Data
          </button>
          <button className="bg-violet-500 hover:bg-violet-600 text-white px-4 py-2 rounded-md text-sm">
            <FaDownload className="inline mr-1" /> Export Data
          </button>
        </div>
      </div>

      <AddStyle
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        setStyleList={setStyleList}
        input={input}
        setInput={setInput}
      />

      <div className="overflow-x-auto">
        <table className="min-w-full text-sm text-left border border-gray-200">
          <thead className="bg-gray-50 text-xs text-gray-500 uppercase">
            <tr>
              <th className="p-4">Name</th>
              <th className="p-4">Status</th>
              <th className="p-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentStyle.length > 0 ? (
              currentStyle.map((item) => (
                <StyleItem
                  key={item._id}
                  item={item}
                  setDepartmentList={setStyleList}
                  departmentList={StyleList}
                  isChecked={selectedStyle.includes(item._id)}
                  onCheckboxChange={() => toggleSelectOne(item._id)}
                />
              ))
            ) : (
              <tr>
                <td colSpan="4" className="text-center p-4 text-gray-500">
                  No departments found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex flex-col sm:flex-row justify-between items-center px-3 py-3 text-l text-gray-400">
        <span>
          Showing {indexOfFirst + 1} to{' '}
          {Math.min(indexOfLast, filteredStyle.length)} of{' '}
          {filteredStyle.length} entries
        </span>
        <div className="flex gap-1 mt-2 sm:mt-0">
          <button onClick={() => handlePageChange(1)} disabled={currentPage === 1} className="px-2 py-1 rounded bg-gray-100 hover:bg-gray-200">{'<<'}</button>
          <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1} className="px-2 py-1 rounded bg-gray-100 hover:bg-gray-200">{'<'}</button>
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
          <button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages} className="px-2 py-1 rounded bg-gray-100 hover:bg-gray-200">{'>'}</button>
          <button onClick={() => handlePageChange(totalPages)} disabled={currentPage === totalPages} className="px-2 py-1 rounded bg-gray-100 hover:bg-gray-200">{'>>'}</button>
        </div>
      </div>
    </div>
  );
};

export default StyleList;
