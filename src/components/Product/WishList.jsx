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
  },[]);

  const fetchUserModel = async () => {
    try {
      const currentUserEmail = user.email;
      const response = await axios.get(`${server}/user/getuser/${user._id}`);
      setWishlist(response.data.foundUser.wishlist)

      // if (user) {
      //   response.data.foundUser.map((elem) => {
      //     if (elem.email === currentUserEmail) {
      //       // console.log("wishlist",elem.wishlist,"product.id",product._id)
      //       if (elem.wishlist.length >= 1) {
      //         return setWishlist(elem.wishlist);
              
      //       }
      //     }
        // });
      //}
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  

  return (
    <div className="fixed top-1 left-1 w-full bg-[#ffffffea] h-screen">
      <div className="h-full w-full mt-[60px] overflow-y-scroll bg-white flex flex-col shadow-sm">
        
            {wishlist.map((data=> 
            <SingleWishlistItem data={data} setWishlist={setWishlist} />
          ))}
        
      </div>
    </div>
  );
}
export default Wishlist;
