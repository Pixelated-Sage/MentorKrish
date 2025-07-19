// CardRevealSection.jsx

import React from 'react';

const cardData = [
  {
    title: "Integrated Courses",
    subtitle: "Your Gateway to Global Education: IELTS, SAT & more",
    description: "Our Courses: SAT, PSAT, ACT, IELTS, TOEFL",
    button: {
      label: "Book Now",
      link: "tel:+919999999999"
    },
    extra: "📞 +91-9999999999 | 🌐 www.mentorkrish.com"
  },
  {
    title: "Profile & Placement",
    subtitle: "Profile Building, Career Counseling",
    description: "Abroad & Domestic Placement Support for All",
    button: {
      label: "Get Guidance",
      link: "#"
    }
  },
  {
    title: "Do You Know?",
    subtitle: "75% of people are in the wrong profession.",
    description: "93.7% students are unsure about their career. Take a free career stream test!",
    button: {
      label: "Take Test",
      link: "#"
    }
  },
  {
    title: "DSAT Platform",
    image: "/assets/img/dsat.jpg",
    description: "Try our platform with real SAT-style mock questions.",
    button: {
      label: "Try Now",
      link: "#"
    }
  }
];

const CardRevealSection = () => {
  return (
    <section className="relative -mt-[12rem] bg-white  pb-32 z-10">
      {/* Cards Grid */}
<div className="w-[90%] max-w-9xl mx-auto flex flex-wrap justify-center items-stretch gap-10">
        {cardData.map((card, index) => (
          <div
            key={index}
            className="bg-[#D84040] text-white rounded-3xl shadow-2xl p-8 w-full md:w-[45%] xl:w-[22%] min-h-[400px] flex flex-col justify-between hover:scale-[1.05] transition-transform duration-300 ease-in-out"
          >
            <div className="space-y-3 mb-6">
              <h2 className="text-3xl font-extrabold">{card.title}</h2>
              {card.subtitle && <p className="text-lg text-gray-200">{card.subtitle}</p>}
              {card.image && (
                <img
                  src={card.image}
                  alt={card.title}
                  className="w-full h-36 object-contain rounded"
                />
              )}
              <p className="text-base text-white">{card.description}</p>
            </div>
            <div className="space-y-2">
              <a
                href={card.button.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-accent text-black font-semibold py-2 px-4 rounded hover:scale-110 transition-transform duration-200 ease-in-out text-center"
              >
                {card.button.label}
              </a>
              {card.extra && <p className="text-xs text-gray-300">{card.extra}</p>}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default CardRevealSection;
