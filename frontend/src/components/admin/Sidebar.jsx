import React, { useState } from "react";
import { useRouter } from "next/router";
import { Menu, X, Home } from "lucide-react";

const items = [
  { id: "dashboard", label: "Dashboard" },
  { id: "blogs", label: "Manage Blogs" },
  { id: "announcements", label: "Manage Announcements" },
  { id: "about", label: "Manage About Section" },
  { id: "gallery", label: "Manage Gallery Section" },
];

export default function Sidebar({ activeView, setActiveView, children }) {
  const router = useRouter();
  const [open, setOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("userEmail");
    localStorage.removeItem("userRole");
    router.push("/login");
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar - desktop */}
      <div className="hidden md:flex md:flex-col md:w-64 bg-white shadow-lg fixed inset-y-0 left-0 z-40">
        {/* Top Navbar */}
        <header className="flex items-center justify-between px-6 py-4 border-b border-gray-200 bg-white sticky top-0 z-40">
          <h1 className="text-xl font-extrabold text-r1 tracking-tight">
            Admin Panel
          </h1>
          <button
            onClick={handleLogout}
            className="text-r1 font-semibold border border-r1 rounded-md px-3 py-1 hover:bg-r1 hover:text-w1 transition"
            aria-label="Logout"
          >
            Logout
          </button>
        </header>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto px-4 py-6 space-y-2 bg-w1">
          {/* Home button */}
          <button
            onClick={() => router.push("/")}
            className="w-full flex items-center gap-2 text-left px-4 py-3 rounded-md font-semibold text-g1 hover:bg-r1/10 hover:text-r1 transition"
          >
            <Home size={18} />
            Home
          </button>

          {items.map(({ id, label }) => (
            <button
              key={id}
              onClick={() => setActiveView(id)}
              className={`w-full text-left px-4 py-3 rounded-md font-semibold transition ${
                activeView === id
                  ? "bg-r1 text-w1 shadow-md"
                  : "text-g1 hover:bg-r1/10 hover:text-r1"
              }`}
            >
              {label}
            </button>
          ))}
        </nav>
      </div>

      {/* Mobile navbar */}
      <div className="md:hidden fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-200 flex items-center justify-between px-4 py-3 shadow">
        <h1 className="text-lg font-extrabold text-r1 tracking-tight">
          Admin Panel
        </h1>
        <button
          onClick={() => setOpen(!open)}
          className="text-r1 focus:outline-none"
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile drawer */}
      <div
        className={`fixed inset-y-0 left-0 w-64 bg-white shadow-lg z-40 transform transition-transform duration-300 ease-in-out ${
          open ? "translate-x-0" : "-translate-x-full"
        } md:hidden`}
      >
        <header className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
          <h1 className="text-xl font-extrabold text-r1 tracking-tight">
            Admin Panel
          </h1>
          <button
            onClick={handleLogout}
            className="text-r1 font-semibold border border-r1 rounded-md px-3 py-1 hover:bg-r1 hover:text-w1 transition"
            aria-label="Logout"
          >
            Logout
          </button>
        </header>
        <nav className="px-4 py-6 space-y-2 bg-w1 h-full overflow-y-auto">
          <button
            onClick={() => router.push("/")}
            className="w-full flex items-center gap-2 text-left px-4 py-3 rounded-md font-semibold text-g1 hover:bg-r1/10 hover:text-r1 transition"
          >
            <Home size={18} />
            Home
          </button>
          {items.map(({ id, label }) => (
            <button
              key={id}
              onClick={() => {
                setActiveView(id);
                setOpen(false);
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
        </nav>
      </div>

      {/* Main content area */}
      <main className="flex-1 ml-0 md:ml-64 mt-14 md:mt-0 p-6 overflow-y-auto">
        {children}
      </main>
    </div>
  );
}
