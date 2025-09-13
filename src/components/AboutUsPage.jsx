import React, { useState, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import {
  Users,
  Target,
  Heart,
  Zap,
  Award,
  Globe,
  Linkedin,
  Twitter,
  Mail,
  ArrowRight,
} from "lucide-react";

export default function AboutUsPage() {
  const [activeTeamMember, setActiveTeamMember] = useState(null);

  // Animation variants
  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  const fadeInLeft = {
    hidden: { opacity: 0, x: -30 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.6 } },
  };

  const fadeInRight = {
    hidden: { opacity: 0, x: 30 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.6 } },
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  // Animated background circles
  useEffect(() => {
    const circles = document.querySelectorAll(".floating-circle");
    circles.forEach((circle, index) => {
      circle.style.animationDelay = `${index * 0.5}s`;
    });
  }, []);

  return (
    <div className="min-h-screen bg-white">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={`bg-circle-${i}`}
            className={`floating-circle absolute w-32 h-32 rounded-full opacity-5 ${
              i % 4 === 0
                ? "bg-cyan-500"
                : i % 4 === 1
                ? "bg-pink-500"
                : i % 4 === 2
                ? "bg-yellow-500"
                : "bg-gray-800"
            }`}
            style={{
              left: `${10 + i * 20}%`,
              top: `${10 + i * 15}%`,
            }}
            animate={{
              y: [0, -30, 0],
              x: [0, 20, 0],
              rotate: [0, 180, 360],
            }}
            transition={{
              duration: 15 + i * 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 overflow-hidden">
        {/* Hero Background Image Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/20 to-transparent z-10"></div>

        {/* Background Image */}
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-100 via-pink-50 to-yellow-50"></div>

        <motion.div
          className="relative z-20 text-center max-w-4xl mx-auto px-6"
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
        >
          <motion.h1
            className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-cyan-600 via-pink-600 to-yellow-600 bg-clip-text text-transparent"
            variants={fadeInUp}
          >
            About Printly
          </motion.h1>

          <motion.p
            className="text-xl md:text-2xl text-gray-700 mb-8 leading-relaxed"
            variants={fadeInUp}
          >
            Transforming ideas into vibrant reality through cutting-edge CMYK
            printing technology
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center"
            variants={fadeInUp}
          >
            <button className="bg-gradient-to-r from-cyan-500 to-pink-500 text-white px-8 py-3 rounded-full font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-300">
              Our Story
            </button>
            <button className="border-2 border-gray-300 text-gray-700 px-8 py-3 rounded-full font-semibold hover:border-gray-400 hover:bg-gray-50 transition-all duration-300">
              Meet the Team
            </button>
          </motion.div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          <motion.div
            className="w-6 h-10 border-2 border-gray-400 rounded-full flex justify-center"
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            <div className="w-1 h-3 bg-gray-400 rounded-full mt-2"></div>
          </motion.div>
        </motion.div>
      </section>

      {/* Brand Story Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInLeft}
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-800">
                Our{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 to-pink-600">
                  Story
                </span>
              </h2>
              <div className="space-y-6 text-gray-600 leading-relaxed">
                <p className="text-lg">
                  Founded in 2020, Printly emerged from a simple belief:
                  everyone deserves access to professional-quality custom
                  printing that brings their unique vision to life.
                </p>
                <p>
                  What started as a small printing studio has evolved into a
                  cutting-edge platform that combines traditional CMYK printing
                  excellence with modern technology. We've helped thousands of
                  customers transform their creative ideas into tangible,
                  high-quality products.
                </p>
                <p>
                  From custom mugs that brighten morning routines to
                  personalized t-shirts that tell stories, we're passionate
                  about making every print perfect. Our commitment to quality,
                  innovation, and customer satisfaction drives everything we do.
                </p>
              </div>
              <motion.button
                className="mt-8 inline-flex items-center gap-2 bg-gradient-to-r from-cyan-500 to-pink-500 text-white px-6 py-3 rounded-full font-semibold hover:shadow-lg transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Learn More <ArrowRight className="w-4 h-4" />
              </motion.button>
            </motion.div>

            <motion.div
              className="relative"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInRight}
            >
              <div className="aspect-square bg-gradient-to-br from-cyan-100 via-pink-100 to-yellow-100 rounded-2xl p-8 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 to-pink-500/10"></div>
                <div className="relative z-10 h-full flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-24 h-24 bg-gradient-to-br from-cyan-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-6">
                      <Users className="w-12 h-12 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-800 mb-4">
                      50,000+
                    </h3>
                    <p className="text-gray-600">Happy Customers Worldwide</p>
                  </div>
                </div>
                {/* Decorative Elements */}
                <div className="absolute top-4 right-4 w-16 h-16 bg-yellow-300/20 rounded-full"></div>
                <div className="absolute bottom-4 left-4 w-12 h-12 bg-cyan-300/20 rounded-full"></div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Mission & Values Section */}
      <section className="py-20 bg-gradient-to-br from-slate-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            className="text-center mb-16"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-800">
              Our{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-600 to-yellow-600">
                Values
              </span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              The principles that guide every decision we make and every product
              we create
            </p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            {[
              {
                icon: Target,
                title: "Precision",
                description:
                  "Every print is crafted with meticulous attention to detail, ensuring colors are vibrant and sharp.",
                color: "from-cyan-500 to-cyan-600",
                bgColor: "bg-cyan-50",
              },
              {
                icon: Heart,
                title: "Passion",
                description:
                  "We love what we do, and it shows in the quality and care we put into every customer interaction.",
                color: "from-pink-500 to-pink-600",
                bgColor: "bg-pink-50",
              },
              {
                icon: Zap,
                title: "Innovation",
                description:
                  "Constantly pushing boundaries with new technologies and creative solutions for better printing.",
                color: "from-yellow-500 to-yellow-600",
                bgColor: "bg-yellow-50",
              },
              {
                icon: Award,
                title: "Excellence",
                description:
                  "We never settle for 'good enough' – every product must meet our highest standards.",
                color: "from-gray-700 to-gray-800",
                bgColor: "bg-gray-50",
              },
              {
                icon: Globe,
                title: "Sustainability",
                description:
                  "Committed to eco-friendly practices and sustainable printing solutions for our planet.",
                color: "from-green-500 to-green-600",
                bgColor: "bg-green-50",
              },
              {
                icon: Users,
                title: "Community",
                description:
                  "Building lasting relationships with customers, partners, and our local community.",
                color: "from-purple-500 to-purple-600",
                bgColor: "bg-purple-50",
              },
            ].map((value, index) => (
              <motion.div
                key={index}
                className={`${value.bgColor} p-8 rounded-2xl border border-gray-100 group cursor-pointer`}
                variants={fadeInUp}
                whileHover={{
                  y: -5,
                  boxShadow:
                    "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
                }}
                transition={{ duration: 0.3 }}
              >
                <div
                  className={`w-16 h-16 bg-gradient-to-r ${value.color} rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}
                >
                  <value.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-4">
                  {value.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {value.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            className="text-center mb-16"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-800">
              Meet Our{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 to-yellow-600">
                Team
              </span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              The creative minds and technical experts behind Printly's success
            </p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            {[
              {
                name: "Sarah Chen",
                role: "Founder & CEO",
                bio: "Visionary leader with 15+ years in printing technology and business development.",
                image:
                  "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400&h=400&fit=crop&crop=face",
                social: {
                  linkedin: "#",
                  twitter: "#",
                  email: "sarah@printly.com",
                },
                color: "from-cyan-500 to-cyan-600",
              },
              {
                name: "Marcus Rodriguez",
                role: "Lead Designer",
                bio: "Creative director specializing in CMYK color theory and brand design excellence.",
                image:
                  "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face",
                social: {
                  linkedin: "#",
                  twitter: "#",
                  email: "marcus@printly.com",
                },
                color: "from-pink-500 to-pink-600",
              },
              {
                name: "Emily Watson",
                role: "Head of Technology",
                bio: "Full-stack developer ensuring our platform delivers seamless user experiences.",
                image:
                  "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=face",
                social: {
                  linkedin: "#",
                  twitter: "#",
                  email: "emily@printly.com",
                },
                color: "from-yellow-500 to-yellow-600",
              },
              {
                name: "David Kim",
                role: "Print Operations",
                bio: "Quality control expert ensuring every print meets our exacting standards.",
                image:
                  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face",
                social: {
                  linkedin: "#",
                  twitter: "#",
                  email: "david@printly.com",
                },
                color: "from-gray-700 to-gray-800",
              },
            ].map((member, index) => (
              <motion.div
                key={index}
                className="bg-white rounded-2xl border border-gray-100 overflow-hidden group cursor-pointer"
                variants={fadeInUp}
                whileHover={{ y: -10 }}
                transition={{ duration: 0.3 }}
                onMouseEnter={() => setActiveTeamMember(index)}
                onMouseLeave={() => setActiveTeamMember(null)}
              >
                <div className="relative overflow-hidden">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div
                    className={`absolute inset-0 bg-gradient-to-t ${member.color} opacity-0 group-hover:opacity-20 transition-opacity duration-300`}
                  ></div>
                </div>

                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-800 mb-2">
                    {member.name}
                  </h3>
                  <p
                    className={`text-sm font-semibold mb-3 bg-gradient-to-r ${member.color} bg-clip-text text-transparent`}
                  >
                    {member.role}
                  </p>
                  <p className="text-gray-600 text-sm leading-relaxed mb-4">
                    {member.bio}
                  </p>

                  <div className="flex gap-3">
                    <a
                      href={member.social.linkedin}
                      className="text-gray-400 hover:text-blue-600 transition-colors"
                    >
                      <Linkedin className="w-4 h-4" />
                    </a>
                    <a
                      href={member.social.twitter}
                      className="text-gray-400 hover:text-blue-400 transition-colors"
                    >
                      <Twitter className="w-4 h-4" />
                    </a>
                    <a
                      href={`mailto:${member.social.email}`}
                      className="text-gray-400 hover:text-gray-600 transition-colors"
                    >
                      <Mail className="w-4 h-4" />
                    </a>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-20 bg-gradient-to-br from-cyan-500 via-pink-500 to-yellow-500 relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative z-10 max-w-4xl mx-auto text-center px-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            <motion.h2
              className="text-4xl md:text-5xl font-bold text-white mb-6"
              variants={fadeInUp}
            >
              Ready to Bring Your Ideas to Life?
            </motion.h2>
            <motion.p
              className="text-xl text-white/90 mb-8 leading-relaxed"
              variants={fadeInUp}
            >
              Join thousands of satisfied customers who trust Printly for their
              custom printing needs
            </motion.p>
            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center"
              variants={fadeInUp}
            >
              <button className="bg-white text-gray-800 px-8 py-3 rounded-full font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-300">
                Start Creating
              </button>
              <button className="border-2 border-white text-white px-8 py-3 rounded-full font-semibold hover:bg-white hover:text-gray-800 transition-all duration-300">
                Contact Us
              </button>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
