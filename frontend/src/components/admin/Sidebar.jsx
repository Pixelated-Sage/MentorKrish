import React from 'react';

const items = [
  { id: 'dashboard', label: 'Dashboard' },
  { id: 'users', label: 'Manage Users' },
  { id: 'blogs', label: 'Manage Blogs' },
  { id: 'announcements', label: 'Manage Announcements' },
  { id: 'trials', label: 'Manage Trial Bookings' },
  { id: 'about', label: 'Manage About Section' },
];

export default function Sidebar({ activeView, setActiveView }) {
  return (
    <nav className="w-64 bg-white shadow-lg p-6 space-y-2 sticky top-0 h-full overflow-y-auto">
      <h2 className="text-xl font-bold mb-4">Admin Panel</h2>
      {items.map(({ id, label }) => (
        <button
          key={id}
          onClick={() => setActiveView(id)}
          className={`block w-full text-left px-4 py-2 rounded ${
            activeView === id
              ? 'bg-blue-600 text-white font-semibold'
              : 'text-gray-700 hover:bg-gray-200'
          }`}
        >
          {label}
        </button>
      ))}
    </nav>
  );
}
