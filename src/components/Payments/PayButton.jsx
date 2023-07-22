import axios from "axios";
import { useSelector } from "react-redux"; //user hook?
import { server } from "../../server";

const PayButton = ({ cartItem }) => {
  const user = useSelector((state) => state.auth);

  const handleCheckout = () => {
    axios
      .post(`${server}/stripe/create-checkout-session`, {
        cartItem,
        userId: user._id,
      })
      .then((res) => {
        if (res.data.server) {
          window.location.href = res.data.server;
        }
      })
      .catch((err) => console.log(err.message));
  };
  return <button onClick={() => handleCheckout()}>Check Out</button>;
};

export default PayButton;
