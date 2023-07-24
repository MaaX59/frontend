import {React, useEffect, useState} from "react";
import axios from "axios";
import {server} from "../server";
import ProductCard from "../components/Product/ProductCard";
import SearchProduct from "../components/SearchProduct";
import SellerDashboard from "../components/SellerDashboard"

import Footer from "../components/Footer";
import Pagination from "react-js-pagination";
import ProfileNavBar from "../components/ProfileNavBar";


function ProfilePage() {

  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 5;

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

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

    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
  
    // Get the products to display on the current page
    const productsToDisplay = filteredProducts.length > 0 ? filteredProducts.slice(startIndex, endIndex) : products.slice(startIndex, endIndex);

return (
  <div>

     <ProfileNavBar />
     <SellerDashboard />
    <Footer/>
  </div>
  );
}

export default ProfilePage