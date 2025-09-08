import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Search, ShoppingCart } from "lucide-react";

function Navbar() {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link to="/" className="flex items-center gap-3">
            <div className="rounded-md bg-gradient-to-br from-cyan-400 to-magenta-400 p-1">
              <div className="bg-white rounded-md px-3 py-1 font-bold text-lg">
                Printly
              </div>
            </div>
          </Link>
          <nav className="hidden md:flex gap-6 text-sm font-medium text-slate-700">
            <Link to="/categories" className="hover:text-slate-900">
              Products
            </Link>
            <Link to="/how-it-works" className="hover:text-slate-900">
              \r How it works
            </Link>
            <Link to="/templates" className="hover:text-slate-900">
              \r Templates
            </Link>
          </nav>
        </div>
        <div className="flex items-center gap-4">
          <form
            onSubmit={handleSearch}
            className="hidden md:flex items-center relative"
          >
            <input
              aria-label="search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-64 rounded-full border border-slate-200 px-4 py-2 pr-10 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-300"
              placeholder="Search products or templates"
            />
            <button
              type="submit"
              className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              <Search className="w-4 h-4" />
            </button>
          </form>
          <button className="hidden md:inline-flex items-center gap-2 bg-slate-900 text-white text-sm px-4 py-2 rounded-full shadow-sm hover:opacity-95">
            Sign in
          </button>
          <Link
            to="/cart"
            className="relative inline-flex items-center gap-2 border border-slate-200 px-3 py-2 rounded-full text-sm hover:bg-gray-50 transition-colors"
          >
            <ShoppingCart className="w-4 h-4" />
            Cart
            <span className="absolute -top-2 -right-2 inline-flex items-center justify-center rounded-full bg-red-500 text-white text-xs w-5 h-5">
              3
            </span>
          </Link>
        </div>
      </div>
    </header>
  );
}
export default Navbar;
