import React, { useState, useEffect, useContext } from 'react';
import ProfileNavBar from '../ProfileNavBar';
import axios from 'axios';
import { server } from '../../server';
import { AuthContext } from '../../context/auth.context';

function Negotiate({ productId }) {
  const { user } = useContext(AuthContext);

  const [demandingPrice, setDemandingPrice] = useState('');
  const [createdProducts, setCreatedProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [error, setError] = useState('');
  const [isUserProduct, setIsUserProduct] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    // Fetch the created products from the backend
    const fetchCreatedProducts = async () => {
      try {
        const response = await axios.get(`${server}/product/allproducts`);
        const allProducts = response.data.productsFromDb;
        console.log("all products", allProducts);
        
           const userProducts = allProducts.filter(
      (product) => product.seller === user._id && product.negotiable
    );
    console.log("userProducts",userProducts );

    const otherUserProducts = allProducts.filter(
      (product) => product.seller !== user._id && product.negotiable
    );
    console.log("otherUserProducts",otherUserProducts);

    setIsUserProduct(userProducts.length > 0);
    setCreatedProducts(isUserProduct ? otherUserProducts: userProducts );
      } catch (error) {
        console.error('Error while fetching created products:', error);
      }
    };

    fetchCreatedProducts();
  }, [user._id, isUserProduct]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectedProduct) {
      setError('Please select a product to negotiate.');
      return;
    }

    const enteredPrice = parseFloat(demandingPrice);
    console.log('Entered price:', enteredPrice);
    console.log('Selected product price:', selectedProduct.price);

    if (enteredPrice > selectedProduct.price) {
      setError('Please enter a demanding price less than the original price.');
      console.error('Entered demanding price cannot be greater than the price of the product.');
      return;
    }

    const data = {
        productName:selectedProduct.name,
      productId: selectedProduct._id,
      negotiationPrice: parseFloat(demandingPrice),
      _id: user._id,
      seller: selectedProduct.seller,
    };

   console.log("new data", data);

    console.log('negotiationPrice', data);
    try {
      const gotToken = localStorage.getItem('authToken');
      const response = await axios.post(`${server}/product/negotiate`, data, {
        headers: { authorization: `Bearer ${gotToken}` },
      });
      console.log(response.data);
      setSuccessMessage('Product demanded successfully!');
      setDemandingPrice('');
      setSelectedProduct(null);
      setError('');
    } catch (error) {
      console.error('Error while negotiating:', error);
    }
  };

  return (
    <div>
      <ProfileNavBar />
      <div className="flex justify-center items-center h-screen" style={{ background: '#f0f0f0' }}>
        <div className="bg-white p-6 rounded-lg shadow-lg" style={{ maxWidth: '400px' }}>
          <h2 className="text-2xl font-semibold text-center mb-4">Enter Demanding Price</h2>
          {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="demandingPrice">
                Demanding Price:
              </label>
              <input
                type="number"
                id="demandingPrice"
                name="demandingPrice"
                className="w-full px-3 py-2 border border-gray-300 rounded-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter the demanding price"
                value={demandingPrice}
                onChange={(e) => setDemandingPrice(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="selectProduct">
                Select Product:
              </label>
              <select
                id="selectProduct"
                name="selectProduct"
                className="w-full px-3 py-2 border border-gray-300 rounded-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                value={selectedProduct ? selectedProduct._id : ''}
                onChange={(e) => {
                  const productId = e.target.value;
                  const selected = createdProducts.find((product) => product._id === productId);
                  setSelectedProduct(selected);
                }}
              >
                <option value="">Select a product</option>
                {createdProducts.map((product) => (
                  <option key={product._id} value={product._id}>
                    {product.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex justify-center">
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:bg-blue-700"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Negotiate;
