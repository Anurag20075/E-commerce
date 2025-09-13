import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, CheckCircle, AlertCircle } from "lucide-react";

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [errors, setErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }

    if (!formData.subject.trim()) {
      newErrors.subject = "Subject is required";
    }

    if (!formData.message.trim()) {
      newErrors.message = "Message is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      setIsSubmitting(true);

      // Simulate API call
      setTimeout(() => {
        setIsSubmitting(false);
        setIsSubmitted(true);

        // Reset form after successful submission
        setFormData({
          name: "",
          email: "",
          subject: "",
          message: "",
        });

        // Reset success message after 5 seconds
        setTimeout(() => setIsSubmitted(false), 5000);
      }, 1500);
    }
  };

  // CMYK accent colors
  const cmykColors = {
    cyan: "#00FFFF",
    magenta: "#FF00FF",
    yellow: "#FFFF00",
    key: "#000000",
  };

  // Contact details
  const contactDetails = [
    {
      icon: <Phone className="w-6 h-6" />,
      title: "Phone",
      value: "+1 (555) 123-4567",
      color: cmykColors.cyan,
    },
    {
      icon: <Mail className="w-6 h-6" />,
      title: "Email",
      value: "contact@example.com",
      color: cmykColors.magenta,
    },
    {
      icon: <MapPin className="w-6 h-6" />,
      title: "Address",
      value: "123 Main Street, City, Country",
      color: cmykColors.yellow,
    },
  ];

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5 },
    },
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      {/* Hero Section */}
      <div className="max-w-7xl mx-auto text-center mb-16">
        <motion.h1
          className="text-4xl md:text-5xl font-bold text-gray-900 mb-6"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Get in Touch
        </motion.h1>

        {/* CMYK Accented Divider */}
        <div className="flex justify-center space-x-2 mb-8">
          <div
            className="h-1 w-16"
            style={{ backgroundColor: cmykColors.cyan }}
          ></div>
          <div
            className="h-1 w-16"
            style={{ backgroundColor: cmykColors.magenta }}
          ></div>
          <div
            className="h-1 w-16"
            style={{ backgroundColor: cmykColors.yellow }}
          ></div>
          <div
            className="h-1 w-16"
            style={{ backgroundColor: cmykColors.key }}
          ></div>
        </div>

        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Have questions or feedback? We'd love to hear from you. Send us a
          message and we'll respond as soon as possible.
        </p>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row gap-12">
          {/* Left Column - Contact Form */}
          <motion.div
            className="lg:w-1/2"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="bg-white rounded-xl shadow-lg p-6 md:p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Send us a message
              </h2>

              {isSubmitted && (
                <motion.div
                  className="mb-6 p-4 bg-green-50 text-green-700 rounded-lg flex items-center"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <CheckCircle className="mr-2 w-5 h-5" />
                  <span>Your message has been sent successfully!</span>
                </motion.div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <motion.div variants={itemVariants}>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:outline-none transition ${
                      errors.name
                        ? "border-red-500 focus:ring-red-200"
                        : "border-gray-300 focus:ring-blue-200 focus:border-blue-500"
                    }`}
                    placeholder="Your name"
                  />
                  {errors.name && (
                    <motion.p
                      className="mt-1 text-sm text-red-600 flex items-center"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                    >
                      <AlertCircle className="mr-1 w-4 h-4" /> {errors.name}
                    </motion.p>
                  )}
                </motion.div>

                <motion.div variants={itemVariants}>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:outline-none transition ${
                      errors.email
                        ? "border-red-500 focus:ring-red-200"
                        : "border-gray-300 focus:ring-blue-200 focus:border-blue-500"
                    }`}
                    placeholder="your.email@example.com"
                  />
                  {errors.email && (
                    <motion.p
                      className="mt-1 text-sm text-red-600 flex items-center"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                    >
                      <AlertCircle className="mr-1 w-4 h-4" /> {errors.email}
                    </motion.p>
                  )}
                </motion.div>

                <motion.div variants={itemVariants}>
                  <label
                    htmlFor="subject"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Subject
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:outline-none transition ${
                      errors.subject
                        ? "border-red-500 focus:ring-red-200"
                        : "border-gray-300 focus:ring-blue-200 focus:border-blue-500"
                    }`}
                    placeholder="Subject of your message"
                  />
                  {errors.subject && (
                    <motion.p
                      className="mt-1 text-sm text-red-600 flex items-center"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                    >
                      <AlertCircle className="mr-1 w-4 h-4" /> {errors.subject}
                    </motion.p>
                  )}
                </motion.div>

                <motion.div variants={itemVariants}>
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={4}
                    className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:outline-none transition ${
                      errors.message
                        ? "border-red-500 focus:ring-red-200"
                        : "border-gray-300 focus:ring-blue-200 focus:border-blue-500"
                    }`}
                    placeholder="Your message..."
                  ></textarea>
                  {errors.message && (
                    <motion.p
                      className="mt-1 text-sm text-red-600 flex items-center"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                    >
                      <AlertCircle className="mr-1 w-4 h-4" /> {errors.message}
                    </motion.p>
                  )}
                </motion.div>

                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-gray-900 text-white py-3 px-6 rounded-lg font-medium hover:bg-gray-800 transition focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 disabled:opacity-70"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {isSubmitting ? "Sending..." : "Send Message"}
                </motion.button>
              </form>
            </div>
          </motion.div>

          {/* Right Column - Contact Details & Map */}
          <motion.div
            className="lg:w-1/2 space-y-8"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            {/* Contact Details */}
            <div className="bg-white rounded-xl shadow-lg p-6 md:p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Contact Information
              </h2>

              <motion.div
                className="grid grid-cols-1 md:grid-cols-3 gap-6"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
              >
                {contactDetails.map((detail, index) => (
                  <motion.div
                    key={index}
                    className="flex flex-col items-center text-center p-4 rounded-lg hover:bg-gray-50 transition"
                    variants={itemVariants}
                    whileHover={{ y: -5 }}
                  >
                    <div
                      className="w-12 h-12 rounded-full flex items-center justify-center mb-3"
                      style={{ backgroundColor: `${detail.color}20` }}
                    >
                      <div style={{ color: detail.color }}>{detail.icon}</div>
                    </div>
                    <h3 className="font-semibold text-gray-900 mb-1">
                      {detail.title}
                    </h3>
                    <p className="text-gray-600 text-sm">{detail.value}</p>
                  </motion.div>
                ))}
              </motion.div>
            </div>

            {/* Map Section */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              <h2 className="text-2xl font-bold text-gray-900 p-6 pb-0">
                Find Us
              </h2>
              <div className="p-6 pt-4">
                <div className="aspect-w-16 aspect-h-9 rounded-lg overflow-hidden bg-gray-200">
                  {/* Google Maps iframe or placeholder */}
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3024.5274053514095!2d-74.00597368459414!3d40.71277597933019!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c25a316bbd8e15%3A0x7a5b3b5c5c5c5c5c!2sNew%20York%2C%20NY%2C%20USA!5e0!3m2!1sen!2sus!4v1629287784045!5m2!1sen!2sus"
                    width="100%"
                    height="100%"
                    style={{ border: 0, minHeight: "300px" }}
                    allowFullScreen=""
                    loading="lazy"
                    title="Google Maps"
                  ></iframe>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
