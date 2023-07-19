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
import UserSettings from "./components/UserSettings";
import ShoppingCart from "./components/ShoppingCart";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={ <SignupPage /> } />
        <Route path="/cart" element={<ShoppingCart />} />

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
<Route path="/user-settings" element={<PrivatePage><UserSettings/></PrivatePage>} />
<Route path="/create-product" element={<PrivatePage><CreateProductPage /></PrivatePage>} />
</Routes>
</BrowserRouter>
  );
}

export default App;
