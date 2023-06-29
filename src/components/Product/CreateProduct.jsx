import { React, useState } from "react";
import axios from "axios";
import { server } from "../../server";

const CreateProduct = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [seller, setSeller] = useState("");
  const [stock, setStock] = useState(0);
  const [category, setCategory] = useState("");
  // const [ratings, setRatings] = useState("");
  // const [numberOfReviews, setNumberOfReviews] = useState("");
  // const [review, setReview] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const createdProduct = {
      name,
      price,
      description,
      image,
      seller,
      stock,
      category,
      // numberOfReviews,
      // ratings,
      // review
    };
    console.log("product from frontend", createdProduct);

    axios
      .post(`${server}/createProduct`, createdProduct)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });

    setName("");
    setPrice(0);
    setDescription("");
    
    setImage("");
    setSeller("");
    setStock();
    setCategory("");
    // setNumberOfReviews(0);
    // setReview([]);
    // setRatings("");


  };

  return (
    <div className='w-[90%] 800px:w-[50%] bg-white shadow h-[80vh] rounded-[4px] p-3 overflow-y-scroll'>
      <h5 className='text-[30px] '>
        Create Product</h5>

    </div>
    
  )

  };
export default CreateProduct;
