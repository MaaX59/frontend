import React, { useRef, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  RiArrowDropDownLine,
  RiComputerLine,
  RiSmartphoneLine,
  RiCpuLine,
  RiHeadphoneLine,
  RiRestaurantLine,
  RiBookLine,
  RiTShirtLine,
  RiHeartLine,
  RiBikeLine,
  RiHomeLine,
} from 'react-icons/ri';

const categories = [
  {
    name: 'Electronics',
    icon: <RiComputerLine />,
  },
  {
    name: 'Mobile Phones',
    icon: <RiSmartphoneLine />,
  },
  {
    name: 'Laptops',
    icon: <RiComputerLine />,
  },
  {
    name: 'Accessories',
    icon: <RiCpuLine />,
  },
  {
    name: 'Headphones',
    icon: <RiHeadphoneLine />,
  },
  {
    name: 'Food',
    icon: <RiRestaurantLine />,
  },
  {
    name: 'Books',
    icon: <RiBookLine />,
  },
  {
    name: 'Clothes/Shoes',
    icon: <RiTShirtLine />,
  },
  {
    name: 'Beauty/Health',
    icon: <RiHeartLine />,
  },
  {
    name: 'Sports',
    icon: <RiBikeLine />,
  },
  {
    name: 'Outdoor',
    icon: <RiBikeLine />,
  },
  {
    name: 'Home',
    icon: <RiHomeLine />,
  },
];

function Navbar({handleFilterByCategory}) {
  const dropdownRef = useRef(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [categoryDropdownOpen, setCategoryDropdownOpen] = useState(false);

  const handleDropdownToggle = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const handleCategoryDropdownToggle = () => {
    setCategoryDropdownOpen(!categoryDropdownOpen)
  }

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setDropdownOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const renderCategoryButtons = () => {
    return (
      <>
         <div className="relative inline-block">
        <button
          onClick={handleCategoryDropdownToggle}
          className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-200 rounded-md"
        >
          Filter by Category
        </button>
        {categoryDropdownOpen && (
          <div className="absolute top-10 right-0 bg-white shadow-md rounded-md py-2">
            <button
              onClick={() => handleFilterByCategory('All')}
              className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-200 rounded-md"
            >
              All
            </button>
            {categories.map((category) => (
              <button
                key={category.name}
                onClick={() => handleFilterByCategory(category.name)}
                className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-200 rounded-md"
              >
                {category.icon}
                <span className="ml-2">{category.name}</span>
              </button>
            ))}
          </div>
        )}
      </div>
      </>
    );
  };

  return (
    <nav className="bg-blue-700 fixed top-0 left-0 w-full z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex">
          <img src="/Deal (2).png" alt="Logo" className="h-10 w-auto mr-2" />
            <div className="ml-4 relative" ref={dropdownRef}>
            <button
                className="flex items-center text-gray-300 hover:bg-gray-700 px-3 py-2 rounded-md text-sm font-medium"
                onClick={handleDropdownToggle}
              >
                filter product <RiArrowDropDownLine className="ml-1" />
              </button>
              {dropdownOpen && (
                <div className="absolute top-10 right-0 bg-white shadow-md rounded-md py-2">
                  {renderCategoryButtons()}
                </div>
              )}
            </div>
            <Link
              to="/"
              className="text-gray-300 hover:bg-gray-700 px-3 py-2 rounded-md text-sm font-medium"
            >
              Home
            </Link>

            <Link
              to="/profile"
              className="text-gray-300 hover:bg-gray-700 px-3 py-2 rounded-md text-sm font-medium"
            >
              Profile
            </Link>
            
            <Link
              to="/signup"
              className="text-gray-300 hover:bg-gray-700 px-3 py-2 rounded-md text-sm font-medium"
            >
              Signup
            </Link>
            <Link
              to="/login"
              className="text-gray-300 hover:bg-gray-700 px-3 py-2 rounded-md text-sm font-medium"
            >
              Login
            </Link>

            <Link
              to="/seller-dashboard"
              className="text-gray-300 hover:bg-gray-700 px-3 py-2 rounded-md text-sm font-medium"
            >
            Become seller
            </Link>
        
           
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
