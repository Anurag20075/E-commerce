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
import SearchResultsPage from "./components/SearchResultsPage";
import ProductCustomizer from "./components/ProductCustomizer";
import AboutUsPage from "./components/AboutUsPage";
import FAQPage from "./components/FAQPage";
import ContactPage from "./components/ContactPage";
function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Header />} />
        <Route path="/categories" element={<Categories />} />
        <Route path="/search" element={<SearchResultsPage />} />
        <Route path="/product/:id" element={<DetailedWrapper />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="/order-confirmation" element={<OrderConfirmationPage />} />
        <Route path="/customize" element={<ProductCustomizer />} />
        <Route path="/customize/:productId" element={<ProductCustomizer />} />
        <Route path="/about" element={<AboutUsPage />} />
        <Route path="/faq" element={<FAQPage />} />
        <Route path="/contact" element={<ContactPage />} />
        {/* Commented routes for reference */}
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
