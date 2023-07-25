import React, { useState,useContext} from 'react';
import ProfileNavBar from './ProfileNavBar'
import { AuthContext } from "../context/auth.context.jsx";
import axios from 'axios';
import { server } from '../server';
function EditUser() {
  const { user, updateUserEmail } = useContext(AuthContext);
  console.log(user);

  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [password, setPassword] = useState(user.password);
  const [avatar, setAvatar] = useState(user.avatar);

  // useEffect(() => {
  //   setName(updatedUser.name);
  //   setEmail(user.email);
  //   setPassword(user.password);
  //   setAvatar(user.avatar);
  // }, [user]);
 

  const handleSubmit =  async (e) => {
    e.preventDefault();

    const updatedUser = {
      id: user._id,
      name,
      email,
      password,
      avatar
    };
    // setName(updatedUser.name);
    // setEmail(user.email);
    // setPassword(user.password);
    //  setAvatar(user.avatar);

    try {
      const gotToken = localStorage.getItem("authToken");
      const response = await axios.put(`${server}/user/${user._id}`,updatedUser,{ headers: { authorization: `Bearer ${gotToken}` }} );

      console.log('Updated User Data:', response.data);
      updateUserEmail(updatedUser.email);
    } catch (error) {
      console.error('Error updating user:', error);
    }
   
  };

  
  

  
  return (
    <div className="edit-user-container min-h-screen flex items-center justify-center">
    <ProfileNavBar />
    <form onSubmit={handleSubmit} className="edit-user-form bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
      <div className="mb-4">
        <label htmlFor="Name" className="block text-gray-700 font-bold mb-2">
          Name:
        </label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>

      <div className="mb-4">
        <label htmlFor="email" className="block text-gray-700 font-bold mb-2">
          Email:
        </label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>

      {/* <div className="mb-4">
        <label htmlFor="password" className="block text-gray-700 font-bold mb-2">
          Password:
        </label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>

   
      <div className="mb-4">
        <label htmlFor="avatar" className="block text-gray-700 font-bold mb-2">
          Avatar:
        </label>
        <input
          type="text"
          id="avatar"
          value={avatar}
          onChange={(e) => setAvatar(e.target.value)}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>  */}

      <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" onSubmit={handleSubmit}>
        Update
      </button>
    </form>
  </div>
);
}


export default EditUser