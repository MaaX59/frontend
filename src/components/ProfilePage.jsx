import React,{useContext} from 'react'
import ProfileNavBar from './ProfileNavBar'
import {AuthContext} from "../context/auth.context.jsx"
import AllProducts from './Product/AllProducts';
import SearchProduct from '../components/SearchProduct';

function ProfilePage() {
const {user} = useContext(AuthContext);

console.log("user is",user);
  return (
    
    <div>

    <ProfileNavBar/>
    <h1>ProfilePage</h1>
    <SearchProduct />
    <AllProducts/>
    </div>
  )
}

export default ProfilePage