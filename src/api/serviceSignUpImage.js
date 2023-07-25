import axios from "axios";
 
const api = axios.create({
  // make sure you use PORT = 5005 (the port where our server is running)
  baseURL: "http://localhost:8000/user"
  // withCredentials: true // => you might need this option if using cookies and sessions
});
 
const errorHandler = (err) => {
  throw err;
};

const uploadSignUpImage = (file) => {
    return api.post("/signup", file)
      .then(res => res.data)
      .catch(errorHandler);
  };

  export default {uploadSignUpImage}