import React, { useState } from 'react';
import AdminRouteGuard from '../../components/admin/AdminRouteGuard';
import Sidebar from '../../components/admin/Sidebar';
import DashboardView from '../../components/admin/DashboardView';
// import UsersManager from '../../components/admin/UsersManager';
import BlogsManager from '../../components/admin/BlogsManager';
import AnnouncementsManager from '../../components/admin/AnnouncementsManager';
// import TrialBookingsManager from '../../components/admin/TrialBookingsManager';
import AboutManager from '../../components/admin/AboutManager';

const views = {
  dashboard: DashboardView,
  // users: UsersManager,
  blogs: BlogsManager,
  announcements: AnnouncementsManager,
  // trials: TrialBookingsManager,
  about: AboutManager,
};

export default function AdminDashboard() {
  const [activeView, setActiveView] = useState('dashboard');
  const ActiveComponent = views[activeView];

  return (
    <AdminRouteGuard>
      <div className="flex min-h-screen bg-gray-100">
        <Sidebar activeView={activeView} setActiveView={setActiveView} />
        <main className="flex-1 p-6 overflow-auto">
          <ActiveComponent />
        </main>
      </div>
    </AdminRouteGuard>
  );
}
