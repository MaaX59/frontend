import { React, useState, useContext, useEffect } from "react";
import axios from "axios";
import { server } from "../server";
import { AuthContext } from "../context/auth.context";
import ProfileNavBar from './ProfileNavBar'


function ShoppingCart() {
    const { user } = useContext(AuthContext);
    const [cart, setCart] = useState([]);
//     const [products, setProducts] = useState([]);

  

//   const fetchProducts = async () => {
//     try {
//       const response = await axios.get(`${server}/product/allproducts`);
//       // setProducts(response.data.productsFromDb);
//       console.log("this is the all products", response.data);
//       console.log("products",response.data.productsFromDb)
//       setProducts(response.data.productsFromDb);
      
//     } catch (error) {
//       console.error("Error fetching products:", error);
//     }
//   };

  const fetchUserAndCart = async () => {
    try {
      // const currentUserEmail = user.email;
      const response = await axios.get(`${server}/user/getuser/${user._id}`);
      console.log("cart",response.data.foundUser.shoppingCart);
     setCart(response.data.foundUser.shoppingCart);
      

    
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };
  const findTotal = () => {
     let sum = 0;
     
cart.map((item)=>{
    sum = sum + item.price*item.amount})
return Math.round(sum);
  }
  

  useEffect(() => {
    fetchUserAndCart();
    
  },[]);

 

  return (
    <div>
        <ProfileNavBar/>
        <div className="fixed top-1 left-1 w-full bg-[#ffffffea] h-screen">
      <div className="h-full w-full mt-[60px] overflow-y-scroll bg-white flex flex-col shadow-sm">
       
            {cart.map((cartItem) =>
                
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
                  <h3>{cartItem.price}$</h3>
                  <h3>Quantity:{cartItem.amount}</h3>
                  <h3>{cartItem.price*cartItem.amount}$</h3>
                  </div></div>
                
              )}
        
           <h1 className="flex">Total price {findTotal()} $</h1>
            </div>
            
        </div>
        </div>
        
  )
}

export default ShoppingCart