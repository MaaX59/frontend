import React from 'react';


import HomePageComponent from "../components/Product/HomePageComponent";
import Navbar from '../components/navbar';

function HomePage() {
  return (
    <div>
      <Navbar />
      <h1>Home Page</h1>
      <HomePageComponent />
    </div>
  );
}

export default HomePage;
