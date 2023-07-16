import React, { useState, useEffect } from "react";
import axios from "axios";
import { server } from "../../server";
//import { AuthContext } from "../../context/auth.context";

function DeleteProducts() {
    const [products, setProducts] = useState([]);
  
    useEffect(() => {
      fetchCreatedProducts();
    }, []);
  
    const fetchCreatedProducts = async () => {
        const gotToken = localStorage.getItem("authToken");
      try {
        const response = await axios.get(`${server}/product/created`, { headers: { authorization: `Bearer ${gotToken}` }});
        console.log("response", response.data)
        setProducts(response.data.products);
      } catch (error) {
        console.log('Error fetching created products:', error);
      }
    };
  
    const deleteProduct = async (productId) => {
        const gotToken = localStorage.getItem("authToken");
      try {
        const response = await axios.delete(`${server}/product/:id`,{ headers: { authorization: `Bearer ${gotToken}` }});
        if (response.status === 200) {
          setProducts(products.filter((product) => product._id !== productId));
        }
      } catch (error) {
        console.log('Error deleting product:', error);
      }
    };
  
    return (
      <div>
        {products.map((product) => (
          <div key={product._id}>
            <p>{product.name}</p>
            <button onClick={() => deleteProduct(product._id)}>Delete</button>
          </div>
        ))}
      </div>
    );
  }

  export default DeleteProducts