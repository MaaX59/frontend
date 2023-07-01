import React from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import {
  HomePage,
  LoginPage,
  SignupPage,
  CreateProductPage,
} from "./routes.js";
import ProfilePage from "./components/ProfilePage";
import PrivatePage from "./components/PrivatePage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={ <SignupPage /> } />

        <Route
          path="/profile"
          element={
            <PrivatePage>
              <ProfilePage />
            </PrivatePage>
          }
        />

        <Route path="/create-product" element={<CreateProductPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
