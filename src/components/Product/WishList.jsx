// import { React, useState, useContext } from "react";
// import {  useNavigate } from "react-router-dom";
// import axios from "axios";
// import { server } from "../../server";
// import { AuthContext } from "../../context/auth.context";


// function WishList() {
//     // const [email, setEmail] = useState("");
//     // const [password, setPassword] = useState("");
//     const [errorMessage, setErrorMessage] = useState(undefined);
//     // const {  setToken, authenticateUser, setIsLoggedIn } = useContext(AuthContext);

//     const navigate = useNavigate();

//     const handleSubmitWishList = async (e) => {
//         e.preventDefault();
//       //  const loginCheck = { email, password };
//         const { data } = await axios.post(`${server}/user/login`);
//        // const actualToken = data.authToken;
//        const userId = data.user._id;
//        const productId = data.product._id;
        
//         try {
//           await axios.post(`${server}/${userId}/wishlist/${productId}`, null, {
//             // headers: {
//             //   Authorization: `Bearer ${actualToken}`,
//             // },
           
//           });
//           navigate("/favourites"); 
          
//         } catch (error) {
//           if (error.response && error.response.data && error.response.data.message) {
//             setErrorMessage(error.response.data.message);
//           } else {
//             setErrorMessage('An error occurred during adding products to wishlist.');
//           }
//         }
//       };
      

//   return (
//     <div>WishList</div>
//   )
// }

// export default WishList