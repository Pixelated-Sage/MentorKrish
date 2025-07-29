import React, { useState } from "react";
import { useRouter } from "next/router";
import { motion } from "framer-motion";
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const courses = ["SAT", "PSAT", "ACT", "IELTS", "TOEFL"];

const formVariants = {
  visible: { opacity: 1, y: 0 },
  hidden: { opacity: 0, y: -20 },
};

export default function Trial() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    course: courses[0],
    preferredTime: "",
  });

  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [serverError, setServerError] = useState("");

  const validate = () => {
    const errs = {};
    if (!formData.name.trim()) errs.name = "Name is required";
    if (!formData.email.trim()) errs.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(formData.email))
      errs.email = "Please enter a valid email";
    if (formData.phone && !/^\d{7,15}$/.test(formData.phone))
      errs.phone = "Enter a valid phone number (digits only)";
    if (!formData.course) errs.course = "Please select a course";
    // preferredTime optional, but can add checks if desired
    return errs;
  };

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});
    setServerError("");
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setSubmitting(true);
    try {
      const res = await fetch("/api/trial", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.message || "Submission failed");
      }

      setSuccess(true);
      setFormData({
        name: "",
        email: "",
        phone: "",
        course: courses[0],
        preferredTime: "",
      });

      // Optionally, redirect after a delay:
      // setTimeout(() => router.push("/thank-you"), 4000);

    } catch (err) {
      setServerError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  if (success) {
    return (
      <>
        <Navbar />
        <main className="min-h-[70vh] flex flex-col justify-center items-center px-6 py-20 bg-w2">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={formVariants}
            className="max-w-md w-full bg-w1 rounded-3xl p-10 shadow-xl border border-w2 text-center"
          >
            <h1 className="text-3xl font-bold text-g1 mb-6">
              Thank You for Booking!
            </h1>
            <p className="text-g2 mb-8">
              We have received your request for a free trial. Our team will get
              back to you shortly.
            </p>
            <button
              onClick={() => setSuccess(false)}
              className="bg-r1 text-w1 font-semibold py-3 px-8 rounded-full hover:bg-r2 transition-colors"
            >
              Book Another Trial
            </button>
          </motion.div>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />
      <main className="min-h-[70vh] flex flex-col justify-center items-center px-6 py-20 bg-w2">
        <motion.form
          initial="hidden"
          animate="visible"
          variants={formVariants}
          onSubmit={handleSubmit}
          className="max-w-md w-full bg-w1 rounded-3xl p-8 shadow-xl border border-w2"
          noValidate
        >
          <h1 className="text-3xl font-bold text-g1 mb-8 text-center">
            Book Your Free Trial
          </h1>

          {/* Name */}
          <div className="mb-5">
            <label
              htmlFor="name"
              className="block text-g1 mb-1 font-semibold"
            >
              Name <span className="text-r1">*</span>
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              disabled={submitting}
              placeholder="Your full name"
              className={`w-full px-4 py-3 rounded-lg border ${
                errors.name ? "border-r1" : "border-w2"
              } focus:outline-none focus:ring-2 focus:ring-r1 focus:border-r1`}
              aria-invalid={errors.name ? true : undefined}
              aria-describedby="name-error"
              required
            />
            {errors.name && (
              <p id="name-error" className="mt-1 text-xs text-r1">
                {errors.name}
              </p>
            )}
          </div>

          {/* Email */}
          <div className="mb-5">
            <label
              htmlFor="email"
              className="block text-g1 mb-1 font-semibold"
            >
              Email <span className="text-r1">*</span>
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              disabled={submitting}
              placeholder="you@example.com"
              className={`w-full px-4 py-3 rounded-lg border ${
                errors.email ? "border-r1" : "border-w2"
              } focus:outline-none focus:ring-2 focus:ring-r1 focus:border-r1`}
              aria-invalid={errors.email ? true : undefined}
              aria-describedby="email-error"
              required
            />
            {errors.email && (
              <p id="email-error" className="mt-1 text-xs text-r1">
                {errors.email}
              </p>
            )}
          </div>

          {/* Phone */}
          <div className="mb-5">
            <label
              htmlFor="phone"
              className="block text-g1 mb-1 font-semibold"
            >
              Phone (optional)
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              disabled={submitting}
              placeholder="Enter digits only"
              className={`w-full px-4 py-3 rounded-lg border ${
                errors.phone ? "border-r1" : "border-w2"
              } focus:outline-none focus:ring-2 focus:ring-r1 focus:border-r1`}
              aria-invalid={errors.phone ? true : undefined}
              aria-describedby="phone-error"
            />
            {errors.phone && (
              <p id="phone-error" className="mt-1 text-xs text-r1">
                {errors.phone}
              </p>
            )}
          </div>

          {/* Select Course */}
          <div className="mb-5">
            <label
              htmlFor="course"
              className="block text-g1 mb-1 font-semibold"
            >
              Select Course <span className="text-r1">*</span>
            </label>
            <select
              id="course"
              name="course"
              value={formData.course}
              onChange={handleChange}
              disabled={submitting}
              className="w-full px-4 py-3 rounded-lg border border-w2 bg-white text-g1 focus:outline-none focus:ring-2 focus:ring-r1 focus:border-r1"
              required
            >
              {courses.map((c, idx) => (
                <option key={idx} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>

          {/* Preferred Time Slot */}
          <div className="mb-6">
            <label
              htmlFor="preferredTime"
              className="block text-g1 mb-1 font-semibold"
            >
              Preferred Time Slot (optional)
            </label>
            <input
              type="text"
              id="preferredTime"
              name="preferredTime"
              value={formData.preferredTime}
              onChange={handleChange}
              disabled={submitting}
              placeholder="E.g., Weekday evenings, Sat mornings"
              className="w-full px-4 py-3 rounded-lg border border-w2 bg-white text-g1 focus:outline-none focus:ring-2 focus:ring-r1 focus:border-r1"
              aria-describedby="preferredTime-desc"
            />
            <p id="preferredTime-desc" className="text-xs text-g2 mt-1">
              Tell us your preferred timing so we can schedule accordingly.
            </p>
          </div>

          {/* Server error */}
          {serverError && (
            <p className="mb-4 text-center text-r1 font-semibold">{serverError}</p>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={submitting}
            className="w-full bg-r1 text-w1 font-semibold py-4 rounded-full shadow-lg hover:bg-r2 transition-colors disabled:opacity-60"
          >
            {submitting ? "Submitting..." : "Book Free Trial"}
          </button>
        </motion.form>
      </main>
      <Footer />
    </>
  );
}
