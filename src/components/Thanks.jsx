import { useEffect } from "react";
import { CheckCircle2, Download, ShoppingBag, Truck } from "lucide-react";

export default function OrderConfirmation() {
  useEffect(() => {
    // Simple confetti animation using canvas
    const canvas = document.createElement("canvas");
    canvas.id = "confetti-canvas";
    canvas.className = "fixed inset-0 pointer-events-none z-50";
    document.body.appendChild(canvas);

    const ctx = canvas.getContext("2d");
    let W = (canvas.width = window.innerWidth);
    let H = (canvas.height = window.innerHeight);

    const particles = Array.from({ length: 100 }, () => ({
      x: Math.random() * W,
      y: Math.random() * H - H,
      r: Math.random() * 6 + 4,
      d: Math.random() * 20 + 10,
      color: ["#00BFFF", "#FF1493", "#FFD700", "#000000"][
        Math.floor(Math.random() * 4)
      ],
      tilt: Math.random() * 10 - 10,
    }));

    function draw() {
      ctx.clearRect(0, 0, W, H);
      particles.forEach((p) => {
        ctx.beginPath();
        ctx.fillStyle = p.color;
        ctx.moveTo(p.x + p.tilt + p.r, p.y);
        ctx.lineTo(p.x + p.tilt, p.y + p.r * 2);
        ctx.lineTo(p.x + p.tilt - p.r, p.y);
        ctx.fill();
      });
      update();
    }

    function update() {
      particles.forEach((p) => {
        p.y += Math.cos(p.d) + 1 + p.r / 2;
        p.x += Math.sin(p.d);
        if (p.y > H) {
          p.y = -10;
          p.x = Math.random() * W;
        }
      });
    }

    const interval = setInterval(draw, 30);
    return () => {
      clearInterval(interval);
      document.body.removeChild(canvas);
    };
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center p-6">
      {/* Success Banner */}
      <div className="text-center mt-12 mb-8">
        <div className="mx-auto w-20 h-20 rounded-full bg-gradient-to-r from-cyan-500 via-pink-500 to-yellow-400 flex items-center justify-center shadow-lg">
          <CheckCircle2 className="w-12 h-12 text-white" />
        </div>
        <h1 className="text-2xl md:text-3xl font-bold mt-4">
          Thank you for your order!
        </h1>
        <p className="text-gray-600 mt-2">
          Your order has been placed successfully. We’ll start printing soon.
        </p>
      </div>

      {/* Order Summary Card */}
      <div className="bg-white rounded-2xl shadow-md p-6 w-full max-w-2xl mb-8">
        <h2 className="text-lg font-semibold mb-4">Order Summary</h2>
        <p className="text-gray-500 mb-2">Order #12345</p>

        <div className="divide-y">
          {/* Example product */}
          <div className="flex items-center gap-4 py-4">
            <img
              src="https://via.placeholder.com/80"
              alt="Product"
              className="w-16 h-16 rounded-md object-cover"
            />
            <div>
              <p className="font-medium">Custom Business Card</p>
              <p className="text-sm text-gray-500">Qty: 100</p>
            </div>
          </div>
          {/* Example product 2 */}
          <div className="flex items-center gap-4 py-4">
            <img
              src="https://via.placeholder.com/80"
              alt="Product"
              className="w-16 h-16 rounded-md object-cover"
            />
            <div>
              <p className="font-medium">Poster Print</p>
              <p className="text-sm text-gray-500">Qty: 2</p>
            </div>
          </div>
        </div>

        {/* Shipping + Payment */}
        <div className="mt-6 grid md:grid-cols-2 gap-4 text-sm">
          <div>
            <p className="font-semibold">Shipping Address</p>
            <p className="text-gray-600">
              John Doe
              <br />
              123 Printing Lane
              <br />
              New Delhi, India
            </p>
            <p className="text-gray-600 mt-2">
              Estimated Delivery:{" "}
              <span className="font-medium">12 Sep 2025</span>
            </p>
          </div>
          <div>
            <p className="font-semibold">Payment Method</p>
            <p className="text-gray-600">Visa ending **** 4242</p>
          </div>
        </div>
      </div>

      {/* Next Steps */}
      <div className="flex flex-col md:flex-row gap-4 mb-10">
        <button className="flex items-center gap-2 bg-cyan-500 hover:bg-cyan-600 text-white px-6 py-3 rounded-xl shadow-md">
          <Truck className="w-5 h-5" />
          Track your order
        </button>
        <a
          href="#"
          className="flex items-center gap-2 bg-yellow-400 hover:bg-yellow-500 text-black px-6 py-3 rounded-xl shadow-md"
        >
          <Download className="w-5 h-5" />
          Download Invoice
        </a>
        <a
          href="#"
          className="flex items-center gap-2 bg-pink-500 hover:bg-pink-600 text-white px-6 py-3 rounded-xl shadow-md"
        >
          <ShoppingBag className="w-5 h-5" />
          Continue Shopping
        </a>
      </div>

      {/* Branding / Trust Section */}
      <div className="text-center text-gray-600 max-w-lg mb-12">
        <p className="mb-2">
          We use high-quality inks and papers to make sure your prints look
          amazing.
        </p>
        <p className="text-sm">
          Need help? Contact us at{" "}
          <a
            href="mailto:support@printstore.com"
            className="text-cyan-600 hover:underline"
          >
            support@printstore.com
          </a>
        </p>
      </div>
    </div>
  );
}
