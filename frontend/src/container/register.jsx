import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useRouter } from "next/router";
import { registerUser } from "../lib/api";
import {
  auth,
  googleProvider,
  signInWithPopup,
  analytics,
  logEvent,
  db,
  collection,
  addDoc,
  serverTimestamp,
} from "../lib/firebase";

const courses = ['SAT', 'PSAT', 'ACT', 'IELTS', 'TOEFL'];

export default function Register() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    course: courses[0],
    password: "",
  });
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [serverError, setServerError] = useState("");

  const validate = () => {
    const errs = {};
    if (!formData.name.trim()) errs.name = "Name is required";
    if (!formData.email.trim()) errs.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(formData.email)) errs.email = "Invalid email address";
    if (!formData.password.trim()) errs.password = "Password is required";
    if (formData.phone && !/^\d{7,15}$/.test(formData.phone)) errs.phone = "Enter a valid phone number";
    if (!formData.course) errs.course = "Please select a course";
    return errs;
  };

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
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

  const handleGoogleSignIn = async () => {
    setSubmitting(true);
    setServerError("");
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;

      if (analytics) logEvent(analytics, "register_google_sign_in", { uid: user.uid, email: user.email });
      if (db) {
        await addDoc(collection(db, "user_events"), {
          event: "register_google_sign_in",
          user: user.email || "guest",
          uid: user.uid,
          timestamp: serverTimestamp(),
          path: typeof window !== "undefined" ? window.location.pathname : "server",
        });
      }

      // Call backend register / update user with Google info
      await registerUser({
        firebaseUid: user.uid,
        email: user.email,
        fullName: user.displayName || "",
        phoneNumber: user.phoneNumber || "",
        loginMethod: "GOOGLE",
        emailVerified: user.emailVerified,
        password: null, // Password not required for Google auth
        course: "",
      });

      router.push("/");
    } catch (error) {
      setServerError(error.message || "Google Sign-in failed or Popup closed");
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

        <div className="mt-8 flex items-center justify-center gap-2 text-gray-600">
          <div className="border-b border-gray-300 w-20" />
          <span>OR</span>
          <div className="border-b border-gray-300 w-20" />
        </div>

        <button
          onClick={handleGoogleSignIn}
          disabled={submitting}
          className="mt-8 w-full max-w-xs flex items-center justify-center space-x-3 border border-gray-300 rounded-full py-3 text-gray-700 hover:bg-gray-100 transition disabled:opacity-60 disabled:cursor-not-allowed"
          aria-label="Sign in with Google"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" viewBox="0 0 48 48">
            <path fill="#fbc02d" d="M43.6 20.5h-1.9v-.1h-19v7.9h11.6c-1.1 3.6-4.4 6-8.6 6-5 0-8.9-4.1-8.9-9.2a9 9 0 0 1 9-9.2c2.3 0 4.4 1 5.7 2.6l5.7-5.6a16.44 16.44 0 0 0-11.4-5.1C13.4 9 7 15.4 7 23c0 7.6 6.3 14 14 14 8 0 13.4-5.8 13.4-14 0-.9-.1-1.6-.2-2.1z"/>
            <path fill="#e53935" d="M6 14l6.6 5.1a9 9 0 0 1 9-5.8c2.4 0 4.6 1 6.1 2.6l5.7-5.5C26.9 7 21 5 15.8 5a16.44 16.44 0 0 0-9 4.7V14z"/>
            <path fill="#43a047" d="M15.8 40a15.77 15.77 0 0 0 11.2-4.8l-5.7-4.4a8.18 8.18 0 0 1-5.5 2.1 9 9 0 0 1-8.9-8.9 8.6 8.6 0 0 1 .5-3.3l-6.6-5.1a16.45 16.45 0 0 0 0 19.4 19.04 19.04 0 0 0 14 6.1z"/>
            <path fill="#1e88e5" d="M43.7 20.5H43.6v-.1h-19v7.9H35a12.53 12.53 0 0 1-2.3 3.2l5.8 4.4a16.82 16.82 0 0 0 5-13z"/>
          </svg>
          <span>Continue with Google</span>
        </button>
      </main>
      <Footer />
    </>
  );
}
