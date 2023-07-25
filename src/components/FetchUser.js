import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AuthContext } from "../context/auth.context.jsx";
import { server } from "../server.js";

function FetchUser() {
  const { user } = useContext(AuthContext);

  const [currentUser, setCurrentUser] = useState([]);

  useEffect(() => {
    fetchUserModel();
  }, []);

  const fetchUserModel = async () => {
    try {
      // const currentUserEmail = user.email;
      const response = await axios.get(`${server}/user/getuser/${user._id}`);

      setCurrentUser(response.data.foundUser);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };
  console.log(currentUser);

  return currentUser;
}

export default FetchUser;
