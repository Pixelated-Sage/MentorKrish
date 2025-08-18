import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { fetchUserProfile, updateUserProfile } from "../lib/api";
import { motion } from "framer-motion";

export default function Profile() {
  const router = useRouter();

  const [user, setUser] = useState(null);
  const [formData, setFormData] = useState({
    fullName: "",
    address1: "",
    address2: "",
    address3: "",
    email: "",
    phoneNumber: "",
    profilePicture: "",
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState("");
  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    async function loadUser() {
      setLoading(true);
      try {
        const data = await fetchUserProfile();
        setUser(data);
        const addresses = (data.address || "").split("\n");
        setFormData({
          fullName: data.fullName || "",
          address1: addresses[0] || "",
          address2: addresses[1] || "",
          address3: addresses[2] || "",
          email: data.email || "",
          phoneNumber: data.phoneNumber || "",
          profilePicture: data.profilePicture || "",
        });
      } catch (err) {
        setServerError(err.message || "Failed to load profile.");
      } finally {
        setLoading(false);
      }
    }
    loadUser();
  }, []);

  function validate() {
    const errs = {};
    if (!formData.fullName.trim()) errs.fullName = "Name is required";
    if (!formData.phoneNumber.trim()) errs.phoneNumber = "Phone number is required";
    return errs;
  }

  function handleChange(e) {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function handleUpdate(e) {
    e.preventDefault();
    setErrors({});
    setServerError("");
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setUpdating(true);
    try {
      const addressCombined = [formData.address1, formData.address2, formData.address3]
        .filter(Boolean)
        .join("\n");

      const payload = {
        fullName: formData.fullName,
        phoneNumber: formData.phoneNumber,
        address: addressCombined,
        profilePicture: formData.profilePicture,
      };

      await updateUserProfile(payload);

      alert("Profile updated successfully!");
      router.reload();
    } catch (err) {
      setServerError(err.message || "Failed to update profile.");
    } finally {
      setUpdating(false);
    }
  }

  function handleLogout() {
    localStorage.removeItem("authToken");
    localStorage.removeItem("userEmail");
    localStorage.removeItem("userRole");
    // Optionally remove more keys...
    router.push("/login");
  }

  if (loading)
    return (
      <>
        <Navbar />
        <main className="min-h-[75vh] flex items-center justify-center text-lg text-g2">
          Loading Profile...
        </main>
        <Footer />
      </>
    );
  if (serverError)
    return (
      <>
        <Navbar />
        <main className="min-h-[75vh] flex items-center justify-center text-lg text-r1">
          {serverError}
        </main>
        <Footer />
      </>
    );

  return (
    <>
      <Navbar />
      <main className="min-h-[75vh] bg-w2 pt-32 pb-20 flex justify-center">
        <motion.form
          onSubmit={handleUpdate}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative max-w-4xl bg-white rounded-3xl shadow-xl border border-gray-200 p-8 flex gap-12 w-full mx-4"
        >
          {/* Logout Button */}
          <button
            type="button"
            className="absolute right-8 top-8 bg-gray-100 text-g1 hover:bg-r1 hover:text-white px-5 py-1.5 rounded-full font-semibold border border-gray-200 transition"
            onClick={handleLogout}
            disabled={updating}
          >
            Logout
          </button>

          {/* Left: Profile Picture */}
          <div className="flex-shrink-0 flex flex-col items-center gap-4 justify-start w-48">
            <img
              src={formData.profilePicture || "/default-profile.png"}
              alt={formData.fullName}
              className="w-36 h-36 sm:w-40 sm:h-40 rounded-full object-cover shadow-md border border-gray-200"
            />
            {/* Optionally: upload support */}
          </div>

          {/* Right: Profile Details */}
          <div className="flex-grow">
            {/* Name */}
            <div className="mb-6">
              <label htmlFor="fullName" className="block mb-1 font-semibold text-g1">
                Name
              </label>
              <input
                type="text"
                id="fullName"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                disabled={updating}
                className={`w-full rounded-xl border p-3 text-lg ${
                  errors.fullName ? "border-r1" : "border-gray-300"
                } focus:outline-none focus:ring-2 focus:ring-r1 focus:border-r1 transition`}
              />
              {errors.fullName && <p className="mt-1 text-r1">{errors.fullName}</p>}
            </div>

            {/* Address */}
            <div className="mb-6 space-y-3">
              <label className="block mb-1 font-semibold text-g1">Address</label>
              <input
                type="text"
                name="address1"
                placeholder="Address Line 1"
                value={formData.address1}
                onChange={handleChange}
                disabled={updating}
                className="w-full rounded-xl border border-gray-300 p-3 focus:outline-none focus:ring-2 focus:ring-r1 focus:border-r1 transition"
              />
              <input
                type="text"
                name="address2"
                placeholder="Address Line 2"
                value={formData.address2}
                onChange={handleChange}
                disabled={updating}
                className="w-full rounded-xl border border-gray-300 p-3 focus:outline-none focus:ring-2 focus:ring-r1 focus:border-r1 transition"
              />
              <input
                type="text"
                name="address3"
                placeholder="Address Line 3"
                value={formData.address3}
                onChange={handleChange}
                disabled={updating}
                className="w-full rounded-xl border border-gray-300 p-3 focus:outline-none focus:ring-2 focus:ring-r1 focus:border-r1 transition"
              />
            </div>

            {/* Email - readonly */}
            <div className="mb-6">
              <label htmlFor="email" className="block mb-1 font-semibold text-g1">
                Email <span className="text-g2">(verified)</span>
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                readOnly
                disabled
                className="w-full rounded-xl border border-gray-300 p-3 bg-gray-100 text-gray-600 cursor-not-allowed"
              />
            </div>
            {/* Phone Number */}
            <div className="mb-8">
              <label htmlFor="phoneNumber" className="block mb-1 font-semibold text-g1">
                Phone Number
              </label>
              <input
                type="tel"
                id="phoneNumber"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
                disabled={updating}
                className={`w-full rounded-xl border p-3 text-lg ${
                  errors.phoneNumber ? "border-r1" : "border-gray-300"
                } focus:outline-none focus:ring-2 focus:ring-r1 focus:border-r1 transition`}
              />
              {errors.phoneNumber && <p className="mt-1 text-r1">{errors.phoneNumber}</p>}
            </div>
            {/* Action buttons */}
            <div className="flex gap-4 justify-end">
              <button
                type="button"
                onClick={() => router.push("/")}
                disabled={updating}
                className="px-6 py-2 rounded-xl border border-gray-300 text-g1 hover:bg-w2 transition"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={updating}
                className="px-6 py-2 rounded-xl bg-r1 text-white hover:bg-r2 transition disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {updating ? "Updating..." : "Update"}
              </button>
            </div>
          </div>
        </motion.form>
      </main>
      <Footer />
    </>
  );
}
