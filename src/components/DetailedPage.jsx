import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function DetailPage({ product, related }) {
  const [activeImage, setActiveImage] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [customText, setCustomText] = useState("");
  const [uploadedFile, setUploadedFile] = useState(null);

  const priceDisplay = useMemo(() => {
    return `₹${(product.price * quantity).toFixed(2)}`;
  }, [product.price, quantity]);

  function handleFile(e) {
    const f = e.target.files?.[0];
    setUploadedFile(f || null);
  }

  function addToCart() {
    console.log("Add to cart", {
      product: product.id,
      quantity,
      customText,
      uploadedFile,
    });
    alert("Added to cart — demo only");
  }

  function buyNow() {
    console.log("Buy now", { product: product.id, quantity });
    alert("Proceeding to checkout — demo only");
  }

  // Wrap single image into an array so thumbnails work
  const productImages = [product.image];

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 p-4 md:p-8">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-6">
        {/* Image Section */}
        <div className="md:col-span-6">
          <div className="bg-white rounded-2xl shadow-md p-4">
            <div className="relative">
              <div className="w-full h-80 md:h-[520px] flex items-center justify-center overflow-hidden rounded-xl">
                <motion.img
                  key={productImages[activeImage]}
                  src={productImages[activeImage]}
                  alt={product.name}
                  className="max-h-full max-w-full object-contain rounded-xl cursor-zoom-in"
                  onClick={() => setLightboxOpen(true)}
                />
              </div>

              {/* Thumbnails */}
              <div className="mt-3 flex space-x-2 overflow-x-auto py-2">
                {productImages.map((src, i) => (
                  <motion.button
                    key={src}
                    onClick={() => setActiveImage(i)}
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.98 }}
                    className={`flex-shrink-0 rounded-lg overflow-hidden border-2 ${
                      i === activeImage
                        ? "border-indigo-300"
                        : "border-transparent"
                    }`}
                  >
                    <img
                      src={src}
                      alt={`thumb ${i}`}
                      className="w-20 h-20 object-cover"
                    />
                  </motion.button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Product Info */}
        <div className="md:col-span-6 flex flex-col gap-4">
          <div className="bg-white rounded-2xl shadow-md p-6">
            <h1 className="text-2xl md:text-3xl font-semibold">
              {product.name}
            </h1>

            <div className="mt-2 text-xl font-bold">
              ₹{product.price.toFixed(2)}
            </div>

            {product.customizable && (
              <div className="mt-2 inline-block text-xs bg-pink-50 text-pink-700 px-2 py-1 rounded-full">
                Customizable
              </div>
            )}

            {/* Customization */}
            {product.customizable && (
              <div className="mt-5 space-y-4">
                <div>
                  <label className="block text-sm text-gray-600">
                    Custom text
                  </label>
                  <input
                    value={customText}
                    onChange={(e) => setCustomText(e.target.value)}
                    placeholder="Name or short message"
                    className="mt-2 w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-indigo-200"
                  />
                </div>

                <div>
                  <label className="block text-sm text-gray-600">
                    Upload image (optional)
                  </label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFile}
                    className="mt-2"
                  />
                  {uploadedFile && (
                    <div className="mt-2 text-sm text-gray-600">
                      Uploaded: {uploadedFile.name}
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Quantity & Actions */}
            <div className="flex items-center gap-3 mt-5">
              <div className="flex items-center border rounded-lg overflow-hidden">
                <button
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="px-3 py-2"
                >
                  -
                </button>
                <div className="px-4 py-2 w-14 text-center">{quantity}</div>
                <button
                  onClick={() => setQuantity((q) => q + 1)}
                  className="px-3 py-2"
                >
                  +
                </button>
              </div>

              <div className="flex-1 flex gap-2">
                <motion.button
                  onClick={addToCart}
                  whileHover={{ scale: 1.02 }}
                  className="flex-1 rounded-full bg-indigo-600 text-white px-5 py-3 font-semibold shadow-lg"
                >
                  Add to cart
                </motion.button>
                <motion.button
                  onClick={buyNow}
                  whileHover={{ scale: 1.02 }}
                  className="rounded-full border px-5 py-3 font-semibold"
                >
                  Buy now
                </motion.button>
              </div>
            </div>
          </div>

          {/* Related Products */}
          <div className="bg-white rounded-2xl shadow-md p-6">
            <h3 className="font-semibold mb-4">You may also like</h3>
            <div className="flex gap-4 overflow-x-auto py-2">
              {related.map((r) => (
                <motion.div
                  key={r.id}
                  whileHover={{ y: -6 }}
                  className="w-44 bg-gray-50 rounded-lg p-3 flex-shrink-0"
                >
                  <img
                    src={r.image}
                    alt={r.name}
                    className="w-full h-28 object-cover rounded-md"
                  />
                  <div className="mt-2 text-sm font-medium">{r.name}</div>
                  <div className="text-sm text-gray-500">
                    ₹{r.price.toFixed(2)}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4"
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.95 }}
              className="max-w-4xl w-full bg-white rounded-xl overflow-hidden"
            >
              <div className="p-4 flex justify-end">
                <button
                  onClick={() => setLightboxOpen(false)}
                  className="rounded-full p-2 bg-gray-100"
                >
                  Close
                </button>
              </div>
              <div className="p-6 flex items-center justify-center">
                <img
                  src={productImages[activeImage]}
                  className="max-h-[70vh] object-contain"
                  alt={product.name}
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
