import React, { useState, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Upload,
  Type,
  Palette,
  RotateCcw,
  Download,
  ShoppingCart,
  ChevronDown,
  ChevronUp,
  Bold,
  Italic,
  Move,
  Maximize2,
  X,
  Check,
  AlertCircle,
  Shirt,
  Coffee,
  CreditCard,
} from "lucide-react";

// Mockup templates
const mockupTemplates = {
  "t-shirt": {
    name: "T-Shirt",
    icon: Shirt,
    background:
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    designArea: { x: 200, y: 150, width: 400, height: 300 },
  },
  mug: {
    name: "Mug",
    icon: Coffee,
    background:
      "https://images.unsplash.com/photo-1544787219-7f47ccb76574?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    designArea: { x: 250, y: 100, width: 300, height: 200 },
  },
  "business-card": {
    name: "Business Card",
    icon: CreditCard,
    background:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    designArea: { x: 150, y: 120, width: 500, height: 280 },
  },
};

// Google Fonts list (simplified)
const googleFonts = [
  "Inter",
  "Roboto",
  "Open Sans",
  "Lato",
  "Montserrat",
  "Oswald",
  "Source Sans Pro",
  "Raleway",
  "Poppins",
  "Nunito",
];

// Toast notification component
const Toast = ({ message, type, onClose }) => (
  <motion.div
    initial={{ opacity: 0, x: 300 }}
    animate={{ opacity: 1, x: 0 }}
    exit={{ opacity: 0, x: 300 }}
    className={`fixed top-4 right-4 z-50 flex items-center gap-2 px-4 py-3 rounded-lg shadow-lg ${
      type === "success"
        ? "bg-green-500 text-white"
        : type === "error"
        ? "bg-red-500 text-white"
        : "bg-blue-500 text-white"
    }`}
  >
    {type === "success" && <Check size={18} />}
    {type === "error" && <AlertCircle size={18} />}
    <span className="text-sm font-medium">{message}</span>
    <button onClick={onClose} className="ml-2">
      <X size={16} />
    </button>
  </motion.div>
);

// Loading skeleton for mockup
const MockupSkeleton = () => (
  <div className="w-full h-full bg-gradient-to-br from-gray-200 to-gray-300 animate-pulse rounded-lg flex items-center justify-center">
    <div className="text-gray-500">Loading mockup...</div>
  </div>
);

