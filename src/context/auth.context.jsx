import { createContext, useState, useEffect } from "react";
import axios from "axios";
import { server } from "../server";

const AuthContext = createContext();

const AuthContextWrapper = (props) => {
  const [user, setUser] = useState(null);
  const [tokenState, setTokenState] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

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
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthContextWrapper };
