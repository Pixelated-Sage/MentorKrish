import React from 'react';
import { Linkedin, Instagram, Facebook, Youtube, Phone, Mail } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="relative bg-gray-100 pt-16 pb-8 overflow-hidden">
      {/* Green curved background */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-r from-green-600 to-green-500">
        <svg 
          className="absolute top-0 left-0 w-full h-full" 
          viewBox="0 0 1200 120" 
          preserveAspectRatio="none"
        >
          <path 
            d="M0,60 C300,20 600,100 900,40 C1050,10 1150,80 1200,60 L1200,120 L0,120 Z" 
            fill="currentColor" 
            className="text-green-600"
          />
        </svg>
      </div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          
          {/* Logo and Description */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-green-600 rounded flex items-center justify-center">
                <span className="text-white font-bold text-sm">AKU</span>
              </div>
              <span className="text-xl font-bold text-gray-800">AKU</span>
            </div>
            <p className="text-gray-600 text-sm leading-relaxed">
              Guiding Your Path to Success with Personalized Career Counseling
            </p>
            <div className="flex space-x-3">
              <a href="#" className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center hover:bg-green-700 transition-colors">
                <Linkedin className="w-4 h-4 text-white" />
              </a>
              <a href="#" className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center hover:bg-green-700 transition-colors">
                <Instagram className="w-4 h-4 text-white" />
              </a>
              <a href="#" className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center hover:bg-green-700 transition-colors">
                <Facebook className="w-4 h-4 text-white" />
              </a>
              <a href="#" className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center hover:bg-green-700 transition-colors">
                <Youtube className="w-4 h-4 text-white" />
              </a>
            </div>
          </div>
          
          {/* Useful Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Useful Links</h3>
            <div className="grid grid-cols-2 gap-2">
              <div className="space-y-2">
                <a href="#" className="block text-gray-600 hover:text-green-600 transition-colors text-sm">Home</a>
                <a href="#" className="block text-gray-600 hover:text-green-600 transition-colors text-sm">About</a>
                <a href="#" className="block text-gray-600 hover:text-green-600 transition-colors text-sm">Psychometric Test</a>
                <a href="#" className="block text-gray-600 hover:text-green-600 transition-colors text-sm">Career Counseling</a>
              </div>
              <div className="space-y-2">
                <a href="#" className="block text-gray-600 hover:text-green-600 transition-colors text-sm">Courses</a>
                <a href="#" className="block text-gray-600 hover:text-green-600 transition-colors text-sm">Prepsmart</a>
                <a href="#" className="block text-gray-600 hover:text-green-600 transition-colors text-sm">Gallery</a>
                <a href="#" className="block text-gray-600 hover:text-green-600 transition-colors text-sm">Contact</a>
              </div>
            </div>
          </div>
          
          {/* Contact Us */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Contact Us</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                  <Phone className="w-4 h-4 text-green-600" />
                </div>
                <a href="tel:+919983322553" className="text-gray-600 hover:text-green-600 transition-colors text-sm">
                  +91-9983322553
                </a>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                  <Mail className="w-4 h-4 text-green-600" />
                </div>
                <a href="mailto:neelam@mentor-krish.com" className="text-gray-600 hover:text-green-600 transition-colors text-sm">
                  neelam@mentor-krish.com
                </a>
              </div>
            </div>
          </div>
        </div>
        
        {/* Bottom section */}
        <div className="border-t border-gray-200 pt-6 text-center">
          <p className="text-gray-500 text-sm">
            © 2024 AKU Career Counseling. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;