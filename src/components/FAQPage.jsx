// import React, { useState } from "react";
// import { ChevronDown, Search } from "lucide-react";

// const FAQPage = () => {
//   const [openItems, setOpenItems] = useState(new Set());
//   const [searchTerm, setSearchTerm] = useState("");

//   const faqs = [
//     {
//       id: 1,
//       question: "What is your return policy?",
//       answer:
//         "We offer a 30-day return policy for all unused items in their original packaging. Simply contact our customer service team to initiate a return, and we'll provide you with a prepaid shipping label. Refunds are processed within 5-7 business days after we receive your return.",
//     },
//     {
//       id: 2,
//       question: "How long does shipping take?",
//       answer:
//         "Standard shipping typically takes 3-5 business days within the continental US. Express shipping (1-2 business days) and overnight shipping options are also available at checkout. International shipping times vary by destination, typically 7-14 business days.",
//     },
//     {
//       id: 3,
//       question: "Do you offer international shipping?",
//       answer:
//         "Yes! We ship to over 50 countries worldwide. Shipping costs and delivery times vary by destination. All international orders are subject to customs duties and taxes, which are the responsibility of the recipient.",
//     },
//     {
//       id: 4,
//       question: "How can I track my order?",
//       answer:
//         "Once your order ships, you'll receive a tracking number via email. You can use this number to track your package on our website or directly with the shipping carrier. You'll also receive automatic updates about your package's progress.",
//     },
//     {
//       id: 5,
//       question: "What payment methods do you accept?",
//       answer:
//         "We accept all major credit cards (Visa, Mastercard, American Express, Discover), PayPal, Apple Pay, Google Pay, and Shop Pay. All transactions are secured with 256-bit SSL encryption for your protection.",
//     },
//     {
//       id: 6,
//       question: "Can I cancel or modify my order?",
//       answer:
//         "Orders can be cancelled or modified within 1 hour of placement. After this window, orders enter our fulfillment process and cannot be changed. If you need to make changes, please contact customer service immediately.",
//     },
//     {
//       id: 7,
//       question: "Do you offer customer support?",
//       answer:
//         "Absolutely! Our customer support team is available Monday-Friday 9AM-6PM EST via live chat, email, or phone. We also have a comprehensive help center with guides and tutorials available 24/7.",
//     },
//     {
//       id: 8,
//       question: "Are your products covered by warranty?",
//       answer:
//         "Yes, all our products come with a minimum 1-year manufacturer warranty. Premium products include extended warranty options up to 3 years. Warranty coverage includes defects in materials and workmanship under normal use conditions.",
//     },
//     {
//       id: 9,
//       question: "How do I create an account?",
//       answer:
//         "Creating an account is easy! Click the 'Sign Up' button in the top right corner, enter your email and create a password. You can also sign up using your Google or Facebook account for faster registration.",
//     },
//     {
//       id: 10,
//       question: "Do you have a loyalty program?",
//       answer:
//         "Yes! Our VIP program offers exclusive benefits including early access to sales, free shipping on all orders, birthday discounts, and reward points for every purchase. Sign up is free and you'll start earning rewards immediately.",
//     },
//   ];

//   const filteredFAQs = faqs.filter(
//     (faq) =>
//       faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       faq.answer.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   const toggleItem = (id) => {
//     const newOpenItems = new Set(openItems);
//     if (newOpenItems.has(id)) {
//       newOpenItems.delete(id);
//     } else {
//       newOpenItems.add(id);
//     }
//     setOpenItems(newOpenItems);
//   };

//   return (
//     <div className="min-h-screen bg-gray-50">
//       {/* Hero Section */}
//       <div className="bg-white border-b border-gray-200">
//         <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
//           <div className="text-center">
//             <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-4">
//               Frequently Asked Questions
//             </h1>
//             <div className="w-24 h-1 bg-gradient-to-r from-cyan-500 via-magenta-500 to-yellow-400 mx-auto rounded-full"></div>
//             <p className="mt-6 text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto">
//               Find quick answers to common questions about our products and
//               services.
//             </p>
//           </div>
//         </div>
//       </div>

