import React, {useEffect, useState} from 'react';
import axios from "axios";
import { server } from "../../server";

function SingleWishlistItem({data}) {
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
        {data}
    </div>
  )
}

export default SingleWishlistItem