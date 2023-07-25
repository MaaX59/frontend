import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { server } from "../server";
import { AuthContext } from "../context/auth.context";

function NegotiatedProducts() {
  //const { user } = useContext(AuthContext);
  const [negotiations, setNegotiations] = useState([]);

  useEffect(() => {
    // Fetch the negotiated products when the component mounts
    const fetchNegotiatedProducts = async () => {
      try {
        const gotToken = localStorage.getItem("authToken");
        const response = await axios.get(`${server}/product/seller/negotiations`, {
          headers: { authorization: `Bearer ${gotToken}` },
        });
        setNegotiations(response.data.negotiations);
      } catch (error) {
        console.error("Error while fetching negotiated products:", error);
      }
    };

    fetchNegotiatedProducts();
  }, []);

  return (
    <div>
      <h2>Negotiated Products by Buyers:</h2>
      {negotiations.map((negotiation) => (
        <div key={negotiation._id}>
          <h3>Product Name: {negotiation.product.name}</h3>
          <p>Product Price: {negotiation.product.price}</p>
          <p>Buyer's Negotiation Price: {negotiation.negotiationPrice}</p>
          {/* You can display more details about the product or negotiation if needed */}
        </div>
      ))}
    </div>
  );
}

export default NegotiatedProducts;
