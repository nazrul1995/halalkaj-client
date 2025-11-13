// src/components/Footer.jsx
import React from "react";
import { FaFacebookF, FaTwitter, FaLinkedinIn, FaInstagram } from "react-icons/fa";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-green-900 text-gray-300 py-12 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">

          {/* Brand & Description */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 bg-yellow-400 rounded-full flex items-center justify-center mr-3 shadow-lg">
                <span className="text-green-900 font-bold text-xl">H</span>
              </div>
              <h2 className="text-2xl font-bold text-white">HalalKaj</h2>
            </div>
            <p className="text-sm text-gray-400 max-w-md leading-relaxed">
              Connect with top freelancers globally. Post jobs, hire talent, and grow your business with trust and transparency.
            </p>

            {/* Social Icons with React Icons */}
            <div className="flex gap-3 mt-6">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-green-800 rounded-full flex items-center justify-center hover:bg-yellow-400 hover:text-green-900 transition-all duration-300"
                aria-label="Facebook"
              >
                <FaFacebookF size={18} />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-green-800 rounded-full flex items-center justify-center hover:bg-yellow-400 hover:text-green-900 transition-all duration-300"
                aria-label="Twitter"
              >
                <FaTwitter size={18} />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-green-800 rounded-full flex items-center justify-center hover:bg-yellow-400 hover:text-green-900 transition-all duration-300"
                aria-label="LinkedIn"
              >
                <FaLinkedinIn size={18} />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-green-800 rounded-full flex items-center justify-center hover:bg-yellow-400 hover:text-green-900 transition-all duration-300"
                aria-label="Instagram"
              >
                <FaInstagram size={18} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              {[
                { name: "About Us", href: "/about" },
                { name: "How It Works", href: "/how-it-works" },
                { name: "Browse Jobs", href: "/jobs" },
                { name: "Post a Job", href: "/post-job" },
                { name: "Login", href: "/login" },
              ].map((item) => (
                <li key={item.name}>
                  <a
                    href={item.href}
                    className="hover:text-yellow-400 transition-colors duration-200"
                  >
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* For Freelancers */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">For Freelancers</h3>
            <ul className="space-y-2 text-sm">
              {[
                { name: "Find Work", href: "/find-work" },
                { name: "Create Profile", href: "/create-profile" },
                { name: "My Proposals", href: "/my-proposals" },
                { name: "Earnings", href: "/earnings" },
                { name: "Help Center", href: "/help" },
              ].map((item) => (
                <li key={item.name}>
                  <a
                    href={item.href}
                    className="hover:text-yellow-400 transition-colors duration-200"
                  >
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-green-800 mt-10 pt-6 flex flex-col md:flex-row justify-between items-center text-xs text-gray-400">
          <p>&copy; {currentYear} HalalKaj. All rights reserved.</p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <a href="/privacy" className="hover:text-yellow-400 transition-colors">Privacy Policy</a>
            <a href="/terms" className="hover:text-yellow-400 transition-colors">Terms of Service</a>
            <a href="/contact" className="hover:text-yellow-400 transition-colors">Contact</a>
          </div>
        </div>
      </div>
    </footer>
  );
}