import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/router';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { registerUser } from '../lib/api';

const courses = ['SAT', 'PSAT', 'ACT', 'IELTS', 'TOEFL'];

const formVariants = {
  visible: { opacity: 1, y: 0 },
  hidden: { opacity: 0, y: -20 }
};

export default function Register() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    course: courses[0],
    password: ''
  });

  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [serverError, setServerError] = useState('');

  const validate = () => {
    const errs = {};
    if (!formData.name.trim()) errs.name = 'Name is required';
    if (!formData.email.trim()) errs.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) errs.email = 'Email is invalid';
    if (!formData.password.trim()) errs.password = 'Password is required';
    if (formData.phone && !/^\d{7,15}$/.test(formData.phone)) errs.phone = 'Enter a valid phone number';
    if (!formData.course) errs.course = 'Please select a course';
    return errs;
  };

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
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
      await registerUser({
        firebaseUid: null,
        email: formData.email,
        fullName: formData.name,
        phoneNumber: formData.phone,
        loginMethod: "EMAIL",
        emailVerified: false,
        password: formData.password
      });

      // redirect to verify page immediately
      router.push(`/verifyotp?email=${encodeURIComponent(formData.email)}`);
    } catch (err) {
      setServerError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

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
          <h1 className="text-3xl font-bold text-center mb-8">Register</h1>

          {/* Name */}
          <div>
            <label htmlFor="name" className="block text-g1 mb-1 font-semibold">Name <span className="text-r1">*</span></label>
            <input
              name="name"
              id="name"
              value={formData.name}
              onChange={handleChange}
              disabled={submitting}
              className={`w-full px-4 py-3 rounded-lg border ${errors.name ? 'border-r1' : 'border-w2'} focus:outline-none focus:ring-2 focus:ring-r1 focus:border-r1`}
              placeholder="Your full name"
              required
            />
            {errors.name && <p className="text-r1 text-xs mt-1">{errors.name}</p>}
          </div>

          {/* Email */}
          <div>
            <label htmlFor="email" className="block text-g1 mb-1 font-semibold">Email <span className="text-r1">*</span></label>
            <input
              name="email"
              id="email"
              value={formData.email}
              onChange={handleChange}
              disabled={submitting}
              className={`w-full px-4 py-3 rounded-lg border ${errors.email ? 'border-r1' : 'border-w2'} focus:outline-none focus:ring-2 focus:ring-r1 focus:border-r1`}
              placeholder="your.email@example.com"
              required
            />
            {errors.email && <p className="text-r1 text-xs mt-1">{errors.email}</p>}
          </div>

          {/* Phone */}
          <div>
            <label htmlFor="phone" className="block text-g1 mb-1 font-semibold">Phone</label>
            <input
              name="phone"
              id="phone"
              value={formData.phone}
              onChange={handleChange}
              disabled={submitting}
              className={`w-full px-4 py-3 rounded-lg border ${errors.phone ? 'border-r1' : 'border-w2'} focus:outline-none focus:ring-2 focus:ring-r1 focus:border-r1`}
              placeholder="Enter digits only, e.g., 9999999999"
            />
            {errors.phone && <p className="text-r1 text-xs mt-1">{errors.phone}</p>}
          </div>

          {/* Password */}
          <div>
            <label htmlFor="password" className="block text-g1 mb-1 font-semibold">Password <span className="text-r1">*</span></label>
            <input
              type="password"
              name="password"
              id="password"
              value={formData.password}
              onChange={handleChange}
              disabled={submitting}
              className={`w-full px-4 py-3 rounded-lg border ${errors.password ? 'border-r1' : 'border-w2'} focus:outline-none focus:ring-2 focus:ring-r1 focus:border-r1`}
              placeholder="Choose a password"
              required
            />
            {errors.password && <p className="text-r1 text-xs mt-1">{errors.password}</p>}
          </div>

          {/* Course */}
          <div>
            <label htmlFor="course" className="block text-g1 mb-1 font-semibold">Interested Course <span className="text-r1">*</span></label>
            <select
              name="course"
              id="course"
              value={formData.course}
              onChange={handleChange}
              disabled={submitting}
              className="w-full px-4 py-3 rounded-lg border border-w2 focus:outline-none focus:ring-2 focus:ring-r1 focus:border-r1 bg-white text-g1"
              required
            >
              {courses.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
            {errors.course && <p className="text-r1 text-xs mt-1">{errors.course}</p>}
          </div>

          {serverError && <p className="text-center text-r1 font-semibold">{serverError}</p>}

          <button
            type="submit"
            disabled={submitting}
            className="w-full bg-r1 text-w1 py-3 rounded-full font-semibold text-lg shadow-lg hover:bg-r2 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {submitting ? "Registering..." : "Register"}
          </button>
        </motion.form>
      </main>
      <Footer />
    </>
  );
}
