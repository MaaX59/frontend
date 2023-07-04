import React, { useState } from "react";
import { RxCross1 } from "react-icons/rx";
import Ratings from "./Ratings";



function ProductDetailsCard({ setOpen, product }) {
  const [count, setCount] = useState(1);
  const [click, setClick] = useState(false);
  const [select, setSelect] = useState(false);

  return (
    <div className="bg-[#fff]">
      {product ? (
        <div className="fixed w-full h-screen top-0 left-0 bg-[#0000030] z-40 flex items-center justify-center ">
          <div className="w-[90%] 800px:w-[60%] h-[90vh] overflow-y-scroll 800px:h-[75vh] bg-white rounded-md shadow-sm relative p-4">
            <RxCross1
              size={30}
              className="blsolute right-3 tyo-3 z-50"
              onClick={() => setOpen(false)}
            />
            <div className="block w-full 800px:flex">
              <div className="w-full 800px:w-[50%]">
                <img // src={product.images[0].image}
                  //src={`${server}${product.images && product.images[0]}`}
                  src="https://www.leparisien.fr/resizer/fGXimQvLycC2XjTOb9nran3rDcU=/1248x782/filters:focal(1184x745:1194x755)/cloudfront-eu-central-1.images.arcpublishing.com/leparisien/NJE5TPKX7NDY3AL7MWIJJEXZOA.jpg"
                  alt={product.name}
                />
                <div className="flex">
                    <img src={product.sellerAvatar} alt={product.seller} className="w-[50px] h-[50px] rounded-full mr-2"/>
                </div>
                <div className="flex items-center"> <h3 className="pt-3 text-[15px] text-blue-400 pb-3 flex"> {product.seller}
                  </h3>
                  <h5 className="flex flex-row" > <Ratings num={product.ratings  } /></h5>
                  
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}

export default ProductDetailsCard;
