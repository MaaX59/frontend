import React,{useContext} from 'react'
import ProfileNavBar from './ProfileNavBar'
import {AuthContext} from "../context/auth.context.jsx"

function ProfilePage() {
const {user} = useContext(AuthContext);
console.log(user);
  return (
    
    <div>
    <ProfileNavBar/>
    Profile Page
    </div>
  )
}

export default ProfilePage