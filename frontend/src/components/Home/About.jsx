import React from "react";

const AboutSection = () => {
  return (
    <div className="bg-gradient-to-br from-gray-50 to-white py-16 px-4 flex flex-col items-center relative overflow-hidden">
      {/* Floating Background Elements */}
      <div className="absolute top-10 left-10 w-32 h-32 bg-red-100 rounded-full opacity-20 animate-pulse"></div>
      <div className="absolute top-1/3 right-20 w-24 h-24 bg-blue-100 rounded-full opacity-30"></div>
      <div className="absolute bottom-20 left-1/4 w-40 h-40 bg-red-50 rounded-full opacity-25"></div>
      <div className="absolute bottom-1/3 right-10 w-28 h-28 bg-blue-50 rounded-full opacity-20 animate-pulse"></div>

      <div className="max-w-[80%] w-11/12 space-y-16 relative z-10">

        {/* Row 1 - About Mentor Krish */}
        <div className="flex flex-col md:flex-row items-center gap-8 sm:gap-6">
          {/* Logo Design */}
          <div className="order-1 md:order-2 w-full md:w-[40%] mb-6 md:mb-0 flex justify-center items-center">
            <div className="relative">
              {/* Floating rings around logo */}
              <div className="absolute inset-0 w-64 h-64 border-3 border-r1 rounded-full animate-spin opacity-30" style={{animationDuration: '20s'}}></div>
              <div className="absolute inset-3 w-58 h-58 border-2 border-r2 rounded-full animate-spin opacity-40" style={{animationDuration: '15s', animationDirection: 'reverse'}}></div>
              
              {/* Main logo container */}
              <div className="relative w-48 h-48 bg-gradient-to-br from-white via-red-50 to-blue-50 rounded-full shadow-xl flex items-center justify-center border-3 border-white">
                <img
                  src="/assets/img/logo.png"
                  alt="Mentor Krish Logo"
                  className="w-32 h-32 object-contain relative z-10"
                />
              </div>
              
              {/* Decorative dots */}
              <div className="absolute -top-2 -right-2 w-4 h-4 bg-g2 opacity-50 rounded-full"></div>
              <div className="absolute -bottom-2 -left-2 w-3 h-3 bg-r1 opacity-50 rounded-full"></div>
            </div>
          </div>

          {/* Content */}
          <div className="order-2 md:order-1 w-full md:w-[60%] mb-6 md:mb-0 space-y-6">
            <div className="text-center md:text-left">
              <div className="flex gap-1 md:gap-2  justify-center md:justify-start">
                <img
                  src="/assets/icons/square-bullet.svg"
                  alt="bullet"
                  className="h-10"
                />
                <h2 className="text-3xl sm:text-4xl font-bold text-r1 mb-3">About Mentor Krish</h2>
              </div>
              <p className="text-base sm:text-lg text-g1 leading-relaxed">
                Empowering students to achieve academic excellence and secure admissions to top global universities through personalized mentoring and proven strategies.
              </p>
            </div>

            {/* Key Highlights */}
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-w1 p-4 rounded-lg shadow-md border-l-4 border-r1">
                <h4 className="font-semibold text-r1 mb-1">Our Mission</h4>
                <p className="text-g2 text-sm">Guiding students to unlock their potential and achieve global academic success</p>
              </div>
              <div className="bg-w1 p-4 rounded-lg shadow-md border-l-4 border-r1">
                <h4 className="font-semibold text-r1 mb-1">Our Approach</h4>
                <p className="text-g2 text-sm">Personalized mentoring with proven strategies and comprehensive support</p>
              </div>
            </div>

            {/* Achievement Stats */}
            <div className="bg-w2 p-5 rounded-lg shadow-sm">
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <div className="text-2xl font-bold text-r2">50+</div>
                  <div className="text-xs text-g1">Top Universities</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-r1">500+</div>
                  <div className="text-xs text-g1">Students Mentored</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-green-600">₹2Cr+</div>
                  <div className="text-xs text-g1">Scholarships Won</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Row 2 - About the Founder */}
        <div className="flex flex-col md:flex-row items-center gap-8 sm:gap-6">
          {/* Founder Image */}
          <div className="order-3 md:order-1 w-full md:w-[40%] mb-6 md:mb-0 flex justify-center items-center relative">
            <div className="relative">
              {/* Floating decorative elements */}
              <div className="absolute -top-4 -left-4 w-8 h-8 bg-g1 rounded-full opacity-60"></div>
              <div className="absolute -bottom-3 -right-3 w-12 h-12 bg-r1 rounded-full opacity-50"></div>
              <div className="absolute top-1/4 -right-6 w-6 h-6 bg-accent rounded-full opacity-70"></div>
              
              {/* Main oval background for person */}
              <div className="relative w-64 h-80 bg-gradient-to-b from-blue-100 via-white to-blue-50 rounded-full shadow-xl overflow-hidden border-3 border-w1">
                <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-92 h-109">
                  <img
                    src="/assets/img/Owner.png"
                    alt="Ms. Neelam Sharma"
                    className="w-full h-full object-cover object-top"
                  />
                </div>
              </div>
              {/* Achievement badge */}
              <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 bg-r1 text-w1 px-2 py-1 rounded-full text-xs font-bold shadow-md">
                13+ Years Experience
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="order-4 md:order-2 w-full md:w-[60%] mb-6 md:mb-0 space-y-6">
            <div className="text-center md:text-left">
              <div className="flex gap-1 md:gap-2 mb-3 justify-center md:justify-start">
                <img
                  src="/assets/icons/square-bullet.svg"
                  alt="bullet"
                  className="h-10"
                />
                <h2 className="text-3xl sm:text-4xl font-bold text-r1 mb-2">Meet Our Founder</h2>
              </div>
              <h3 className="text-lg sm:text-xl font-semibold text-g1 mb-3">Ms. Neelam Sharma</h3>
              <p className="text-base sm:text-lg italic text-r2 font-medium">
                "Every child is unique — with the right guidance, every child can achieve greatness."
              </p>
            </div>

            {/* Founder Credentials */}
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-w1 p-4 rounded-lg shadow-md">
                <h4 className="font-semibold text-r1 mb-2">Expertise</h4>
                <ul className="space-y-1 text-g1 text-sm">
                  <li>• 13+ years SAT training</li>
                  <li>• 8+ years career coaching</li>
                  <li>• MBA from Symbiosis University</li>
                </ul>
              </div>
              <div className="bg-w1 p-4 rounded-lg shadow-md">
                <h4 className="font-semibold text-r1 mb-2">Specializations</h4>
                <ul className="space-y-1 text-g1 text-sm">
                  <li>• University admissions</li>
                  <li>• Scholarship guidance</li>
                  <li>• Psychometric analysis</li>
                </ul>
              </div>
            </div>

            {/* Philosophy */}
            <div className="bg-w1 shadow-lg p-5 rounded-lg">
              <h4 className="font-semibold text-g1x mb-2">Leadership Philosophy</h4>
              <p className="text-gray-700 text-sm">
                Combining world-class tools with personalized mentoring to help students achieve not just academic success, but develop into confident, purpose-driven global citizens.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutSection;
