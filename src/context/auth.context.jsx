import { createContext, useState, useEffect } from "react";
import axios from "axios";
import { server } from "../server";

const AuthContext = createContext();

const AuthContextWrapper = (props) => {
  const [user, setUser] = useState(null);
  const [tokenState, setTokenState] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [wishlist, setWishlist] = useState([]);

  const updateUserEmail = (email) => {
    setUser((prevUser) => ({
      ...prevUser,
      email,
    }));
  };

  const setToken = (token) => {
    localStorage.setItem("authToken", token);
    setTokenState(token);
  };

  const [cartCount, setCartCount] = useState(0);
  const [wishlistCount, setWishlistCount] = useState(0);

  const wishlistLength = async (user)=>{
    try{
      const response = await axios.get(`${server}/user/getuser/${user._id}`)
    
    const length = response.data.foundUser.wishlist.length;
     setWishlistCount(length);
    }catch(error){
      console.log(error)
    }
    
  }
  wishlistLength(user)
  const cartLength = async (user)=>{
    try{
      const response = await axios.get(`${server}/user/getuser/${user._id}`)
    
    const length = response.data.foundUser.shoppingCart.length;
     setCartCount(length);
    }catch(error){
      console.log(error)
    }
    
  }
  cartLength(user)

  const authenticateUser = async () => {
    const gotToken = localStorage.getItem("authToken");
    console.log("This is the token from the user function", gotToken);
    if (gotToken) {
      try {
        const { data } = await axios.get(`${server}/user/verify`, {
          headers: { authorization: `Bearer ${gotToken}` },
          body: {
            token: gotToken,
          },
        });
        console.log("response from verify route", data);
        setUser(data.user);
        setIsLoading(false);
        setIsLoggedIn(true);
      } catch (err) {
        console.log("There was an error on the authenticate user", err);
        setUser(null);
        setIsLoading(false);
        setIsLoggedIn(false);
      }
    }else{
        setUser(null);
        setIsLoading(false);
        setIsLoggedIn(false);
    }
  };
  const removeToken = () => {
    localStorage.removeItem("authToken");
  };
  const logOutUser = () => {
    removeToken();
    console.log("logging out")
    authenticateUser();
  };
  useEffect(() => {
    authenticateUser();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        wishlist, 
        setWishlist,
        setToken,
        tokenState,
        authenticateUser,
        isLoading,
        isLoggedIn,
        setIsLoggedIn,
        user,
        setUser,
        logOutUser,
        updateUserEmail,
        cartCount, 
        setCartCount,
        wishlistCount,
        setWishlistCount,
        wishlistLength,
        cartLength,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthContextWrapper };
