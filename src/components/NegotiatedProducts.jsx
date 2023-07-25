import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { server } from "../server";
import { AuthContext } from "../context/auth.context";
import ProfileNavBar from "./ProfileNavBar";

function NegotiatedProducts() {
  const { user } = useContext(AuthContext);
  const [negotiatedProducts, setNegotiatedProducts] = useState([]);

  const fetchNegotiatedProducts = async () => {
    try {
      const gotToken = localStorage.getItem("authToken");
      const response = await axios.get(`${server}/product/seller/negotiations`, {
        headers: { authorization: `Bearer ${gotToken}` },
      });
      setNegotiatedProducts(response.data.negotiatedProducts);
    } catch (error) {
      console.error("Error while fetching negotiated products:", error);
    }
  };

  useEffect(() => {
    fetchNegotiatedProducts();
  }, []);

  const handleAccept = async (productId) => {
    try {
      const gotToken = localStorage.getItem("authToken");
      await axios.patch(
        `${server}/product/negotiate/${productId}`,
        { accepted: true },
        { headers: { authorization: `Bearer ${gotToken}` } }
      );
      // Refresh the negotiated products after accepting
      fetchNegotiatedProducts();
    } catch (error) {
      console.error("Error while accepting negotiation:", error);
    }
  };

  const handleDecline = async (productId) => {
    try {
      const gotToken = localStorage.getItem("authToken");
      await axios.patch(
        `${server}/product/negotiate/${productId}`,
        { accepted: false },
        { headers: { authorization: `Bearer ${gotToken}` } }
      );
      // Refresh the negotiated products after declining
      fetchNegotiatedProducts();
    } catch (error) {
      console.error("Error while declining negotiation:", error);
    }
  };

  return (
    <>
      <div>
        <ProfileNavBar />
      </div>
      <div className="max-w-3xl mx-auto px-4 py-8 mt-10">
        <h2 className="text-2xl font-semibold mb-4">Negotiated Products by Buyers:</h2>
        {negotiatedProducts.length === 0 ? (
          <p className="text-gray-500">No negotiated products found.</p>
        ) : (
          <ul className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
            {negotiatedProducts.map((negotiation) => (
              <li key={negotiation._id} className="border p-4 rounded-lg shadow-sm">
                <p className="text-lg font-semibold">Product Name: {negotiation.productName}</p>
                <p className="text-gray-600">Demanding Price: {negotiation.demandingPrice}</p>
                <div className="mt-4 space-x-2">
                  <button
                    onClick={() => handleAccept(negotiation.productId)}
                    className="bg-green-300 text-white px-2 py-1 rounded-lg"
                  >
                    Accept
                  </button>
                  <button
                    onClick={() => handleDecline(negotiation.productId)}
                    className="bg-red-300 text-white px-2 py-1 rounded-lg"
                  >
                    Decline
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
  );
}

export default NegotiatedProducts;
