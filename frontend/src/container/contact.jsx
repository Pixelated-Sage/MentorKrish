import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const formVariants = {
  visible: { opacity: 1, y: 0 },
  hidden: { opacity: 0, y: -20 }
};

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [serverError, setServerError] = useState('');

  const validate = () => {
    const errs = {};
    if (!formData.name.trim()) errs.name = 'Name is required';
    if (!formData.email.trim()) errs.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) errs.email = 'Invalid email address';
    if (!formData.message.trim()) errs.message = 'Message cannot be empty';
    return errs;
  };

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});
    setServerError('');
    const validationErrors = validate();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setSubmitting(true);

    try {
      // Replace with your actual backend API endpoint
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || 'Failed to send message');
      }

      setSuccess(true);
      setFormData({ name: '', email: '', message: '' });
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
            <h1 className="text-3xl font-bold text-g1 mb-6">Thank you for reaching out!</h1>
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
          <h1 className="text-3xl font-bold text-g1 mb-8 text-center">Contact Us</h1>

          {/* Name */}
          <div className="mb-5">
            <label htmlFor="name" className="block text-g1 mb-1 font-semibold">
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
              aria-invalid={errors.name ? true : false}
              aria-describedby="name-error"
              className={`w-full px-4 py-3 rounded-lg border ${
                errors.name ? 'border-r1' : 'border-w2'
              } focus:outline-none focus:ring-2 focus:ring-r1 focus:border-r1`}
              required
            />
            {errors.name && (
              <p id="name-error" className="mt-1 text-xs text-r1">{errors.name}</p>
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
              aria-invalid={errors.email ? true : false}
              aria-describedby="email-error"
              className={`w-full px-4 py-3 rounded-lg border ${
                errors.email ? 'border-r1' : 'border-w2'
              } focus:outline-none focus:ring-2 focus:ring-r1 focus:border-r1`}
              required
            />
            {errors.email && (
              <p id="email-error" className="mt-1 text-xs text-r1">{errors.email}</p>
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
              aria-invalid={errors.message ? true : false}
              aria-describedby="message-error"
              className={`w-full px-4 py-3 rounded-lg border resize-y min-h-[100px] ${
                errors.message ? 'border-r1' : 'border-w2'
              } focus:outline-none focus:ring-2 focus:ring-r1 focus:border-r1`}
              required
            />
            {errors.message && (
              <p id="message-error" className="mt-1 text-xs text-r1">{errors.message}</p>
            )}
          </div>

          {/* Server error */}
          {serverError && (
            <p className="mb-4 text-center text-r1 font-semibold">{serverError}</p>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={submitting}
            className="w-full bg-r1 text-w1 py-3 rounded-full font-semibold text-lg shadow-lg hover:bg-r2 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {submitting ? 'Sending...' : 'Send Message'}
          </button>
        </motion.form>
      </main>
      <Footer />
    </>
  );
}
