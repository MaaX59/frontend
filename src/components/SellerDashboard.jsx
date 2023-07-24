import React , { useState } from 'react'
import CreateProduct from "./Product/CreateProduct"

import ProductCreated from './Product/ProductCreated';
import { useNavigate, Link } from 'react-router-dom';
import ProfileNavBar from './ProfileNavBar';




function SellerDashboard() {
  const [showCreateProductForm, setShowCreateProductForm] = useState(false);
 
  const [showProductCreated, setShowProductCreated] = useState(false);
 

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
  
  
       {showProductCreated && <ProductCreated />}
  </div>
  </div>
  
  );
}

export default SellerDashboard