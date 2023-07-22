import React , {useState}from "react";
import ProfileNavBar from "./ProfileNavBar";
import FetchUser from "./FetchUser";

function ShippingInfo() {
  const user = FetchUser();

  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [postcode, setPostcode] = useState("");
  const [phonenumber, setPhonenumber] = useState("")
  

  const handleSubmit = ()=>{

  }

  return (
    <div>
      <ProfileNavBar />
      <div className="fixed top-1 left-1 w-full bg-[#ffffffea] h-screen">
        <div className="h-full w- mt-[60px] overflow-y-scroll bg-white flex flex-col shadow-sm">
          <h1>Shipping info</h1>
          <div className="border shadow-sm w-[1000px]">
            <form onSubmit={handleSubmit} className="">
            <div className="w-[300px]">
              <label className="block w-[300px] text-sm font-medium text-gray-700">
                Name of recipient
              </label>

              <div className="mt-1">
                <input
                  type="text"
                  name="name"
                  autoComplete="name"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="apperance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
              </div>
            </div>
            <div className="w-[400px]">
              <label className="block w-[400px] text-sm font-medium text-gray-700">
                Street address
              </label>
              <div className="mt-1">
                <input
                  type="text"
                  name="address"
                  autoComplete="address"
                  required
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="apperance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
              </div>
            </div>
            <div className="w-[300px]">
              <label className="block w-[300px] text-sm font-medium text-gray-700">
                City
              </label>

              <div className="mt-1">
                <input
                  type="text"
                  name="city"
                  autoComplete="city"
                  required
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className="apperance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
              </div>
            </div>
            <div className="w-[400px]">
              <label className="block w-[300px] text-sm font-medium text-gray-700">
                Country
              </label>

              <div className="mt-1">
                <input
                  type="text"
                  name="country"
                  autoComplete="country"
                  required
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                  className="apperance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
              </div>
            </div> 

            <div className="w-[300px]">
              <label className="block w-[300px] text-sm font-medium text-gray-700">
                Post Code
              </label>

              <div className="mt-1">
                <input
                  type="text"
                  name="postcode"
                  autoComplete="postcode"
                  required
                  value={postcode}
                  onChange={(e) => setPostcode(e.target.value)}
                  className="apperance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
              </div>
            </div>

            <div className="w-[300px]">
              <label className="block w-[300px] text-sm font-medium text-gray-700">
                Phone Number
              </label>

              <div className="mt-1">
                <input
                  type="text"
                  name="phonenumber"
                  autoComplete="phonenumber"
                  required
                  value={phonenumber}
                  onChange={(e) => setPhonenumber(e.target.value)}
                  className="apperance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
              </div>
            </div>
            <div>
              <button
                type="submit"
                className="group relative w-[100px] h-[40px] flex justify-center rounded-md bg-blue-600 hover:bg-blue-700 py-2 px-4 border border-transparent font-medium text-sm"
              >
                Submit
              </button>
            </div>

            </form>
          </div>

         
        </div>
      </div>
    </div>
  );
}

export default ShippingInfo;
