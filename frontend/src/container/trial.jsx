import React, { useState } from "react";
import { motion } from "framer-motion";
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { sendTrialBooking } from "../lib/api"; // API function

const courses = ["SAT", "PSAT", "ACT", "IELTS", "TOEFL"];

const formVariants = {
  visible: { opacity: 1, y: 0 },
  hidden: { opacity: 0, y: -20 },
};

export default function Trial() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phoneNumber: "",
    course: courses[0],
    preferredDate: "",
    preferredTime: "",
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
      errs.email = "Please enter a valid email";
    if (!formData.phoneNumber.trim())
      errs.phoneNumber = "Phone number is required";
    else if (!/^\d{7,15}$/.test(formData.phoneNumber))
      errs.phoneNumber = "Enter a valid phone number (digits only)";
    if (!formData.preferredDate.trim())
      errs.preferredDate = "Preferred date is required";
    if (!formData.preferredTime.trim())
      errs.preferredTime = "Preferred time is required";
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
      await sendTrialBooking({
        fullName: formData.fullName,
        email: formData.email,
        phoneNumber: formData.phoneNumber,
        preferredDate: formData.preferredDate,
        preferredTime: formData.preferredTime,
        message: `Interested in ${formData.course} course. ${formData.message || ""}`,
      });

      setSuccess(true);
      setFormData({
        fullName: "",
        email: "",
        phoneNumber: "",
        course: courses[0],
        preferredDate: "",
        preferredTime: "",
        message: "",
      });
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
          className="max-w-md w-full bg-w1 rounded-3xl p-8 shadow-xl border border-w2 space-y-5"
          noValidate
        >
          <h1 className="text-3xl font-bold text-g1 mb-8 text-center">
            Book Your Free Trial
          </h1>

          {/* Name */}
          <div>
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
              className={`w-full px-4 py-3 rounded-lg border ${
                errors.fullName ? "border-r1" : "border-w2"
              }`}
              required
            />
            {errors.fullName && <p className="text-xs text-r1">{errors.fullName}</p>}
          </div>

          {/* Email */}
          <div>
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
              className={`w-full px-4 py-3 rounded-lg border ${
                errors.email ? "border-r1" : "border-w2"
              }`}
              required
            />
            {errors.email && <p className="text-xs text-r1">{errors.email}</p>}
          </div>

          {/* Phone */}
          <div>
            <label htmlFor="phoneNumber" className="block text-g1 mb-1 font-semibold">
              Phone <span className="text-r1">*</span>
            </label>
            <input
              type="tel"
              id="phoneNumber"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
              disabled={submitting}
              className={`w-full px-4 py-3 rounded-lg border ${
                errors.phoneNumber ? "border-r1" : "border-w2"
              }`}
              required
            />
            {errors.phoneNumber && <p className="text-xs text-r1">{errors.phoneNumber}</p>}
          </div>

          {/* Select Course */}
          <div>
            <label htmlFor="course" className="block text-g1 mb-1 font-semibold">
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

          {/* Preferred Date */}
          <div>
            <label htmlFor="preferredDate" className="block text-g1 mb-1 font-semibold">
              Preferred Date <span className="text-r1">*</span>
            </label>
            <input
              type="date"
              id="preferredDate"
              name="preferredDate"
              value={formData.preferredDate}
              onChange={handleChange}
              disabled={submitting}
              className={`w-full px-4 py-3 rounded-lg border ${
                errors.preferredDate ? "border-r1" : "border-w2"
              }`}
              required
            />
            {errors.preferredDate && <p className="text-xs text-r1">{errors.preferredDate}</p>}
          </div>

          {/* Preferred Time */}
          <div>
            <label htmlFor="preferredTime" className="block text-g1 mb-1 font-semibold">
              Preferred Time <span className="text-r1">*</span>
            </label>
            <input
              type="text"
              id="preferredTime"
              name="preferredTime"
              value={formData.preferredTime}
              onChange={handleChange}
              disabled={submitting}
              className={`w-full px-4 py-3 rounded-lg border ${
                errors.preferredTime ? "border-r1" : "border-w2"
              }`}
              required
            />
            {errors.preferredTime && <p className="text-xs text-r1">{errors.preferredTime}</p>}
          </div>

          {/* Optional Message */}
          <div>
            <label htmlFor="message" className="block text-g1 mb-1 font-semibold">
              Message (optional)
            </label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              disabled={submitting}
              rows={3}
              className="w-full px-4 py-3 rounded-lg border border-w2"
            ></textarea>
          </div>

          {serverError && <p className="text-center text-r1 font-semibold">{serverError}</p>}

          {/* Submit */}
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
