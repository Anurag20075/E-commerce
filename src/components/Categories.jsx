import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom"; // ✅ Added
import mockProducts from "../data/Mockdata";
import categories from "../data/CategoriesData";

const Categories = () => {
  const [products] = useState(mockProducts);
  const [filteredProducts, setFilteredProducts] = useState(mockProducts);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    let result = [...products];

    if (selectedCategory !== "All") {
      result = result.filter((p) => p.category === selectedCategory);
    }

    if (searchQuery.trim() !== "") {
      result = result.filter((p) =>
        p.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    setFilteredProducts(result);
  }, [products, selectedCategory, searchQuery]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-50 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <header className="mb-6">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            Customizable Gifts
          </h1>
          <p className="text-gray-600 mb-6">
            Find the perfect personalized gift for your loved ones
          </p>

          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-800">
                Shop by Category
              </h2>
            </div>

            <div className="flex overflow-x-auto pb-4 hide-scrollbar space-x-3">
              {categories.map((category) => (
                <motion.button
                  key={category.id}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`min-w-[100px] p-4 rounded-3xl text-sm font-medium transition-all ${
                    selectedCategory === category.id
                      ? "bg-purple-600 text-white shadow-md"
                      : "bg-white text-gray-700 hover:bg-purple-100 shadow-sm"
                  }`}
                >
                  <span className="text-sm font-medium">{category.name}</span>
                </motion.button>
              ))}
            </div>
          </div>
        </header>

        <main>
          {filteredProducts.length > 0 ? (
            <AnimatePresence>
              <motion.div
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
                layout
              >
                {filteredProducts.map((product) => (
                  <Link to={`/product/${product.id}`} key={product.id}>
                    <motion.div
                      layout
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      transition={{ duration: 0.3 }}
                      className="bg-white rounded-2xl shadow-sm overflow-hidden hover:shadow-md cursor-pointer"
                    >
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-48 object-cover"
                      />
                      <div className="p-5">
                        <h3 className="font-bold text-lg text-gray-800">
                          {product.name}
                        </h3>
                        <p className="text-sm text-gray-500 mb-2">
                          {product.category}
                        </p>
                        <div className="flex justify-between items-center">
                          <span className="text-purple-600 font-bold">
                            ${product.price.toFixed(2)}
                          </span>
                          <span className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition">
                            View Details
                          </span>
                        </div>
                      </div>
                    </motion.div>
                  </Link>
                ))}
              </motion.div>
            </AnimatePresence>
          ) : (
            <div className="text-center py-12 bg-white rounded-2xl shadow-sm">
              <p className="text-xl font-bold text-gray-700">
                No products found
              </p>
              <p className="text-gray-500 mb-6">
                Try a different category or search term
              </p>
              <button
                onClick={() => alert("Redirect to custom request form")}
                className="bg-purple-600 text-white px-6 py-3 rounded-full hover:bg-purple-700"
              >
                Didn't find your gift? Let us know 💬
              </button>
            </div>
          )}
        </main>
      </div>

      <style jsx>{`
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
};

export default Categories;