export default function ProductCustomizer() {
  const [selectedMockup, setSelectedMockup] = useState("t-shirt");
  const [uploadedImage, setUploadedImage] = useState(null);
  const [customText, setCustomText] = useState("");
  const [textStyle, setTextStyle] = useState({
    fontFamily: "Inter",
    fontSize: 24,
    color: "#000000",
    bold: false,
    italic: false,
  });
  const [imagePosition, setImagePosition] = useState({ x: 50, y: 50 });
  const [imageSize, setImageSize] = useState({ width: 200, height: 150 });
  const [textPosition, setTextPosition] = useState({ x: 100, y: 100 });
  const [isLoading, setIsLoading] = useState(false);
  const [toast, setToast] = useState(null);
  const [collapsedSections, setCollapsedSections] = useState({
    upload: false,
    text: false,
    mockup: false,
  });

  const fileInputRef = useRef(null);
  const mockupRef = useRef(null);

  // Toast helpers
  const showToast = useCallback((message, type = "info") => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  }, []);

  // File upload validation and handling
  const handleFileUpload = useCallback(
    (event) => {
      const file = event.target.files?.[0];
      if (!file) return;

      // Validate file type
      if (!file.type.match(/^image\/(png|jpg|jpeg)$/)) {
        showToast("Please upload a PNG or JPG image", "error");
        return;
      }

      // Validate file size (5MB limit)
      if (file.size > 5 * 1024 * 1024) {
        showToast("File size must be less than 5MB", "error");
        return;
      }

      // Create image preview
      const reader = new FileReader();
      reader.onload = (e) => {
        setUploadedImage({
          file,
          url: e.target.result,
          name: file.name,
        });
        showToast("Image uploaded successfully!", "success");
      };
      reader.readAsDataURL(file);
    },
    [showToast]
  );

  // Reset all customizations
  const handleReset = useCallback(() => {
    setUploadedImage(null);
    setCustomText("");
    setTextStyle({
      fontFamily: "Inter",
      fontSize: 24,
      color: "#000000",
      bold: false,
      italic: false,
    });
    setImagePosition({ x: 50, y: 50 });
    setImageSize({ width: 200, height: 150 });
    setTextPosition({ x: 100, y: 100 });
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
    showToast("Design reset successfully", "success");
  }, [showToast]);

  // Download preview (mock implementation)
  const handleDownload = useCallback(() => {
    setIsLoading(true);
    // Simulate download process
    setTimeout(() => {
      setIsLoading(false);
      showToast("Preview downloaded!", "success");
    }, 2000);
  }, [showToast]);

  // Add to cart (mock implementation)
  const handleAddToCart = useCallback(() => {
    const customization = {
      mockup: selectedMockup,
      image: uploadedImage?.name || null,
      text: customText,
      textStyle,
      timestamp: new Date().toISOString(),
    };

    console.log("Adding to cart:", customization);
    showToast("Added to cart successfully!", "success");
  }, [selectedMockup, uploadedImage, customText, textStyle, showToast]);

  // Toggle section collapse
  const toggleSection = useCallback((section) => {
    setCollapsedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  }, []);

  const currentMockup = mockupTemplates[selectedMockup];

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8 text-center"
        >
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
            Product Customizer
          </h1>
          <p className="text-gray-600">
            Upload your design, add custom text, and preview on different
            products
          </p>
        </motion.div>

        {/* Main Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Panel - Controls */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-4 space-y-6"
          >
            {/* Upload Section */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200">
              <button
                onClick={() => toggleSection("upload")}
                className="w-full flex items-center justify-between p-4 text-left hover:bg-gray-50 rounded-t-xl"
              >
                <div className="flex items-center gap-2">
                  <Upload className="text-cyan-600" size={20} />
                  <h3 className="font-semibold text-gray-900">Upload Design</h3>
                </div>
                {collapsedSections.upload ? (
                  <ChevronDown size={20} />
                ) : (
                  <ChevronUp size={20} />
                )}
              </button>

              <AnimatePresence>
                {!collapsedSections.upload && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="px-4 pb-4"
                  >
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-cyan-400 transition-colors">
                      <input
                        ref={fileInputRef}
                        type="file"
                        accept=".png,.jpg,.jpeg"
                        onChange={handleFileUpload}
                        className="hidden"
                        id="file-upload"
                      />
                      <label
                        htmlFor="file-upload"
                        className="cursor-pointer flex flex-col items-center gap-2"
                      >
                        <Upload className="text-gray-400" size={32} />
                        <span className="text-sm text-gray-600">
                          Drop files here or click to upload
                        </span>
                        <span className="text-xs text-gray-500">
                          PNG, JPG up to 5MB
                        </span>
                      </label>
                    </div>

                    {uploadedImage && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="mt-4 p-3 bg-gray-50 rounded-lg flex items-center gap-3"
                      >
                        <img
                          src={uploadedImage.url}
                          alt="Uploaded"
                          className="w-12 h-12 object-cover rounded"
                        />
                        <div className="flex-1">
                          <p className="text-sm font-medium text-gray-900">
                            {uploadedImage.name}
                          </p>
                          <p className="text-xs text-gray-500">
                            {(uploadedImage.file.size / 1024 / 1024).toFixed(1)}{" "}
                            MB
                          </p>
                        </div>
                        <button
                          onClick={() => setUploadedImage(null)}
                          className="text-red-500 hover:text-red-700"
                        >
                          <X size={16} />
                        </button>
                      </motion.div>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Text Tool Section */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200">
              <button
                onClick={() => toggleSection("text")}
                className="w-full flex items-center justify-between p-4 text-left hover:bg-gray-50 rounded-t-xl"
              >
                <div className="flex items-center gap-2">
                  <Type className="text-magenta-600" size={20} />
                  <h3 className="font-semibold text-gray-900">Add Text</h3>
                </div>
                {collapsedSections.text ? (
                  <ChevronDown size={20} />
                ) : (
                  <ChevronUp size={20} />
                )}
              </button>

              <AnimatePresence>
                {!collapsedSections.text && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="px-4 pb-4 space-y-4"
                  >
                    {/* Text Input */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Text Content
                      </label>
                      <input
                        type="text"
                        value={customText}
                        onChange={(e) => setCustomText(e.target.value)}
                        placeholder="Enter your custom text"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
                      />
                    </div>

                    {/* Font Selection */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Font Family
                      </label>
                      <select
                        value={textStyle.fontFamily}
                        onChange={(e) =>
                          setTextStyle((prev) => ({
                            ...prev,
                            fontFamily: e.target.value,
                          }))
                        }
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
                      >
                        {googleFonts.map((font) => (
                          <option key={font} value={font}>
                            {font}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Font Size */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Font Size: {textStyle.fontSize}px
                      </label>
                      <input
                        type="range"
                        min="12"
                        max="72"
                        value={textStyle.fontSize}
                        onChange={(e) =>
                          setTextStyle((prev) => ({
                            ...prev,
                            fontSize: parseInt(e.target.value),
                          }))
                        }
                        className="w-full"
                      />
                    </div>

                    {/* Color Picker */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Text Color
                      </label>
                      <div className="flex items-center gap-2">
                        <input
                          type="color"
                          value={textStyle.color}
                          onChange={(e) =>
                            setTextStyle((prev) => ({
                              ...prev,
                              color: e.target.value,
                            }))
                          }
                          className="w-12 h-8 border border-gray-300 rounded cursor-pointer"
                        />
                        <input
                          type="text"
                          value={textStyle.color}
                          onChange={(e) =>
                            setTextStyle((prev) => ({
                              ...prev,
                              color: e.target.value,
                            }))
                          }
                          className="flex-1 px-3 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-cyan-500"
                        />
                      </div>
                    </div>

                    {/* Style Toggles */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Text Style
                      </label>
                      <div className="flex gap-2">
                        <button
                          onClick={() =>
                            setTextStyle((prev) => ({
                              ...prev,
                              bold: !prev.bold,
                            }))
                          }
                          className={`px-3 py-2 rounded-lg border ${
                            textStyle.bold
                              ? "bg-cyan-100 border-cyan-300 text-cyan-700"
                              : "bg-white border-gray-300 text-gray-700"
                          }`}
                        >
                          <Bold size={16} />
                        </button>
                        <button
                          onClick={() =>
                            setTextStyle((prev) => ({
                              ...prev,
                              italic: !prev.italic,
                            }))
                          }
                          className={`px-3 py-2 rounded-lg border ${
                            textStyle.italic
                              ? "bg-cyan-100 border-cyan-300 text-cyan-700"
                              : "bg-white border-gray-300 text-gray-700"
                          }`}
                        >
                          <Italic size={16} />
                        </button>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Mockup Selection */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200">
              <button
                onClick={() => toggleSection("mockup")}
                className="w-full flex items-center justify-between p-4 text-left hover:bg-gray-50 rounded-t-xl"
              >
                <div className="flex items-center gap-2">
                  <Palette className="text-yellow-600" size={20} />
                  <h3 className="font-semibold text-gray-900">
                    Product Mockup
                  </h3>
                </div>
                {collapsedSections.mockup ? (
                  <ChevronDown size={20} />
                ) : (
                  <ChevronUp size={20} />
                )}
              </button>

              <AnimatePresence>
                {!collapsedSections.mockup && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="px-4 pb-4"
                  >
                    <div className="grid grid-cols-3 gap-2">
                      {Object.entries(mockupTemplates).map(
                        ([key, template]) => {
                          const IconComponent = template.icon;
                          return (
                            <motion.button
                              key={key}
                              onClick={() => setSelectedMockup(key)}
                              whileHover={{ scale: 1.02 }}
                              whileTap={{ scale: 0.98 }}
                              className={`p-3 rounded-lg border text-center ${
                                selectedMockup === key
                                  ? "bg-cyan-100 border-cyan-300 text-cyan-700"
                                  : "bg-white border-gray-300 text-gray-700 hover:bg-gray-50"
                              }`}
                            >
                              <IconComponent
                                size={24}
                                className="mx-auto mb-1"
                              />
                              <span className="text-xs font-medium">
                                {template.name}
                              </span>
                            </motion.button>
                          );
                        }
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Action Buttons */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
              <div className="grid grid-cols-1 gap-3">
                <motion.button
                  onClick={handleReset}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="flex items-center justify-center gap-2 px-4 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  <RotateCcw size={18} />
                  Reset Design
                </motion.button>

                <motion.button
                  onClick={handleDownload}
                  disabled={isLoading}
                  whileHover={{ scale: isLoading ? 1 : 1.02 }}
                  whileTap={{ scale: isLoading ? 1 : 0.98 }}
                  className="flex items-center justify-center gap-2 px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  <Download size={18} />
                  {isLoading ? "Downloading..." : "Download Preview"}
                </motion.button>

                <motion.button
                  onClick={handleAddToCart}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-cyan-600 to-magenta-600 text-white rounded-lg hover:from-cyan-700 hover:to-magenta-700 transition-all"
                >
                  <ShoppingCart size={18} />
                  Add to Cart
                </motion.button>
              </div>
            </div>
          </motion.div>

          {/* Right Panel - Preview */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-8"
          >
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">
                  Live Preview - {currentMockup.name}
                </h3>
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <Move size={16} />
                  Drag elements to reposition
                </div>
              </div>

              {/* Mockup Canvas */}
              <div
                ref={mockupRef}
                className="relative w-full h-96 md:h-[600px] bg-gray-100 rounded-lg overflow-hidden"
                style={{
                  backgroundImage: `url(${currentMockup.background})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              >
                {isLoading && (
                  <div className="absolute inset-0 bg-white bg-opacity-75 flex items-center justify-center z-10">
                    <MockupSkeleton />
                  </div>
                )}

                {/* Uploaded Image */}
                {uploadedImage && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    style={{
                      position: "absolute",
                      left: imagePosition.x,
                      top: imagePosition.y,
                      width: imageSize.width,
                      height: imageSize.height,
                    }}
                    className="cursor-move border-2 border-dashed border-cyan-400 hover:border-cyan-600"
                    drag
                    dragConstraints={mockupRef}
                    onDragEnd={(_, info) => {
                      setImagePosition({
                        x: Math.max(0, imagePosition.x + info.offset.x),
                        y: Math.max(0, imagePosition.y + info.offset.y),
                      });
                    }}
                  >
                    <img
                      src={uploadedImage.url}
                      alt="Custom design"
                      className="w-full h-full object-contain"
                    />
                    <div className="absolute -top-2 -right-2 bg-cyan-500 text-white rounded-full p-1">
                      <Maximize2 size={12} />
                    </div>
                  </motion.div>
                )}

                {/* Custom Text */}
                {customText && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    style={{
                      position: "absolute",
                      left: textPosition.x,
                      top: textPosition.y,
                      fontFamily: textStyle.fontFamily,
                      fontSize: `${textStyle.fontSize}px`,
                      color: textStyle.color,
                      fontWeight: textStyle.bold ? "bold" : "normal",
                      fontStyle: textStyle.italic ? "italic" : "normal",
                    }}
                    className="cursor-move select-none border-2 border-dashed border-magenta-400 hover:border-magenta-600 px-2 py-1"
                    drag
                    dragConstraints={mockupRef}
                    onDragEnd={(_, info) => {
                      setTextPosition({
                        x: Math.max(0, textPosition.x + info.offset.x),
                        y: Math.max(0, textPosition.y + info.offset.y),
                      });
                    }}
                  >
                    {customText}
                    <div className="absolute -top-2 -right-2 bg-magenta-500 text-white rounded-full p-1">
                      <Type size={12} />
                    </div>
                  </motion.div>
                )}

                {/* Empty State */}
                {!uploadedImage && !customText && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center text-gray-500">
                      <Upload size={48} className="mx-auto mb-2 opacity-50" />
                      <p className="text-lg font-medium">Start customizing</p>
                      <p className="text-sm">
                        Upload an image or add text to begin
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Toast Notifications */}
      <AnimatePresence>
        {toast && (
          <Toast
            message={toast.message}
            type={toast.type}
            onClose={() => setToast(null)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
