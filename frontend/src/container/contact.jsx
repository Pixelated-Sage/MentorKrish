import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { sendContactMessage } from "../lib/api";
import Head from "next/head";
import { Mail, Phone, MapPin, Send, MessageSquare, CheckCircle2 } from "lucide-react";

export default function Contact() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    subject: "",
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
    else if (!/\S+@\S+\.\S+/.test(formData.email)) errs.email = "Invalid email address";
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
      setFormData({ fullName: "", email: "", subject: "", message: "" });
    } catch (error) {
      setServerError(error.message || "Failed to send message.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <Head>
        <title>Contact Mentor Krish | Get in Touch</title>
        <meta
          name="description"
          content="Have questions about Digital SAT, PSAT, or career counseling? Contact Mentor Krish for 1-on-1 guidance."
        />
        <link rel="canonical" href="https://mentorkrish.in/contact" />
      </Head>

      <Navbar />

      <main className="min-h-screen bg-slate-50 pt-28 pb-20">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          {/* Header Banner */}
          <div className="text-center max-w-3xl mx-auto mb-14">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-red-100 text-red-600 text-xs font-bold uppercase tracking-wider mb-4">
              <MessageSquare size={14} /> Direct Assistance
            </span>
            <h1 className="text-4xl md:text-5xl font-black text-gray-900 tracking-tight mb-4">
              Get in Touch with <span className="text-red-600">Mentor Krish</span>
            </h1>
            <p className="text-gray-600 text-base md:text-lg">
              We are here to answer your questions regarding standardized test preparation, score guarantees, and university selection.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            {/* Contact Cards */}
            <div className="lg:col-span-5 space-y-6">
              <div className="bg-white p-8 rounded-3xl shadow-xl border border-gray-100 space-y-6">
                <h2 className="text-2xl font-black text-gray-900">Contact Information</h2>

                <div className="flex items-start gap-4 p-4 rounded-2xl bg-gray-50 border border-gray-100">
                  <div className="p-3 bg-red-600 text-white rounded-xl">
                    <Phone size={20} />
                  </div>
                  <div>
                    <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider">Call or WhatsApp</h3>
                    <a href="tel:+919983322553" className="text-lg font-bold text-gray-900 hover:text-red-600 transition">
                      +91-9983322553
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 rounded-2xl bg-gray-50 border border-gray-100">
                  <div className="p-3 bg-red-600 text-white rounded-xl">
                    <Mail size={20} />
                  </div>
                  <div>
                    <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider">Email Inquiry</h3>
                    <a href="mailto:neelam@mentor-krish.com" className="text-base font-bold text-gray-900 hover:text-red-600 transition">
                      neelam@mentor-krish.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 rounded-2xl bg-gray-50 border border-gray-100">
                  <div className="p-3 bg-red-600 text-white rounded-xl">
                    <MapPin size={20} />
                  </div>
                  <div>
                    <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider">Mentoring Modes</h3>
                    <p className="text-sm font-medium text-gray-800 mt-0.5">
                      Online Live Interactive & In-Person Sessions
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-7 bg-white p-8 md:p-10 rounded-3xl shadow-xl border border-gray-100">
              {success ? (
                <div className="text-center py-12 space-y-6">
                  <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto">
                    <CheckCircle2 size={36} />
                  </div>
                  <h2 className="text-3xl font-black text-gray-900">Message Delivered!</h2>
                  <p className="text-gray-600 max-w-md mx-auto">
                    Thank you for contacting us. Your message has been sent via Nodemailer. We will respond within 24 hours.
                  </p>
                  <button
                    onClick={() => setSuccess(false)}
                    className="bg-red-600 text-white font-bold px-8 py-3.5 rounded-full hover:bg-red-700 shadow-lg transition"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6" noValidate>
                  <h2 className="text-2xl font-black text-gray-900 border-b pb-4">Send Us a Message</h2>

                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleChange}
                      disabled={submitting}
                      placeholder="Jane Doe"
                      className={`w-full px-4 py-3 rounded-xl border ${
                        errors.fullName ? "border-red-500" : "border-gray-200"
                      } focus:outline-none focus:ring-2 focus:ring-red-500 bg-gray-50`}
                    />
                    {errors.fullName && <p className="text-xs text-red-500 mt-1">{errors.fullName}</p>}
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      disabled={submitting}
                      placeholder="jane@example.com"
                      className={`w-full px-4 py-3 rounded-xl border ${
                        errors.email ? "border-red-500" : "border-gray-200"
                      } focus:outline-none focus:ring-2 focus:ring-red-500 bg-gray-50`}
                    />
                    {errors.email && <p className="text-xs text-red-500 mt-1">{errors.email}</p>}
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
                      Subject
                    </label>
                    <input
                      type="text"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      disabled={submitting}
                      placeholder="SAT Prep Inquiry / Psychometric Session"
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-red-500 bg-gray-50"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
                      Your Message *
                    </label>
                    <textarea
                      name="message"
                      rows={4}
                      value={formData.message}
                      onChange={handleChange}
                      disabled={submitting}
                      placeholder="How can we assist you?"
                      className={`w-full px-4 py-3 rounded-xl border ${
                        errors.message ? "border-red-500" : "border-gray-200"
                      } focus:outline-none focus:ring-2 focus:ring-red-500 bg-gray-50`}
                    />
                    {errors.message && <p className="text-xs text-red-500 mt-1">{errors.message}</p>}
                  </div>

                  {serverError && (
                    <p className="text-sm font-bold text-red-600 bg-red-50 p-3 rounded-xl text-center">
                      {serverError}
                    </p>
                  )}

                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full bg-gradient-to-r from-red-600 to-amber-500 text-white font-bold py-4 rounded-xl shadow-lg hover:shadow-red-500/20 transition flex items-center justify-center gap-2 text-base"
                  >
                    <Send size={18} />
                    <span>{submitting ? "Sending via Nodemailer..." : "Send Message"}</span>
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
