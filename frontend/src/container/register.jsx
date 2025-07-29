import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/router';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const courses = ['SAT', 'PSAT', 'ACT', 'IELTS', 'TOEFL'];

const formVariants = {
  visible: { opacity: 1, y: 0 },
  hidden: { opacity: 0, y: -20 }
};

export default function Register() {
  const router = useRouter();

  // Form state
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    course: courses[0]
  });

  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [serverError, setServerError] = useState('');

  // Handle form changes
  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  // Simple client validation
  const validate = () => {
    const errs = {};
    if (!formData.name.trim()) errs.name = 'Name is required';
    if (!formData.email.trim()) errs.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) errs.email = 'Email is invalid';
    // phone optional but if entered, check digits only
    if (formData.phone && !/^\d{7,15}$/.test(formData.phone))
      errs.phone = 'Enter a valid phone number';
    if (!formData.course) errs.course = 'Please select a course';
    return errs;
  };

  // Submit handler
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
      // Replace with actual API endpoint
      const res = await fetch('/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.message || 'Failed to register');
      }

      setSuccess(true);
      
      // Optionally redirect after delay:
      // setTimeout(() => router.push('/login'), 4000);
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
        <main className="min-h-[70vh] flex flex-col justify-center items-center px-6 py-20 bg-w2 text-center">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={formVariants}
            className="max-w-md bg-w1 rounded-3xl p-10 shadow-xl border border-w2"
          >
            <h1 className="text-3xl font-bold text-g1 mb-6">Thank you for registering!</h1>
            <p className="text-g2 mb-8">
              We have received your details. Our team will contact you soon to guide you further.
            </p>
            <button
              onClick={() => router.push('/login')}
              className="bg-r1 text-w1 font-semibold py-3 px-8 rounded-full hover:bg-r2 transition-all"
            >
              Go to Login
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
          <h1 className="text-3xl font-bold text-g1 mb-8 text-center">Register for Free Trial</h1>

          {/* Name */}
          <div className="mb-5">
            <label htmlFor="name" className="block text-g1 mb-1 font-semibold">
              Name <span className="text-r1">*</span>
            </label>
            <input
              type="text"
              name="name"
              id="name"
              value={formData.name}
              onChange={handleChange}
              disabled={submitting}
              className={`w-full px-4 py-3 rounded-lg border ${
                errors.name ? 'border-r1' : 'border-w2'
              } focus:outline-none focus:ring-2 focus:ring-r1 focus:border-r1`}
              placeholder="Your full name"
              aria-invalid={errors.name ? true : false}
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
            <label htmlFor="email" className="block text-g1 mb-1 font-semibold">
              Email <span className="text-r1">*</span>
            </label>
            <input
              type="email"
              name="email"
              id="email"
              value={formData.email}
              onChange={handleChange}
              disabled={submitting}
              className={`w-full px-4 py-3 rounded-lg border ${
                errors.email ? 'border-r1' : 'border-w2'
              } focus:outline-none focus:ring-2 focus:ring-r1 focus:border-r1`}
              placeholder="your.email@example.com"
              aria-invalid={errors.email ? true : false}
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
            <label htmlFor="phone" className="block text-g1 mb-1 font-semibold">
              Phone Number (optional)
            </label>
            <input
              type="tel"
              name="phone"
              id="phone"
              value={formData.phone}
              onChange={handleChange}
              disabled={submitting}
              className={`w-full px-4 py-3 rounded-lg border ${
                errors.phone ? 'border-r1' : 'border-w2'
              } focus:outline-none focus:ring-2 focus:ring-r1 focus:border-r1`}
              placeholder="Enter digits only, e.g., 9999999999"
              aria-invalid={errors.phone ? true : false}
              aria-describedby="phone-error"
            />
            {errors.phone && (
              <p id="phone-error" className="mt-1 text-xs text-r1">
                {errors.phone}
              </p>
            )}
          </div>

          {/* Interested Course */}
          <div className="mb-6">
            <label htmlFor="course" className="block text-g1 mb-1 font-semibold">
              Interested Course <span className="text-r1">*</span>
            </label>
            <select
              id="course"
              name="course"
              value={formData.course}
              onChange={handleChange}
              disabled={submitting}
              className="w-full px-4 py-3 rounded-lg border border-w2 focus:outline-none focus:ring-2 focus:ring-r1 focus:border-r1 bg-white text-g1"
              required
            >
              {courses.map((course) => (
                <option key={course} value={course}>
                  {course}
                </option>
              ))}
            </select>
          </div>

          {/* Server error */}
          {serverError && (
            <p className="mb-3 text-center text-r1 font-semibold">{serverError}</p>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={submitting}
            className="w-full bg-r1 text-w1 py-3 rounded-full font-semibold text-lg shadow-lg hover:bg-r2 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {submitting ? 'Submitting...' : 'Register'}
          </button>
        </motion.form>
      </main>
      <Footer />
    </>
  );
}
