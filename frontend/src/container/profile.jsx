import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { apiFetch, getAuthHeaders } from "../lib/api"; // Assuming apiFetch handles auth & errors

export default function Profile() {
  const router = useRouter();
  const [form, setForm] = useState({
    email: "",
    fullName: "",
    phoneNumber: "",
    dateOfBirth: "",
    addressLine1: "",
    addressLine2: "",
    addressLine3: "",
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  // Fetch profile data on mount
  useEffect(() => {
    async function fetchProfile() {
      setLoading(true);
      setError("");
      try {
        const res = await apiFetch("/api/profile", {
          headers: getAuthHeaders()
        });
        const data = await res.json();
        setForm({
          email: data.email || "",
          fullName: data.fullName || "",
          phoneNumber: data.phoneNumber || "",
          dateOfBirth: data.dateOfBirth || "",
          addressLine1: data.addressLine1 || "",
          addressLine2: data.addressLine2 || "",
          addressLine3: data.addressLine3 || "",
        });
      } catch (err) {
        setError("Failed to load profile. Please login again.");
        // Optionally redirect to login if unauthorized
        if (err.message.toLowerCase().includes("unauthorized")) {
          router.push("/login");
        }
      } finally {
        setLoading(false);
      }
    }
    fetchProfile();
  }, [router]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError("");
    setSuccessMsg("");
    try {
      const res = await apiFetch("/api/profile", {
        method: "PUT",
        headers: { 
          ...getAuthHeaders(),
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });
      if (!res.ok) {
        const errMsg = await res.text();
        throw new Error(errMsg || "Failed to save profile.");
      }
      setSuccessMsg("Profile updated successfully.");
    } catch (err) {
      setError(err.message || "Failed to save profile.");
    } finally {
      setSaving(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("userEmail");
    localStorage.removeItem("userRole");
    router.push("/login");
  };

  if (loading) {
    return (
      <>
        <Navbar />
        <main className="min-h-[70vh] flex items-center justify-center bg-w2">
          <p className="text-g2 text-lg">Loading profile...</p>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />
      <main className="min-h-[70vh] bg-w2 flex flex-col items-center py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-xl w-full rounded-lg bg-white p-8 shadow-md">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-extrabold text-g1">My Profile</h1>
            <button
              onClick={handleLogout}
              className="px-4 py-2 bg-r1 text-white rounded-md shadow hover:bg-r2 transition"
            >
              Logout
            </button>
          </div>

          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-400 text-red-700 rounded">
              {error}
            </div>
          )}

          {successMsg && (
            <div className="mb-4 p-3 bg-green-50 border border-green-400 text-green-700 rounded">
              {successMsg}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6" noValidate>
            <div>
              <label htmlFor="email" className="block mb-1 font-medium text-g1">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={form.email}
                className="w-full rounded-md border border-gray-300 bg-gray-100 p-2 cursor-not-allowed text-g3"
                disabled
              />
            </div>

            <div>
              <label htmlFor="fullName" className="block mb-1 font-medium text-g1">Full Name</label>
              <input
                type="text"
                id="fullName"
                name="fullName"
                value={form.fullName}
                onChange={handleChange}
                required
                className="w-full rounded-md border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-accent"
              />
            </div>

            <div>
              <label htmlFor="phoneNumber" className="block mb-1 font-medium text-g1">Phone Number</label>
              <input
                type="text"
                id="phoneNumber"
                name="phoneNumber"
                value={form.phoneNumber}
                onChange={handleChange}
                className="w-full rounded-md border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-accent"
              />
            </div>

            <div>
              <label htmlFor="dateOfBirth" className="block mb-1 font-medium text-g1">Date of Birth</label>
              <input
                type="date"
                id="dateOfBirth"
                name="dateOfBirth"
                value={form.dateOfBirth}
                onChange={handleChange}
                className="w-full rounded-md border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-accent"
              />
            </div>

            <div>
              <label htmlFor="addressLine1" className="block mb-1 font-medium text-g1">Address Line 1</label>
              <input
                type="text"
                id="addressLine1"
                name="addressLine1"
                value={form.addressLine1}
                onChange={handleChange}
                className="w-full rounded-md border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-accent"
              />
            </div>

            <div>
              <label htmlFor="addressLine2" className="block mb-1 font-medium text-g1">Address Line 2</label>
              <input
                type="text"
                id="addressLine2"
                name="addressLine2"
                value={form.addressLine2}
                onChange={handleChange}
                className="w-full rounded-md border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-accent"
              />
            </div>

            <div>
              <label htmlFor="addressLine3" className="block mb-1 font-medium text-g1">Address Line 3</label>
              <input
                type="text"
                id="addressLine3"
                name="addressLine3"
                value={form.addressLine3}
                onChange={handleChange}
                className="w-full rounded-md border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-accent"
              />
            </div>

            <button
              type="submit"
              disabled={saving}
              className="w-full bg-r1 text-w1 rounded-md p-3 font-semibold transition"
            >
              {saving ? "Saving..." : "Save Profile"}
            </button>
          </form>
        </div>
      </main>
      <Footer />
    </>
  );
}
