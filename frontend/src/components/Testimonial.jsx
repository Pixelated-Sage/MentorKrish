import { useState, useEffect, useRef } from "react";

const HomeTestimonial = () => {
  const [active, setActive] = useState(0);
  const intervalRef = useRef(null);

  
  const testimonials = [
    {
      id: 1,
      name: "Sarah Chen",
      role: "Senior Software Engineer",
      company: "Meta",
      image: "https://images.unsplash.com/photo-1494790108755-2616b332c5cd?w=150&h=150&fit=crop&crop=face",
      quote: "Super60 transformed my career trajectory. The community's focus on real-world projects and mentorship helped me land my dream role at Meta. The professional network I built here is invaluable.",
      rating: 5,
      project: "AI-Powered Analytics Dashboard"
    },
    {
      id: 2,
      name: "Marcus Rodriguez",
      role: "Product Manager",
      company: "Google",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
      quote: "The caliber of professionals in Super60 is exceptional. Working alongside industry leaders on challenging projects accelerated my growth exponentially. It's not just a community—it's a career catalyst.",
      rating: 5,
      project: "Enterprise SaaS Platform"
    },
    {
      id: 3,
      name: "Priya Sharma",
      role: "Lead Designer",
      company: "Adobe",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
      quote: "Super60's emphasis on excellence and innovation pushed me beyond my comfort zone. The collaborative environment and high standards helped me secure my leadership position at Adobe.",
      rating: 5,
      project: "Design System Architecture"
    },
    {
      id: 4,
      name: "David Kim",
      role: "Technical Lead",
      company: "Microsoft",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
      quote: "The technical depth and professional standards at Super60 are unmatched. Every project is a masterclass in engineering excellence. This community shapes industry leaders.",
      rating: 5,
      project: "Cloud Infrastructure Platform"
    },
    {
      id: 5,
      name: "Elena Volkov",
      role: "Data Scientist",
      company: "Tesla",
      image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=face",
      quote: "Super60's data-driven approach and cutting-edge projects gave me the expertise to contribute to Tesla's autonomous driving technology. The community's impact on my career is immeasurable.",
      rating: 5,
      project: "Machine Learning Pipeline"
    }
  ];


  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setActive((prev) => (prev + 1) % testimonials.length);
    }, 6000);
    return () => clearInterval(intervalRef.current);
  }, []);

  const { name, role, company, image, quote, rating, project } = testimonials[active];

  return (
    <section className="px-4 py-2 overflow-hidden">
      <div className="max-w-xl mx-auto overflow-hidden shadow-xl rounded-3xl bg-white/70 backdrop-blur-md">
        {/* Image with wavy transition */}
        <div className="relative flex items-center justify-center w-full h-40 overflow-hidden rounded-t-3xl">
          <img src={image} alt={name} className="z-50 flex items-center p-4 mt-4 rounded-full h-44 w-44" />

          {/* Wavy Shape at bottom of image */}
          <svg
            className="absolute left-0 w-full h-44 bottom-[-10]"
            viewBox="0 0 500 80"
            preserveAspectRatio="none"
          >
            <path
              d="M0,30 C150,80 350,0 500,30 L500,0 L0,0 Z"
              fill="url(#waveGradient)"
            />
            <defs>
              <linearGradient id="waveGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#ff8c00 " />
                <stop offset="100%" stopColor="#ff8c00 " />
              </linearGradient>
            </defs>
          </svg>
        </div>

        {/* Content */}
        <div className="px-6 pt-6 pb-10 text-center">
          <h3 className="text-2xl font-bold text-gray-900">{name}</h3>
          <p className="text-sm text-gray-600">{role} @ {company}</p>

          <blockquote className="mt-4 text-lg italic text-gray-800">
            “{quote}”
          </blockquote>

          {/* Rating */}
          <div className="flex justify-center mt-4">
            {[...Array(rating)].map((_, i) => (
              <svg key={i} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
              </svg>
            ))}
          </div>

          <p className="inline-block px-4 py-1 mt-4 text-sm font-medium text-blue-900 rounded-full bg-gradient-to-r from-blue-100 to-orange-100">
            Project: {project}
          </p>
        </div>
      </div>

      {/* Navigation dots */}
      <div className="flex justify-center gap-3 mt-8">
        {testimonials.map((_, i) => (
          <button
            key={i}
            onClick={() => setActive(i)}
            className={`w-3 h-3 rounded-full transition ${
              i === active
                ? 'bg-gradient-to-r from-blue-600 to-orange-500 scale-125'
                : 'bg-gray-300 hover:bg-gray-400'
            }`}
          ></button>
        ))}
      </div>
    </section>
  );
};

export default HomeTestimonial;
