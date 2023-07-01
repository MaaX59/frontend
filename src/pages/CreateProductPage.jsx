import React from "react";
import CreateProduct from "../components/Product/CreateProduct.jsx";
import Navbar from "../components/navbar.jsx"

const CreateProductPage = () => {
  return (
    <div>
      <Navbar/>
      <CreateProduct/>
    </div>
  );
};

export default CreateProductPage;
