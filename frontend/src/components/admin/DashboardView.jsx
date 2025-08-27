import React, { useEffect, useState } from "react";
import {
  BarChart, Bar, PieChart, Pie, Cell, Tooltip,
  XAxis, YAxis, Legend, ResponsiveContainer, AreaChart, Area
} from "recharts";

const COLORS = ["#D84040", "#FFD600", "#4CAF50", "#2196F3", "#9C27B0", "#FF9800"];

export default function AnalyticsDashboard() {
  const [data, setData] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("/api/admin-analytics")
      .then(res => {
        if (!res.ok) throw new Error("Failed to load analytics");
        return res.json();
      })
      .then(setData)
      .catch(e => setError(e.message));
  }, []);

  if (error) return (
    <div className="p-8 text-center text-red-600 bg-red-100 rounded max-w-xl mx-auto">{error}</div>
  );
  if (!data) return <div className="p-8 text-center">Loading analytics...</div>;

  return (
    <div className="max-w-7xl mx-auto py-12 px-6 space-y-12 font-sans text-gray-800">
      <h1 className="text-4xl font-extrabold text-center mb-4 tracking-tight text-gray-900">
        Mentor Krish Analytics Dashboard
      </h1>

      <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Events Distribution Pie */}
        <div className="bg-white shadow-lg rounded-xl p-6 flex flex-col">
          <h2 className="text-lg font-semibold mb-4 border-b border-gray-300 pb-2">
            Event Type Distribution
          </h2>
          <p className="text-sm text-gray-600 mb-6">
            Overview of user actions by event type collected from Firebase Analytics & Firestore.
          </p>
          <ResponsiveContainer width="100%" height={320}>
            <PieChart>
              <Pie
                data={data.eventCounts}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={110}
                label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(1)}%`}
                labelLine={false}
              >
                {data.eventCounts.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend verticalAlign="bottom" height={36} />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Top Pages Bar Chart */}
        <div className="bg-white shadow-lg rounded-xl p-6 flex flex-col">
          <h2 className="text-lg font-semibold mb-4 border-b border-gray-300 pb-2">Top 10 Page Views</h2>
          <p className="text-sm text-gray-600 mb-6">
            Most visited pages providing insight into user navigation and interests.
          </p>
          <ResponsiveContainer width="100%" height={340}>
            <BarChart data={data.pageViews} margin={{ left: 10, right: 30 }}>
              <XAxis dataKey="path" interval={0} angle={-40} textAnchor="end" height={70} />
              <YAxis />
              <Tooltip formatter={(val) => [val, "Page Views"]} />
              <Bar dataKey="count" fill="#D84040" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Courses Popularity Bar Chart */}
        <div className="bg-white shadow-lg rounded-xl p-6 flex flex-col">
          <h2 className="text-lg font-semibold mb-4 border-b border-gray-300 pb-2">Course Popularity</h2>
          <p className="text-sm text-gray-600 mb-6">
            Interactions on course pages, tabs, and enrollments show which courses attract highest user interest.
          </p>
          <ResponsiveContainer width="100%" height={340}>
            <BarChart data={data.courseViews} margin={{ left: 10, right: 30 }}>
              <XAxis dataKey="course" interval={0} angle={-40} textAnchor="end" height={70} />
              <YAxis />
              <Tooltip formatter={(val) => [val, "Interactions"]} />
              <Bar dataKey="count" fill="#FFD600" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Daily Active Users Area Chart */}
        <div className="bg-white shadow-lg rounded-xl p-6 flex flex-col">
          <h2 className="text-lg font-semibold mb-4 border-b border-gray-300 pb-2">Daily User Activity (Last 30 Days)</h2>
          <p className="text-sm text-gray-600 mb-6">
            Trends of user engagement by day to identify peaks and patterns in platform usage.
          </p>
          <ResponsiveContainer width="100%" height={280}>
            <AreaChart data={data.dailyTrends} margin={{ left: 10, right: 30 }}>
              <defs>
                <linearGradient id="colorCount" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#4CAF50" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#4CAF50" stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis dataKey="date" tickFormatter={(d) => d.slice(5)} />
              <YAxis />
              <Tooltip />
              <Area type="monotone" dataKey="count" stroke="#4CAF50" fillOpacity={1} fill="url(#colorCount)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </section>
    </div>
  );
}
