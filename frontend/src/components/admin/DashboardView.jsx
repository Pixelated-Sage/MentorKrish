import React, { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  XAxis,
  YAxis,
  Legend,
  ResponsiveContainer,
  AreaChart,
  Area,
} from "recharts";

// New Pie Chart Component
const PIE_COLORS = ["#6366f1", "#22c55e", "#f59e0b", "#ef4444"];
function AnalyticsPieChart() {
  const [data, setData] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const res = await fetch("https://mentorkrish.in/api/admin-analytics");
      const json = await res.json();

      // Example transformation: group raw clicks into categories
      const grouped = {
        Auth: (json.Login || 0) + (json.Register || 0),
        Demo: (json.BookDemo || 0) + (json.Trial || 0),
        Navigation: (json.Courses || 0) + (json.Contact || 0) + (json.Menu || 0),
        Other: Object.values(json).reduce((acc, val) => acc + val, 0) -
               ((json.Login || 0) + (json.Register || 0) + (json.BookDemo || 0) + (json.Trial || 0) + (json.Courses || 0) + (json.Contact || 0) + (json.Menu || 0))
      };

      // Convert to array for Recharts
      const finalData = Object.keys(grouped).map(key => ({
        name: key,
        value: grouped[key]
      }));

      setData(finalData);
    }
    fetchData();
  }, []);

  return (
    <div className="w-full h-[400px] flex items-center justify-center bg-white rounded-2xl shadow-md p-4">
      <ResponsiveContainer>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={({ name, percent }) =>
              `${name}: ${(percent * 100).toFixed(0)}%`
            }
            outerRadius={120}
            fill="#8884d8"
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={PIE_COLORS[index % PIE_COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}

const COLORS = ["#3B82F6", "#F59E0B", "#10B981", "#EF4444", "#8B5CF6", "#14B8A6"];

export default function AnalyticsDashboard() {
  const [data, setData] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("/api/admin-analytics")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to load analytics");
        return res.json();
      })
      .then(setData)
      .catch((e) => setError(e.message));
  }, []);

  if (error)
    return (
      <div className="p-8 text-center text-red-600 bg-red-100 rounded max-w-xl mx-auto">
        {error}
      </div>
    );
  if (!data)
    return <div className="p-8 text-center">Loading analytics...</div>;

  return (
    <div className="max-w-7xl mx-auto py-12 px-6 space-y-12 font-sans text-gray-800">
      <h1 className="text-4xl font-extrabold text-center mb-6 text-gray-900">
        Mentor Krish Analytics Dashboard
      </h1>
      <p className="text-center text-gray-500 mb-12 max-w-2xl mx-auto">
        A clear overview of user activity, engagement, and navigation patterns on the platform.
      </p>

      {/* First Row */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Event Distribution Pie */}
        <Card title="Event Type Distribution" description="Proportion of user actions like login, register, or dismiss.">
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={data.eventCounts}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={100}
                label={({ name, percent }) =>
                  `${name}: ${(percent * 100).toFixed(1)}%`
                }
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
        </Card>

        {/* Page Views Bar Chart */}
        <Card title="Top Page Views" description="Most visited pages giving insight into user navigation.">
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={data.pageViews}>
              <XAxis dataKey="path" interval={0} angle={-30} textAnchor="end" height={70} />
              <YAxis />
              <Tooltip formatter={(val) => [val, "Page Views"]} />
              <Bar dataKey="count" fill="#3B82F6" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </Card>
      </section>

      {/* Second Row */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Course Popularity */}
        <Card title="Course Popularity" description="Interactions on course pages showing user interest.">
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={data.courseViews}>
              <XAxis dataKey="course" interval={0} angle={-30} textAnchor="end" height={70} />
              <YAxis />
              <Tooltip formatter={(val) => [val, "Interactions"]} />
              <Bar dataKey="count" fill="#F59E0B" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </Card>

        {/* Daily Active Users */}
        <Card title="Daily Active Users (30 Days)" description="Trends in user activity across the last 30 days.">
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={data.dailyTrends}>
              <defs>
                <linearGradient id="colorCount" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10B981" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#10B981" stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis dataKey="date" tickFormatter={(d) => d.slice(5)} />
              <YAxis />
              <Tooltip />
              <Area type="monotone" dataKey="count" stroke="#10B981" fillOpacity={1} fill="url(#colorCount)" />
            </AreaChart>
          </ResponsiveContainer>
        </Card>
      </section>

      {/* Third Row (New Chart Added) */}
      <section>
        <Card title="User Device Distribution" description="Breakdown of devices used to access the platform.">
          <ResponsiveContainer width="100%" height={320}>
            <PieChart>
              <Pie
                data={data.deviceTypes || [
                  { name: "Desktop", value: 55 },
                  { name: "Mobile", value: 35 },
                  { name: "Tablet", value: 10 },
                ]}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={110}
                label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(1)}%`}
                labelLine={false}
              >
                {(data.deviceTypes || []).map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend verticalAlign="bottom" height={36} />
            </PieChart>
          </ResponsiveContainer>
        </Card>
      </section>

      {/* Fourth Row (Custom Pie Chart Integration) */}
      <section>
        <Card title="Custom Event Category Distribution" description="Grouped user actions by category (Auth, Demo, Navigation, Other).">
          <AnalyticsPieChart />
        </Card>
      </section>
    </div>
  );
}

/* Reusable Card Component */
function Card({ title, description, children }) {
  return (
    <div className="bg-white shadow-md rounded-xl p-6 flex flex-col">
      <h2 className="text-lg font-semibold mb-2 text-gray-900">{title}</h2>
      <p className="text-sm text-gray-500 mb-4">{description}</p>
      {children}
    </div>
  );
}