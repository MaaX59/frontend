import React, { useState, useEffect } from "react";
import { server } from "../../server";
import axios from "axios";

function FetchProducts() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchProductsFromDb();
  }, []);
  const fetchProductsFromDb = async () => {
    try {
      const response = await axios.get(`${server}/product/allproducts`);
      setProducts(response.data.productsFromDb);
      console.log("this is the product list", response.data.productsFromDb);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  return products;
}

export default FetchProducts;
