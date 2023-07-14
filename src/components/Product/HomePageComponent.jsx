import {React, useEffect, useState} from "react";
import axios from "axios";
import {server} from "../../server.js";
import ProductCard from "./ProductCard.jsx";
import SearchProduct from "../SearchProduct.jsx";
import Navbar from "../navbar.jsx";


function HomePageComponent() {

  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);


  
  useEffect(() => {
      fetchProducts();
    }, []);
  
    const fetchProducts = async () => {
      try {
        const response = await axios.get(`${server}/product/allproducts`);
        setProducts(response.data.productsFromDb);
        console.log("this is the product list", response.data.productsFromDb)
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    const handleSearch = (searchTerm) => {
      if (searchTerm.trim() === "") {
        setFilteredProducts([]);
      } else {
        const filteredProducts = products.filter((product) =>
          product.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredProducts(filteredProducts);
      }
    };

    const handleFilterByCategory = (category) => {
      if (category === 'All') {
        setFilteredProducts(products);
      } else {
        const filteredProducts = products.filter((product) => product.category === category);
        setFilteredProducts(filteredProducts);
      }
      
    };

return (
  <div>
     <Navbar handleFilterByCategory={handleFilterByCategory}  />
       <SearchProduct handleSearch={handleSearch} />
      <div className="flex flex-wrap bg-gray-100">
     
        {
          filteredProducts.length > 0 ? (
        filteredProducts.map((product, index) => (
          <ProductCard product={product} key={index} />
        ))
      ) : (
        products.map((product, index) => (
         <ProductCard product={product} key={index} />
    ))
    )}
      </div>
  </div>
  );
}

export default HomePageComponent;
