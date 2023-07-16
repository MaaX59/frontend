import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { server } from '../../server';

import { Link } from 'react-router-dom';
import service from "../../api/service";
import ProfileNavBar from "../ProfileNavBar"


function UpdateProduct() {
  const [updateSuccess, setUpdateSuccess] = useState(false);
  const [updateError, setUpdateError] = useState(false);
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [seller, setSeller] = useState("");
  const [stock, setStock] = useState(0);
  const [category, setCategory] = useState("");
  
  const [isFormFilled, setIsFormFilled] = useState(false);
  const [product, setProduct] = useState({
    name: '',
    description: '',
    price: 0,
    images: [],
    category: '',
    stock: 0,
    seller: ''
  });

  const handleFileUpload = (e) => {
    // console.log("The file to be uploaded is: ", e.target.files[0]);

    const uploadData = new FormData();

    // imageUrl => this name has to be the same as in the model since we pass
    // req.body to .create() method when creating a new movie in '/api/movies' POST route
    uploadData.append("imageUrl", e.target.files[0]);

    service
      .uploadImage(uploadData)
      .then((response) => {
        // console.log("response is: ", response);
        // response carries "fileUrl" which we can use to update the state
        setImageUrl(response.fileUrl);
      })
      .catch((err) => console.log("Error while uploading the file: ", err));
  };

  useEffect(() => {
   
    updateProduct();
  }, []);

 
  const gotToken = localStorage.getItem("authToken");
  const updateProduct = async (e) => {
   
   if (isFormFilled) {
   try{
      const response = await axios.put(`${server}/product/:id`, { headers: { authorization: `Bearer ${gotToken}` }});
      setProduct(response.data.product);
      setUpdateSuccess(true);
      setUpdateError(false);

      console.log('Product updated:', response.data.product);
    } catch (error) {
      console.log('Error updating product:', error);
      setUpdateSuccess(false);
      setUpdateError(true);
    }
  }
  };

  return (
    <div>
    <ProfileNavBar/>
    <div className=" flex flex-col items-center">
    <div className="mt-20">
    <h1 className="text-2xl font-bold mb-4 text-center">Update Product</h1>
      <form onSubmit={updateProduct}>
        <br />
        <div>
          <label className="pb-2">
            Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="name"
            value={product.name}
            className="w-full px-3 py-2 border border-gray-300 rounded-sm focus:outline-none"
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your product name"
          />
        </div>
        <br />
        <div>
          <label className="pb-2">
            Description <span className="text-red-500">*</span>
          </label>

          <input
            type="text"
            name="Description"
            value={description}
            className="mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Description"
          />
        </div>
        <br />
        <div>
          <label className="pb-2">
            Category <span className="text-red-500"></span>
          </label>
          <select
            className="w-full mt-2 border h-[35px] rounded-[5px]  border-gray-300  placeholder-gray-400 focus:outline-none hover:ring-blue-500 hover:border-blue-500"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="Choose a category">Choose a category</option>
            <option value="Electronics">Electronics</option>
            <option value="Mobile Phones">Mobile Phones</option>
            <option value="Laptops">Laptops</option>
            <option value="Accessories">Accessories</option>
            <option value="Headphones">Headphones</option>
            <option value="Food">Food</option>
            <option value="Books">Books</option>
            <option value="Clothes/Shoes">Clothes/Shoes</option>
            <option value="Beauty/Health">Beauty/Health</option>
            <option value="Sports">Sports</option>
            <option value="Outdoor">Outdoor</option>
            <option value="Home">Home</option>
            <option value="Other">Other</option>
          </select>
        </div>
        <br />
        <div>
          <label className="pb-2">
            Price <span className="text-red-500">*</span>
          </label>
          <input
            type="number"
            name="price"
            value={price}
            className="mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none hover:ring-blue-500 hover:border-blue-500 sm:text-sm"
            onChange={(e) => setPrice(e.target.value)}
            placeholder="Price"
          />
        </div>
        <br />
        <div>
          <label className="pb-2">
            Amount<span className="text-red-500"></span>
          </label>
          <input
            type="number"
            name="Stock"
            value={stock}
            className="mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none hover:ring-blue-500 hover:border-blue-500 sm:text-sm"
            onChange={(e) => setStock(e.target.value)}
            placeholder="Amount to sell"
          />
        </div>
        <br />
        <div>
          <label className="pb-2">
            Upload Images <span className="text-red-500">*</span>
          </label>

          <br />
          <div className="w-full flex items-center flex-wrap">
            <input
              type="file"
              id="upload"
              name="imageURL"
              // className="hidden"
              multiple
              onChange={handleFileUpload}
            />
            {/* <lable htmlFor="upload">
            <AiFillFileImage size={30} className="mt-3 " color="#555" />
          </lable> */}
            {/* why don´t you fucking work!?!?!?! shit code */}

            {imageUrl &&
              imageUrl.map((i) => (
                <img
      src={URL.createObjectURL(imageUrl[imageUrl.length - 1])}
      alt=""
      className="h-[120px] w-[120px] object-cover m-2"
    />
              ))}
          </div>
        </div>
        <br />
        <div>
          <input
            type="submit"
            value="Update"
            className="mt-2 cursor-pointer appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none hover:ring-blue-500 hover:border-blue-500 sm:text-sm"
          />
        </div>
      </form>
      </div>
      
      {updateSuccess && <p>Product updated successfully!</p>}
      {updateError && <p>Error updating product.</p>}

      <Link to="/seller-dashboard" className="mt-4 text-blue-500">
        Go to Seller Dashboard
      </Link>
    </div>
    </div>
  );
}

export default UpdateProduct;
