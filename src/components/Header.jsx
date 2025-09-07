import React, { useState, useEffect } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Star,
  CheckCircle,
  Upload,
  Eye,
  Truck,
  ShoppingCart,
  Menu,
  X,
  Mail,
  Phone,
  MapPin,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
} from "lucide-react";

const Header = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  // const [email, setEmail] = useState("");

  const categories = [
    { name: "T-Shirts", image: "/api/placeholder/300/200", icon: "👕" },
    { name: "Mugs", image: "/api/placeholder/300/200", icon: "☕" },
    { name: "Business Cards", image: "/api/placeholder/300/200", icon: "💼" },
    { name: "Posters", image: "/api/placeholder/300/200", icon: "🖼️" },
    { name: "Stickers", image: "/api/placeholder/300/200", icon: "⭐" },
    { name: "Canvas Prints", image: "/api/placeholder/300/200", icon: "🎨" },
  ];

  const templates = [
    {
      id: 1,
      name: "Modern Business Card",
      category: "Business Cards",
      image: "/api/placeholder/400/300",
    },
    {
      id: 2,
      name: "Vintage T-Shirt Design",
      category: "T-Shirts",
      image: "/api/placeholder/400/300",
    },
    {
      id: 3,
      name: "Motivational Poster",
      category: "Posters",
      image: "/api/placeholder/400/300",
    },
    {
      id: 4,
      name: "Coffee Mug Design",
      category: "Mugs",
      image: "/api/placeholder/400/300",
    },
    {
      id: 5,
      name: "Logo Stickers",
      category: "Stickers",
      image: "/api/placeholder/400/300",
    },
  ];

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Small Business Owner",
      text: "Amazing quality and fast turnaround! My business cards look incredibly professional.",
      rating: 5,
    },
    {
      name: "Mike Chen",
      role: "Marketing Manager",
      text: "The custom t-shirts for our team event were perfect. Great customer service too!",
      rating: 5,
    },
    {
      name: "Emily Davis",
      role: "Event Planner",
      text: "Reliable service with consistent quality. We use them for all our promotional materials.",
      rating: 5,
    },
  ];

  const steps = [
    {
      icon: <ShoppingCart className="w-8 h-8" />,
      title: "Choose",
      description: "Select your product from our wide range of options",
    },
    {
      icon: <Upload className="w-8 h-8" />,
      title: "Customize",
      description: "Upload your design or choose from our templates",
    },
    {
      icon: <Eye className="w-8 h-8" />,
      title: "Preview",
      description: "See exactly how your product will look before ordering",
    },
    {
      icon: <Truck className="w-8 h-8" />,
      title: "Deliver",
      description: "Fast, reliable printing and shipping to your door",
    },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % templates.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % templates.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + templates.length) % templates.length);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-slate-50 to-blue-50 py-20 px-4 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-20 h-20 bg-cyan-400 rounded-full animate-pulse"></div>
          <div
            className="absolute top-1/2 right-20 w-16 h-16 bg-magenta-400 rounded-full animate-bounce"
            style={{ animationDelay: "1s" }}
          ></div>
          <div
            className="absolute bottom-20 left-1/3 w-12 h-12 bg-yellow-400 rounded-full animate-ping"
            style={{ animationDelay: "2s" }}
          ></div>
        </div>

        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="text-center lg:text-left">
              <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
                Bring Your Ideas to{" "}
                <span className="bg-gradient-to-r from-cyan-500 via-magenta-500 to-yellow-400 bg-clip-text text-transparent">
                  Life
                </span>
                <br />
                with Custom Prints
              </h1>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                Professional-quality custom printing for businesses and
                individuals. From business cards to t-shirts, we make your
                vision reality.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <button className="bg-gradient-to-r from-cyan-500 to-magenta-500 text-white px-8 py-4 rounded-full text-lg font-semibold hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300">
                  Shop Now
                </button>
                <button className="border-2 border-gray-800 text-gray-800 px-8 py-4 rounded-full text-lg font-semibold hover:bg-gray-800 hover:text-white transition-all duration-300">
                  Customize Your Product
                </button>
              </div>
            </div>

            <div className="relative">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-4">
                  <div className="bg-white rounded-2xl shadow-xl p-6 transform rotate-3 hover:rotate-0 transition-transform duration-300">
                    <img
                      src="/api/placeholder/200/150"
                      alt="Custom T-Shirt"
                      className="w-full h-32 object-cover rounded-lg mb-3"
                    />
                    <h3 className="font-semibold text-gray-800">
                      Custom T-Shirts
                    </h3>
                  </div>
                  <div className="bg-white rounded-2xl shadow-xl p-6 transform -rotate-2 hover:rotate-0 transition-transform duration-300">
                    <img
                      src="/api/placeholder/200/150"
                      alt="Business Cards"
                      className="w-full h-32 object-cover rounded-lg mb-3"
                    />
                    <h3 className="font-semibold text-gray-800">
                      Business Cards
                    </h3>
                  </div>
                </div>
                <div className="space-y-4 mt-8">
                  <div className="bg-white rounded-2xl shadow-xl p-6 transform -rotate-3 hover:rotate-0 transition-transform duration-300">
                    <img
                      src="/api/placeholder/200/150"
                      alt="Custom Mugs"
                      className="w-full h-32 object-cover rounded-lg mb-3"
                    />
                    <h3 className="font-semibold text-gray-800">Custom Mugs</h3>
                  </div>
                  <div className="bg-white rounded-2xl shadow-xl p-6 transform rotate-2 hover:rotate-0 transition-transform duration-300">
                    <img
                      src="/api/placeholder/200/150"
                      alt="Posters"
                      className="w-full h-32 object-cover rounded-lg mb-3"
                    />
                    <h3 className="font-semibold text-gray-800">Posters</h3>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Category Highlights */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              What Would You Like to{" "}
              <span className="bg-gradient-to-r from-magenta-500 to-yellow-400 bg-clip-text text-transparent">
                Print?
              </span>
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Choose from our wide selection of products, all customizable with
              your unique designs
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            {categories.map((category, index) => (
              <div key={index} className="group cursor-pointer">
                <div className="bg-white rounded-3xl shadow-lg overflow-hidden transform hover:-translate-y-2 hover:shadow-2xl transition-all duration-500">
                  <div className="relative overflow-hidden">
                    <img
                      src={category.image}
                      alt={category.name}
                      className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent group-hover:from-cyan-500/20 transition-all duration-500"></div>
                    <div className="absolute top-4 right-4 text-3xl bg-white/90 rounded-full p-2 group-hover:scale-110 transition-transform duration-300">
                      {category.icon}
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-2xl font-bold text-gray-800 mb-2 group-hover:text-cyan-600 transition-colors duration-300">
                      {category.name}
                    </h3>
                    <p className="text-gray-600 mb-4">
                      High-quality custom {category.name.toLowerCase()} with
                      your designs
                    </p>
                    <button className="text-cyan-600 font-semibold hover:text-magenta-500 transition-colors duration-300 flex items-center gap-2">
                      Explore Options
                      <ChevronRight
                        size={16}
                        className="group-hover:translate-x-1 transition-transform duration-300"
                      />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 px-4 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              How It{" "}
              <span className="bg-gradient-to-r from-cyan-500 to-magenta-500 bg-clip-text text-transparent">
                Works
              </span>
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Getting your custom prints is easy with our streamlined process
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <div key={index} className="text-center group">
                <div className="relative mb-6">
                  <div className="w-20 h-20 bg-gradient-to-r from-cyan-400 to-magenta-400 rounded-full flex items-center justify-center text-white mx-auto group-hover:scale-110 transition-transform duration-300 shadow-lg">
                    {step.icon}
                  </div>
                  <div className="absolute -top-2 -right-2 bg-yellow-400 text-gray-900 w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold">
                    {index + 1}
                  </div>
                  {index < steps.length - 1 && (
                    <div className="hidden lg:block absolute top-10 left-full w-full h-0.5 bg-gradient-to-r from-cyan-300 to-magenta-300 transform -translate-x-10"></div>
                  )}
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-3 group-hover:text-cyan-600 transition-colors duration-300">
                  {step.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {step.description}
                </p>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <button className="bg-gradient-to-r from-magenta-500 to-yellow-400 text-white px-8 py-4 rounded-full text-lg font-semibold hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300 ">
              Start Your Project
            </button>
          </div>
        </div>
      </section>

      {/* Featured Templates */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              Featured{" "}
              <span className="bg-gradient-to-r from-yellow-400 to-cyan-500 bg-clip-text text-transparent">
                Templates
              </span>
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Get started quickly with our professionally designed templates
            </p>
          </div>

          <div className="relative">
            <div className="overflow-hidden rounded-3xl">
              <div
                className="flex transition-transform duration-500 ease-in-out"
                style={{ transform: `translateX(-${currentSlide * 100}%)` }}
              >
                {templates.map((template) => (
                  <div key={template.id} className="w-full flex-shrink-0">
                    <div className="grid md:grid-cols-2 gap-8 items-center bg-white rounded-3xl shadow-xl overflow-hidden">
                      <div className="p-8 lg:p-12">
                        <span className="inline-block bg-gradient-to-r from-cyan-100 to-magenta-100 text-cyan-800 px-4 py-2 rounded-full text-sm font-semibold mb-4">
                          {template.category}
                        </span>
                        <h3 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                          {template.name}
                        </h3>
                        <p className="text-gray-600 mb-6 text-lg leading-relaxed">
                          Professional design ready to customize with your
                          content. High-quality templates designed by our expert
                          team.
                        </p>
                        <div className="flex gap-4">
                          <button className="bg-gradient-to-r from-cyan-500 to-magenta-500 text-white px-6 py-3 rounded-full font-semibold hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-300">
                            Use This Template
                          </button>
                          <button className="border-2 border-gray-300 text-gray-700 px-6 py-3 rounded-full font-semibold hover:border-cyan-500 hover:text-cyan-600 transition-colors duration-300 shadow">
                            Preview
                          </button>
                        </div>
                      </div>
                      <div className="relative">
                        <img
                          src={template.image}
                          alt={template.name}
                          className="w-full h-64 md:h-96 object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent"></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <button
              onClick={prevSlide}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white text-gray-800 w-12 h-12 rounded-full shadow-lg flex items-center justify-center transition-all duration-300 hover:scale-110"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              onClick={nextSlide}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white text-gray-800 w-12 h-12 rounded-full shadow-lg flex items-center justify-center transition-all duration-300 hover:scale-110"
            >
              <ChevronRight size={20} />
            </button>

            <div className="flex justify-center mt-8 space-x-2">
              {templates.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    currentSlide === index
                      ? "bg-gradient-to-r from-cyan-500 to-magenta-500 w-8"
                      : "bg-gray-300 hover:bg-gray-400"
                  }`}
                ></button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 px-4 bg-gradient-to-br from-gray-900 to-gray-800">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-white mb-4">
              What Our{" "}
              <span className="bg-gradient-to-r from-cyan-400 to-yellow-400 bg-clip-text text-transparent">
                Customers
              </span>{" "}
              Say
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Join thousands of satisfied customers who trust us with their
              printing needs
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="bg-white rounded-3xl p-8 shadow-xl hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-500"
              >
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star
                      key={i}
                      size={20}
                      className="text-yellow-400 fill-current"
                    />
                  ))}
                </div>
                <p className="text-gray-600 mb-6 leading-relaxed text-lg">
                  "{testimonial.text}"
                </p>
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-gradient-to-r from-cyan-400 to-magenta-400 rounded-full flex items-center justify-center text-white font-bold text-lg mr-4">
                    {testimonial.name.charAt(0)}
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-800">
                      {testimonial.name}
                    </h4>
                    <p className="text-gray-600 text-sm">{testimonial.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <div className="flex flex-wrap justify-center items-center gap-8 opacity-60">
              <div className="text-white font-semibold">
                Trusted by leading brands:
              </div>
              <div className="w-24 h-8 bg-gray-600 rounded"></div>
              <div className="w-20 h-8 bg-gray-600 rounded"></div>
              <div className="w-28 h-8 bg-gray-600 rounded"></div>
              <div className="w-22 h-8 bg-gray-600 rounded"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      {/* <footer className="bg-gray-900 text-white py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
            <div>
              <div className="text-3xl font-bold bg-gradient-to-r from-cyan-400 via-magenta-400 to-yellow-400 bg-clip-text text-transparent mb-4">
                PrintCraft
              </div>
              <p className="text-gray-400 mb-6 leading-relaxed">
                Your trusted partner for high-quality custom printing solutions.
                Bringing your creative visions to life since 2020.
              </p>
              <div className="flex space-x-4">
                <a
                  href="#"
                  className="text-gray-400 hover:text-cyan-400 transition-colors duration-300"
                >
                  <Facebook size={24} />
                </a>
                <a
                  href="#"
                  className="text-gray-400 hover:text-magenta-400 transition-colors duration-300"
                >
                  <Twitter size={24} />
                </a>
                <a
                  href="#"
                  className="text-gray-400 hover:text-yellow-400 transition-colors duration-300"
                >
                  <Instagram size={24} />
                </a>
                <a
                  href="#"
                  className="text-gray-400 hover:text-cyan-400 transition-colors duration-300"
                >
                  <Linkedin size={24} />
                </a>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-bold mb-6 text-white">Products</h3>
              <ul className="space-y-3">
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-cyan-400 transition-colors duration-300"
                  >
                    T-Shirts
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-magenta-400 transition-colors duration-300"
                  >
                    Mugs
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-yellow-400 transition-colors duration-300"
                  >
                    Business Cards
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-cyan-400 transition-colors duration-300"
                  >
                    Posters
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-magenta-400 transition-colors duration-300"
                  >
                    Stickers
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-yellow-400 transition-colors duration-300"
                  >
                    Canvas Prints
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-bold mb-6 text-white">Company</h3>
              <ul className="space-y-3">
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-cyan-400 transition-colors duration-300"
                  >
                    About Us
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-magenta-400 transition-colors duration-300"
                  >
                    How It Works
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-yellow-400 transition-colors duration-300"
                  >
                    Quality Promise
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-cyan-400 transition-colors duration-300"
                  >
                    Shipping Info
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-magenta-400 transition-colors duration-300"
                  >
                    Returns
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-yellow-400 transition-colors duration-300"
                  >
                    Contact
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-bold mb-6 text-white">
                Stay Updated
              </h3>
              <p className="text-gray-400 mb-4">
                Get the latest templates and special offers delivered to your
                inbox.
              </p>
              <form onSubmit={handleNewsletterSubmit} className="space-y-3">
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 rounded-full bg-gray-800 border border-gray-700 text-white placeholder-gray-400 focus:outline-none focus:border-cyan-500 transition-colors duration-300"
                  required
                />
                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-cyan-500 to-magenta-500 text-white px-6 py-3 rounded-full font-semibold hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-300"
                >
                  Subscribe
                </button>
              </form>

              <div className="mt-6 space-y-2">
                <div className="flex items-center text-gray-400">
                  <Phone size={16} className="mr-2" />
                  <span>1-800-PRINTCRAFT</span>
                </div>
                <div className="flex items-center text-gray-400">
                  <Mail size={16} className="mr-2" />
                  <span>hello@printcraft.com</span>
                </div>
                <div className="flex items-center text-gray-400">
                  <MapPin size={16} className="mr-2" />
                  <span>New York, NY 10001</span>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-800 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <p className="text-gray-400 mb-4 md:mb-0">
                © 2025 PrintCraft. All rights reserved.
              </p>
              <div className="flex space-x-6">
                <a
                  href="#"
                  className="text-gray-400 hover:text-cyan-400 transition-colors duration-300"
                >
                  Privacy Policy
                </a>
                <a
                  href="#"
                  className="text-gray-400 hover:text-magenta-400 transition-colors duration-300"
                >
                  Terms of Service
                </a>
                <a
                  href="#"
                  className="text-gray-400 hover:text-yellow-400 transition-colors duration-300"
                >
                  Cookie Policy
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer> */}
    </div>
  );
};

export default Header;
