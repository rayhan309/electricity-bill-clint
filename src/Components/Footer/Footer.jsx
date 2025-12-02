const Footer = () => {
  return (
    <footer className="relative bg-gray-900/80 text-white pb-5 pt-10 px-8">
      {/* t bor*/}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-yellow-400 via-orange-400 to-amber-500"></div>

      <div className="w-11/12 mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
        {/* Log Descr*/}
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-orange-400 to-yellow-500 flex items-center justify-center shadow-lg shadow-orange-500/40">
              <span className="text-2xl font-bold">⚡</span>
            </div>
            <h2 className="text-2xl font-bold tracking-wide">SmartBills</h2>
          </div>

          <p className="text-gray-300 leading-relaxed text-sm">
            Manage all your utility bills in one place — fast, secure, and
            beautifully designed to simplify your daily life.
          </p>
        </div>

        {/* Useful Links */}
        <div>
          <h3 className="text-lg font-semibold mb-4 text-orange-300">
            Links
          </h3>
          <ul className="space-y-2 text-gray-300 text-sm">
            <li className="footer-link">Dashboard</li>
            <li className="footer-link">My Bills</li>
            <li className="footer-link">Payments</li>
            <li className="footer-link">Settings</li>
          </ul>
        </div>

        {/* Support */}
        <div>
          <h3 className="text-lg font-semibold mb-4 text-orange-300">
            Support
          </h3>
          <ul className="space-y-2 text-gray-300 text-sm">
            <li className="footer-link">Help Center</li>
            <li className="footer-link">Contact Us</li>
            <li className="footer-link">FAQs</li>
            <li className="footer-link">Privacy Policy</li>
          </ul>
        </div>

        {/* Newsletter */}
        <div>
          <h3 className="text-lg font-semibold mb-4 text-orange-300">
            Stay Updated
          </h3>
          <p className="text-gray-300 text-sm mb-3">
            Subscribe to our newsletter for updates.
          </p>

          <div className="flex items-center bg-white/10 backdrop-blur-xl rounded-xl p-1 border border-white/20">
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full bg-transparent px-3 py-2 text-sm focus:outline-none placeholder-gray-400"
            />
            <button className="cursor-pointer px-4 py-2 bg-gradient-to-r from-orange-400 to-yellow-500 rounded-lg text-sm font-semibold shadow-md hover:opacity-90 transition">
              Send
            </button>
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="mt-12 w-full h-px bg-white/10"></div>

      {/* Copyright */}
      <p className="text-center text-gray-400 text-sm mt-6">
        © {new Date().getFullYear()} SmartBills — All Rights Reserved.
      </p>
    </footer>
  );
};

export default Footer;
