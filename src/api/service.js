import axios from "axios";
import { server } from "../server";
 
const api = axios.create({
  // make sure you use PORT = 5005 (the port where our server is running)
  baseURL: `${server}/product`
  // withCredentials: true // => you might need this option if using cookies and sessions
});
 
const errorHandler = (err) => {
  throw err;
};

const uploadImage = (file) => {
    return api.post("/newproduct", file)
      .then(res => res.data)
      .catch(errorHandler);
  };

  export default {uploadImage}