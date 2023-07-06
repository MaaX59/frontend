import { React, useEffect, useState } from "react";
import axios from "axios";
import { server } from "../../server.js";
import ProductCard from "./ProductCard.jsx";

function AllProducts() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get(`${server}/product/allproducts`);
      setProducts(response.data.productsFromDb);
      console.log("this is the product list", response.data.productsFromDb);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  return (
    <div>
      <div className="flex flex-wrap bg-gray-100">
        {products.map((product, index) => (
          <ProductCard product={product} key={index} />
        ))}
      </div>
    </div>
    // <div>
    //   <h1>Welcome to the Homepage</h1>

    //   {Array.isArray(products) && products.length > 0 ? (
    //     <ul>
    //       {products.map((Product) => (
    //         <li key={Product._id}>{Product.name}</li>
    //       ))}
    //     </ul>
    //   ) : (
    //     <p>No products found</p>
    //   )}
    // </div>
  );
}

export default AllProducts;
