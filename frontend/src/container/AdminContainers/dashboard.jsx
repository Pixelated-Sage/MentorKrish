import React, { useState } from 'react';
import AdminRouteGuard from '../../components/admin/AdminRouteGuard';
import Sidebar from '../../components/admin/Sidebar';
// import UsersManager from '../../components/admin/UsersManager';
import BlogsManager from '../../components/admin/BlogsManager';
import AnnouncementsManager from '../../components/admin/AnnouncementsManager';
// import TrialBookingsManager from '../../components/admin/TrialBookingsManager';
import AboutManager from '../../components/admin/AboutManager';
import GalleryManager from '../../components/admin/GalleryManager';


const views = {
  dashboard: AdminRouteGuard,
  // users: UsersManager,
  blogs: BlogsManager,
  announcements: AnnouncementsManager,
  // trials: TrialBookingsManager,
  about: AboutManager,
  gallery: GalleryManager,
};

export default function AdminDashboard() {
  const [activeView, setActiveView] = useState('dashboard');
  const ActiveComponent = views[activeView];

  // Logout handler
  function handleLogout() {
    localStorage.removeItem('authToken');
    localStorage.removeItem('userEmail');
    localStorage.removeItem('userRole');
    // redirect to login page
    window.location.href = '/login';
  }

  return (
    <AdminRouteGuard>
      <div className="flex min-h-screen bg-gray-100">
        <Sidebar activeView={activeView} setActiveView={setActiveView} />
        <main className="flex-1 p-6 overflow-auto relative">
          <div className="absolute top-4 right-6 z-50">
            <button
              onClick={handleLogout}
              className="bg-red-600 hover:bg-red-700 active:bg-red-800 text-white font-semibold px-4 py-2 rounded shadow transition"
            >
              Logout
            </button>
          </div>
          <ActiveComponent />
        </main>
      </div>
    </AdminRouteGuard>
  );
}
