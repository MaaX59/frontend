import React, { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import {
  AiFillHeart,
  AiOutlineEye,
  AiOutlineHeart,
  AiOutlineShoppingCart,
} from "react-icons/ai";
import ProductDetailsCard from "./ProductDetailsCard.jsx";
import Ratings from "./Ratings";
import { AuthContext } from "../../context/auth.context.jsx";
import { server } from "../../server";
// import GetUserWishlist from "../GetUserWishlist.jsx";

function ProductCard({ product }) {
  const [click, setClick] = useState(false);
  const [open, setOpen] = useState(false);
  const [cartClick, setCartClick] = useState(false);
  const { isLoading, isLoggedIn } = useContext(AuthContext);
  const [count, setCount] = useState(1)

  const [currentUser, setCurrentUser] = useState([]);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    fetchUserModel();

  }, []);
 

  const fetchUserModel = async () => {
    try {
      // const currentUserEmail = user.email;
      const response = await axios.get(`${server}/user/getuser/${user._id}`);

      setCurrentUser(response.data.foundUser);

      if (user) {
        if (response.data.foundUser.wishlist.length >= 1) {
          response.data.foundUser.wishlist.map((wish) => {
            return wish === product._id ? setClick(true) : null;
          });
          
        }
      }
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  // const fetchUserModel = async () => {
  //   try {
  //     const currentUserEmail = user.email;
  //     const response = await axios.get(`${server}/user/getuser/${user._id}`);
  //     setCurrentUser(response.data.currentUser);

  //   } catch (error) {
  //     console.error("Error fetching products:", error);
  //   }
  // };
  // const alreadyWishedItems = async ()=>{
  //   console.log("===>",currentUser)
  // }

  const handleCart = () => {
    // const gotToken = localStorage.getItem("authToken");
    // const response = await axios.get(${server}/product/newproduct, {
    //   headers: { authorization: Bearer ${gotToken} },
    // });

    const userId = user._id;
    const productId = product._id;
    
    const productToCart = product;
    productToCart.amount=count;
    // const amount = 1;
console.log("added to cart", productToCart);
    if (!cartClick) {
      isLoggedIn ? (
        

        axios
          .put(
            `${server}/cart/${userId}/cart/${productId}/${count}`,productToCart
            // ,{
            //   headers: { authorization: Bearer ${gotToken} },
            // }
          )
          .then(setCartClick(!cartClick))
          .catch(function (error) {
            console.log("error while trying to post cart", error);
          })
      ) : (
        <Link to="/login"></Link>
      );
    } else if (cartClick) {
      axios
        .delete(`${server}/cart/${userId}/cart/${productId}`)
        .then(setCartClick(!cartClick))
        .catch(function (error) {
          console.log("error while trying to post cart", error);
        });
    }
  };

  const handleWishlist = () => {
    // const gotToken = localStorage.getItem("authToken");
    const userId = user._id;
    const productId = product._id;

    if (!click) {
      isLoggedIn ? (
        // console.log(userId,"added to wishlist", product._id)

        axios
          .post(`${server}/wishlist/${userId}/addWishlist/${productId}`)
          .then(setClick(!click))
          .catch(function (error) {
            console.log("error while trying to post wishlist", error);
          })
      ) : (
        <Link to="/login"></Link>
      );
    } else if (click) {
      console.log("removed from wishlist");

      axios
        .delete(`${server}/wishlist/${userId}/removeWishlist/${productId}`)
        .then(setClick(!click))
        .catch(function (error) {
          console.log("error while trying to post wishlist", error);
        });
    }
  };

  const productName = product.name;

  return (
    <>
      <div className=" w-[260px] h-[370px] bg-white rounded-lg shadow-sm p-3 m-3 relative cursor-pointer">
        <div className="flex justify-end"></div>

        <Link to={`/product/${productName}`}>
          <img
            // src={product.images[0].image}
            //src={`${server}${product.images && product.images[0]}`}
            src={
              product.images
                ? product.images[0]
                : "https://erp.netbizde.com/cdn/static/products/default.jpg"
            }
            alt={productName}
            className="w-[220px] h-[170px] object-contain"
          />
        </Link>
        <Link to="/">
          <h5 className="pt-3 text-[15px] text-blue-400 pb-3">
            {product.seller}{" "}
          </h5>
        </Link>
        <Link to={`/product/${productName}`}>
          <h4 className="'text-[25px] font-[600] font-Roboto text-[#333]">
            {productName.length > 40
              ? productName.slice(0, 40) + "..."
              : productName}
          </h4>
          <div className="flex">
            {" "}
            <Ratings num={product.ratings} />{" "}
          </div>
          <div className="py2 flex items-center justify-between">
            <div className="flex">
              <h5 className="px-1 font-bold text-[18px] text-[#333] font-Roboto">
                {product.price} $
              </h5>
            </div>
            {/* <span className="font-[400] text-[17px] text-[#68d284]">
              {product.sold == null ? "0 sold yet" : `${product.sold}, sold`}
            </span> */}
          </div>
        </Link>

        {/* Side Option */}
        <div>

          {user ?(
          click ? (
            
            <AiFillHeart
              size={22}
              className="cursor-pointer absolute right-1 top-5"
              onClick={handleWishlist}
              color={click ? "red" : "black"}
              title="Remove from wishlist"
            />
          ) : (
            <AiOutlineHeart
              size={22}
              className="cursor-pointer absolute right-1 top-5"
              onClick={handleWishlist}
              color={click ? "red" : "black"}
              title="Add to wishlist"
            />
          )) : null
          }

          <AiOutlineEye
            size={22}
            className="cursor-pointer absolute right-1 top-14"
            onClick={() => setOpen(!open)}
            color="black"
            title="Quick View"
          />
          {user?

          <AiOutlineShoppingCart
            size={25}
            className="cursor-pointer absolute right-1 top-24"
            onClick={handleCart}
            color={cartClick ? "red" : "black"}
            title="Add to cart"
          />
          :null
          }

          {open ? (
            <ProductDetailsCard
              handleWishlist={handleWishlist}
              setOpen={setOpen}
              product={product}
              setClick={setClick}
              click={click}
              user={user}
              handleCart={handleCart}
              count={count}
              setCount={setCount}
              
            />
          ) : null}
        </div>
      </div>
    </>
  );
}

export default ProductCard;
