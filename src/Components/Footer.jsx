import React from 'react';
import { Facebook, Instagram, Twitter, Linkedin } from 'lucide-react';
import { BsStars } from "react-icons/bs";

const Footer = () => {
  return (
    <footer className="bg-gray-100 text-black py-10 px-6 md:px-16">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">

        {/* Logo & Tagline */}
        <div>
          <div className="text-3xl font-extrabold flex items-center gap-1 tracking-wide hover:scale-105 transition-transform duration-300">
            <span className="text-4xl animate-bounce">🎓</span>
            Study<span className="text-orange-500">Buddy</span>
          </div>
          <p className="text-gray-600 mt-2">
            Empowering modern learners with tools to succeed every step of the way.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
          <ul className="space-y-2 text-gray-700">
            <li><a href="#home" className="hover:text-orange-500">Home</a></li>
            <li><a href="#courses" className="hover:text-orange-500">Courses</a></li>
            <li><a href="#features" className="hover:text-orange-500">Features</a></li>
            <li><a href="#contact" className="hover:text-orange-500">Contact</a></li>
          </ul>
        </div>

        {/* Support */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Support</h3>
          <ul className="space-y-2 text-gray-700">
            <li><a href="#" className="hover:text-orange-500">Help Center</a></li>
            <li><a href="#" className="hover:text-orange-500">Privacy Policy</a></li>
            <li><a href="#" className="hover:text-orange-500">Terms of Use</a></li>
            <li><a href="#" className="hover:text-orange-500">Feedback</a></li>
          </ul>
        </div>


        {/* Social Media */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Follow Us</h3>
          <div className="flex space-x-4">
            <a href="#" className="text-orange-500 hover:text-black transition">
              <Facebook size={20} />
            </a>
            <a href="#" className="text-orange-500 hover:text-black transition">
              <Instagram size={20} />
            </a>
            <a href="#" className="text-orange-500 hover:text-black transition">
              <Twitter size={20} />
            </a>
            <a href="#" className="text-orange-500 hover:text-black transition">
              <Linkedin size={20} />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="flex items-center justify-center mt-10 border-t border-gray-300 pt-6 text-center text-sm text-gray-600">
        © {new Date().getFullYear()} StudyBuddy. Designed by Priyanshi <BsStars className='text-lg text-amber-500 ml-1'/> .
      </div>
    </footer>
  );
};

export default Footer;
