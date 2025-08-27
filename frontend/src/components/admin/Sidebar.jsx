import React, { useState } from "react";
import { useRouter } from "next/router";
import {
  Menu,
  X,
  Home,
  LayoutDashboard,
  FileText,
  Megaphone,
  Info,
  Image,
} from "lucide-react";

const items = [
  { id: "dashboard", label: "Dashboard", icon: <LayoutDashboard size={20} /> },
  { id: "blogs", label: "Manage Blogs", icon: <FileText size={20} /> },
  { id: "announcements", label: "Manage Announcements", icon: <Megaphone size={20} /> },
  { id: "about", label: "Manage About Section", icon: <Info size={20} /> },
  { id: "gallery", label: "Manage Gallery Section", icon: <Image size={20} /> },
];

export default function Sidebar({ activeView, setActiveView, children }) {
  const router = useRouter();
  const [openMobile, setOpenMobile] = useState(false);
  const [collapsed, setCollapsed] = useState(true); // true: icon-only collapsed mode

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("userEmail");
    localStorage.removeItem("userRole");
    router.push("/login");
  };

  return (
    <div className="flex  bg-gray-50">
      {/* Desktop Sidebar */}
      <div
        onMouseEnter={() => setCollapsed(false)}
        onMouseLeave={() => setCollapsed(true)}
        className={`hidden md:flex md:flex-col fixed inset-y-0 left-0 z-40 bg-white shadow-lg border-r border-gray-200 
          transition-width duration-300 ease-in-out
          ${collapsed ? "w-16" : "w-64"}`}
        style={{ minWidth: collapsed ? 64 : 256 }}
      >
        {/* Header */}
        <header className="flex items-center justify-between px-4 py-4 border-b border-gray-200 sticky top-0 z-10 bg-white">
          <h1
            className={`text-xl font-extrabold text-r1 tracking-tight truncate ${
              collapsed ? "hidden" : "block"
            }`}
          >
            Admin Panel
          </h1>
          {!collapsed && (
            <button
              onClick={handleLogout}
              className="text-r1 font-semibold border border-r1 rounded-md px-3 py-1 hover:bg-r1 hover:text-w1 transition"
              aria-label="Logout"
            >
              Logout
            </button>
          )}
        </header>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto">
          {/* Home button */}
          <button
            onClick={() => router.push("/")}
            className={`group flex items-center gap-4 px-4 py-3 w-full font-semibold rounded-r-full transition-colors duration-200 ${
              activeView === "home"
                ? "bg-r1 text-w1"
                : "text-g1 hover:bg-r1/20 hover:text-r1"
            }`}
            aria-label="Home"
            title="Home"
          >
            <Home size={20} />
            {!collapsed && "Home"}
          </button>

          {items.map(({ id, label, icon }) => (
            <button
              key={id}
              onClick={() => setActiveView(id)}
              className={`group flex items-center gap-4 px-4 py-3 w-full font-semibold rounded-r-full transition-colors duration-200 ${
                activeView === id
                  ? "bg-r1 text-w1"
                  : "text-g1 hover:bg-r1/20 hover:text-r1"
              }`}
              aria-label={label}
              title={label}
            >
              {icon}
              {!collapsed && label}
            </button>
          ))}
        </nav>
      </div>

      {/* Mobile Sidebar */}
      <div className={`fixed inset-y-0 left-0 z-50 md:hidden bg-white shadow-lg w-64 transform ${openMobile ? "translate-x-0" : "-translate-x-full"} transition-transform duration-300 ease-in-out`}>
        <header className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
          <h1 className="text-xl font-extrabold text-r1 tracking-tight">Admin Panel</h1>
          <button
            onClick={() => setOpenMobile(false)}
            aria-label="Close menu"
            className="p-2 rounded hover:bg-gray-200 transition"
          >
            <X size={24} />
          </button>
        </header>
        <nav className="px-4 py-6 space-y-2 bg-w1 h-full overflow-y-auto">
          <button
            onClick={() => {
              router.push("/");
              setOpenMobile(false);
            }}
            className="flex items-center gap-2 px-4 py-2 mb-4 text-gray-700 font-semibold rounded-lg hover:bg-red-50 w-full"
          >
            <Home size={18} /> Home
          </button>
          {items.map(({ id, label }) => (
            <button
              key={id}
              onClick={() => {
                setActiveView(id);
                setOpenMobile(false);
              }}
              className={`w-full text-left px-4 py-3 rounded-md font-semibold transition ${
                activeView === id
                  ? "bg-r1 text-w1 shadow-md"
                  : "text-g1 hover:bg-r1/10 hover:text-r1"
              }`}
            >
              {label}
            </button>
          ))}
          <button
            onClick={handleLogout}
            className="w-full mt-6 bg-r1 text-w1 font-semibold px-4 py-2 rounded-lg text-center shadow hover:bg-r2 transition"
          >
            Logout
          </button>
        </nav>
      </div>

      {/* Content area with dynamic left margin */}
      <main
        className={`flex-1 md:pt-0 overflow-hidden transition-all duration-300 ease-in-out`}
        style={{ marginLeft: collapsed ? 64 : 253 }}
      >
        {children}
      </main>
    </div>
  );
}
