import { React, useState, useContext } from "react";
import axios from "axios";
import { server } from "../../server";
import { AuthContext } from "../../context/auth.context";
// import { AiFillFileImage } from "react-icons/ai";

const CreateProduct = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState("");
  const [image, setImage] = useState([]);
  const [seller, setSeller] = useState("");
  const [stock, setStock] = useState(0);
  const [category, setCategory] = useState("");
  // const [ratings, setRatings] = useState("");
  // const [numberOfReviews, setNumberOfReviews] = useState("");
  // const [review, setReview] = useState([]);

  const { isLoading, isLoggedIn } = useContext(AuthContext);
  const { user, setUser } = useContext(AuthContext);

  // console.log(user.email)
  // const userEmail = user.email;

  const handleImageChange = (e) => {
    e.preventDefault();
    let image = Array.from(e.target.files);
    setImage((prevImages) => [...prevImages, ...image]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const createdProduct = {
      name,
      price,
      description,
      image,
      seller:user.email,
      stock,
      category,
      // numberOfReviews,
      // ratings,
      // review
    };
    
    console.log("product from frontend", createdProduct);

    axios
      .post(`${server}/product/newproduct`, createdProduct)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });

    setName("");
    setPrice(0);
    setDescription("");
    setCategory("");
    setImage([]);
    setSeller("");
    setStock(0);

    // setNumberOfReviews(0);
    // setReview([]);
    // setRatings("");
  };

  return (
    <div className="w-[90%] 800px:w-[50%] bg-white shadow h-[80vh] rounded-[4px] p-3 overflow-y-scroll">
      <h5 className="text-[30px] font-Poppins text-center">Create Product</h5>
      <form onSubmit={handleSubmit}>
        <br />
        <div>
          <lable className="pb-2">
            Name <span className="text-red-500">*</span>
          </lable>
          <input
            type="text"
            name="name"
            value={name}
            className="mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your product name"
          />
        </div>
        <br />
        <div>
          <lable className="pb-2">
            Description <span className="text-red-500">*</span>
          </lable>

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
          <lable className="pb-2">
            Category <span className="text-red-500"></span>
          </lable>
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
          <lable className="pb-2">
            Price <span className="text-red-500">*</span>
          </lable>
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
          <lable className="pb-2">
            Amount<span className="text-red-500"></span>
          </lable>
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
          <lable className="pb-2">
            Upload Images <span className="text-red-500">*</span>
          </lable>

          <br />
          <div className="w-full flex items-center flex-wrap">
            <input
              type="file"
              id="upload"
              // className="hidden"
              multiple
              onChange={handleImageChange}
            />
            {/* <lable htmlFor="upload">
            <AiFillFileImage size={30} className="mt-3 " color="#555" />
          </lable> */}
            {/* why don´t you fucking work!?!?!?! shit code */}

            {image &&
              image.map((i) => (
                <img
                  src={URL.createObjectURL(i)}
                  key={i}
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
            value="Create"
            className="mt-2 cursor-pointer appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none hover:ring-blue-500 hover:border-blue-500 sm:text-sm"
          />
        </div>
      </form>
    </div>
  );
};
export default CreateProduct;
