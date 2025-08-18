import React, { useState } from "react";
import { motion } from "framer-motion";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { sendContactMessage } from "../lib/api"; // API function

const formVariants = {
  visible: { opacity: 1, y: 0 },
  hidden: { opacity: 0, y: -20 },
};

export default function Contact() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    message: "",
  });
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [serverError, setServerError] = useState("");

  const validate = () => {
    const errs = {};
    if (!formData.fullName.trim()) errs.fullName = "Name is required";
    if (!formData.email.trim()) errs.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(formData.email))
      errs.email = "Invalid email address";
    if (!formData.phone.trim()) errs.phone = "Phone is required";
    if (!formData.message.trim()) errs.message = "Message cannot be empty";
    return errs;
  };

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
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
      await sendContactMessage(formData);
      setSuccess(true);
      setFormData({ fullName: "", email: "", phone: "", message: "" });
    } catch (error) {
      setServerError(error.message);
    } finally {
      setSubmitting(false);
    }
  };

  if (success) {
    return (
      <>
        <Navbar />
        <main className="min-h-[70vh] flex flex-col justify-center items-center px-4 py-20 bg-w2">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={formVariants}
            className="w-full max-w-sm sm:max-w-md bg-white rounded-3xl p-8 shadow-lg border border-gray-200 text-center"
          >
            <h1 className="text-2xl sm:text-3xl font-bold text-g1 mb-5">
              Thank you for reaching out!
            </h1>
            <p className="text-g2 mb-8 text-base sm:text-lg">
              We have received your message and will get back to you shortly.
            </p>
            <button
              onClick={() => setSuccess(false)}
              className="bg-r1 text-w1 font-semibold py-2 px-8 rounded-full hover:bg-r2 transition-colors shadow-md text-base"
            >
              Send Another Message
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
      <main className="min-h-[70vh] flex flex-col justify-center items-center px-4 py-20 bg-w2">
        <motion.form
          initial="hidden"
          animate="visible"
          variants={formVariants}
          onSubmit={handleSubmit}
          className="w-full max-w-sm sm:max-w-md bg-white rounded-3xl p-6 sm:p-8 shadow-lg border border-gray-200"
          noValidate
        >
          <h1 className="text-2xl sm:text-3xl font-bold text-center mb-1 text-g1">Contact Us</h1>
          <p className="text-g2 text-center mb-5 text-sm sm:text-base">
            We'd love to hear from you. Fill out the form and we'll reply as soon as possible.
          </p>
          {/* Name */}
          <div className="relative mb-4">
            <input
              type="text"
              id="fullName"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              disabled={submitting}
              placeholder="Your full name"
              className={`peer w-full bg-white/40 border ${errors.fullName ? "border-r1" : "border-gray-200"} rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-r1 focus:border-r1 placeholder-transparent transition`}
              required
              autoComplete="name"
            />
            <label
              htmlFor="fullName"
              className="absolute left-4 top-3 text-g2 text-base font-semibold transition-all duration-200 pointer-events-none
                peer-placeholder-shown:top-4 peer-placeholder-shown:text-base
                peer-focus:-top-3 peer-focus:text-xs peer-focus:text-r1 bg-white/95 px-1 rounded"
            >
              Name <span className="text-r1">*</span>
            </label>
            {errors.fullName && (
              <p className="mt-1 text-xs text-r1">{errors.fullName}</p>
            )}
          </div>
          {/* Email */}
          <div className="relative mb-4">
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              disabled={submitting}
              placeholder="you@example.com"
              className={`peer w-full bg-white/40 border ${errors.email ? "border-r1" : "border-gray-200"} rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-r1 focus:border-r1 placeholder-transparent transition`}
              required
              autoComplete="email"
            />
            <label
              htmlFor="email"
              className="absolute left-4 top-3 text-g2 text-base font-semibold transition-all duration-200 pointer-events-none
                peer-placeholder-shown:top-4 peer-placeholder-shown:text-base
                peer-focus:-top-3 peer-focus:text-xs peer-focus:text-r1 bg-white/95 px-1 rounded"
            >
              Email <span className="text-r1">*</span>
            </label>
            {errors.email && (
              <p className="mt-1 text-xs text-r1">{errors.email}</p>
            )}
          </div>
          {/* Phone */}
          <div className="relative mb-4">
            <input
              type="text"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              disabled={submitting}
              placeholder="9999999999"
              className={`peer w-full bg-white/40 border ${errors.phone ? "border-r1" : "border-gray-200"} rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-r1 focus:border-r1 placeholder-transparent transition`}
              required
              autoComplete="tel"
            />
            <label
              htmlFor="phone"
              className="absolute left-4 top-3 text-g2 text-base font-semibold transition-all duration-200 pointer-events-none
                peer-placeholder-shown:top-4 peer-placeholder-shown:text-base
                peer-focus:-top-3 peer-focus:text-xs peer-focus:text-r1 bg-white/95 px-1 rounded"
            >
              Phone <span className="text-r1">*</span>
            </label>
            {errors.phone && (
              <p className="mt-1 text-xs text-r1">{errors.phone}</p>
            )}
          </div>
          {/* Message */}
          <div className="relative mb-6">
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              disabled={submitting}
              placeholder="Write your message here..."
              className={`peer w-full bg-white/40 border min-h-[90px] ${errors.message ? "border-r1" : "border-gray-200"} rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-r1 focus:border-r1 placeholder-transparent transition resize-none`}
              required
            />
            <label
              htmlFor="message"
              className="absolute left-4 top-3 text-g2 text-base font-semibold transition-all duration-200 pointer-events-none
                peer-placeholder-shown:top-4 peer-placeholder-shown:text-base
                peer-focus:-top-3 peer-focus:text-xs peer-focus:text-r1 bg-white/95 px-1 rounded"
            >
              Message <span className="text-r1">*</span>
            </label>
            {errors.message && (
              <p className="mt-1 text-xs text-r1">{errors.message}</p>
            )}
          </div>

          {serverError && (
            <p className="mb-4 text-center text-r1 font-semibold">{serverError}</p>
          )}

          <button
            type="submit"
            disabled={submitting}
            className="w-full bg-r1 text-white py-3 rounded-full font-bold text-lg shadow-lg hover:bg-r2 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {submitting ? "Sending..." : "Send Message"}
          </button>
        </motion.form>
        <div className="h-7" />
      </main>
      <Footer />
    </>
  );
}
