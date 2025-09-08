import React, { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useSearchParams, Link, useNavigate } from "react-router-dom";
import {
  Search,
  X,
  Filter,
  ChevronDown,
  Grid3X3,
  List,
  ArrowUpDown,
  ShoppingCart,
  Eye,
  Star,
  Tag,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import mockProducts from "../data/Mockdata";
import categories from "../data/CategoriesData";

const SearchResultsPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  // URL-based state management
  const searchQuery = searchParams.get("q") || "";
  const categoryFilter = searchParams.get("category") || "All";
  const sortBy = searchParams.get("sort") || "relevance";
  const minPrice = parseInt(searchParams.get("minPrice")) || 0;
  const maxPrice = parseInt(searchParams.get("maxPrice")) || 2000;
  const page = parseInt(searchParams.get("page")) || 1;

  // Local state
  const [currentSearchQuery, setCurrentSearchQuery] = useState(searchQuery);
  const [showFilters, setShowFilters] = useState(false);
  const [viewMode, setViewMode] = useState("grid");
  const [isLoading, setIsLoading] = useState(false);

  const itemsPerPage = 12;

  // Update URL params
  const updateSearchParams = (updates) => {
    const newParams = new URLSearchParams(searchParams);
    Object.entries(updates).forEach(([key, value]) => {
      if (value === "" || value === null || value === undefined) {
        newParams.delete(key);
      } else {
        newParams.set(key, value);
      }
    });
    setSearchParams(newParams);
  };

  // Filter and search logic
  const filteredProducts = useMemo(() => {
    let filtered = [...mockProducts];

    // Search filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (product) =>
          product.name.toLowerCase().includes(query) ||
          product.description?.toLowerCase().includes(query) ||
          product.category.toLowerCase().includes(query) ||
          product.material?.toLowerCase().includes(query)
      );
    }

    // Category filter
    if (categoryFilter !== "All") {
      filtered = filtered.filter(
        (product) => product.category === categoryFilter
      );
    }

    // Price filter
    filtered = filtered.filter(
      (product) => product.price >= minPrice && product.price <= maxPrice
    );

    // Sorting
    switch (sortBy) {
      case "price-low":
        filtered.sort((a, b) => a.price - b.price);
        break;
      case "price-high":
        filtered.sort((a, b) => b.price - a.price);
        break;
      case "newest":
        filtered.sort(
          (a, b) => (b.isNewArrival ? 1 : 0) - (a.isNewArrival ? 1 : 0)
        );
        break;
      case "relevance":
      default:
        // Sort by best sellers first, then by relevance
        filtered.sort(
          (a, b) => (b.bestSeller ? 1 : 0) - (a.bestSeller ? 1 : 0)
        );
        break;
    }

    return filtered;
  }, [searchQuery, categoryFilter, sortBy, minPrice, maxPrice]);

  // Pagination
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const startIndex = (page - 1) * itemsPerPage;
  const paginatedProducts = filteredProducts.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  // Handle search
  const handleSearch = (e) => {
    e.preventDefault();
    updateSearchParams({ q: currentSearchQuery, page: 1 });
  };

  const clearSearch = () => {
    setCurrentSearchQuery("");
    updateSearchParams({ q: "", page: 1 });
  };

  // Skeleton loader component
  const SkeletonCard = () => (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden animate-pulse">
      <div className="w-full h-48 bg-gray-200"></div>
      <div className="p-4 space-y-3">
        <div className="h-4 bg-gray-200 rounded w-3/4"></div>
        <div className="h-3 bg-gray-200 rounded w-1/2"></div>
        <div className="h-4 bg-gray-200 rounded w-1/4"></div>
        <div className="flex gap-2">
          <div className="h-8 bg-gray-200 rounded flex-1"></div>
          <div className="h-8 bg-gray-200 rounded w-8"></div>
        </div>
      </div>
    </div>
  );

  // Product card component
  const ProductCard = ({ product }) => (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -4 }}
      className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden group hover:border-cyan-200 hover:shadow-lg transition-all duration-300"
    >
      <div className="relative overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
        />

        {/* Badges */}
        <div className="absolute top-2 left-2 flex gap-1">
          {product.bestSeller && (
            <span className="bg-yellow-400 text-black text-xs px-2 py-1 rounded-full font-medium">
              Best Seller
            </span>
          )}
          {product.isNewArrival && (
            <span className="bg-magenta-500 text-white text-xs px-2 py-1 rounded-full font-medium">
              New Arrival
            </span>
          )}
        </div>

        {/* Quick actions */}
        <div className="absolute top-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <Link
            to={`/product/${product.id}`}
            className="bg-white/90 hover:bg-white p-2 rounded-full shadow-md transition-colors"
          >
            <Eye className="w-4 h-4 text-gray-600" />
          </Link>
        </div>
      </div>

      <div className="p-4">
        <Link
          to={`/product/${product.id}`}
          className="block group-hover:text-cyan-600 transition-colors"
        >
          <h3 className="font-semibold text-gray-900 mb-1 line-clamp-1">
            {product.name}
          </h3>
        </Link>

        {product.description && (
          <p className="text-sm text-gray-500 mb-2 line-clamp-1">
            {product.description}
          </p>
        )}

        <div className="flex items-center justify-between mb-3">
          <span className="text-lg font-bold text-gray-900">
            ₹{product.price}
          </span>
          {product.customizable && (
            <span className="text-xs bg-cyan-100 text-cyan-800 px-2 py-1 rounded-full">
              Customizable
            </span>
          )}
        </div>

        <div className="flex gap-2">
          <button className="flex-1 bg-cyan-500 hover:bg-cyan-600 text-white px-4 py-2 rounded-lg font-medium transition-colors text-sm">
            <ShoppingCart className="w-4 h-4 inline mr-1" />
            Add to Cart
          </button>
          <Link
            to={`/product/${product.id}`}
            className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-2 rounded-lg transition-colors"
          >
            <Eye className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </motion.div>
  );

  // Empty state component
  const EmptyState = () => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="col-span-full flex flex-col items-center justify-center py-16 text-center"
    >
      <div className="mb-6 relative">
        <div className="w-32 h-32 bg-gray-100 rounded-full flex items-center justify-center">
          <Search className="w-12 h-12 text-gray-400" />
        </div>
        {/* CMYK confetti */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-2 h-2 bg-cyan-400 rounded-full absolute -top-2 -left-2 animate-bounce"></div>
          <div className="w-1 h-1 bg-magenta-400 rounded-full absolute -top-1 right-4 animate-bounce delay-100"></div>
          <div className="w-1.5 h-1.5 bg-yellow-400 rounded-full absolute bottom-2 -right-2 animate-bounce delay-200"></div>
          <div className="w-1 h-1 bg-black rounded-full absolute bottom-4 -left-1 animate-bounce delay-300"></div>
        </div>
      </div>

      <h3 className="text-xl font-semibold text-gray-900 mb-2">
        No results found for "{searchQuery}"
      </h3>
      <p className="text-gray-500 mb-6 max-w-md">
        Try checking your spelling or explore our categories to find what you're
        looking for.
      </p>

      <div className="flex gap-3">
        <button
          onClick={clearSearch}
          className="bg-cyan-500 hover:bg-cyan-600 text-white px-6 py-2 rounded-lg font-medium transition-colors"
        >
          Clear Search
        </button>
        <Link
          to="/"
          className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-6 py-2 rounded-lg font-medium transition-colors"
        >
          Browse All Products
        </Link>
      </div>
    </motion.div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Breadcrumb */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <nav className="flex items-center space-x-2 text-sm">
            <Link to="/" className="text-gray-500 hover:text-gray-700">
              Home
            </Link>
            <ChevronRight className="w-4 h-4 text-gray-400" />
            <span className="text-gray-500">Search</span>
            {searchQuery && (
              <>
                <ChevronRight className="w-4 h-4 text-gray-400" />
                <span className="text-gray-900 font-medium">
                  "{searchQuery}"
                </span>
              </>
            )}
          </nav>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-12">
          {/* Filters Sidebar */}
          <div className="lg:w-72">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 sticky top-32">
              {/* Filter Header */}
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-semibold text-gray-900 flex items-center">
                    <Filter className="w-5 h-5 mr-2 text-cyan-500" />
                    Filters
                  </h2>
                  <button
                    onClick={() => setShowFilters(!showFilters)}
                    className="lg:hidden"
                  >
                    <ChevronDown
                      className={`w-5 h-5 transform transition-transform ${
                        showFilters ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                </div>
              </div>

              {/* Filter Content */}
              <div className={`${showFilters ? "block" : "hidden"} lg:block`}>
                {/* Categories */}
                <div className="p-6 border-b border-gray-200">
                  <h3 className="font-semibold text-gray-900 mb-4">
                    Categories
                  </h3>
                  <div className="space-y-2 max-h-48 overflow-y-auto">
                    {categories.map((category) => (
                      <label
                        key={category.id}
                        className="flex items-center space-x-3 cursor-pointer group"
                      >
                        <input
                          type="radio"
                          name="category"
                          value={category.id}
                          checked={categoryFilter === category.id}
                          onChange={(e) =>
                            updateSearchParams({
                              category: e.target.value,
                              page: 1,
                            })
                          }
                          className="w-4 h-4 text-cyan-500 border-gray-300 focus:ring-cyan-500"
                        />
                        <span className="text-sm text-gray-700 group-hover:text-cyan-600 flex items-center">
                          <span className="mr-2">{category.icon}</span>
                          {category.name}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Price Range */}
                <div className="p-6 border-b border-gray-200">
                  <h3 className="font-semibold text-gray-900 mb-4">
                    Price Range
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm text-gray-700 mb-2">
                        Min Price: ₹{minPrice}
                      </label>
                      <input
                        type="range"
                        min="0"
                        max="2000"
                        step="50"
                        value={minPrice}
                        onChange={(e) =>
                          updateSearchParams({
                            minPrice: e.target.value,
                            page: 1,
                          })
                        }
                        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-gray-700 mb-2">
                        Max Price: ₹{maxPrice}
                      </label>
                      <input
                        type="range"
                        min="0"
                        max="2000"
                        step="50"
                        value={maxPrice}
                        onChange={(e) =>
                          updateSearchParams({
                            maxPrice: e.target.value,
                            page: 1,
                          })
                        }
                        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                      />
                    </div>
                    <div className="text-sm text-gray-600 bg-gray-50 p-3 rounded-lg">
                      Range: ₹{minPrice} - ₹{maxPrice}
                    </div>
                  </div>
                </div>

                {/* Sort Options */}
                <div className="p-6">
                  <h3 className="font-semibold text-gray-900 mb-4">Sort By</h3>
                  <div className="space-y-2">
                    {[
                      { value: "relevance", label: "Relevance" },
                      { value: "price-low", label: "Price: Low to High" },
                      { value: "price-high", label: "Price: High to Low" },
                      { value: "newest", label: "Newest First" },
                    ].map((option) => (
                      <label
                        key={option.value}
                        className="flex items-center space-x-3 cursor-pointer group"
                      >
                        <input
                          type="radio"
                          name="sort"
                          value={option.value}
                          checked={sortBy === option.value}
                          onChange={(e) =>
                            updateSearchParams({
                              sort: e.target.value,
                              page: 1,
                            })
                          }
                          className="w-4 h-4 text-cyan-500 border-gray-300 focus:ring-cyan-500"
                        />
                        <span className="text-sm text-gray-700 group-hover:text-cyan-600">
                          {option.label}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1 lg:ml-4">
            {/* Results Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-4">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  {searchQuery ? (
                    <>
                      Showing {filteredProducts.length} results for{" "}
                      <span className="text-cyan-600">"{searchQuery}"</span>
                    </>
                  ) : (
                    `All Products (${filteredProducts.length})`
                  )}
                </h1>
                {categoryFilter !== "All" && (
                  <p className="text-gray-600 mt-1">
                    in category:{" "}
                    <span className="font-medium">{categoryFilter}</span>
                  </p>
                )}
              </div>

              {/* View Toggle */}
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setViewMode("grid")}
                  className={`p-2 rounded-lg border ${
                    viewMode === "grid"
                      ? "bg-cyan-500 text-white border-cyan-500"
                      : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
                  }`}
                >
                  <Grid3X3 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setViewMode("list")}
                  className={`p-2 rounded-lg border ${
                    viewMode === "list"
                      ? "bg-cyan-500 text-white border-cyan-500"
                      : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
                  }`}
                >
                  <List className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Results Grid */}
            {isLoading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {Array.from({ length: 8 }).map((_, index) => (
                  <SkeletonCard key={index} />
                ))}
              </div>
            ) : filteredProducts.length === 0 ? (
              <div className="grid grid-cols-1">
                <EmptyState />
              </div>
            ) : (
              <motion.div
                layout
                className={`grid gap-6 ${
                  viewMode === "grid"
                    ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
                    : "grid-cols-1"
                }`}
              >
                <AnimatePresence>
                  {paginatedProducts.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </AnimatePresence>
              </motion.div>
            )}

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="mt-12 flex items-center justify-center">
                <nav className="flex items-center space-x-2">
                  <button
                    onClick={() =>
                      updateSearchParams({ page: Math.max(1, page - 1) })
                    }
                    disabled={page === 1}
                    className="p-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>

                  {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                    const pageNum =
                      Math.max(1, Math.min(totalPages - 4, page - 2)) + i;
                    return (
                      <button
                        key={pageNum}
                        onClick={() => updateSearchParams({ page: pageNum })}
                        className={`px-3 py-2 rounded-lg border font-medium ${
                          page === pageNum
                            ? "bg-cyan-500 text-white border-cyan-500"
                            : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
                        }`}
                      >
                        {pageNum}
                      </button>
                    );
                  })}

                  <button
                    onClick={() =>
                      updateSearchParams({
                        page: Math.min(totalPages, page + 1),
                      })
                    }
                    disabled={page === totalPages}
                    className="p-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </nav>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchResultsPage;
