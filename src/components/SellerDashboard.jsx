import React , { useState } from 'react'
import CreateProduct from "./Product/CreateProduct"

import ProductCreated from './Product/ProductCreated';
import { useNavigate, Link } from 'react-router-dom';
import ProfileNavBar from './ProfileNavBar';




function SellerDashboard() {
  const [showCreateProductForm, setShowCreateProductForm] = useState(false);
  // const [showOptions, setShowOptions] = useState(false);
  const [showProductCreated, setShowProductCreated] = useState(false);
  // const [showDelete, setShowDelete] = useState(false);
  // const [showEdit, setShowEdit] = useState(false);
  // const navigate = useNavigate();

  // const handleToggleForm = () => {
  //   setShowCreateProductForm(!showCreateProductForm);
  // };

  // const handleToggleOptions = () => {
  //   setShowOptions(!showOptions);
  // };

  // const handleToggleDelete = () => {
  //   setShowDelete(!showDelete);
  // };

  // const handleToggleEdit = () => {
  //   setShowEdit(!showEdit);
  // };

  const handleToggleProductCreated = () => {
    setShowProductCreated(!showProductCreated);
  };


  return (
    <div><ProfileNavBar/>
    
    <div className='mt-20 align-middle'>
   
    <div className="flex justify-center gap-4 mt-4">
    <Link to="/create-product" className="px-4 py-2 bg-blue-500 text-white rounded-lg">
        Create Product
      </Link>
      <button onClick={handleToggleProductCreated} className="px-4 py-2 bg-blue-500 text-white rounded-lg">
       View and Update
      </button>
    
    </div>
  
    {/* {showCreateProductForm && (
      <div className="mt-4">
        <CreateProduct />
      </div>
    )} */}
  
    {/* {showOptions && (
  <div className="flex flex-col items-center mt-4">
    <button
      onClick={handleToggleDelete}
      className="px-4 py-2 bg-red-500 text-white rounded"
    >
      Delete
    </button>
    {showDelete && (
      <div className="fixed inset-0 flex items-center justify-center white  bg-opacity-75">
        <div className="bg-white p-4 rounded">
          <DeleteProducts />
          <button
              onClick={handleToggleDelete}
              className="px-4 py-2 bg-blue-500 text-white rounded mt-4"
            >
              Close
            </button>
        </div>
      </div>
    )}
 
  </div>
)} */}
       {showProductCreated && <ProductCreated />}
  </div>
  </div>
  
  );
}

export default SellerDashboard