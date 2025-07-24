import React from 'react';

const announcements = [
  {
    title: 'Global Scholarship Deadline',
    image: '/assets/img/dsat.jpg',
    description: 'Apply now for full scholarships in top global universities. Deadline: July 30.',
    timer: '07d : 15h : 22m',
    link: '#',
  },
  {
    title: 'Mission SAT Launch',
    image: '/assets/img/dsat.jpg',
    description: 'Join our 45-day Mission SAT Bootcamp. Seats filling fast!',
    timer: '03d : 02h : 10m',
    link: '#',
  },
  {
    title: 'Student Spotlight: Aarav Jain',
    image: '/assets/img/dsat.jpg',
    description: "From self-doubt to Stanford! Read Aarav's journey with Mentor Krish.",
    timer: null,
    link: '#',
  },
];

export default function AnnouncementsSection() {
  return (
    <section className="py-10 bg-w1" id="announcements">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl sm:text-4xl font-bold text-g1 mb-2 text-center">
          Latest Announcements
        </h2>
        <p className="text-center text-g2 mb-8 max-w-xl mx-auto text-sm sm:text-base">
          Stay updated with upcoming deadlines, new programs, success stories, and more from the Mentor Krish community.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {announcements.map((item, index) => (
            <div
              key={index}
              className="bg-w2 rounded-2xl shadow-lg overflow-hidden hover:scale-105 transition transform duration-300"
            >
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-40 sm:h-44 object-cover"
                loading="lazy"
              />
              <div className="p-4 sm:p-6">
                <h3 className="text-lg sm:text-xl font-semibold text-g1 mb-1 sm:mb-2">
                  {item.title}
                </h3>
                <p className="text-g2 text-xs sm:text-sm mb-3 leading-snug">
                  {item.description}
                </p>
                {item.timer && (
                  <div className="bg-w1 text-r1 text-[10px] sm:text-xs px-2 py-1 inline-block rounded-full font-semibold mb-3 tracking-wide select-none">
                    {item.timer} left
                  </div>
                )}
                <a
                  href={item.link}
                  className="text-r1 hover:text-r2 hover:underline font-medium text-sm sm:text-base"
                >
                  Know More →
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
