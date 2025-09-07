import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Categories from "./components/Categories";
import DetailedWrapper from "./components/DetailedWrapper";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import CartPage from "./components/CartPage";
import CheckoutPage from "./components/CheckoutPage";
import OrderConfirmationPage from "./components/OrderConfirmationPage";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        {/* <Route path="/" element={<Header />} /> */}
        {/* <Route path="/" element={<CartPage />} /> */}
        {/* <Route path="/" element={<CheckoutPage />} /> */}
        {/* <Route path="/" element={<OrderConfirmationPage />} /> */}
        {/* <Route path="/" element={<Categories />} /> */}
        {/* <Route path="/product/:id" element={<DetailedWrapper />} /> */}
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
