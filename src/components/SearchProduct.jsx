import React, {useState} from 'react'


function SearchProduct({handleSearch}) {
    const [searchTerm, setSearchTerm] = useState("");
    

    const handleChange = (event) => {
        const typed = event.target.value;
        setSearchTerm(typed);
        handleSearch(typed);
      };

  return (
    <div className="w-1/2 mx-auto mt-4 relative">
    <input
      type="text"
      placeholder="Search Product"
      value={searchTerm}
      onChange={handleChange}
      className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
  </div>
  )
}

export default SearchProduct