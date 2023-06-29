import React from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LoginPage, SignupPage, CreateProductPage } from "./routes.js";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/createProduct" element={<CreateProductPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
