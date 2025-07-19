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
    title: 'Mission SAT Launch 🚀',
    image: '/assets/img/dsat.jpg',
    description: 'Join our 45-day Mission SAT Bootcamp. Seats filling fast!',
    timer: '03d : 02h : 10m',
    link: '#',
  },
  {
    title: 'Student Spotlight: Aarav Jain',
    image: '/assets/img/dsat.jpg',
    description: 'From self-doubt to Stanford! Read Aarav\'s journey with Mentor Krish.',
    timer: null,
    link: '#',
  },
];

export default function AnnouncementsSection() {
  return (
    <section className="py-10 bg-gradient-to-b from-white to-blue-50" id="announcements">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-4xl font-bold text-gray-800 mb-2 text-center">📢 Latest Announcements</h2>
        <p className="text-center text-gray-600 mb-8 max-w-xl mx-auto">
          Stay updated with upcoming deadlines, new programs, success stories, and more from the Mentor Krish community.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {announcements.map((item, index) => (
            <div key={index} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:scale-105 transition duration-300">
              <img src={item.image} alt={item.title} className="w-full h-48 object-cover" />
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-2">{item.title}</h3>
                <p className="text-gray-600 text-sm mb-3">{item.description}</p>
                {item.timer && (
                  <div className="bg-blue-100 text-blue-800 text-xs px-3 py-1 inline-block rounded-full font-semibold mb-3">
                    ⏳ {item.timer} left
                  </div>
                )}
                <a
                  href={item.link}
                  className="text-blue-600 hover:underline font-medium text-sm"
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
