import { React, useState } from "react";
import {Link} from "react-router-dom";
import axios from "axios";
import { server } from "../../server";

const CreateProduct = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState();
  const [description, setDescription] = useState("");
  const [ratings, setRatings] = useState("");
  const [image, setImage] = useState("");
  const [seller, setSeller] = useState("");
  const [stock, setStock] = useState();


  const handleSubmit = (e) => { 
    e.preventDefault();
    const createdProduct= {
        name, 
        price,
        description,
        ratings,
        image,
        seller,
        stock,
    };
    console.log("product from frontend", createdProduct);

    axios.post(`${server}/createProduct`, createdProduct).then((res) =>{
      console.log(res)
    })
    .catch((err) =>{
      console.log(err);
    })
  
    setName("");
    setPrice();
    setDescription("");
    setRatings("");
    setImage("");
    setSeller("");
    setStock();
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          What item do you want to sell?
        </h2>
      </div>
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Product name
              </label>
              <div className="mt-1">
                <input
                  type="name"
                  name="name"
                  autoComplete="name"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="apperance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Describe your product
              </label>
              <div className="mt-1">
                <input
                  type="description"
                  name="description"
                  required
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="apperance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
              </div>
            </div>
            <div className="group relative w-full h-[40px] flex justify-center rounded-md bg-blue-600 hover:bg-blue-700 py-2 px-4 border border-transparent font-medium text-sm">
                <button type="submit">Create Sale</button>
            </div>
            
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateProduct;


