import React, { useEffect, useState } from "react";
import axios from "axios";
import { server } from "../../server.js";
//import ProductCard from "./ProductCard.jsx";
import SellerCard from "./SellerCard.jsx";
//import SearchProduct from "../SearchProduct.jsx";
//import ProfileNavBar from "../ProfileNavBar.jsx";

function ProductCreated() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchCreatedProducts();
  }, []);

  const fetchCreatedProducts = async () => {
    const gotToken = localStorage.getItem("authToken");
    try {
      const response = await axios.get(`${server}/product/created`, {
        headers: { authorization: `Bearer ${gotToken}` },
      });
      console.log("response", response.data);
      setProducts(response.data.products);
    } catch (error) {
      console.log("Error fetching created products:", error);
    }
  };

  return (
    <div className=" mt-20 grid grid-cols-4 gap-4">
      {products.map((product, index) => (
        <SellerCard product={product} key={index} />
      ))}
    </div>
  );
}

export default ProductCreated;
