import React, { useState, useEffect, useContext } from "react";
import { server } from "../../server";
import axios from "axios";
import { AuthContext } from "../../context/auth.context.jsx";

function HandleWishlist() {

    const {wishlist, setWishlist} = useContext(AuthContext);

  return (
    <div>

    </div>
  )
}

export default HandleWishlist