import React from "react";
import Link from "next/link";
import { Linkedin, Instagram, Facebook, Youtube, Phone, Mail, MapPin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-gray-950 text-gray-300 pt-16 pb-8 border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-12 border-b border-gray-800">
          
          {/* Brand Info */}
          <div className="space-y-4 md:col-span-1">
            <div className="flex items-center gap-3">
              <img src="/assets/img/logo.png" alt="Mentor Krish" className="w-10 h-10 object-contain" />
              <span className="text-2xl font-black text-white">
                Mentor<span className="text-red-500">Krish</span>
              </span>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
              Empowering students worldwide with premier SAT preparation, admissions mentoring, and career psychometrics.
            </p>
            <div className="flex items-center space-x-3 pt-2">
              <a
                href="https://www.linkedin.com/company/mentor-krish/?originalSubdomain=in"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 bg-gray-900 border border-gray-800 rounded-full flex items-center justify-center hover:bg-red-600 hover:border-red-600 hover:text-white transition-colors"
              >
                <Linkedin size={18} />
              </a>
              <a
                href="https://www.instagram.com/mentor.krish"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 bg-gray-900 border border-gray-800 rounded-full flex items-center justify-center hover:bg-red-600 hover:border-red-600 hover:text-white transition-colors"
              >
                <Instagram size={18} />
              </a>
              <a
                href="https://www.facebook.com/mentorkrish1/"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 bg-gray-900 border border-gray-800 rounded-full flex items-center justify-center hover:bg-red-600 hover:border-red-600 hover:text-white transition-colors"
              >
                <Facebook size={18} />
              </a>
              <a
                href="https://youtube.com/@mentorkrish1977"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 bg-gray-900 border border-gray-800 rounded-full flex items-center justify-center hover:bg-red-600 hover:border-red-600 hover:text-white transition-colors"
              >
                <Youtube size={18} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-bold text-base mb-4 tracking-wide uppercase text-xs text-red-500">
              Quick Links
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/" className="hover:text-red-400 transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/courses" className="hover:text-red-400 transition-colors">
                  Courses & Prep
                </Link>
              </li>
              <li>
                <Link href="/trial" className="hover:text-red-400 transition-colors">
                  Book Free Trial
                </Link>
              </li>
              <li>
                <Link href="/blogs" className="hover:text-red-400 transition-colors">
                  Insights & Blogs
                </Link>
              </li>
              <li>
                <Link href="/gallery" className="hover:text-red-400 transition-colors">
                  Photo Gallery
                </Link>
              </li>
            </ul>
          </div>

          {/* Key Programs */}
          <div>
            <h4 className="text-white font-bold text-base mb-4 tracking-wide uppercase text-xs text-red-500">
              Programs
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/courses" className="hover:text-red-400 transition-colors">
                  Digital SAT Prep
                </Link>
              </li>
              <li>
                <Link href="/courses" className="hover:text-red-400 transition-colors">
                  PSAT / NMSQT Track
                </Link>
              </li>
              <li>
                <Link href="/courses" className="hover:text-red-400 transition-colors">
                  ACT Mastery
                </Link>
              </li>
              <li>
                <Link href="/courses" className="hover:text-red-400 transition-colors">
                  IELTS / TOEFL Prep
                </Link>
              </li>
              <li>
                <Link href="/courses" className="hover:text-red-400 transition-colors">
                  Psychometric Assessment
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Details */}
          <div>
            <h4 className="text-white font-bold text-base mb-4 tracking-wide uppercase text-xs text-red-500">
              Get in Touch
            </h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center space-x-3">
                <Phone size={16} className="text-red-500 shrink-0" />
                <a href="tel:+919983322553" className="hover:text-white transition-colors">
                  +91-9983322553
                </a>
              </li>
              <li className="flex items-center space-x-3">
                <Mail size={16} className="text-red-500 shrink-0" />
                <a href="mailto:neelam@mentor-krish.com" className="hover:text-white transition-colors">
                  neelam@mentor-krish.com
                </a>
              </li>
              <li className="flex items-start space-x-3">
                <MapPin size={16} className="text-red-500 shrink-0 mt-1" />
                <span className="text-gray-400">Global Online & In-Person Mentoring Sessions</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Credits */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between text-xs text-gray-500">
          <p>© {new Date().getFullYear()} Mentor Krish. All rights reserved.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link href="/contact" className="hover:text-gray-400 transition-colors">
              Contact Support
            </Link>
            <Link href="/trial" className="hover:text-gray-400 transition-colors">
              Book Session
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
