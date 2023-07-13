import { React, useState, useContext, useEffect } from "react";

import axios from "axios";
import { server } from "../../server";
import { AuthContext } from "../../context/auth.context";
import SingleWishlistItem from "./SingleWishlistItem.jsx";

function Wishlist() {
  const { user } = useContext(AuthContext);
  const [wishlist, setWishlist] = useState([]);

  useEffect(() => {
    fetchUserModel();
  });

  const fetchUserModel = async () => {
    try {
      const currentUserEmail = user.email;
      const response = await axios.get(`${server}/user/getuser`);

      if (user) {
        response.data.foundUser.map((elem) => {
          if (elem.email === currentUserEmail) {
            // console.log("wishlist",elem.wishlist,"product.id",product._id)
            if (elem.wishlist.length >= 1) {
              return setWishlist(elem.wishlist);
            }
          }
        });
      }
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  console.log("fetch wish", wishlist);

  return (
    <div className="fixed top-19 left-0 w-full bg-[#ffffffea] h-screen">
      <div className="fixed top-0 right-0 h-full w-[80%] overflow-y-scroll 800px:w-[25%] bg-white flex flex-col justify-between shadow-sm">
        
            {wishlist.map((data=> 
            <SingleWishlistItem data={data} />
          ))}
        
      </div>
    </div>
  );
}
export default Wishlist;
