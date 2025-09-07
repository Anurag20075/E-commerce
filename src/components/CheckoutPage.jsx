import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Lock,
  CheckCircle,
  CreditCard,
  Smartphone,
  Truck,
  Shield,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function CheckoutPage() {
  const navigate = useNavigate();
  // Mock cart items
  const [cartItems] = useState([
    {
      id: "p1",
      name: "Custom Mug — Full Color Print",
      desc: "11oz ceramic mug, dishwasher safe",
      price: 399,
      qty: 1,
      image: "mug",
    },
    {
      id: "p2",
      name: "Printed T‑shirt — Unisex",
      desc: "180 GSM cotton, vivid CMYK print",
      price: 699,
      qty: 2,
      image: "tshirt",
    },
    {
      id: "p3",
      name: "Greeting Card — Folded",
      desc: "A6, matte finish, full color",
      price: 149,
      qty: 1,
      image: "card",
    },
  ]);

  // Progress steps
  const [currentStep, setCurrentStep] = useState(2); // Cart(1) → Checkout(2) → Confirmation(3)

  // Form states
  const [shippingForm, setShippingForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
    country: "India",
    saveAddress: false,
  });

  const [paymentForm, setPaymentForm] = useState({
    paymentMethod: "card",
    cardNumber: "",
    expiryMonth: "",
    expiryYear: "",
    cvv: "",
    nameOnCard: "",
    upiId: "",
  });

  const [couponCode, setCouponCode] = useState("");
  const [appliedCoupon, setAppliedCoupon] = useState(null);
  const [isPlacingOrder, setIsPlacingOrder] = useState(false);

  // Calculations
  const subtotal = useMemo(
    () => cartItems.reduce((sum, item) => sum + item.price * item.qty, 0),
    [cartItems]
  );

  const shipping = 79;
  const taxes = Math.round(subtotal * 0.18);
  const discount = appliedCoupon ? Math.round(subtotal * 0.1) : 0;
  const grandTotal = subtotal + shipping + taxes - discount;

  const formatINR = (amount) => `₹${amount.toLocaleString("en-IN")}`;

  const handleShippingChange = (field, value) => {
    setShippingForm((prev) => ({ ...prev, [field]: value }));
  };

  const handlePaymentChange = (field, value) => {
    setPaymentForm((prev) => ({ ...prev, [field]: value }));
  };

  const applyCoupon = () => {
    if (couponCode.toUpperCase() === "SAVE10") {
      setAppliedCoupon({ code: "SAVE10", discount: 10 });
      setCouponCode("");
    } else {
      alert("Invalid coupon code. Try 'SAVE10' for 10% off!");
    }
  };

  const handlePlaceOrder = async () => {
    setIsPlacingOrder(true);
    // Simulate API call
    setTimeout(() => {
      setIsPlacingOrder(false);
      navigate("/order-confirmation");
    }, 2000);
  };

  const isFormValid = () => {
    const requiredShipping = [
      "firstName",
      "lastName",
      "email",
      "phone",
      "address",
      "city",
      "state",
      "pincode",
    ];
    const shippingValid = requiredShipping.every(
      (field) => shippingForm[field].trim() !== ""
    );

    if (paymentForm.paymentMethod === "card") {
      const requiredCard = [
        "cardNumber",
        "expiryMonth",
        "expiryYear",
        "cvv",
        "nameOnCard",
      ];
      return (
        shippingValid &&
        requiredCard.every((field) => paymentForm[field].trim() !== "")
      );
    } else if (paymentForm.paymentMethod === "upi") {
      return shippingValid && paymentForm.upiId.trim() !== "";
    }
    return shippingValid; // COD
  };

  return (
    <div className="min-h-screen bg-gray-50 py-6 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center space-x-4 mb-4">
            <button
              onClick={() => navigate("/")}
              className="flex items-center text-sm text-gray-600 hover:text-gray-800 transition-colors"
            >
              ← Back to Cart
            </button>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Checkout</h1>

          {/* Progress Indicator */}
          <div className="flex items-center justify-center space-x-8 mb-6">
            {[
              { step: 1, label: "Cart", completed: true },
              { step: 2, label: "Checkout", completed: currentStep >= 2 },
              { step: 3, label: "Confirmation", completed: currentStep >= 3 },
            ].map(({ step, label, completed }) => (
              <div key={step} className="flex items-center">
                <div
                  className={`
                  w-10 h-10 rounded-full flex items-center justify-center font-semibold
                  ${
                    completed
                      ? "bg-cyan-500 text-white"
                      : "bg-gray-200 text-gray-600"
                  }
                  ${currentStep === step ? "ring-4 ring-cyan-200" : ""}
                `}
                >
                  {completed && step < currentStep ? (
                    <CheckCircle className="w-5 h-5" />
                  ) : (
                    step
                  )}
                </div>
                <span className="ml-2 text-sm font-medium text-gray-700">
                  {label}
                </span>
                {step < 3 && (
                  <div
                    className={`
                    w-16 h-0.5 ml-4
                    ${step < currentStep ? "bg-cyan-500" : "bg-gray-200"}
                  `}
                  />
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Checkout Form */}
          <div className="lg:col-span-2 space-y-8">
            {/* Shipping Details */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-xl p-6 shadow-sm border"
            >
              <h2 className="text-xl font-semibold text-gray-900 mb-6">
                Shipping Details
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    First Name *
                  </label>
                  <input
                    type="text"
                    value={shippingForm.firstName}
                    onChange={(e) =>
                      handleShippingChange("firstName", e.target.value)
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                    placeholder="John"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Last Name *
                  </label>
                  <input
                    type="text"
                    value={shippingForm.lastName}
                    onChange={(e) =>
                      handleShippingChange("lastName", e.target.value)
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                    placeholder="Doe"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    value={shippingForm.email}
                    onChange={(e) =>
                      handleShippingChange("email", e.target.value)
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                    placeholder="john.doe@email.com"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    value={shippingForm.phone}
                    onChange={(e) =>
                      handleShippingChange("phone", e.target.value)
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                    placeholder="+91 98765 43210"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Street Address *
                  </label>
                  <input
                    type="text"
                    value={shippingForm.address}
                    onChange={(e) =>
                      handleShippingChange("address", e.target.value)
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                    placeholder="123 Main Street, Apartment 4B"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    City *
                  </label>
                  <input
                    type="text"
                    value={shippingForm.city}
                    onChange={(e) =>
                      handleShippingChange("city", e.target.value)
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                    placeholder="Mumbai"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    State *
                  </label>
                  <select
                    value={shippingForm.state}
                    onChange={(e) =>
                      handleShippingChange("state", e.target.value)
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                  >
                    <option value="">Select State</option>
                    <option value="Maharashtra">Maharashtra</option>
                    <option value="Delhi">Delhi</option>
                    <option value="Karnataka">Karnataka</option>
                    <option value="Tamil Nadu">Tamil Nadu</option>
                    <option value="Gujarat">Gujarat</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Pincode *
                  </label>
                  <input
                    type="text"
                    value={shippingForm.pincode}
                    onChange={(e) =>
                      handleShippingChange("pincode", e.target.value)
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                    placeholder="400001"
                    maxLength="6"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Country
                  </label>
                  <input
                    type="text"
                    value={shippingForm.country}
                    disabled
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-500"
                  />
                </div>
              </div>

              <div className="mt-4">
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={shippingForm.saveAddress}
                    onChange={(e) =>
                      handleShippingChange("saveAddress", e.target.checked)
                    }
                    className="rounded border-gray-300 text-cyan-600 focus:ring-cyan-500"
                  />
                  <span className="text-sm text-gray-700">
                    Save this address for future orders
                  </span>
                </label>
              </div>
            </motion.div>

            {/* Payment Details */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white rounded-xl p-6 shadow-sm border"
            >
              <h2 className="text-xl font-semibold text-gray-900 mb-6">
                Payment Details
              </h2>

              {/* Demo Notice */}
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
                <div className="flex items-center space-x-2">
                  <Shield className="w-5 h-5 text-yellow-600" />
                  <p className="text-sm text-yellow-800">
                    <strong>Demo Mode:</strong> This is a demonstration checkout
                    — no real payments will be processed.
                  </p>
                </div>
              </div>

              {/* Payment Method Selection */}
              <div className="space-y-4 mb-6">
                <h3 className="text-lg font-medium text-gray-900">
                  Choose Payment Method
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {[
                    {
                      id: "card",
                      label: "Credit/Debit Card",
                      icon: CreditCard,
                    },
                    { id: "upi", label: "UPI Payment", icon: Smartphone },
                    { id: "cod", label: "Cash on Delivery", icon: Truck },
                  ].map(({ id, label, icon: Icon }) => (
                    <label
                      key={id}
                      className={`
                        flex items-center space-x-3 p-4 border rounded-lg cursor-pointer transition-all
                        ${
                          paymentForm.paymentMethod === id
                            ? "border-cyan-500 bg-cyan-50 ring-2 ring-cyan-200"
                            : "border-gray-300 hover:border-gray-400"
                        }
                      `}
                    >
                      <input
                        type="radio"
                        name="paymentMethod"
                        value={id}
                        checked={paymentForm.paymentMethod === id}
                        onChange={(e) =>
                          handlePaymentChange("paymentMethod", e.target.value)
                        }
                        className="text-cyan-600 focus:ring-cyan-500"
                      />
                      <Icon className="w-5 h-5 text-gray-600" />
                      <span className="font-medium text-gray-900">{label}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Card Payment Form */}
              <AnimatePresence>
                {paymentForm.paymentMethod === "card" && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="space-y-4"
                  >
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Name on Card *
                      </label>
                      <input
                        type="text"
                        value={paymentForm.nameOnCard}
                        onChange={(e) =>
                          handlePaymentChange("nameOnCard", e.target.value)
                        }
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                        placeholder="John Doe"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Card Number *
                      </label>
                      <input
                        type="text"
                        value={paymentForm.cardNumber}
                        onChange={(e) =>
                          handlePaymentChange("cardNumber", e.target.value)
                        }
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                        placeholder="1234 5678 9012 3456"
                        maxLength="19"
                      />
                    </div>

                    <div className="grid grid-cols-3 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Month *
                        </label>
                        <select
                          value={paymentForm.expiryMonth}
                          onChange={(e) =>
                            handlePaymentChange("expiryMonth", e.target.value)
                          }
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                        >
                          <option value="">MM</option>
                          {Array.from({ length: 12 }, (_, i) => (
                            <option
                              key={i + 1}
                              value={String(i + 1).padStart(2, "0")}
                            >
                              {String(i + 1).padStart(2, "0")}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Year *
                        </label>
                        <select
                          value={paymentForm.expiryYear}
                          onChange={(e) =>
                            handlePaymentChange("expiryYear", e.target.value)
                          }
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                        >
                          <option value="">YYYY</option>
                          {Array.from({ length: 10 }, (_, i) => (
                            <option key={i} value={2024 + i}>
                              {2024 + i}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          CVV *
                        </label>
                        <input
                          type="text"
                          value={paymentForm.cvv}
                          onChange={(e) =>
                            handlePaymentChange("cvv", e.target.value)
                          }
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                          placeholder="123"
                          maxLength="3"
                        />
                      </div>
                    </div>
                  </motion.div>
                )}

                {paymentForm.paymentMethod === "upi" && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="space-y-4"
                  >
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        UPI ID *
                      </label>
                      <input
                        type="text"
                        value={paymentForm.upiId}
                        onChange={(e) =>
                          handlePaymentChange("upiId", e.target.value)
                        }
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                        placeholder="example@paytm"
                      />
                    </div>
                  </motion.div>
                )}

                {paymentForm.paymentMethod === "cod" && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="bg-blue-50 border border-blue-200 rounded-lg p-4"
                  >
                    <p className="text-blue-800 text-sm">
                      Pay with cash when your order is delivered. Additional ₹25
                      handling fee applies for COD orders.
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </div>

          {/* Order Summary Sidebar */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="sticky top-6 bg-white rounded-xl p-6 shadow-sm border"
            >
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Order Summary
              </h3>

              {/* Items */}
              <div className="space-y-3 mb-4">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                      <ProductIcon type={item.image} />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900 truncate">
                        {item.name}
                      </p>
                      <p className="text-xs text-gray-500">Qty: {item.qty}</p>
                    </div>
                    <p className="text-sm font-medium text-gray-900">
                      {formatINR(item.price * item.qty)}
                    </p>
                  </div>
                ))}
              </div>

              {/* Coupon Code */}
              <div className="border-t pt-4 mb-4">
                <div className="flex space-x-2">
                  <input
                    type="text"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                    placeholder="Enter coupon code"
                    className="flex-1 px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                    disabled={appliedCoupon}
                  />
                  <button
                    onClick={applyCoupon}
                    disabled={!couponCode || appliedCoupon}
                    className="px-3 py-2 text-sm bg-cyan-500 text-white rounded-lg hover:bg-cyan-600 disabled:bg-gray-300 disabled:cursor-not-allowed"
                  >
                    Apply
                  </button>
                </div>
                {appliedCoupon && (
                  <p className="text-sm text-green-600 mt-2 flex items-center">
                    <CheckCircle className="w-4 h-4 mr-1" />
                    Coupon "{appliedCoupon.code}" applied!
                  </p>
                )}
              </div>

              {/* Pricing Breakdown */}
              <div className="space-y-2 border-t pt-4">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="text-gray-900">{formatINR(subtotal)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Shipping</span>
                  <span className="text-gray-900">{formatINR(shipping)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Taxes (GST 18%)</span>
                  <span className="text-gray-900">{formatINR(taxes)}</span>
                </div>
                {appliedCoupon && (
                  <div className="flex justify-between text-sm">
                    <span className="text-green-600">Discount (10%)</span>
                    <span className="text-green-600">
                      -{formatINR(discount)}
                    </span>
                  </div>
                )}
                <div className="flex justify-between text-lg font-semibold pt-2 border-t">
                  <span>Total</span>
                  <span>
                    {formatINR(
                      grandTotal +
                        (paymentForm.paymentMethod === "cod" ? 25 : 0)
                    )}
                  </span>
                </div>
              </div>

              {/* Place Order Button */}
              <button
                onClick={handlePlaceOrder}
                disabled={!isFormValid() || isPlacingOrder}
                className={`
                  w-full mt-6 py-3 px-4 rounded-lg font-semibold text-white transition-all
                  ${
                    isFormValid() && !isPlacingOrder
                      ? "bg-gradient-to-r from-pink-500 to-cyan-500 hover:from-pink-600 hover:to-cyan-600 transform hover:scale-105 shadow-lg"
                      : "bg-gray-400 cursor-not-allowed"
                  }
                `}
              >
                {isPlacingOrder ? (
                  <div className="flex items-center justify-center space-x-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Processing...</span>
                  </div>
                ) : (
                  "Place Order →"
                )}
              </button>

              {/* Security Notice */}
              <div className="flex items-center justify-center space-x-2 mt-4 text-sm text-gray-500">
                <Lock className="w-4 h-4" />
                <span>Your information is secure</span>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Product icon component
function ProductIcon({ type }) {
  const iconClass = "w-6 h-6 text-gray-400";

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
