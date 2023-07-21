import React from "react";
import ProfileNavBar from "./ProfileNavBar";
import FetchUser from "./FetchUser";

function ShippingInfo() {
  const user = FetchUser();
  console.log(user.shoppingCart);

  return (
    <div>
      <ProfileNavBar />
      <div className="fixed top-1 left-1 w-full bg-[#ffffffea] h-screen">
        <div className="h-full w-full mt-[60px] overflow-y-scroll bg-white flex flex-col shadow-sm">
          <h1>Shipping info</h1>
          {/* <div>
         <FetchUser />
       </div> */}
        </div>
      </div>
    </div>
  );
}

export default ShippingInfo;
