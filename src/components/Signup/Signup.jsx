import { React, useState, useContext } from "react";
import { Link, useNavigate  } from "react-router-dom";
import { RxAvatar } from "react-icons/rx";
import axios from "axios";
import { server } from "../../server";
import { AuthContext } from "../../context/auth.context";
import service from "../../api/service";

const Signup = ({ props }) => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [avatar, setAvatar] = useState("");

  const navigate = useNavigate();
  const { user, setToken, authenticateUser, setIsLoggedIn } =
    useContext(AuthContext);
  const [isExistingUser, setIsExistingUser] = useState(false);


  // else if (!passwordPattern.test(password)) {
  //   setPasswordError(true);
  //   return;
  const handleFileUpload = (e) => {
    const uploadData = new FormData();
    uploadData.append("avatar", e.target.files[0]);

    service
      .uploadImage(uploadData)
      .then((response) => {
        console.log("image should be here",response)
        setAvatar(response.fileUrl);
      })
      .catch((err) => console.log("Error while uploading the file: ", err));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const uploadData = new FormData();
  //  const passwordPattern = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,}$/;
    if (user && user.email === email) {
      setIsExistingUser(true);
    } else
    {
      uploadData.append("name", name);
      uploadData.append("email", email);
      uploadData.append("password", password);
      uploadData.append("avatar", e.target.imageURL);
   
  
   
      console.log("new user", uploadData);

      axios
        .post(`${server}/user/signup`, uploadData)
        .then((res) => {
          console.log(res, "<===");
          const actualToken = res.data.authToken;
          setToken(actualToken);
          authenticateUser();
          setIsLoggedIn(true);
          navigate("/profile");
        
        })
        .catch((err) => {
          if (err.response && err.response.status === 400) {    
            setIsExistingUser(true);
          } else {
            console.log('Error:', err);
          }
        });

      setEmail("");
      setName("");
      setPassword("");
      setAvatar("");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Register as a new User
        </h2>
      </div>
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
      
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Full Name
              </label>
              <div className="mt-1">
                <input
                  type="text"
                  name="text"
                  autoComplete="name"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="apperance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Enter Your Email
              </label>
              <div className="mt-1">
                <input
                  type="email"
                  name="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="apperance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Enter Your Password
              </label>
              <div className="mt-1">
                <input
                  type="password"
                  name="password"
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="apperance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700"></label>
              <div className="mt-2 flex items-center">
                <span className="inline-block h-8 w-8 rounded-full overflow-hidden">
                  {avatar ? (
                    <img
                      src={URL.createObjectURL(avatar)}
                      alt="avatar"
                      className="h-full w-full object-cover rounded-full"
                    />
                  ) : (
                    <RxAvatar className="h-8 w-8" />
                  )}
                </span>
                <label className="ml-5 flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
                  <span>Upload a file</span>
                  <input
                    type="file"
                    name="avatarURL"
                    id="upload"
                    // accept=".jpg,.jpeg,.png"
                    onChange={handleFileUpload}
                    className="sr-only"
                  />
                </label>
              </div>
            </div>
            <div>
              <button
                type="submit"
                className="group relative w-full h-[40px] flex justify-center rounded-md bg-blue-600 hover:bg-blue-700 py-2 px-4 border border-transparent font-medium text-sm"
              >
                Submit
              </button>
            </div>
            {isExistingUser && (
        <p>Email already exists! Please Sign In</p>
      )}

      {/* {passwordError && (
      <p>Password should be at least 6 characters long and contain at least one number and one special character.</p>
    )} */}
            <div className=" flex w-full">
              <h4> Already have an Account?</h4>
              <Link to="/login" className="text-blue-600 pl-2">
                Sign In
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;
