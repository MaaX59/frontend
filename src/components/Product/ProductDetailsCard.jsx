import React, { useState } from "react";
import { RxCross1 } from "react-icons/rx";
import Ratings from "./Ratings";
import {
  AiFillHeart,
  AiOutlineHeart,
  AiOutlineShoppingCart,
} from "react-icons/ai";
import Negotiate from "./Negotiate";


function ProductDetailsCard({
  setOpen,
  product,
  setClick,
  click,
  handleWishlist,
  user,
  handleCart,
  count,
  setCount,
}) {
  // const [count, setCount] = useState(1);

  const { productId } = product;
  const [select, setSelect] = useState(false);
  const [showNegotiate, setShowNegotiate] = useState(false);
  const [negotiateProduct, setNegotiateProduct] = useState(null);

  const countDown = () => {
    if (count > 1) {
      setCount(count - 1);
    }
  };
  const countUp = () => {
    setCount(count + 1);
  };

  const handleNegotiateClick = (product) => {
    setShowNegotiate(true);
    setNegotiateProduct(product);
  };

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
                  src={
                    product.images
                      ? product.images[0]
                      : "https://erp.netbizde.com/cdn/static/products/default.jpg"
                  }
                  alt={product.name}
                />
                <div className="flex">
                  <img
                    src={product.sellerAvatar}
                    alt={product.seller}
                    className="w-[50px] h-[50px] rounded-full mr-2"
                  />
                </div>
                <div className="flex items-center">
                  {" "}
                  <h3 className="pt-3 text-[15px] text-blue-400 pb-3 flex">
                    {" "}
                    {product.seller}
                  </h3>
                  <h5 className="flex flex-row">
                    {" "}
                    <Ratings num={product.ratings} />
                  </h5>
                </div>
              </div>
              <div className="flex flex-col w-full 800px:w-[50%] pt-5 pl-[5px] pr-[5px]">
                <h1 className="flex text-[30px] font-[600] font-Roboto text-[#333]">
                  {product.name}
                </h1>
                <p>{product.description}</p>
                <div className="flex pt-3">
                  <h3 className="flex font-bold text-[18px] text-[#333] font-Roboto">
                    {product.price + "$"}{" "}
                  </h3>
                </div>

                {user ? (
                  <div className="flex">
                    <button
                      className="bg-gradient-to-t from-teal-400 to-teal-500 text-white font-bold rounded-l px-4 py-2 shadow-lg hover:opacity-75 transition duration-300 ease-in-out "
                      onClick={countDown}
                    >
                      -
                    </button>
                    <span className="bg-gray-200 text-gray-800 font-medium px-4 py-[11px]">
                      {count}
                    </span>
                    <button
                      className="bg-gradient-to-t from-teal-400 to-teal-500 text-white font-bold rounded-r px-4 py-2 shadow-lg hover:opacity-75 transition duration-300 ease-in-out "
                      onClick={countUp}
                    >
                      +
                    </button>

                    {click ? (
                      <AiFillHeart
                        size={22}
                        className="cursor-pointer "
                        onClick={handleWishlist}
                        color={click ? "red" : "black"}
                        title="Remove from wishlist"
                      />
                    ) : (
                      <AiOutlineHeart
                        size={22}
                        className="cursor-pointer"
                        onClick={handleWishlist}
                        color={click ? "red" : "black"}
                        title="Add to wishlist"
                      />
                    )}
                  </div>
                ) : null}
                {user ? (
                  <div onClick={handleCart} className="w-[150px] bg-black my-3 mt-6 h-11 flex items-center justify-center rounded-[4px]">
                    <span className="text-white flex items-center">
                      Add to cart <AiOutlineShoppingCart  className="ml-l" />
                    </span>
                  </div>
                ) : null}
              </div>
              <div className="flex items-center mt-12 justify-between pr-3"></div>
            </div>
          </div>
        </div>
      ) : null}
      <div>
      {showNegotiate && negotiateProduct ? (
        <Negotiate product={product._id} />
      ) : (
        <ProductDetailsCard
          productId={productId}
          onNegotiateClick={handleNegotiateClick}
        />
      )}
    </div>
    </div>
  );
}

export default ProductDetailsCard;
