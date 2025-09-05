import { FaInstagram } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="w-full bg-black text-gray-300 pt-8 pb-4 px-4 border-t border-gray-800">
      <div className="max-w-6xl mx-auto flex flex-col gap-8">
        {/* Top Links */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 pb-4 border-b border-gray-800">
          <nav className="flex flex-wrap justify-center gap-6 text-sm">
            <a href="/contact" className="hover:text-white">
              Contact
            </a>
            <a href="/faq" className="hover:text-white">
              FAQ
            </a>
            <a href="#" className="hover:text-white">
              Terms of Service
            </a>
            <a href="#" className="hover:text-white">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-white">
              Refund Policy
            </a>
            <a href="#" className="hover:text-white">
              Shipping Policy
            </a>
          </nav>
          <a href="#" className="text-xl hover:text-white">
            <FaInstagram />
          </a>
        </div>
        {/* Newsletter */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 pb-4 border-b border-gray-800">
          <div className="font-semibold text-white mb-2 md:mb-0">
            Subscribe to our newsletter for the latest updates and promotions
          </div>
          <form className="flex w-full max-w-md">
            <input
              type="email"
              placeholder="Email"
              className="flex-1 rounded-l-lg bg-black border border-gray-600 px-4 py-2 text-white focus:outline-none"
            />
            <button
              type="submit"
              className="rounded-r-lg bg-gray-800 px-4 py-2 text-white hover:bg-gray-700"
            >
              →
            </button>
          </form>
        </div>
        {/* Language */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 pb-4">
          <div className="flex flex-col gap-2">
            <span className="text-xs text-gray-400">Language</span>
            <select className="bg-black border border-gray-600 rounded px-3 py-1 text-white text-sm">
              <option>English</option>
              <option>Deutsch</option>
              <option>Español</option>
            </select>
          </div>
        </div>
        {/* Bottom Links */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-2 text-xs text-gray-500 border-t border-gray-800 pt-4">
          <div>© 2025, G-Rollz</div>
          <div className="flex flex-wrap gap-2">
            <a href="#" className="hover:text-white">
              Privacy policy
            </a>
            <span>·</span>
            <a href="#" className="hover:text-white">
              Terms of service
            </a>
            <span>·</span>
            <a href="#" className="hover:text-white">
              Shipping policy
            </a>
            <span>·</span>
            <a href="#" className="hover:text-white">
              Refund policy
            </a>
            <span>·</span>
            <a href="#" className="hover:text-white">
              Contact information
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