//       {/* FAQ Section */}
//       <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
//         {/* Search Bar */}
//         <div className="mb-8">
//           <div className="relative">
//             <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//               <Search className="h-5 w-5 text-gray-400" />
//             </div>
//             <input
//               type="text"
//               placeholder="Search FAQs..."
//               value={searchTerm}
//               onChange={(e) => setSearchTerm(e.target.value)}
//               className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all duration-200"
//             />
//           </div>
//         </div>

//         {/* Accordion */}
//         <div className="space-y-4">
//           {filteredFAQs.map((faq) => {
//             const isOpen = openItems.has(faq.id);

//             return (
//               <div
//                 key={faq.id}
//                 className="bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden"
//               >
//                 <button
//                   onClick={() => toggleItem(faq.id)}
//                   className="w-full px-6 py-5 text-left focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-inset hover:bg-gray-50 transition-colors duration-200"
//                 >
//                   <div className="flex justify-between items-center">
//                     <h3 className="text-lg font-semibold text-gray-900 pr-4">
//                       {faq.question}
//                     </h3>
//                     <ChevronDown
//                       className={`h-5 w-5 text-gray-500 transition-transform duration-300 flex-shrink-0 ${
//                         isOpen ? "transform rotate-180" : ""
//                       }`}
//                     />
//                   </div>
//                 </button>

//                 <div
//                   className={`px-6 transition-all duration-300 ease-in-out ${
//                     isOpen
//                       ? "max-h-96 opacity-100 pb-5"
//                       : "max-h-0 opacity-0 pb-0"
//                   }`}
//                   style={{
//                     overflow: "hidden",
//                   }}
//                 >
//                   <div className="border-t border-gray-100 pt-4">
//                     <p className="text-gray-600 leading-relaxed">
//                       {faq.answer}
//                     </p>
//                   </div>
//                 </div>
//               </div>
//             );
//           })}
//         </div>

//         {/* No Results */}
//         {filteredFAQs.length === 0 && (
//           <div className="text-center py-12">
//             <div className="text-gray-400 mb-4">
//               <Search className="h-12 w-12 mx-auto" />
//             </div>
//             <h3 className="text-lg font-medium text-gray-900 mb-2">
//               No FAQs found
//             </h3>
//             <p className="text-gray-600">
//               Try adjusting your search terms or browse all questions above.
//             </p>
//           </div>
//         )}

