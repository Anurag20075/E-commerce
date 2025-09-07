import React, { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";

// Default export React component — paste this file into your Next.js / CRA project.
// Requirements: Tailwind CSS + framer-motion installed. (npm i framer-motion)

export default function CartPage() {
  const navigate = useNavigate();
  const FREE_SHIP_THRESHOLD = 999;

  const [products, setProducts] = useState([
    {
      id: "p1",
      name: "Custom Mug — Full Color Print",
      desc: "11oz ceramic mug, dishwasher safe",
      price: 399,
      qty: 1,
      type: "mug",
      designThumb: true,
    },
    {
      id: "p2",
      name: "Printed T‑shirt — Unisex",
      desc: "180 GSM cotton, vivid CMYK print",
      price: 699,
      qty: 2,
      type: "tshirt",
      designThumb: false,
    },
    {
      id: "p3",
      name: "Greeting Card — Folded",
      desc: "A6, matte finish, full color",
      price: 149,
      qty: 3,
      type: "card",
      designThumb: true,
    },
  ]);

  const [showMobileSummary, setShowMobileSummary] = useState(false);

  const subtotal = useMemo(
    () => products.reduce((s, p) => s + p.price * p.qty, 0),
    [products]
  );

  const shipping = useMemo(
    () => (subtotal >= FREE_SHIP_THRESHOLD ? 0 : 79),
    [subtotal]
  );
  const taxes = useMemo(() => Math.round(subtotal * 0.18), [subtotal]);
  const grandTotal = subtotal + shipping + taxes;

  function updateQty(id, delta) {
    setProducts((prev) =>
      prev
        .map((p) =>
          p.id === id ? { ...p, qty: Math.max(1, p.qty + delta) } : p
        )
        .filter(Boolean)
    );
  }

  function removeItem(id) {
    setProducts((prev) => prev.filter((p) => p.id !== id));
  }

  function formatINR(n) {
    return `₹${n.toLocaleString("en-IN")}`;
  }

  return (
    <div className="min-h-screen bg-white text-slate-800 p-4 lg:p-8">
      {/* Free shipping banner */}
      <div className="bg-gradient-to-r from-cyan-50 to-pink-50 rounded-lg p-3 mb-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="text-2xl">🎉</div>
          <div>
            <div className="font-medium">
              Get free shipping on orders above {formatINR(FREE_SHIP_THRESHOLD)}
            </div>
            <div className="text-sm text-slate-600">
              Add more items to reach free delivery.
            </div>
          </div>
        </div>
        <div className="hidden sm:block text-sm font-medium text-slate-700">
          Cart total:{" "}
          <span className="font-semibold">{formatINR(subtotal)}</span>
        </div>
      </div>

      {/* Main layout */}
      <div className="lg:grid lg:grid-cols-3 lg:gap-8">
        {/* Cart Items (span 2) */}
        <main className="lg:col-span-2">
          <div className="mb-6">
            <h1 className="text-3xl font-bold">Your Cart</h1>
            <p className="text-slate-600 mt-1">
              Review your items before checkout.
            </p>
          </div>

          <AnimatePresence>
            {products.length === 0 ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="rounded-lg border border-dashed border-slate-200 p-8 text-center"
              >
                {/* playful empty state */}
                <div className="max-w-sm mx-auto">
                  <svg viewBox="0 0 200 140" className="mx-auto mb-4 w-48 h-36">
                    <rect
                      x="10"
                      y="40"
                      width="180"
                      height="80"
                      rx="8"
                      fill="#f8fafc"
                      stroke="#e6eef6"
                    />
                    <polyline
                      points="10,40 100,10 190,40"
                      fill="#fff"
                      stroke="#e6eef6"
                    />
                    <circle cx="60" cy="60" r="6" fill="#06b6d4" />
                    <circle cx="90" cy="75" r="6" fill="#ec4899" />
                    <circle cx="120" cy="60" r="6" fill="#facc15" />
                  </svg>

                  <h2 className="text-xl font-semibold">Your cart is empty</h2>
                  <p className="text-slate-600 mt-2">
                    Start adding prints — T‑shirts, mugs, cards and more.
                  </p>
                  <div className="mt-4 flex justify-center gap-3">
                    <button className="px-4 py-2 rounded-full bg-pink-500 text-white shadow hover:scale-105 transform transition">
                      Start Shopping
                    </button>
                    <button className="px-4 py-2 rounded-full border">
                      Browse Products
                    </button>
                  </div>
                </div>
              </motion.div>
            ) : (
              <div className="space-y-4">
                {products.map((p) => (
                  <motion.article
                    key={p.id}
                    layout
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="group rounded-lg border p-4 flex gap-4 items-center shadow-sm hover:shadow-md"
                  >
                    {/* product mockup */}
                    <div className="w-28 flex-shrink-0">
                      <ProductMock type={p.type} />
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <h3 className="font-semibold truncate">{p.name}</h3>
                          <p className="text-sm text-slate-600">{p.desc}</p>

                          {p.designThumb && (
                            <div className="mt-2 flex items-center gap-2">
                              <div className="w-10 h-10 rounded-sm border overflow-hidden">
                                <DesignThumb />
                              </div>
                              <div className="text-xs text-slate-600">
                                Design uploaded
                              </div>
                            </div>
                          )}
                        </div>

                        <div className="text-right">
                          <div className="text-sm text-slate-600">
                            Price for each Item
                          </div>
                          <div className="font-medium">
                            {formatINR(p.price)}
                          </div>
                        </div>
                      </div>

                      <div className="mt-3 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => updateQty(p.id, -1)}
                            className="w-8 h-8 rounded-md border flex items-center justify-center hover:bg-slate-100"
                          >
                            -
                          </button>
                          <motion.div
                            key={p.qty}
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            className="w-10 text-center"
                          >
                            {p.qty}
                          </motion.div>
                          <button
                            onClick={() => updateQty(p.id, +1)}
                            className="w-8 h-8 rounded-md border flex items-center justify-center hover:bg-slate-100"
                          >
                            +
                          </button>

                          <button
                            onClick={() => removeItem(p.id)}
                            className="ml-4 text-sm text-rose-600 hover:underline"
                          >
                            Remove
                          </button>
                        </div>

                        <div className="text-right">
                          <div className="text-sm text-slate-600">Total</div>
                          <div className="font-semibold">
                            {formatINR(p.price * p.qty)}
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.article>
                ))}

                <div className="flex justify-between items-center">
                  <button className="text-sm text-cyan-600 hover:underline">
                    ← Continue Shopping
                  </button>
                  <div className="text-sm text-slate-600">
                    Need changes? You can edit quantities above before checkout.
                  </div>
                </div>
              </div>
            )}
          </AnimatePresence>
        </main>

        {/* Order Summary Sidebar */}
        <aside className="mt-8 lg:mt-0 lg:col-span-1">
          <div className="lg:sticky lg:top-20 rounded-lg border p-4 shadow-sm bg-white">
            <div className="flex items-center justify-between mb-3">
              <h4 className="font-semibold">Order Summary</h4>
              <button
                onClick={() => setShowMobileSummary((s) => !s)}
                className="lg:hidden text-sm text-cyan-600"
              >
                {showMobileSummary ? "Hide" : "Show"}
              </button>
            </div>

            <div className="space-y-3">
              <div className="flex justify-between">
                <div className="text-sm text-slate-600">Subtotal</div>
                <div className="font-medium">{formatINR(subtotal)}</div>
              </div>

              <div className="flex justify-between">
                <div className="text-sm text-slate-600">Shipping</div>
                <div className="font-medium">
                  {shipping === 0 ? "Free" : formatINR(shipping)}
                </div>
              </div>

              <div className="flex justify-between">
                <div className="text-sm text-slate-600">Taxes (18%)</div>
                <div className="font-medium">{formatINR(taxes)}</div>
              </div>

              <div className="border-t pt-3 flex justify-between items-center">
                <div className="text-lg font-semibold">Grand Total</div>
                <div className="text-xl font-bold">{formatINR(grandTotal)}</div>
              </div>

              <button
                onClick={() => navigate("/checkout")}
                className="w-full mt-3 px-4 py-3 rounded-full bg-pink-500 text-white font-semibold shadow hover:scale-105 transform transition"
              >
                Proceed to Checkout →
              </button>

              <div className="text-xs text-slate-500 text-center mt-2">
                Secure checkout • 30-day returns • Custom prints made to order
              </div>
            </div>
          </div>

          {/* Mobile summary sticky at bottom */}
          <div className="lg:hidden fixed bottom-4 left-4 right-4">
            <div className="rounded-full shadow-lg bg-white border p-3 flex items-center justify-between">
              <div>
                <div className="text-xs text-slate-500">Total</div>
                <div className="font-semibold">{formatINR(grandTotal)}</div>
              </div>
              <button
                onClick={() => navigate("/checkout")}
                className="ml-4 px-4 py-2 rounded-full bg-cyan-500 text-white"
              >
                Checkout
              </button>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}

function ProductMock({ type = "mug" }) {
  // simple inline svg mockups with a CMYK accent
  if (type === "tshirt") {
    return (
      <div className="w-28 h-28 bg-gradient-to-br from-white to-slate-50 rounded-md flex items-center justify-center border">
        <svg width="64" height="64" viewBox="0 0 64 64" fill="none">
          <rect x="8" y="12" width="48" height="40" rx="6" stroke="#e6eef6" />
          <path
            d="M20 18c2 4 8 4 12 4s10 0 12-4"
            stroke="#06b6d4"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <rect x="18" y="30" width="28" height="18" rx="3" fill="#f8fafc" />
        </svg>
      </div>
    );
  }

  if (type === "card") {
    return (
      <div className="w-28 h-28 rounded-md border flex items-center justify-center bg-white">
        <svg width="64" height="48" viewBox="0 0 64 48" fill="none">
          <rect x="2" y="4" width="60" height="40" rx="4" stroke="#e6eef6" />
          <rect x="8" y="10" width="20" height="8" rx="2" fill="#06b6d4" />
          <rect x="8" y="22" width="40" height="8" rx="2" fill="#ec4899" />
        </svg>
      </div>
    );
  }

  // default mug
  return (
    <div className="w-28 h-28 rounded-md border flex items-center justify-center bg-white">
      <svg width="64" height="64" viewBox="0 0 64 64" fill="none">
        <rect x="14" y="18" width="28" height="30" rx="4" stroke="#e6eef6" />
        <path
          d="M42 24c6 0 8 6 8 9s-2 9-8 9"
          stroke="#06b6d4"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <rect x="18" y="24" width="20" height="12" rx="2" fill="#fff" />
      </svg>
    </div>
  );
}

function DesignThumb() {
  return (
    <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
      <rect width="40" height="40" rx="4" fill="#fff" stroke="#e6eef6" />
      <circle cx="12" cy="12" r="4" fill="#06b6d4" />
      <rect x="18" y="8" width="12" height="8" rx="2" fill="#ec4899" />
      <rect x="10" y="22" width="20" height="8" rx="2" fill="#facc15" />
    </svg>
  );
}
