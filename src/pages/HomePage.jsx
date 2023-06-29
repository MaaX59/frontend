import React from 'react'
import Navbar from "../components/navbar.jsx"
import axios from "axios";
import { useState,useEffect } from 'react';
import { server } from "../server.js";



function HomePage() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get(`${server}/product/allproducts`);
      setProducts(response.data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  return (
    <div>
        <Navbar />
        <div>
    <h1>Welcome to the Homepage</h1>
    {Array.isArray(products) && products.length > 0 ? (
      <ul>
        {products.map((product) => (
          <li key={product.id}>{product.name}</li>
        ))}
      </ul>
    ) : (
      <p>No products found</p>
    )}
  </div>
    </div>
  )
}

export default HomePage