//         {/* Contact CTA */}
//         <div className="mt-16 text-center">
//           <div className="bg-gradient-to-r from-cyan-50 to-blue-50 border border-cyan-200 rounded-xl p-8">
//             <h3 className="text-2xl font-bold text-gray-900 mb-4">
//               Still have questions?
//             </h3>
//             <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
//               Can't find what you're looking for? Our support team is here to
//               help you get the answers you need.
//             </p>
//             <button className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-lg text-white bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500 transition-all duration-200 transform hover:scale-105">
//               Contact Support
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default FAQPage;
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const FAQPage = () => {
  const [activeIndex, setActiveIndex] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  const faqs = [
    {
      question: "How do I create an account?",
      answer:
        "To create an account, click on the 'Sign Up' button in the top right corner of our homepage. Fill in your details including your name, email address, and a secure password. Once submitted, you'll receive a confirmation email to verify your account.",
    },
    {
      question: "What payment methods do you accept?",
      answer:
        "We accept all major credit cards including Visa, MasterCard, American Express, and Discover. We also support payments through PayPal, Apple Pay, and Google Pay for your convenience.",
    },
    {
      question: "How can I reset my password?",
      answer:
        "If you've forgotten your password, click on the 'Forgot Password' link on the login page. Enter your email address, and we'll send you instructions to reset your password. Make sure to create a strong, unique password for your security.",
    },
    {
      question: "What is your return policy?",
      answer:
        "We offer a 30-day return policy for all unused items in their original packaging. To initiate a return, log into your account, go to 'Order History', and select the item you wish to return. Follow the prompts to print a return label and receive instructions on how to send the item back.",
    },
    {
      question: "How long does shipping take?",
      answer:
        "Standard shipping typically takes 3-5 business days within the continental US. For international orders, shipping can take 7-14 business days depending on the destination. We also offer expedited shipping options at checkout for faster delivery.",
    },
    {
      question: "Do you offer international shipping?",
      answer:
        "Yes, we ship to over 100 countries worldwide. International shipping rates are calculated at checkout based on your location and the weight of your order. Please note that international customers may be responsible for customs duties and taxes imposed by their country.",
    },
    {
      question: "How can I track my order?",
      answer:
        "Once your order has shipped, you'll receive a tracking number via email. You can enter this tracking number on our website's tracking page or on the carrier's website to see the current status and location of your package.",
    },
    {
      question: "Do you offer customer support?",
      answer:
        "Yes, our customer support team is available Monday through Friday, 9 AM to 6 PM EST. You can reach us via email at support@example.com, through our live chat feature on the website, or by calling our toll-free number at 1-800-123-4567.",
    },
    {
      question: "Can I change or cancel my order?",
      answer:
        "You can change or cancel your order within 1 hour of placing it. After this time, your order may already be in processing. To make changes, log into your account and go to 'Order History', or contact our customer support team immediately for assistance.",
    },
    {
      question: "Do you offer discounts for bulk orders?",
      answer:
        "Yes, we offer tiered discounts for bulk orders. The discount percentage increases with the quantity ordered. For orders of 50+ items, please contact our sales team at sales@example.com to discuss custom pricing and options.",
    },
  ];

  const toggleAccordion = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const filteredFaqs = faqs.filter(
    (faq) =>
      faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <motion.h1
            className="text-4xl md:text-5xl font-bold text-gray-900 mb-4"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Frequently Asked Questions
          </motion.h1>
          <div className="flex justify-center">
            <div className="h-1 w-32 bg-gradient-to-r from-cyan-500 via-purple-500 to-yellow-500 rounded-full"></div>
          </div>
          <motion.p
            className="mt-6 text-lg text-gray-600 max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            Find answers to common questions about our products, services, and
            policies.
          </motion.p>
        </div>

        {/* Search Bar */}
        <motion.div
          className="mb-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          <div className="relative">
            <input
              type="text"
              placeholder="Search FAQs..."
              className="w-full px-4 py-3 pl-12 pr-4 text-gray-700 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <svg
              className="absolute left-4 top-3.5 h-5 w-5 text-gray-400"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                clipRule="evenodd"
              />
            </svg>
          </div>
        </motion.div>

        {/* Accordion Section */}
        <motion.div
          className="space-y-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          {filteredFaqs.length > 0 ? (
            filteredFaqs.map((faq, index) => (
              <motion.div
                key={index}
                className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-200 hover:shadow-md transition-shadow duration-300"
                whileHover={{ y: -2 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index, duration: 0.3 }}
              >
                <button
                  className="flex justify-between items-center w-full p-6 text-left focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-opacity-50 rounded-t-xl"
                  onClick={() => toggleAccordion(index)}
                >
                  <span className="text-lg font-medium text-gray-900">
                    {faq.question}
                  </span>
                  <motion.div
                    animate={{ rotate: activeIndex === index ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <svg
                      className="h-6 w-6 text-gray-500"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </motion.div>
                </button>

                <AnimatePresence>
                  {activeIndex === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 pb-6 text-gray-600">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))
          ) : (
            <div className="text-center py-10">
              <svg
                className="mx-auto h-12 w-12 text-gray-400"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <h3 className="mt-2 text-lg font-medium text-gray-900">
                No results found
              </h3>
              <p className="mt-1 text-gray-500">
                We couldn't find any FAQs matching your search. Try different
                keywords.
              </p>
            </div>
          )}
        </motion.div>

        {/* Additional Help Section */}
        <motion.div
          className="mt-16 text-center bg-white rounded-xl p-8 shadow-sm border border-gray-200"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.5 }}
        >
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Still have questions?
          </h2>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            If you can't find the answer you're looking for, our support team is
            ready to help.
          </p>
          <button className="px-6 py-3 bg-gradient-to-r from-cyan-500 to-purple-500 text-white font-medium rounded-lg hover:opacity-90 transition-opacity duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500">
            Contact Support
          </button>
        </motion.div>
      </div>
    </div>
  );
};

export default FAQPage;
