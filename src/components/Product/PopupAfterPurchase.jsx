import React from 'react';
import { RxCross1 } from "react-icons/rx";

function PopupAfterPurchase({setPopupOpen}) {
  return (
     <div className="bg-[#fff]">
    
      <div className="fixed w-full h-screen top-0 left-0 bg-[#0000030] z-40 flex items-center justify-center ">
        <div className="w-[90%] 800px:w-[60%] h-[90vh] overflow-y-scroll 800px:h-[75vh] bg-white rounded-md shadow-sm relative p-4">
          <RxCross1
            size={30}
            className="blsolute right-3 tyo-3 z-50"
            onClick={() => setPopupOpen(false)}
          />
          <div className="block w-full 800px:flex">
            <h1>Purchase Complete</h1>
            
          </div>
        </div>
      </div>
    
  </div>
  )
}

export default PopupAfterPurchase