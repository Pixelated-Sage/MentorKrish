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
        <main className="min-h-[70vh] flex flex-col justify-center items-center px-6 py-20 bg-w2">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={formVariants}
            className="max-w-md w-full bg-w1 rounded-3xl p-10 shadow-xl border border-w2 text-center"
          >
            <h1 className="text-3xl font-bold text-g1 mb-6">
              Thank you for reaching out!
            </h1>
            <p className="text-g2 mb-8">
              We have received your message and will get back to you shortly.
            </p>
            <button
              onClick={() => setSuccess(false)}
              className="bg-r1 text-w1 font-semibold py-3 px-8 rounded-full hover:bg-r2 transition-colors shadow-md"
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
            Contact Us
          </h1>

          {/* Name */}
          <div className="mb-5">
            <label htmlFor="fullName" className="block text-g1 mb-1 font-semibold">
              Name <span className="text-r1">*</span>
            </label>
            <input
              type="text"
              id="fullName"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              disabled={submitting}
              placeholder="Your full name"
              className={`w-full px-4 py-3 rounded-lg border ${
                errors.fullName ? "border-r1" : "border-w2"
              } focus:outline-none focus:ring-2 focus:ring-r1 focus:border-r1`}
              required
            />
            {errors.fullName && (
              <p className="mt-1 text-xs text-r1">{errors.fullName}</p>
            )}
          </div>

          {/* Email */}
          <div className="mb-5">
            <label htmlFor="email" className="block text-g1 mb-1 font-semibold">
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
              required
            />
            {errors.email && (
              <p className="mt-1 text-xs text-r1">{errors.email}</p>
            )}
          </div>

          {/* Phone */}
          <div className="mb-5">
            <label htmlFor="phone" className="block text-g1 mb-1 font-semibold">
              Phone <span className="text-r1">*</span>
            </label>
            <input
              type="text"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              disabled={submitting}
              placeholder="+91-9876543210"
              className={`w-full px-4 py-3 rounded-lg border ${
                errors.phone ? "border-r1" : "border-w2"
              } focus:outline-none focus:ring-2 focus:ring-r1 focus:border-r1`}
              required
            />
            {errors.phone && (
              <p className="mt-1 text-xs text-r1">{errors.phone}</p>
            )}
          </div>

          {/* Message */}
          <div className="mb-6">
            <label htmlFor="message" className="block text-g1 mb-1 font-semibold">
              Message <span className="text-r1">*</span>
            </label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              disabled={submitting}
              placeholder="Write your message here..."
              className={`w-full px-4 py-3 rounded-lg border min-h-[100px] ${
                errors.message ? "border-r1" : "border-w2"
              } focus:outline-none focus:ring-2 focus:ring-r1 focus:border-r1`}
              required
            />
            {errors.message && (
              <p className="mt-1 text-xs text-r1">{errors.message}</p>
            )}
          </div>

          {serverError && (
            <p className="mb-4 text-center text-r1 font-semibold">{serverError}</p>
          )}

          {/* Submit */}
          <button
            type="submit"
            disabled={submitting}
            className="w-full bg-r1 text-w1 py-3 rounded-full font-semibold text-lg shadow-lg hover:bg-r2 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {submitting ? "Sending..." : "Send Message"}
          </button>
        </motion.form>
      </main>
      <Footer />
    </>
  );
}
