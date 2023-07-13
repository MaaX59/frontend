import React,{ useContext, useEffect} from 'react'
import { AuthContext } from "../context/auth.context";
import { server } from "../server.js";
import axios from "axios";

function  GetUserWishlist() {

  const { user } = useContext(AuthContext);

  useEffect(() => {
    fetchWishlist();
  }, []);

  const fetchWishlist = async () => {
    

    try {
      const currentUserEmail = user.email;
      const response = await axios.get(`${server}/user/getuser`);

      if (user) {
        response.data.foundUser.map((elem) => {
          if (elem.email === currentUserEmail) {
            // console.log("wishlist",elem.wishlist,"product.id",product._id)
            if (elem.wishlist.length >= 1) {

              console.log(elem.wishlist);
              return elem.wishlist;
            }
          }
        });
      }
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };


  return (
    {fetchWishlist}
  )
}

export default GetUserWishlist