import React, { useState, useContext, useEffect, useCallback} from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { FaEdit,FaDollarSign  } from "react-icons/fa";
import { AiFillDelete } from "react-icons/ai";
import ProductDetailsCard from "./ProductDetailsCard.jsx";
import Ratings from "./Ratings";
import { AuthContext } from "../../context/auth.context.jsx";
import { server } from "../../server";
import Negotiate from "./Negotiate.jsx";

import UpdateProduct from './UpdateProducts.jsx';

function SellerCard({ product }) {
  const [click, setClick] = useState(false);
  const [open, setOpen] = useState(false);
  const [showUpdateProduct, setShowUpdateProduct] = useState(false);
  

  
 

  const { user } = useContext(AuthContext);

  const productName = product.name;

  const handleCardClick = () => {
    setClick(true); 
  };
 


  const fetchUserModel = useCallback(async () => {
    try {
      const currentUserEmail = user.email;
      const response = await axios.get(`${server}/user/getuser`);

      if (user) {
        response.data.foundUser.forEach((elem) => {
          if (elem.email === currentUserEmail) {
            if (elem.wishlist.length >= 1) {
              console.log(elem.wishlist);
              elem.wishlist.forEach((wish) => {
                if (wish === product._id) {
                  setClick(true);
                }
              });
            }
          }
        });
      }
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  }, [product._id, user]);

  useEffect(() => {
    fetchUserModel();
  }, [fetchUserModel]);

  const DeleteProduct = async (productId) => {
    const gotToken = localStorage.getItem("authToken");

    try {
      const response = await axios.delete(`${server}/product/${productId}`, {
        headers: { authorization: `Bearer ${gotToken}` },
      });
      if (response.status === 200) {
        // Product successfully deleted, perform any necessary actions
      }
    } catch (error) {
      console.log("Error deleting product:", error);
    }
  };

  if (click) {
    return null;
  }

  return (
    <>
      <div className="w-[260px] h-[370px] bg-white rounded-lg shadow-sm p-3 m-3 relative cursor-pointer" onClick={handleCardClick}>
        <div className="flex justify-end"></div>

        <Link to={`/product/${productName}`}>
          <img
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
            {product.negotiable ? (
        <>
          <FaDollarSign size={20} className="mr-1 text-green-500" />
          <h5 className="px-1 font-bold text-[18px] text-[#333] font-Roboto">
            {product.price}
          </h5>
        </>
      ) : (
        <h5 className="px-1 font-bold text-[18px] text-[#333] font-Roboto">
          ${product.price}
        </h5>
      )}
            </div>
          </div>
        </Link>

        <div>
          <AiFillDelete
            size={25}
            className="cursor-pointer absolute right-1 top-24"
            color="#444"
            onClick={() => DeleteProduct(product._id)}
            title="Delete Product"
          />
            <Link to={{pathname:`/updateproduct/${product._id}`}}>
          <FaEdit size={25} className="cursor-pointer absolute right-1 top-25" color="#444" title="Update" />
        </Link>
          {showUpdateProduct && <UpdateProduct/>}
          {open ? (
            <ProductDetailsCard
              setOpen={setOpen}
              product={product}
              setClick={setClick}
              click={click}
            />
          ) : null}
        </div>
      </div>
      {open && <Negotiate productId={product._id} />}
    </>
  );
}

export default SellerCard;
