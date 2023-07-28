import { React, useState, useContext, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { server } from "../server";
import { AuthContext } from "../context/auth.context";
import ProfileNavBar from "./ProfileNavBar";

function ShoppingCart() {
  const { user, cartLength } = useContext(AuthContext);
  const [cart, setCart] = useState([]);
  const navigate = useNavigate();
  const userId = user._id;

  const fetchUserAndCart = async () => {
    try {
      // const currentUserEmail = user.email;
      const response = await axios.get(`${server}/user/getuser/${user._id}`);
      console.log("cart", response.data.foundUser.shoppingCart);
      setCart(response.data.foundUser.shoppingCart);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };
  const findTotal = () => {
    let sum = 0;

    cart.map((item) => {
      sum = sum + item.price * item.amount;
    });
    return Math.round(sum);
  };

  useEffect(() => {
    fetchUserAndCart();
  }, []);

  const removeItem = async (productId) => {
    try {
      await axios
        .delete(`${server}/cart/${userId}/cart/${productId}`)
        .then(() => {
          cartLength(user);
          fetchUserAndCart();
        });
    } catch (error) {
      console.log("error while trying to post cart", error);
    }
  };

  const confirmCart = async () => {
    // e.preventDefault();
    console.log("user id", userId);
    // const cartDataToDb = [userId, cart];
    console.log("cart on frontend", cart);

    let cartToDb = cart.reduce((acc, { _id, price, amount, name, seller }) => {
      acc.push({ _id, price, amount, name, seller });
      return acc;
    }, []);

    console.log(cartToDb);
    try {
      await axios
        .post(`${server}/cart/${user._id}/shoppingcart`, cartToDb)
        .then(navigate("/shipping-info"));
    } catch (error) {
      console.log("error while sending cart to db", error);
    }
  };





  return (
    <div>
      <ProfileNavBar />
      <div className="fixed top-1 left-1 w-full bg-[#ffffffea] h-screen">
        <div className="h-full w-full mt-[60px] overflow-y-scroll bg-white flex flex-col shadow-sm">
          {cart.map((cartItem) => (
            <div className="w-[1200px] h-[50px] flex bg-[#ededed] mt-5 ml-5 rounded-md shadow items-center border-sm justify-between">
              <div className="flex justify-between align-baseline items-center w-[1100px]">
                <img
                  src={
                    cartItem.images
                      ? cartItem.images[0]
                      : "https://erp.netbizde.com/cdn/static/products/default.jpg"
                  }
                  alt={cartItem.name}
                  className=" flex h-[48px] rounded-sm ml-2 mr-2 "
                ></img>
                <h2 className="w-[300px] font-[600] font-Roboto text-[#333]">
                  {cartItem.name}
                </h2>
                <h3>${cartItem.price}</h3>
                <div className="flex"> 
                <h3>Quantity:</h3>{cartItem.amount}
                {/* <label>Quantity:</label>
                <select value={value} onChange={handleChange(cartItem._id)}>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                  <option value="6">6</option>
                  <option value="7">7</option>
                  <option value="8">8</option>
                  <option value="9">9</option>
                </select>
               */}
                </div>
                <h3>${cartItem.price * cartItem.amount}</h3>
                <button
                  onClick={() => {
                    removeItem(cartItem._id);
                  }}
                  className="group relative w-[140px] h-[40px] flex justify-center rounded-md bg-blue-600 hover:bg-red-700  py-2 px-4 border border-transparent font-medium text-sm"
                >
                  Remove item
                </button>
              </div>
            </div>
          ))}

          <h1 className="flex flex-end mt-3">Total price ${findTotal()} </h1>
          <div>
            <button
              onClick={confirmCart}
              className="flex w-[290px] px-4 py-2 mt-5 bg-blue-500 text-white rounded-lg text-center"
            >
              Confirm and continue to shipping
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ShoppingCart;
