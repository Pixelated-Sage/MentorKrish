import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/router';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { loginUser } from '../lib/api'; // import the api helper

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
      const result = await loginUser(formData); // { token, id, email, fullName, role }

      if (!result || !result.token) {
        throw new Error('No token in login response');
      }

      console.log('Login response:', result);

      localStorage.setItem('authToken', result.token);
      localStorage.setItem('userEmail', result.email);
      localStorage.setItem('userRole', result.role);

      console.log('Stored token:', localStorage.getItem('authToken'));
      console.log('Stored email:', localStorage.getItem('userEmail'));
      console.log('Stored role:', localStorage.getItem('userRole'));

      // tiny delay to ensure storage is committed before redirect (paranoia for race conditions)
      await new Promise(r => setTimeout(r, 50));

      if (result.role === 'ADMIN') {
        return router.push('/admin');
      } else {
        return router.push('/');
      }
    } catch (error) {
        setServerError(error.message);
    } finally {
      setLoading(false);
    }
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
          <h1 className="text-3xl font-bold text-g1 mb-8 text-center">Login to Your Account</h1>

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
              disabled={loading}
              className={`w-full px-4 py-3 rounded-lg border ${
                errors.email ? 'border-r1' : 'border-w2'
              } focus:outline-none focus:ring-2 focus:ring-r1 focus:border-r1`}
              placeholder="you@example.com"
              aria-invalid={errors.email ? true : false}
              aria-describedby="email-error"
              required
            />
            {errors.email && (
              <p id="email-error" className="mt-1 text-xs text-r1">{errors.email}</p>
            )}
          </div>

          {/* Password */}
          <div className="mb-5">
            <label htmlFor="password" className="block text-g1 mb-1 font-semibold">
              Password <span className="text-r1">*</span>
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              disabled={loading}
              className={`w-full px-4 py-3 rounded-lg border ${
                errors.password ? 'border-r1' : 'border-w2'
              } focus:outline-none focus:ring-2 focus:ring-r1 focus:border-r1`}
              placeholder="Enter your password"
              aria-invalid={errors.password ? true : false}
              aria-describedby="password-error"
              required
            />
            {errors.password && (
              <p id="password-error" className="mt-1 text-xs text-r1">{errors.password}</p>
            )}
          </div>

          {/* Server error */}
          {serverError && (
            <p className="mb-4 text-center text-r1 font-semibold">{serverError}</p>
          )}

          {/* Forgot password link */}
          <div className="mb-6 text-right">
            <a
              href="/forgot-password"
              className="text-r1 font-medium text-sm hover:underline"
            >
              Forgot Password?
            </a>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-r1 text-w1 py-3 rounded-full font-semibold text-lg shadow-lg hover:bg-r2 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </motion.form>
      </main>
      <Footer />
    </>
  );
}
