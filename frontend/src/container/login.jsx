import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useRouter } from "next/router";
import { loginUser } from "../lib/api";

const formVariants = {
  visible: { opacity: 1, y: 0 },
  hidden: { opacity: 0, y: -20 },
};

export default function Login() {
  const router = useRouter();

  const [formData, setFormData] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState("");
  const [loading, setLoading] = useState(false);

  const validate = () => {
    const errs = {};
    if (!formData.email.trim()) errs.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(formData.email)) errs.email = "Invalid email address";
    if (!formData.password) errs.password = "Password is required";
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
    setLoading(true);
    try {
      const result = await loginUser(formData);
      if (!result || !result.token) throw new Error("No token in response");

      // Save auth info
      localStorage.setItem("authToken", result.token);
      localStorage.setItem("userEmail", result.email);
      localStorage.setItem("userRole", result.role);

      // Redirect logic
      if (result.role === "ADMIN") {
        router.push("/admin");
      } else {
        router.push("/");
      }
    } catch (err) {
      if (err.message.includes("Email not verified")) {
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
      <main className="min-h-screen flex flex-col justify-center items-center px-4 py-16 bg-w2 mt-18">
        <form
          onSubmit={handleSubmit}
          className="max-w-xl w-full space-y-6"
          noValidate
        >
          <h1 className="text-3xl font-bold text-center text-g1 mb-6 tracking-tight">
            Login to Your Account
          </h1>

          {/* Email */}
          <div>
            <label htmlFor="email" className="block mb-1 font-semibold text-g1">
              Email <span className="text-r1">*</span>
            </label>
            <input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              disabled={loading}
              placeholder="you@example.com"
              className={`w-full bg-transparent border-b border-w2 py-2 text-g3 placeholder-g2 focus:outline-none focus:border-r1 transition ${
                errors.email ? "border-r1" : ""
              }`}
              required
            />
            {errors.email && <p className="mt-1 text-xs text-r1">{errors.email}</p>}
          </div>

          {/* Password */}
          <div>
            <label htmlFor="password" className="block mb-1 font-semibold text-g1">
              Password <span className="text-r1">*</span>
            </label>
            <input
              id="password"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              disabled={loading}
              placeholder="Enter your password"
              className={`w-full bg-transparent border-b border-w2 py-2 text-g3 placeholder-g2 focus:outline-none focus:border-r1 transition ${
                errors.password ? "border-r1" : ""
              }`}
              required
            />
            {errors.password && <p className="mt-1 text-xs text-r1">{errors.password}</p>}
          </div>

          {/* Server error */}
          {serverError && (
            <p className="text-center text-r1 font-semibold">{serverError}</p>
          )}

          {/* Forgot password */}
          <div className="text-right mb-6">
            <a
              href="/forgot-password"
              className="text-r1 font-medium text-sm hover:underline"
            >
              Forgot Password?
            </a>
          </div>

          {/* Submit button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-r1 text-white py-3 rounded-full font-semibold text-lg shadow-md hover:bg-r2 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
      </main>
      <Footer />
    </>
  );
}
