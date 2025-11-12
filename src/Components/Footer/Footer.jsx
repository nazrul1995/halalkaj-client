import React from "react";
import { FaFacebookF, FaLinkedinIn, FaGithub, FaTwitter } from "react-icons/fa";
import { Link } from "react-router";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white mt-16">
      <div className="w-11/12 mx-auto py-10 grid md:grid-cols-3 gap-8">

        {/* --- Column 1: Branding --- */}
        <div>
          <h2 className="text-2xl font-bold mb-3">JobConnect</h2>
          <p className="text-sm text-gray-200 leading-relaxed">
            A trusted platform to connect skilled professionals with great job opportunities. 
            Empowering careers, one hire at a time.
          </p>
        </div>

        {/* --- Column 2: Quick Links --- */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Quick Links</h3>
          <ul className="space-y-2 text-gray-200 text-sm">
            <li><Link to="/" className="hover:text-white transition">Home</Link></li>
            <li><Link to="/all-jobs" className="hover:text-white transition">Browse Jobs</Link></li>
            <li><Link to="/post-job" className="hover:text-white transition">Post a Job</Link></li>
            <li><Link to="/contact" className="hover:text-white transition">Contact Us</Link></li>
          </ul>
        </div>

        {/* --- Column 3: Social & Contact --- */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Stay Connected</h3>
          <p className="text-sm text-gray-200 mb-4">Follow us on social media</p>

          <div className="flex gap-4 mb-4">
            <a href="#" className="bg-white/10 hover:bg-white/20 p-2 rounded-full transition">
              <FaFacebookF />
            </a>
            <a href="#" className="bg-white/10 hover:bg-white/20 p-2 rounded-full transition">
              <FaTwitter />
            </a>
            <a href="#" className="bg-white/10 hover:bg-white/20 p-2 rounded-full transition">
              <FaLinkedinIn />
            </a>
            <a href="#" className="bg-white/10 hover:bg-white/20 p-2 rounded-full transition">
              <FaGithub />
            </a>
          </div>

          <p className="text-sm text-gray-300">📧 support@jobconnect.com</p>
          <p className="text-sm text-gray-300">📞 +880 1234 567890</p>
        </div>
      </div>

      <div className="border-t border-white/20 mt-6 py-4 text-center text-gray-300 text-sm">
        © {new Date().getFullYear()} JobConnect — All Rights Reserved.
      </div>
    </footer>
  );
};

export default Footer;
