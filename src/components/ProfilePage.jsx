import React,{useContext} from 'react'
import ProfileNavBar from './ProfileNavBar'
import {AuthContext} from "../context/auth.context.jsx"
import AllProducts from './Product/AllProducts';


function ProfilePage() {
const {user} = useContext(AuthContext);


console.log("user is",user);
  return (
    
    <div>
        

    <ProfileNavBar/>
    <h1>ProfilePage</h1>
    <AllProducts/>

   
    </div>
  )
}

export default ProfilePage