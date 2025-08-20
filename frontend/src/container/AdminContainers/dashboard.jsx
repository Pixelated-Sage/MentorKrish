import React, { useState } from "react";
import AdminRouteGuard from "../../components/admin/AdminRouteGuard";
import Sidebar from "../../components/admin/Sidebar";
import DashboardView from "../../components/admin/DashboardView";
import BlogsManager from "../../components/admin/BlogsManager";
import AnnouncementsManager from "../../components/admin/AnnouncementsManager";
import AboutManager from "../../components/admin/AboutManager";
import GalleryManager from "../../components/admin/GalleryManager";

const views = {
  dashboard: DashboardView,
  blogs: BlogsManager,
  announcements: AnnouncementsManager,
  about: AboutManager,
  gallery: GalleryManager,
};

export default function AdminDashboard() {
  const [activeView, setActiveView] = useState("dashboard");
  const ActiveComponent = views[activeView];

  return (
    <AdminRouteGuard>
      <div className="flex flex-col h-screen bg-gray-50">
        <Sidebar activeView={activeView} setActiveView={setActiveView} />

        <main className="flex-grow p-6 overflow-auto bg-w1 max-w-full">
          <ActiveComponent />
        </main>
      </div>
    </AdminRouteGuard>
  );
}
