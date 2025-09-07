import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  CheckCircle,
  Download,
  ArrowRight,
  ShoppingBag,
  Truck,
  CreditCard,
  MapPin,
  Calendar,
  Phone,
  Mail,
  Share2,
  Facebook,
  Twitter,
  Copy,
  Check,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function OrderConfirmationPage() {
  const navigate = useNavigate();
  const [showShareMenu, setShowShareMenu] = useState(false);
  const [copied, setCopied] = useState(false);
  const [confettiPieces, setConfettiPieces] = useState([]);

  // Mock order data
  const orderData = {
    orderNumber: "#ORD-12345",
    orderDate: "January 6, 2025",
    estimatedDelivery: "January 13, 2025",
    items: [
      {
        id: 1,
        name: "Custom Mug — Full Color Print",
        desc: "11oz ceramic mug, dishwasher safe",
        price: 399,
        qty: 1,
        customization: "Personal photo upload",
        image: "mug",
      },
      {
        id: 2,
        name: "Printed T‑shirt — Unisex",
        desc: "180 GSM cotton, vivid CMYK print",
        price: 699,
        qty: 2,
        customization: "Custom text: 'Best Dad Ever'",
        image: "tshirt",
      },
      {
        id: 3,
        name: "Greeting Card — Folded",
        desc: "A6, matte finish, full color",
        price: 149,
        qty: 1,
        customization: "Birthday message",
        image: "card",
      },
    ],
    shippingAddress: {
      name: "John Doe",
      address: "123 Main Street, Apartment 4B",
      city: "Mumbai",
      state: "Maharashtra",
      pincode: "400001",
      country: "India",
    },
    paymentMethod: "Card ending ****4242",
    subtotal: 1546,
    shipping: 79,
    taxes: 278,
    total: 1903,
  };

  const formatINR = (amount) => `₹${amount.toLocaleString("en-IN")}`;

  // Generate confetti animation
  useEffect(() => {
    const pieces = Array.from({ length: 50 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      rotation: Math.random() * 360,
      scale: Math.random() * 0.5 + 0.5,
      color: ["#00FFFF", "#FF00FF", "#FFFF00", "#000000"][
        Math.floor(Math.random() * 4)
      ],
      delay: Math.random() * 2,
    }));
    setConfettiPieces(pieces);
  }, []);

  const handleShare = (platform) => {
    const text = `I just ordered some amazing custom prints! Order ${orderData.orderNumber} 🎨`;
    const url = window.location.href;

    switch (platform) {
      case "facebook":
        window.open(
          `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
            url
          )}&quote=${encodeURIComponent(text)}`
        );
        break;
      case "twitter":
        window.open(
          `https://twitter.com/intent/tweet?text=${encodeURIComponent(
            text
          )}&url=${encodeURIComponent(url)}`
        );
        break;
      case "copy":
        navigator.clipboard.writeText(`${text} ${url}`);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
        break;
    }
    setShowShareMenu(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Floating CMYK Circles */}
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={`circle-${i}`}
            className={`absolute w-20 h-20 rounded-full opacity-10 ${
              i % 4 === 0
                ? "bg-cyan-500"
                : i % 4 === 1
                ? "bg-pink-500"
                : i % 4 === 2
                ? "bg-yellow-500"
                : "bg-gray-800"
            }`}
            style={{
              left: `${10 + i * 15}%`,
              top: `${20 + i * 10}%`,
            }}
            animate={{
              y: [0, -20, 0],
              x: [0, 10, 0],
              rotate: [0, 360],
            }}
            transition={{
              duration: 8 + i,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}

        {/* Confetti Animation */}
        <AnimatePresence>
          {confettiPieces.map((piece) => (
            <motion.div
              key={piece.id}
              className="absolute w-3 h-3 rounded-sm"
              style={{
                backgroundColor: piece.color,
                left: `${piece.x}%`,
                top: `-10%`,
              }}
              initial={{
                y: -100,
                rotation: 0,
                scale: piece.scale,
              }}
              animate={{
                y: window.innerHeight + 100,
                rotation: piece.rotation + 720,
                scale: piece.scale * 0.5,
              }}
              transition={{
                duration: 3,
                delay: piece.delay,
                ease: "easeOut",
              }}
            />
          ))}
        </AnimatePresence>
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 py-8">
        {/* Back Navigation */}
        <div className="mb-6">
          <button
            onClick={() => navigate("/")}
            className="flex items-center text-sm text-gray-600 hover:text-gray-800 transition-colors bg-white rounded-full px-4 py-2 shadow-sm border"
          >
            ← Back to Shopping
          </button>
        </div>
        {/* Success Banner */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
            className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-gradient-to-br from-cyan-400 via-pink-400 to-yellow-400 mb-6 shadow-2xl"
          >
            <CheckCircle className="w-12 h-12 text-white" />
          </motion.div>

          <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-4xl md:text-5xl font-bold text-gray-900 mb-3"
          >
            Thank you for your order!
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="text-xl text-gray-600 max-w-2xl mx-auto"
          >
            Your order has been placed successfully. We'll start printing soon
            with our premium inks and papers!
          </motion.p>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.9 }}
            className="mt-6 inline-flex items-center space-x-2 bg-white rounded-full px-6 py-3 shadow-lg border"
          >
            <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-sm font-medium text-gray-700">
              Order {orderData.orderNumber} confirmed
            </span>
          </motion.div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Order Summary Card */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1 }}
            className="lg:col-span-2 bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden"
          >
            <div className="bg-gradient-to-r from-cyan-500 to-pink-500 px-6 py-4">
              <h2 className="text-xl font-bold text-white">Order Summary</h2>
              <p className="text-cyan-100">
                Order placed on {orderData.orderDate}
              </p>
            </div>

            <div className="p-6">
              {/* Order Items */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                  <ShoppingBag className="w-5 h-5 mr-2 text-cyan-500" />
                  Items Ordered
                </h3>
                <div className="space-y-4">
                  {orderData.items.map((item) => (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 1.2 + item.id * 0.1 }}
                      className="flex items-center space-x-4 p-4 bg-gray-50 rounded-xl"
                    >
                      <div className="w-16 h-16 bg-white rounded-lg flex items-center justify-center shadow-sm">
                        <ProductIcon type={item.image} />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-gray-900">
                          {item.name}
                        </h4>
                        <p className="text-sm text-gray-600">{item.desc}</p>
                        {item.customization && (
                          <div className="mt-1 flex items-center space-x-1">
                            <div className="w-2 h-2 bg-gradient-to-r from-cyan-400 to-pink-400 rounded-full"></div>
                            <span className="text-xs text-gray-500 italic">
                              {item.customization}
                            </span>
                          </div>
                        )}
                        <p className="text-sm text-gray-500 mt-1">
                          Quantity: {item.qty}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-gray-900">
                          {formatINR(item.price * item.qty)}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Shipping & Payment Info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6 border-t">
                <div>
                  <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
                    <MapPin className="w-4 h-4 mr-2 text-pink-500" />
                    Shipping Address
                  </h4>
                  <div className="text-sm text-gray-600 space-y-1">
                    <p className="font-medium">
                      {orderData.shippingAddress.name}
                    </p>
                    <p>{orderData.shippingAddress.address}</p>
                    <p>
                      {orderData.shippingAddress.city},{" "}
                      {orderData.shippingAddress.state}
                    </p>
                    <p>
                      {orderData.shippingAddress.pincode},{" "}
                      {orderData.shippingAddress.country}
                    </p>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
                    <CreditCard className="w-4 h-4 mr-2 text-yellow-500" />
                    Payment Method
                  </h4>
                  <p className="text-sm text-gray-600 mb-4">
                    {orderData.paymentMethod}
                  </p>

                  <h4 className="font-semibold text-gray-900 mb-2 flex items-center">
                    <Calendar className="w-4 h-4 mr-2 text-green-500" />
                    Estimated Delivery
                  </h4>
                  <p className="text-sm text-gray-600">
                    {orderData.estimatedDelivery}
                  </p>
                </div>
              </div>

              {/* Price Breakdown */}
              <div className="mt-6 pt-6 border-t bg-gray-50 rounded-xl p-4">
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Subtotal</span>
                    <span className="text-gray-900">
                      {formatINR(orderData.subtotal)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Shipping</span>
                    <span className="text-gray-900">
                      {formatINR(orderData.shipping)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Taxes (GST 18%)</span>
                    <span className="text-gray-900">
                      {formatINR(orderData.taxes)}
                    </span>
                  </div>
                  <div className="flex justify-between text-lg font-bold pt-2 border-t">
                    <span>Total Paid</span>
                    <span className="text-cyan-600">
                      {formatINR(orderData.total)}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Actions & Info Sidebar */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1.2 }}
            className="space-y-6"
          >
            {/* Next Steps */}
            <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Next Steps
              </h3>
              <div className="space-y-3">
                <button className="w-full flex items-center justify-center space-x-2 bg-gradient-to-r from-cyan-500 to-pink-500 text-white py-3 px-4 rounded-xl font-semibold hover:from-cyan-600 hover:to-pink-600 transition-all transform hover:scale-105 shadow-lg">
                  <Truck className="w-4 h-4" />
                  <span>Track Your Order</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button className="w-full flex items-center justify-center space-x-2 border-2 border-gray-200 text-gray-700 py-3 px-4 rounded-xl font-semibold hover:border-gray-300 hover:bg-gray-50 transition-all">
                  <Download className="w-4 h-4" />
                  <span>Download Invoice</span>
                </button>

                <button
                  onClick={() => navigate("/")}
                  className="w-full flex items-center justify-center space-x-2 bg-yellow-400 text-gray-900 py-3 px-4 rounded-xl font-semibold hover:bg-yellow-500 transition-all transform hover:scale-105"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>Continue Shopping</span>
                </button>
              </div>
            </div>

            {/* Share Purchase */}
            <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Share Your Purchase
              </h3>
              <p className="text-sm text-gray-600 mb-4">
                Let others know about your awesome custom prints!
              </p>

              <div className="relative">
                <button
                  onClick={() => setShowShareMenu(!showShareMenu)}
                  className="w-full flex items-center justify-center space-x-2 border-2 border-pink-200 text-pink-600 py-3 px-4 rounded-xl font-semibold hover:border-pink-300 hover:bg-pink-50 transition-all"
                >
                  <Share2 className="w-4 h-4" />
                  <span>Share Order</span>
                </button>

                <AnimatePresence>
                  {showShareMenu && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-lg border p-3 z-20"
                    >
                      <div className="grid grid-cols-3 gap-2">
                        <button
                          onClick={() => handleShare("facebook")}
                          className="flex flex-col items-center p-2 rounded-lg hover:bg-blue-50 transition-colors"
                        >
                          <Facebook className="w-5 h-5 text-blue-600 mb-1" />
                          <span className="text-xs text-gray-600">
                            Facebook
                          </span>
                        </button>
                        <button
                          onClick={() => handleShare("twitter")}
                          className="flex flex-col items-center p-2 rounded-lg hover:bg-blue-50 transition-colors"
                        >
                          <Twitter className="w-5 h-5 text-blue-400 mb-1" />
                          <span className="text-xs text-gray-600">Twitter</span>
                        </button>
                        <button
                          onClick={() => handleShare("copy")}
                          className="flex flex-col items-center p-2 rounded-lg hover:bg-gray-50 transition-colors"
                        >
                          {copied ? (
                            <Check className="w-5 h-5 text-green-600 mb-1" />
                          ) : (
                            <Copy className="w-5 h-5 text-gray-600 mb-1" />
                          )}
                          <span className="text-xs text-gray-600">
                            {copied ? "Copied!" : "Copy"}
                          </span>
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

            {/* Branding & Trust */}
            <div className="bg-gradient-to-br from-yellow-50 to-pink-50 rounded-2xl shadow-xl border border-yellow-100 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                Quality Promise
              </h3>
              <p className="text-sm text-gray-700 mb-4">
                We use high-quality inks and premium papers to make sure your
                prints look absolutely amazing. Every order is carefully crafted
                with love! 🎨
              </p>

              <div className="space-y-2 text-sm">
                <div className="flex items-center space-x-2">
                  <Phone className="w-4 h-4 text-cyan-500" />
                  <span className="text-gray-600">+91 98765 43210</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Mail className="w-4 h-4 text-pink-500" />
                  <span className="text-gray-600">support@printshop.com</span>
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-yellow-200">
                <p className="text-xs text-gray-500 text-center">
                  Questions about your order? We're here to help!
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

// Product icon component
function ProductIcon({ type }) {
  const iconClass = "w-8 h-8 text-gray-400";

  if (type === "mug") {
    return (
      <svg
        className={iconClass}
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M19 21H5a2 2 0 01-2-2V5a2 2 0 012-2h14a2 2 0 012 2v14a2 2 0 01-2 2z"
        />
      </svg>
    );
  }

  if (type === "tshirt") {
    return (
      <svg
        className={iconClass}
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M7 21h10V8l-2-2H9L7 8v13z"
        />
      </svg>
    );
  }

  // Default card icon
  return (
    <svg
      className={iconClass}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
      />
    </svg>
  );
}
