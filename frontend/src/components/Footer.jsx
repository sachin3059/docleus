import React from "react";
import { Link } from "react-router-dom"; // Use `import Link from 'next/link'` for Next.js
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaGooglePlay } from "react-icons/fa";
import { assets } from "../assets/assets_frontend/assets"; // Adjust the path if needed

const Footer = () => {
  return (
    <footer className="md:mx-10 pl-4 py-10 mt-36 bg-gray-50">
      {/* ----- Main Content ----- */}
      <div className="grid md:grid-cols-[3fr_1fr_1fr] gap-10 text-sm text-gray-700">
        
        {/* ----- Left Section ----- */}
        <div>
          <img className="mb-5 w-40" src={assets.logo} alt="Docleus Logo" />
          <p className="w-full md:w-3/4 leading-6">
            We provide a seamless platform for online doctor appointments, connecting you with top healthcare professionals across various specialties.
          </p>
        </div>

        {/* ----- Center Section ----- */}
        <div>
          <p className="text-lg font-semibold mb-4">Company</p>
          <ul className="space-y-2">
            <li><Link to="/" className="hover:text-blue-600 transition">Home</Link></li>
            <li><Link to="/about" className="hover:text-blue-600 transition">About Us</Link></li>
            <li><Link to="/contact" className="hover:text-blue-600 transition">Contact Us</Link></li>
            <li><Link to="/privacy-policy" className="hover:text-blue-600 transition">Privacy Policy</Link></li>
          </ul>
        </div>

        {/* ----- Right Section ----- */}
        <div>
          <p className="text-lg font-semibold mb-4">Get in Touch</p>
          <ul className="space-y-2">
            <li>📞 +91 4003242545</li>
            <li className="hover:text-blue-600 transition">✉️ docleus@gmail.com</li>
          </ul>

          {/* ----- Social Media Icons ----- */}
          <div className="flex gap-4 mt-5 text-xl">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-blue-600 transition">
              <FaFacebook />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-blue-600 transition">
              <FaTwitter />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-pink-600 transition">
              <FaInstagram />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-blue-700 transition">
              <FaLinkedin />
            </a>
          </div>
        </div>
      </div>

      {/* ----- Bottom Section ----- */}
      <div className="mt-10 flex flex-col md:flex-row items-center justify-center text-gray-600 text-sm py-10">
        <p className="mx-5">Made with ❤️ from India</p>
        <a
          href="https://play.google.com/store/apps"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center bg-gray-900 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition"
        >
          <FaGooglePlay className="mr-2" /> Download Our App
        </a>
      </div>

      {/* ---- Copyright Text ---- */}
      <hr className="mt-10 border-gray-300" />
      <p className="py-2 text-center text-gray-600">
        © 2025 Docleus - All Rights Reserved.
      </p>
    </footer>
  );
};

export default Footer;
