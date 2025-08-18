import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/router';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { loginUser } from '../lib/api'; // API helper

const formVariants = {
  visible: { opacity: 1, y: 0 },
  hidden: { opacity: 0, y: -20 }
};

export default function Login() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState('');
  const [loading, setLoading] = useState(false);

  const validate = () => {
    const errs = {};
    if (!formData.email.trim()) {
      errs.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errs.email = 'Invalid email address';
    }
    if (!formData.password) {
      errs.password = 'Password is required';
    }
    return errs;
  };

  const handleChange = (e) => {
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
    setLoading(true);

    try {
      const result = await loginUser(formData);
      if (!result || !result.token) throw new Error('No token in login response');

      localStorage.setItem('authToken', result.token);
      localStorage.setItem('userEmail', result.email);
      localStorage.setItem('userRole', result.role);
      await new Promise(r => setTimeout(r, 50)); // safety delay

      if (result.role === 'ADMIN') {
        return router.push('/admin');
      } else {
        return router.push('/');
      }
    } catch (err) {
      if (err.message.includes('Email not verified')) {
        router.push(`/verifyotp?email=${encodeURIComponent(formData.email)}`);
      } else {
        setServerError(err.message);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <main className="bg-w2 min-h-[77vh] flex flex-col justify-center pb-12 pt-12 sm:pt-24">
        <div className="flex flex-col items-center">
          <motion.form
            initial="hidden"
            animate="visible"
            variants={formVariants}
            onSubmit={handleSubmit}
            className="w-full max-w-sm sm:max-w-md lg:max-w-lg bg-white/95 rounded-3xl p-6 sm:p-8 shadow-xl border border-gray-200"
            style={{ marginTop: "2.5rem", boxShadow: "0 6px 36px 0 rgba(0,0,0,.09), 0 1.5px 2.5px -1px rgba(0,0,0,0.03)" }}
            noValidate
          >
            <h1 className="text-2xl sm:text-3xl font-bold text-g1 mb-1 text-center tracking-tight">
              Login to your account
            </h1>
            <p className="text-center text-g2 mb-6 text-sm sm:text-base">
              Welcome back. Sign in to continue.
            </p>

            {/* Email */}
            <div className="relative mb-5">
              <input
                type="email"
                name="email"
                id="email"
                autoComplete="email"
                value={formData.email}
                onChange={handleChange}
                disabled={loading}
                className={`peer w-full bg-white/40 border ${errors.email ? 'border-r1' : 'border-gray-200'} rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-r1 focus:border-r1 placeholder-transparent transition`}
                placeholder="you@example.com"
                required
              />
              <label
                htmlFor="email"
                className="absolute left-4 top-3 text-g2 text-base font-semibold transition-all duration-200 pointer-events-none
                  peer-placeholder-shown:top-4 peer-placeholder-shown:text-base
                  peer-focus:-top-3 peer-focus:text-xs peer-focus:text-r1 bg-white/95 px-1 rounded"
              >
                Email <span className="text-r1">*</span>
              </label>
              {errors.email && <p className="mt-1 text-xs text-r1">{errors.email}</p>}
            </div>

            {/* Password */}
            <div className="relative mb-5">
              <input
                type="password"
                name="password"
                id="password"
                autoComplete="current-password"
                value={formData.password}
                onChange={handleChange}
                disabled={loading}
                className={`peer w-full bg-white/40 border ${errors.password ? 'border-r1' : 'border-gray-200'} rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-r1 focus:border-r1 placeholder-transparent transition`}
                placeholder="Enter your password"
                required
              />
              <label
                htmlFor="password"
                className="absolute left-4 top-3 text-g2 text-base font-semibold transition-all duration-200 pointer-events-none
                  peer-placeholder-shown:top-4 peer-placeholder-shown:text-base
                  peer-focus:-top-3 peer-focus:text-xs peer-focus:text-r1 bg-white/95 px-1 rounded"
              >
                Password <span className="text-r1">*</span>
              </label>
              {errors.password && <p className="mt-1 text-xs text-r1">{errors.password}</p>}
            </div>

            {/* Server error */}
            {serverError && <p className="mb-4 text-center text-r1 font-semibold">{serverError}</p>}

            {/* Forgot password */}
            <div className="mb-7 text-right">
              <a href="/forgot-password" className="text-r1 font-medium text-sm hover:underline hover:text-r2 transition">
                Forgot Password?
              </a>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-r1 text-white py-3 rounded-full font-bold text-lg shadow-lg hover:bg-r2 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading ? 'Logging in...' : 'Login'}
            </button>
          </motion.form>
          <div className="h-10" />
        </div>
      </main>
      <Footer />
    </>
  );
}
