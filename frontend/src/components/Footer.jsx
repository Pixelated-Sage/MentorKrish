import React from 'react';
import { Linkedin, Instagram, Facebook, Youtube, Phone, Mail } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="relative bg-g3 pt-16 pb-8 overflow-hidden">
      {/* Main Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Logo and Description */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-r1 rounded flex items-center justify-center">
                <span className="text-w1 font-bold text-sm">MK</span>
              </div>
              <span className="text-xl font-bold text-w1">Mentor Krish</span>
            </div>
            <p className="text-g2 text-sm leading-relaxed">
              Guiding Your Path to Success with Personalized Career Counseling
            </p>
            <div className="flex space-x-3">
              <a href="#" className="w-8 h-8 bg-r1 rounded-full flex items-center justify-center hover:bg-r2 transition-colors">
                <Linkedin className="w-4 h-4 text-w1" />
              </a>
              <a href="#" className="w-8 h-8 bg-r1 rounded-full flex items-center justify-center hover:bg-r2 transition-colors">
                <Instagram className="w-4 h-4 text-w1" />
              </a>
              <a href="#" className="w-8 h-8 bg-r1 rounded-full flex items-center justify-center hover:bg-r2 transition-colors">
                <Facebook className="w-4 h-4 text-w1" />
              </a>
              <a href="#" className="w-8 h-8 bg-r1 rounded-full flex items-center justify-center hover:bg-r2 transition-colors">
                <Youtube className="w-4 h-4 text-w1" />
              </a>
            </div>
          </div>
          {/* Useful Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-w1 mb-4">Useful Links</h3>
            <div className="grid grid-cols-2 gap-2">
              <div className="space-y-2">
                <a href="#" className="block text-g2 hover:text-r1 transition-colors text-sm">Home</a>
                <a href="#" className="block text-g2 hover:text-r1 transition-colors text-sm">About</a>
                <a href="#" className="block text-g2 hover:text-r1 transition-colors text-sm">Psychometric Test</a>
                <a href="#" className="block text-g2 hover:text-r1 transition-colors text-sm">Career Counseling</a>
              </div>
              <div className="space-y-2">
                <a href="#" className="block text-g2 hover:text-r1 transition-colors text-sm">Courses</a>
                <a href="#" className="block text-g2 hover:text-r1 transition-colors text-sm">Prepsmart</a>
                <a href="#" className="block text-g2 hover:text-r1 transition-colors text-sm">Gallery</a>
                <a href="#" className="block text-g2 hover:text-r1 transition-colors text-sm">Contact</a>
              </div>
            </div>
          </div>
          {/* Contact Us */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-w1 mb-4">Contact Us</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-r1/10 rounded-full flex items-center justify-center">
                  <Phone className="w-4 h-4 text-r1" />
                </div>
                <a href="tel:+919983322553" className="text-g2 hover:text-r1 transition-colors text-sm">
                  +91-9983322553
                </a>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-r1/10 rounded-full flex items-center justify-center">
                  <Mail className="w-4 h-4 text-r1" />
                </div>
                <a href="mailto:neelam@mentor-krish.com" className="text-g2 hover:text-r1 transition-colors text-sm">
                  neelam@mentor-krish.com
                </a>
              </div>
            </div>
          </div>
        </div>
        {/* Bottom section */}
        <div className="border-t border-g2/20 pt-6 text-center">
          <p className="text-g2 text-sm">
            © 2024 Mentor Krish. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
