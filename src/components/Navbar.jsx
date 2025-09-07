function Navbar() {
  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="rounded-md bg-gradient-to-br from-cyan-400 to-magenta-400 p-1">
            <div className="bg-white rounded-md px-3 py-1 font-bold text-lg">
              Printly
            </div>
          </div>
          <nav className="hidden md:flex gap-6 text-sm font-medium text-slate-700">
            <a href="#categories" className="hover:text-slate-900">
              Products
            </a>
            <a href="#howitworks" className="hover:text-slate-900">
              How it works
            </a>
            <a href="#templates" className="hover:text-slate-900">
              Templates
            </a>
          </nav>
        </div>
        <div className="flex items-center gap-4">
          <input
            aria-label="search"
            className="hidden md:block w-64 rounded-full border border-slate-200 px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-300"
            placeholder="Search products or templates"
          />
          <button className="hidden md:inline-flex items-center gap-2 bg-slate-900 text-white text-sm px-4 py-2 rounded-full shadow-sm hover:opacity-95">
            Sign in
          </button>
          <button className="relative inline-flex items-center gap-2 border border-slate-200 px-3 py-2 rounded-full text-sm">
            Cart
            <span className="absolute -top-2 -right-2 inline-flex items-center justify-center rounded-full bg-red-500 text-white text-xs w-5 h-5">
              3
            </span>
          </button>
        </div>
      </div>
    </header>
  );
}
export default Navbar;
