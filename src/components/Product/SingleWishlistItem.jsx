import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { server } from "../../server";
import { AiFillHeart, AiOutlineShoppingCart } from "react-icons/ai";
import { AuthContext } from "../../context/auth.context.jsx";
import { Link } from "react-router-dom";

function SingleWishlistItem({ product }) {
  // const [products, setProducts] = useState([]);
  // const [singleItem, setSingeleItem] = useState([]);
  const { user } = useContext(AuthContext);
  const [count, setCount] = useState(1);
  const [cartClick, setCartClick] = useState(false);
  const { isLoading, isLoggedIn } = useContext(AuthContext);

  // useEffect(() => {
  //   fetchProducts();
  // }, []);

  // const fetchProducts = async () => {
  //   try {
  //     const response = await axios.get(`${server}/product/allproducts`);
  //     // setProducts(response.data.productsFromDb);
  //     console.log("this is the wishlist", response.data);
  //     response.data.productsFromDb.map((product) =>{
  //     if(product._id === data){
  //       setSingeleItem(product)
  //       console.log(singleItem)
  //     }
  //         }
  //     );
  //   } catch (error) {
  //     console.error("Error fetching products:", error);
  //   }
  // };
  const handleCart = () => {
    // const gotToken = localStorage.getItem("authToken");
    // const response = await axios.get(${server}/product/newproduct, {
    //   headers: { authorization: Bearer ${gotToken} },
    // });

    const userId = user._id;
    const productId = product._id;

    const productToCart = product;
    productToCart.amount = count;
    // const amount = 1;
    console.log("added to cart", productToCart);
    if (!cartClick) {
      isLoggedIn ? (
        axios
          .put(
            `${server}/cart/${userId}/cart/${productId}/${count}`,
            productToCart
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

  const removeFromWishlist = async () => {
    const userId = user._id;
    const productId = product._id;
    // const productId = data;
    console.log("want to delete", product.name);

    try {
      // const {data }=
      await axios.delete(
        `${server}/wishlist/${userId}/removeWishlist/${productId}`
      );
      window.location.reload(false);

      // setWishlist(data.updatedUser.wishlist)
      // console.log("This is your new data", data);
    } catch (error) {
      console.log("error while trying to post wishlist", error);
    }
  };

  const countDown = () => {
    if (count > 1) {
      setCount(count - 1);
    }
  };
  const countUp = () => {
    setCount(count + 1);
  };

  return (
    <>
      <div className="w-[1200px] h-[50px] flex bg-[#ededed] mt-5 ml-5 rounded-md shadow items-center border-sm justify-between">
        <div className="flex justify-between align-baseline items-center w-[1100px]">
          <img
            src={
              product.images
                ? product.images[0]
                : "https://erp.netbizde.com/cdn/static/products/default.jpg"
            }
            alt={product.name}
            className=" flex h-[48px] rounded-sm ml-2 mr-2 "
          ></img>
          <h2 className="w-[300px] font-[600] font-Roboto text-[#333]">
            {product.name}
          </h2>
          <h4 className="ml-5 ">
            {product && product.description && product.description.length > 30
              ? product.description.slice(0, 30) + "..."
              : product.description}
          </h4>
          <h6>{product.price + "$"}</h6>

          <div className="flex align-baseline items-center">
            <div className="flex">
              <AiFillHeart
                size={20}
                color="red"
                title="Remove from Wishlist"
                onClick={removeFromWishlist}
                className="ml-5 mr-5 cursor-pointer"
              />
            </div>
            <div className="flex flex-row h-10 px-2">
              <button
                className=" flex bg-gradient-to-t from-teal-400 to-teal-500 text-white font-bold rounded-l px-4 py-1 shadow-lg hover:opacity-75 transition duration-300 ease-in-out "
                onClick={countDown}
              >
                -
              </button>
              <span className=" flex bg-gray-200 text-gray-800 font-medium px-4 py-1">
                {count}
              </span>
              <button
                className="flex bg-gradient-to-t from-teal-400 to-teal-500 text-white font-bold rounded-r px-4 py-1 shadow-lg hover:opacity-75 transition duration-300 ease-in-out "
                onClick={countUp}
              >
                +
              </button>
            </div>

            <div
              onClick={handleCart}
              className=" w-[150px] bg-black my-3 mt-6 h-11 flex items-center justify-center align-baseline rounded-[4px]"
            >
              <span className="text-white absolute flex items-center justify-center align-center  ">
                Add to cart <AiOutlineShoppingCart className="ml-l " />
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default SingleWishlistItem;
