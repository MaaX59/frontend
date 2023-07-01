import {React, useEffect, useState} from "react";
import axios from "axios";
import {server} from "../../server.js";

function AllProducts() {
    const [products, setProducts] = useState([]);


    
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



  return (
    <div>
        <h1>Welcome to the Homepage</h1>
        <ul>
          {products.map((Product) => (
           <li key={Product._id}>{Product.name}</li>
      ))}
        </ul>



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
