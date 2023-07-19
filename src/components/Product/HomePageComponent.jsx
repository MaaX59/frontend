import {React, useEffect, useState} from "react";
import axios from "axios";
import {server} from "../../server.js";
import ProductCard from "./ProductCard.jsx";
import SearchProduct from "../SearchProduct.jsx";
import Navbar from "../navbar.jsx";
import Footer from "../Footer.jsx";
import Pagination from "react-js-pagination";



function HomePageComponent() {

  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 10;

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

     <Navbar handleFilterByCategory={handleFilterByCategory}  />
       <SearchProduct handleSearch={handleSearch} />
      <div className="flex flex-wrap bg-gray-100">
     
      {
  filteredProducts.length > 0 ? (
    filteredProducts.map((product, index) => (
      <ProductCard product={product} key={index} />
    ))
  ) : productsToDisplay.length > 0 ? (
    productsToDisplay.map((product, index) => (
      <ProductCard product={product} key={product._id} />
    ))
  ) : (
    <div className="text-center mt-4">No products found</div>
  )
}

      </div>
      <div className="flex justify-center mt-5 flex-row">
        <Pagination
          activePage={currentPage}
          itemsCountPerPage={itemsPerPage}
          totalItemsCount={filteredProducts.length > 0 ? filteredProducts.length : products.length}
          pageRangeDisplayed={5}
          onChange={handlePageChange}
          itemClass="page-item"
          linkClass="page-link"
          innerClass="pagination"
          activeClass="active"
          activeLinkClass="font-bold"
          itemClassLast="last"
          itemClassNext="next"
          itemClassPrev="prev"
        />
      </div> 

     <div>
     <Footer/>
     </div>
     
  </div>
  );
}

export default HomePageComponent;
