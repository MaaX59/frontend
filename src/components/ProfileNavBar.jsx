import React, { useContext, useRef, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/auth.context";
import { AiOutlineHeart, AiOutlineShoppingCart } from "react-icons/ai";
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
} from "react-icons/ri";

const categories = [
  {
    name: "Electronics",
    icon: <RiComputerLine />,
  },
  {
    name: "Mobile Phones",
    icon: <RiSmartphoneLine />,
  },
  {
    name: "Laptops",
    icon: <RiComputerLine />,
  },
  {
    name: "Accessories",
    icon: <RiCpuLine />,
  },
  {
    name: "Headphones",
    icon: <RiHeadphoneLine />,
  },
  {
    name: "Food",
    icon: <RiRestaurantLine />,
  },
  {
    name: "Books",
    icon: <RiBookLine />,
  },
  {
    name: "Clothes/Shoes",
    icon: <RiTShirtLine />,
  },
  {
    name: "Beauty/Health",
    icon: <RiHeartLine />,
  },
  {
    name: "Sports",
    icon: <RiBikeLine />,
  },
  {
    name: "Outdoor",
    icon: <RiBikeLine />,
  },
  {
    name: "Home",
    icon: <RiHomeLine />,
  },
];

function ProfileNavBar({ handleFilterByCategory }) {
  const { logOutUser, user } = useContext(AuthContext);
  const [click, setClick] = useState(false);
  const dropdownRef = useRef(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [categoryDropdownOpen, setCategoryDropdownOpen] = useState(false);
  // const [selectedLink, setSelectedLink] = useState("");

  const [cartCount, setCartCount] = useState(0);
  const [wishlistCount, setWishlistCount] = useState(0);

  const handleDropdownToggle = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const handleCategoryDropdownToggle = () => {
    setCategoryDropdownOpen(!categoryDropdownOpen);
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setDropdownOpen(false);
    }
  };

  // const handleLinkClick = (link) => {
  //   setSelectedLink(link);
  // };

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
                onClick={() => handleFilterByCategory("All")}
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

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (user) {
      setCartCount(user.cart ? user.cart.length : 0);
      setWishlistCount(user.wishlist ? user.wishlist.length : 0);
    }
  }, [user]);

  return (
    <nav className="bg-blue-700 fixed top-0 left-0 w-full z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex">
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

            <p className="text-gray-300 hover:bg-gray-700 px-3 py-2 rounded-md text-sm font-medium">
              {" "}
              Welcome {user && user.email}
            </p>

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
              to="/seller-dashboard"
              className="text-gray-300 hover:bg-gray-700 px-3 py-2 rounded-md text-sm font-medium"
            >
              Become seller
            </Link>

            <Link
              to="/"
              className="text-gray-300 hover:bg-gray-700 px-3 py-2 rounded-md text-sm font-medium"
              onClick={logOutUser}
            >
              Logout
            </Link>
          </div>

          <div className="flex">
            <div className="relative  px-2">
              <Link to="/wishlist">
                <AiOutlineHeart
                  size={22}
                  className="cursor-pointer"
                  onClick={() => setClick(!click)}
                  color={click ? "red" : "black"}
                  title="View wishlist"
                />
                <span className="absolute top-0 right-0 -mt-1 -mr-1 bg-blue-500 rounded-full text-white text-xs px-1">
                  {wishlistCount}
                </span>
              </Link>
            </div>

            <div className="relative  px-2">
              <AiOutlineShoppingCart
                size={25}
                className="cursor-pointer"
                // onClick={() => setOpen(!open)}
                color="black"
                title="Add to cart"
              />
              <span className="absolute top-0 right-0 -mt-1 -mr-1 bg-blue-500 rounded-full text-white text-xs px-1">
                {cartCount}
              </span>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
export default ProfileNavBar;
