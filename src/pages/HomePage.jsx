import React from 'react'
import Navbar from "../components/navbar.jsx"
// import axios from "axios";
// import { useState,useEffect } from 'react';
// import { server } from "../server.js";
import AllProducts from '../components/Product/AllProducts.jsx';



function HomePage() {
  // const [products, setProducts] = useState([]);

  // useEffect(() => {
  //   fetchProducts();
  // }, []);

  // const fetchProducts = async () => {
  //   try {
  //     const response = await axios.get(`${server}/product/allproducts`);
  //     setProducts(response.data.data);
  //     console.log("this is the product list", response.data.data)
  //   } catch (error) {
  //     console.error('Error fetching products:', error);
  //   }
  // };

  return (
    <div>
        <Navbar />
        <AllProducts />
        {/* <div>
    <h1>Welcome to the Homepage</h1>
    {Array.isArray(products) && products.length > 0 ? (
      <ul>
        {products.map((Product) => (
          <li key={Product._id}>{Product.name}</li>
        ))}
      </ul>
    ) : (
      <p>No products found</p>
    )}
  </div> */}
    </div>
  )
}

export default HomePage