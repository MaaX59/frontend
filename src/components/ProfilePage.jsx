import React,{useContext} from 'react'
import ProfileNavBar from './ProfileNavBar'
import {AuthContext} from "../context/auth.context.jsx"
import AllProducts from './Product/AllProducts';
import SearchProduct from '../components/SearchProduct';
import SellerDashboard from './SellerDashboard';
import ProductCreated from './Product/ProductCreated';

function ProfilePage() {
const {user} = useContext(AuthContext);

console.log("user is",user);
  return (
    
    <div>

    <ProfileNavBar/>
    
    <SellerDashboard/>
    

    </div>
  )
}

export default ProfilePage