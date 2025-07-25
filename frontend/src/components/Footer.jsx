import React from 'react';
import { Linkedin, Instagram, Facebook, Youtube, Phone, Mail } from 'lucide-react';

const staircaseSteps = [
  { className: "bg-g2", height: "h-16", z: "z-0" },
  { className: "bg-g1", height: "h-20", z: "z-0", left: "left-[10vw]" },
  { className: "bg-r1", height: "h-24", z: "z-0", left: "left-[20vw]" },
];

const Footer = () => {
  return (
    <footer className="relative bg-w2 pt-16 pb-8 overflow-hidden">
      {/* Staircase Background */}
      {/* <div className="pointer-events-none absolute bottom-0 left-0 w-full"> */}
        {/* The "steps" from left to right */}
        {/* <div className="relative w-full h-32"> */}
          {/* Step 1 (lowest) */}
          {/* <div className="absolute left-0 bottom-0 w-full h-16 bg-g2" style={{clipPath: "polygon(0 100%, 100% 100%, 80% 0, 0 0)"}} /> */}
          {/* Step 2 */}
          {/* <div className="absolute left-[12vw] bottom-0 w-[88vw] h-20 bg-g1" style={{clipPath: "polygon(0 100%, 100% 100%, 85% 0, 0 0)"}} /> */}
          {/* Step 3 (top/rightmost) */}
          {/* <div className="absolute left-[26vw] bottom-0 w-[74vw] h-24 bg-r1" style={{clipPath: "polygon(0 100%, 100% 100%, 90% 0, 0 0)"}} />
        </div> */}
      {/* </div> */}

      {/* Main Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Logo and Description */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-r1 rounded flex items-center justify-center">
                <span className="text-w1 font-bold text-sm">MK</span>
              </div>
              <span className="text-xl font-bold text-g1">Mentor Krish</span>
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
            <h3 className="text-lg font-semibold text-g1 mb-4">Useful Links</h3>
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
            <h3 className="text-lg font-semibold text-g1 mb-4">Contact Us</h3>
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
