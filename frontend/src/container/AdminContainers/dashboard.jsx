import AdminRouteGuard from '../../components/AdminRouteGuard';

export default function AdminDashboard() {
  return (
    <AdminRouteGuard>
      <main className="min-h-[70vh] flex flex-col items-center justify-center px-6 py-20 bg-w2">

        
        <div className="max-w-2xl w-full bg-w1 rounded-3xl p-10 shadow-xl border border-w2 text-center">
          <h1 className="text-4xl font-bold text-g1 mb-6">Admin Dashboard</h1>
          <p className="text-g2 mb-8">
            Welcome, Admin! You have access to manage users, blogs, announcements, and trial bookings.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <a href="/admin/users" className="block bg-r1 text-w1 rounded-xl py-6 px-4 font-semibold shadow hover:bg-r2 transition">
              Manage Users
            </a>
            <a href="/admin/blogs" className="block bg-r1 text-w1 rounded-xl py-6 px-4 font-semibold shadow hover:bg-r2 transition">
              Manage Blogs
            </a>
            <a href="/admin/announcements" className="block bg-r1 text-w1 rounded-xl py-6 px-4 font-semibold shadow hover:bg-r2 transition">
              Manage Announcements
            </a>
            <a href="/admin/trials" className="block bg-r1 text-w1 rounded-xl py-6 px-4 font-semibold shadow hover:bg-r2 transition">
              Manage Trial Bookings
            </a>
            <a href="/admin/about" className="block bg-r1 text-w1 rounded-xl py-6 px-4 font-semibold shadow hover:bg-r2 transition">
              Manage About Section
            </a>
          </div>
        </div>
      </main>
    </AdminRouteGuard>
  );
}

