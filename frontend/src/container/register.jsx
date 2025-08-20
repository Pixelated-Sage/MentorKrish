import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useRouter } from "next/router";
import { registerUser } from "../lib/api";

const courses = ['SAT', 'PSAT', 'ACT', 'IELTS', 'TOEFL'];

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
    else if (!/\S+@\S+\.\S+/.test(formData.email)) errs.email = 'Invalid email address';
    if (!formData.password.trim()) errs.password = 'Password is required';
    if (formData.phone && !/^\d{7,15}$/.test(formData.phone)) errs.phone = 'Enter a valid phone number';
    if (!formData.course) errs.course = 'Please select a course';
    return errs;
  };

  const handleChange = e => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async e => {
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
        password: formData.password,
        course: formData.course,
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
      <main className="min-h-screen flex flex-col justify-center items-center bg-w2 pt-20 px-4 sm:px-6">
        <form
          onSubmit={handleSubmit}
          className="max-w-xl w-full space-y-6"
          noValidate
        >
          <h1 className="text-3xl font-bold text-center text-g1 mb-6 tracking-tight">Register</h1>

          {/* Name */}
          <div>
            <label htmlFor="name" className="block mb-1 font-semibold text-g1">Name <span className="text-r1">*</span></label>
            <input
              id="name"
              name="name"
              type="text"
              value={formData.name}
              onChange={handleChange}
              disabled={submitting}
              placeholder="Your full name"
              className={`w-full bg-transparent border-b border-w2 py-2 text-g3 placeholder-g2 focus:outline-none focus:border-r1 transition ${errors.name ? 'border-r1' : ''}`}
              required
            />
            {errors.name && <p className="mt-1 text-xs text-r1">{errors.name}</p>}
          </div>

          {/* Email */}
          <div>
            <label htmlFor="email" className="block mb-1 font-semibold text-g1">Email <span className="text-r1">*</span></label>
            <input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              disabled={submitting}
              placeholder="you@example.com"
              className={`w-full bg-transparent border-b border-w2 py-2 text-g3 placeholder-g2 focus:outline-none focus:border-r1 transition ${errors.email ? 'border-r1' : ''}`}
              required
            />
            {errors.email && <p className="mt-1 text-xs text-r1">{errors.email}</p>}
          </div>

          {/* Phone */}
          <div>
            <label htmlFor="phone" className="block mb-1 font-semibold text-g1">Phone</label>
            <input
              id="phone"
              name="phone"
              type="tel"
              value={formData.phone}
              onChange={handleChange}
              disabled={submitting}
              placeholder="Digits only, e.g., 9999999999"
              className={`w-full bg-transparent border-b border-w2 py-2 text-g3 placeholder-g2 focus:outline-none focus:border-r1 transition ${errors.phone ? 'border-r1' : ''}`}
            />
            {errors.phone && <p className="mt-1 text-xs text-r1">{errors.phone}</p>}
          </div>

          {/* Course */}
          <div>
            <label htmlFor="course" className="block mb-1 font-semibold text-g1">Interested Course <span className="text-r1">*</span></label>
            <select
              id="course"
              name="course"
              value={formData.course}
              onChange={handleChange}
              disabled={submitting}
              className="w-full bg-white border-b border-w2 py-2 text-g1 focus:outline-none focus:border-r1 transition"
              required
            >
              {courses.map(course => (
                <option key={course} value={course}>{course}</option>
              ))}
            </select>
            {errors.course && <p className="mt-1 text-xs text-r1">{errors.course}</p>}
          </div>

          {/* Password */}
          <div>
            <label htmlFor="password" className="block mb-1 font-semibold text-g1">Password <span className="text-r1">*</span></label>
            <input
              id="password"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              disabled={submitting}
              placeholder="Choose a password"
              className={`w-full bg-transparent border-b border-w2 py-2 text-g3 placeholder-g2 focus:outline-none focus:border-r1 transition ${errors.password ? 'border-r1' : ''}`}
              required
            />
            {errors.password && <p className="mt-1 text-xs text-r1">{errors.password}</p>}
          </div>

          {serverError && (
            <p className="text-center text-r1 font-semibold">{serverError}</p>
          )}

          <button
            type="submit"
            disabled={submitting}
            className="w-full bg-r1 text-white py-3 rounded-full font-semibold text-lg shadow-md hover:bg-r2 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {submitting ? "Registering..." : "Register"}
          </button>
        </form>
      </main>
      <Footer />
    </>
  );
}
