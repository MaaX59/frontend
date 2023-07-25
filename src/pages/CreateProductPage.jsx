import React from "react";
import CreateProduct from "../components/Product/CreateProduct.jsx";
import ProfileNavBar from "../components/ProfileNavBar.jsx"
;

const CreateProductPage = () => {
  return (
    <div>
      <ProfileNavBar/>
      <CreateProduct/>
    </div>
  );
};

export default CreateProductPage;
