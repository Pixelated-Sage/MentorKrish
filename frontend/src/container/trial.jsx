import React, { useState } from "react";
import { motion } from "framer-motion";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { sendTrialBooking } from "../lib/api";
import { Calendar, Clock, CheckCircle2, User, Mail, Phone, BookOpen, Send, Award } from "lucide-react";

const courses = ["Digital SAT Prep", "PSAT / NMSQT Track", "ACT Complete Prep", "IELTS / TOEFL Proficiency", "Psychometric & Career Counseling"];
const timeSlots = ["10:00 AM - 11:30 AM", "02:00 PM - 03:30 PM", "05:00 PM - 06:30 PM", "07:30 PM - 09:00 PM"];

export default function Trial() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phoneNumber: "",
    course: courses[0],
    preferredDate: "",
    preferredTime: timeSlots[0],
    message: "",
  });

  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [serverError, setServerError] = useState("");

  const validate = () => {
    const errs = {};
    if (!formData.fullName.trim()) errs.fullName = "Full name is required";
    if (!formData.email.trim()) errs.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(formData.email)) errs.email = "Please enter a valid email";
    if (!formData.phoneNumber.trim()) errs.phoneNumber = "Phone number is required";
    if (!formData.preferredDate.trim()) errs.preferredDate = "Preferred date is required";
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
        course: formData.course,
        preferredDate: formData.preferredDate,
        preferredTime: formData.preferredTime,
        message: formData.message || "Requesting 1-on-1 free trial session.",
      });

      setSuccess(true);
    } catch (err) {
      setServerError(err.message || "Failed to submit trial booking.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col justify-between">
      <Navbar />

      <main className="pt-28 pb-20 px-4 md:px-8 max-w-7xl mx-auto w-full">
        {/* Page Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-md bg-slate-100 text-slate-800 text-xs font-bold uppercase tracking-wider mb-4 border border-slate-200">
            <Award size={14} className="text-red-700" /> Executive Mentoring Session
          </span>
          <h1 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight mb-4">
            Book Your <span className="text-red-700">Free Trial</span> Session
          </h1>
          <p className="text-slate-600 text-sm md:text-base leading-relaxed">
            Experience our structured Digital SAT strategy and diagnostic evaluation firsthand. Dedicated 1-on-1 coaching with senior faculty.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left Column: Why Book A Trial */}
          <div className="lg:col-span-5 space-y-6 bg-white p-8 rounded-2xl shadow-sm border border-slate-200">
            <h2 className="text-xl font-bold text-slate-900 border-b border-slate-100 pb-3">
              Session Highlights
            </h2>
            
            <div className="space-y-5">
              <div className="flex gap-4 items-start">
                <div className="p-2.5 bg-slate-100 text-red-700 rounded-lg shrink-0">
                  <CheckCircle2 size={20} />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 text-sm">Diagnostic Skill Mapping</h3>
                  <p className="text-slate-600 text-xs mt-1 leading-relaxed">Pinpoint exact baseline strengths and gap areas across SAT Reading, Writing, and Math.</p>
                </div>
              </div>

              <div className="flex gap-4 items-start">
                <div className="p-2.5 bg-slate-100 text-red-700 rounded-lg shrink-0">
                  <BookOpen size={20} />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 text-sm">High-Yield Strategy Walkthrough</h3>
                  <p className="text-slate-600 text-xs mt-1 leading-relaxed">Learn speed shortcuts for Desmos calculator and adaptive Module 2 questions.</p>
                </div>
              </div>

              <div className="flex gap-4 items-start">
                <div className="p-2.5 bg-slate-100 text-red-700 rounded-lg shrink-0">
                  <Calendar size={20} />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 text-sm">Target Score Timeline</h3>
                  <p className="text-slate-600 text-xs mt-1 leading-relaxed">Receive a customized week-by-week preparation roadmap targeting 1500+ scores.</p>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100 bg-slate-50 p-4 rounded-xl">
              <p className="text-xs font-bold uppercase text-red-700 tracking-wider">Faculty Guarantee</p>
              <p className="text-xs font-medium text-slate-700 mt-1">
                Sessions are conducted directly by <strong>Mentor Krish</strong> or senior test prep faculty.
              </p>
            </div>
          </div>

          {/* Right Column: Form Container */}
          <div className="lg:col-span-7 bg-white p-8 md:p-10 rounded-2xl shadow-sm border border-slate-200">
            {success ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-10 space-y-5"
              >
                <div className="w-16 h-16 bg-slate-100 text-red-700 rounded-full flex items-center justify-center mx-auto border border-slate-200">
                  <CheckCircle2 size={36} />
                </div>
                <h2 className="text-2xl font-bold text-slate-900">Trial Booking Confirmed</h2>
                <p className="text-slate-600 text-sm max-w-md mx-auto leading-relaxed">
                  Thank you. Your request has been logged and sent via Nodemailer. Our academic team will contact you shortly to confirm your scheduled time slot.
                </p>
                <button
                  onClick={() => setSuccess(false)}
                  className="bg-red-700 hover:bg-red-800 text-white font-bold text-xs uppercase tracking-wider px-6 py-3 rounded-lg shadow-sm transition"
                >
                  Book Another Session
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5" noValidate>
                <h2 className="text-xl font-bold text-slate-900 border-b border-slate-100 pb-3">
                  Trial Reservation Form
                </h2>

                {/* Name */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                    <User size={14} className="text-red-700" /> Full Name *
                  </label>
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    disabled={submitting}
                    placeholder="Student / Parent Full Name"
                    className={`w-full px-4 py-2.5 rounded-lg border ${
                      errors.fullName ? "border-red-600" : "border-slate-200"
                    } focus:outline-none focus:border-red-700 bg-slate-50 text-sm`}
                  />
                  {errors.fullName && <p className="text-xs text-red-600 mt-1">{errors.fullName}</p>}
                </div>

                {/* Email & Phone Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                      <Mail size={14} className="text-red-700" /> Email Address *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      disabled={submitting}
                      placeholder="email@example.com"
                      className={`w-full px-4 py-2.5 rounded-lg border ${
                        errors.email ? "border-red-600" : "border-slate-200"
                      } focus:outline-none focus:border-red-700 bg-slate-50 text-sm`}
                    />
                    {errors.email && <p className="text-xs text-red-600 mt-1">{errors.email}</p>}
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                      <Phone size={14} className="text-red-700" /> Contact Number *
                    </label>
                    <input
                      type="tel"
                      name="phoneNumber"
                      value={formData.phoneNumber}
                      onChange={handleChange}
                      disabled={submitting}
                      placeholder="+91 99833 22553"
                      className={`w-full px-4 py-2.5 rounded-lg border ${
                        errors.phoneNumber ? "border-red-600" : "border-slate-200"
                      } focus:outline-none focus:border-red-700 bg-slate-50 text-sm`}
                    />
                    {errors.phoneNumber && <p className="text-xs text-red-600 mt-1">{errors.phoneNumber}</p>}
                  </div>
                </div>

                {/* Course Selection */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                    <BookOpen size={14} className="text-red-700" /> Select Academic Program *
                  </label>
                  <select
                    name="course"
                    value={formData.course}
                    onChange={handleChange}
                    disabled={submitting}
                    className="w-full px-4 py-2.5 rounded-lg border border-slate-200 bg-slate-50 font-medium text-slate-800 focus:outline-none focus:border-red-700 text-sm"
                  >
                    {courses.map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Date & Time Slot Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                      <Calendar size={14} className="text-red-700" /> Preferred Date *
                    </label>
                    <input
                      type="date"
                      name="preferredDate"
                      value={formData.preferredDate}
                      onChange={handleChange}
                      disabled={submitting}
                      className={`w-full px-4 py-2.5 rounded-lg border ${
                        errors.preferredDate ? "border-red-600" : "border-slate-200"
                      } focus:outline-none focus:border-red-700 bg-slate-50 text-sm`}
                    />
                    {errors.preferredDate && <p className="text-xs text-red-600 mt-1">{errors.preferredDate}</p>}
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                      <Clock size={14} className="text-red-700" /> Preferred Time Slot *
                    </label>
                    <select
                      name="preferredTime"
                      value={formData.preferredTime}
                      onChange={handleChange}
                      disabled={submitting}
                      className="w-full px-4 py-2.5 rounded-lg border border-slate-200 bg-slate-50 font-medium text-slate-800 focus:outline-none focus:border-red-700 text-sm"
                    >
                      {timeSlots.map((slot) => (
                        <option key={slot} value={slot}>
                          {slot}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Additional Notes */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Target Score Goal / Additional Context
                  </label>
                  <textarea
                    name="message"
                    rows={3}
                    value={formData.message}
                    onChange={handleChange}
                    disabled={submitting}
                    placeholder="E.g., Target score is 1550+, seeking focused Math section speed drills..."
                    className="w-full px-4 py-2.5 rounded-lg border border-slate-200 focus:outline-none focus:border-red-700 bg-slate-50 text-sm"
                  />
                </div>

                {serverError && (
                  <p className="text-xs font-bold text-red-700 bg-red-50 p-3 rounded-lg border border-red-200 text-center">
                    {serverError}
                  </p>
                )}

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full bg-red-700 hover:bg-red-800 text-white font-bold text-xs uppercase tracking-wider py-3.5 rounded-lg shadow-sm transition flex items-center justify-center gap-2 disabled:opacity-60"
                >
                  <Send size={16} />
                  <span>{submitting ? "Submitting..." : "Confirm Free Trial Session"}</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
