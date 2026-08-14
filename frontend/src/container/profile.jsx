import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

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
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSaving(true);
    setTimeout(() => {
      setSuccessMsg("Profile saved.");
      setSaving(false);
    }, 300);
  };

  return (
    <>
      <Navbar />
      <main className="min-h-[70vh] bg-slate-50 flex flex-col items-center py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-xl w-full rounded-2xl bg-white p-8 shadow-xs border border-slate-200">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold text-slate-900">Student Profile</h1>
            <button
              onClick={() => router.push("/trial")}
              className="px-4 py-2 bg-red-700 text-white font-bold text-xs uppercase tracking-wider rounded-lg shadow-xs hover:bg-red-800 transition"
            >
              Book Trial
            </button>
          </div>

          {successMsg && (
            <div className="mb-4 p-3 bg-slate-100 text-slate-800 font-medium text-xs rounded-lg">
              {successMsg}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4" noValidate>
            <div>
              <label className="block mb-1 text-xs font-bold uppercase text-slate-700">Full Name</label>
              <input
                type="text"
                name="fullName"
                value={form.fullName}
                onChange={handleChange}
                placeholder="Student Name"
                className="w-full rounded-lg border border-slate-200 p-2.5 text-xs bg-slate-50 focus:outline-none focus:border-red-700"
              />
            </div>

            <div>
              <label className="block mb-1 text-xs font-bold uppercase text-slate-700">Phone Number</label>
              <input
                type="text"
                name="phoneNumber"
                value={form.phoneNumber}
                onChange={handleChange}
                placeholder="+91 99833 22553"
                className="w-full rounded-lg border border-slate-200 p-2.5 text-xs bg-slate-50 focus:outline-none focus:border-red-700"
              />
            </div>

            <button
              type="submit"
              disabled={saving}
              className="w-full bg-slate-900 text-white font-bold py-3 rounded-lg text-xs uppercase tracking-wider transition"
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
