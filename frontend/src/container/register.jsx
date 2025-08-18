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
      <main className="bg-gradient-to-br from-w2/60 to-white min-h-[77vh] flex flex-col justify-center pb-12 pt-12 sm:pt-24">
        <div className="flex flex-col items-center">
          {/* Leave nice space for navbar */}
          <motion.form
            initial="hidden"
            animate="visible"
            variants={formVariants}
            onSubmit={handleSubmit}
            className="w-full max-w-sm sm:max-w-md lg:max-w-lg bg-white/90 rounded-3xl p-6 sm:p-8 shadow-lg border border-gray-200 space-y-5"
            style={{
              marginTop: "2rem",
              boxShadow: "0 6px 36px 0 rgba(0,0,0,.08), 0 1.5px 2.5px -1px rgba(0,0,0,0.04)"
            }}
            noValidate
          >
            <h1 className="text-2xl sm:text-3xl font-bold text-center mb-2 text-g1 tracking-tight">
              Create your free account
            </h1>
            <p className="text-center text-g2 mb-5 text-sm sm:text-base">Get started with MentorKrish in seconds.</p>
            {/* Name */}
            <div className="relative">
              <input
                name="name"
                id="name"
                value={formData.name}
                onChange={handleChange}
                disabled={submitting}
                className={`peer w-full bg-white/40 border ${errors.name ? 'border-r1' : 'border-gray-200'} rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-r1 focus:border-r1 placeholder-transparent transition`}
                placeholder="Your full name"
                required
                autoComplete="name"
              />
              <label
                htmlFor="name"
                className="absolute left-4 top-3 text-g2 text-base font-semibold transition-all duration-200 pointer-events-none
                  peer-placeholder-shown:top-4 peer-placeholder-shown:text-base
                  peer-focus:-top-3 peer-focus:text-xs peer-focus:text-r1 bg-white/90 px-1 rounded"
              >
                Name <span className="text-r1">*</span>
              </label>
              {errors.name && <p className="text-r1 text-xs mt-1">{errors.name}</p>}
            </div>
            {/* Email */}
            <div className="relative">
              <input
                name="email"
                id="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                disabled={submitting}
                className={`peer w-full bg-white/40 border ${errors.email ? 'border-r1' : 'border-gray-200'} rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-r1 focus:border-r1 placeholder-transparent transition`}
                placeholder="your.email@example.com"
                required
                autoComplete="email"
              />
              <label
                htmlFor="email"
                className="absolute left-4 top-3 text-g2 text-base font-semibold transition-all duration-200 pointer-events-none
                  peer-placeholder-shown:top-4 peer-placeholder-shown:text-base
                  peer-focus:-top-3 peer-focus:text-xs peer-focus:text-r1 bg-white/90 px-1 rounded"
              >
                Email <span className="text-r1">*</span>
              </label>
              {errors.email && <p className="text-r1 text-xs mt-1">{errors.email}</p>}
            </div>
            {/* Phone */}
            <div className="relative">
              <input
                name="phone"
                id="phone"
                value={formData.phone}
                onChange={handleChange}
                disabled={submitting}
                className={`peer w-full bg-white/40 border ${errors.phone ? 'border-r1' : 'border-gray-200'} rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-r1 focus:border-r1 placeholder-transparent transition`}
                placeholder="9999999999"
                autoComplete="tel"
              />
              <label
                htmlFor="phone"
                className="absolute left-4 top-3 text-g2 text-base font-semibold transition-all duration-200 pointer-events-none
                  peer-placeholder-shown:top-4 peer-placeholder-shown:text-base
                  peer-focus:-top-3 peer-focus:text-xs peer-focus:text-r1 bg-white/90 px-1 rounded"
              >
                Phone
              </label>
              {errors.phone && <p className="text-r1 text-xs mt-1">{errors.phone}</p>}
            </div>
            {/* Password */}
            <div className="relative">
              <input
                type="password"
                name="password"
                id="password"
                value={formData.password}
                onChange={handleChange}
                disabled={submitting}
                className={`peer w-full bg-white/40 border ${errors.password ? 'border-r1' : 'border-gray-200'} rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-r1 focus:border-r1 placeholder-transparent transition`}
                placeholder="Choose a password"
                required
                autoComplete="new-password"
              />
              <label
                htmlFor="password"
                className="absolute left-4 top-3 text-g2 text-base font-semibold transition-all duration-200 pointer-events-none
                  peer-placeholder-shown:top-4 peer-placeholder-shown:text-base
                  peer-focus:-top-3 peer-focus:text-xs peer-focus:text-r1 bg-white/90 px-1 rounded"
              >
                Password <span className="text-r1">*</span>
              </label>
              {errors.password && <p className="text-r1 text-xs mt-1">{errors.password}</p>}
            </div>
            {/* Course */}
            <div>
              <label htmlFor="course" className="block text-g1 mb-1 font-semibold">
                Interested Course <span className="text-r1">*</span>
              </label>
              <select
                name="course"
                id="course"
                value={formData.course}
                onChange={handleChange}
                disabled={submitting}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-r1 focus:border-r1 bg-white text-g1 font-semibold"
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
              className="w-full bg-r1 hover:bg-r2  text-white py-3 rounded-full font-bold text-lg shadow-xl  transition-all disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {submitting ? "Registering..." : "Register"}
            </button>
          </motion.form>
          <div className="h-10"></div>
        </div>
      </main>
      <Footer />
    </>
  );
}
