import React, { useContext } from 'react'
import {Link} from "react-router-dom";
import { AuthContext } from '../context/auth.context';

function ProfileNavBar() {
    const {logOutUser,user} = useContext(AuthContext)
    return (
      <nav className="bg-blue-700">
     
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex">
            <p  className="text-gray-300 hover:bg-gray-700 px-3 py-2 rounded-md text-sm font-medium"> Welcome {user && user.email}</p>
            <Link to="/"
                className="text-gray-300 hover:bg-gray-700 px-3 py-2 rounded-md text-sm font-medium"
              >
              Home
              </Link>

              <Link to="/create-product"
                className="text-gray-300 hover:bg-gray-700 px-3 py-2 rounded-md text-sm font-medium"
              
              >
                Create an item to sell
              </Link>

              <Link to="/login"
                className="text-gray-300 hover:bg-gray-700 px-3 py-2 rounded-md text-sm font-medium"
              onClick ={logOutUser}
              >
                Logout
              </Link>
              {/* Add more navbar links as needed */}
            </div>
          </div>
        </div>
      </nav>
    );
  };
export default ProfileNavBar