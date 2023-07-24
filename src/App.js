import React from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import {
  HomePage,
  LoginPage,
  SignupPage,
  CreateProductPage,
  WishlistPage,
  
} from "./routes.js";
import ProfilePage from "./components/ProfilePage";
import PrivatePage from "./components/PrivatePage";
import SellerDashboard from "./components/SellerDashboard";
import UpdateProduct from "./components/Product/UpdateProducts";
//import UserSettings from "./components/UserSettings";
import ShoppingCart from "./components/ShoppingCart";
import ShippingInfo from "./components/ShippingInfo";
import UserSettingsPage from "./pages/UserSettingsPage";
import EditUser from "./components/EditUser"
import Negotiate from "./components/Product/Negotiate";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={ <SignupPage /> } />
        <Route path="/cart" element={<ShoppingCart />} />
        <Route path="/shipping-info" element={<ShippingInfo/>} />
        <Route path="/negotiate" element={<PrivatePage><Negotiate/></PrivatePage>} />
        <Route
          path="/profile"
          element={
            <PrivatePage>
              <ProfilePage />
            </PrivatePage>
          }
        />
        <Route path="/wishlist"
        element={<PrivatePage>
        <WishlistPage />
        </PrivatePage>}
        />
<Route path="/seller-dashboard" element={<PrivatePage><SellerDashboard/></PrivatePage>} />
<Route path="/updateproduct/:productName" element={<PrivatePage><UpdateProduct/></PrivatePage>} />
<Route path="/user-settings" element={<PrivatePage><UserSettingsPage/></PrivatePage>} />
<Route path="/create-product" element={<PrivatePage><CreateProductPage /></PrivatePage>} />
<Route path="/edit-form" element={<PrivatePage><EditUser/></PrivatePage>} /></Routes>
</BrowserRouter>
  );
}

export default App;
