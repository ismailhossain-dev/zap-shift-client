import React from "react";
import Logo from "../../../components/logo/Logo";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
  FaEnvelope,
  FaPhoneAlt,
  FaMapMarkerAlt,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-slate-950 text-slate-300">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-6 pt-16 pb-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Column 1: Brand & About */}
          <div className="space-y-6">
            <Logo />
            <p className="text-sm leading-relaxed text-slate-400">
              Moving your world, one delivery at a time. We provide the fastest and most reliable
              logistics solutions across the nation since 1992.
            </p>
            <div className="flex gap-4">
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-indigo-600 hover:text-white transition-all duration-300"
              >
                <FaFacebookF />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-indigo-600 hover:text-white transition-all duration-300"
              >
                <FaTwitter />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-indigo-600 hover:text-white transition-all duration-300"
              >
                <FaInstagram />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-indigo-600 hover:text-white transition-all duration-300"
              >
                <FaLinkedinIn />
              </a>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h3 className="text-white font-bold text-lg mb-6">Quick Links</h3>
            <ul className="space-y-4 text-sm">
              <li>
                <a href="/service" className="hover:text-indigo-400 transition-colors">
                  Our Services
                </a>
              </li>
              <li>
                <a href="/send-parcel" className="hover:text-indigo-400 transition-colors">
                  Send a Parcel
                </a>
              </li>
              <li>
                <a href="/rider" className="hover:text-indigo-400 transition-colors">
                  Become a Rider
                </a>
              </li>
              <li>
                <a href="/coverage" className="hover:text-indigo-400 transition-colors">
                  Coverage Area
                </a>
              </li>
              <li>
                <a href="/about-us" className="hover:text-indigo-400 transition-colors">
                  About Us
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3: Contact Info */}
          <div>
            <h3 className="text-white font-bold text-lg mb-6">Contact Us</h3>
            <ul className="space-y-4 text-sm">
              <li className="flex items-start gap-3">
                <FaMapMarkerAlt className="text-indigo-500 mt-1" />
                <span>
                  123 Delivery Lane, Digital City,
                  <br />
                  Dhaka, Bangladesh
                </span>
              </li>
              <li className="flex items-center gap-3">
                <FaPhoneAlt className="text-indigo-500" />
                <span>+880 1619408991</span>
              </li>
              <li className="flex items-center gap-3">
                <FaEnvelope className="text-indigo-500" />
                <span>programmarsabbir@gmail.com</span>
              </li>
            </ul>
          </div>

          {/* Column 4: Newsletter */}
          <div>
            <h3 className="text-white font-bold text-lg mb-6">Newsletter</h3>
            <p className="text-sm text-slate-400 mb-4">
              Subscribe to get latest updates and offers.
            </p>
            <form className="flex flex-col gap-2">
              <input
                type="email"
                placeholder="Enter your email"
                className="bg-slate-800 border-none rounded-lg px-4 py-3 text-sm focus:ring-2 focus:ring-indigo-600 outline-none w-full"
              />
              <button className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 rounded-lg transition-all duration-300">
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-slate-800 mt-16 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-slate-500">
          <p>Copyright © {new Date().getFullYear()} ACME Industries Ltd. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:underline">
              Privacy Policy
            </a>
            <a href="#" className="hover:underline">
              Terms of Service
            </a>
            <a href="#" className="hover:underline">
              Cookies Settings
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
