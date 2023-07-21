import React, { useState, useContext, useEffect, useCallback} from "react";
import ProfileNavBar from './ProfileNavBar'
import { AuthContext } from '../context/auth.context';
import axios from "axios";
import { server } from "../server";

function UserSettings() {
  const [showConfirmation, setShowConfirmation] = useState(false);
  const { user,logOutUser } = useContext(AuthContext);

  const handleDeleteConfirmation = () => {
    setShowConfirmation(true);
  };

  const handleCancelDelete = () => {
    setShowConfirmation(false);
  };

  const handleDeleteUser = async(userId) => {
    const gotToken = localStorage.getItem("authToken");


    try {
      const userId = user._id;
      const response = await axios.delete(`${server}/user/${userId}`, {
        headers: { authorization: `Bearer ${gotToken}` },
      });
      if (response.status === 200) {
        // Product successfully deleted, perform any necessary actions
        console.log("userId", userId)
        console.log("User deleted successfully")
        logOutUser()
        // window.location.href = '/';
      }
    } catch (error) {
      console.log("Error deleting User:", error);
    }
  };
  return (
    <div className="flex flex-col items-center justify-center h-screen">
    <ProfileNavBar />
    <div className="mt-8">
      
        {showConfirmation ? (
          <div>
            <p>Are you sure you want to delete your account?</p>
            <button className="bg-red-500 text-white px-4 py-2 rounded font-bold mr-2"
              onClick={handleDeleteUser}>Yes, Delete</button>
            <button className="bg-gray-500 text-white px-4 py-2 rounded font-bold"
              onClick={handleCancelDelete}>Cancel</button>
          </div>
        ) : (
          <button className="bg-blue-500 text-white px-4 py-2 rounded font-bold"
            onClick={handleDeleteConfirmation}>Delete User</button>
        )}
      </div>
  </div>
  )
}

export default UserSettings