import React, { useState } from "react";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    setError("");
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/forgot-password?email=${encodeURIComponent(email)}`, {
        method: "POST",
      });
      if (!res.ok) {
        const text = await res.text();
        throw new Error(text || "Failed to send reset email");
      }
      setMessage("Password reset email sent! Check your inbox.");
    } catch (err) {
      setError(err.message || "Error sending email");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-[70vh] flex flex-col justify-center items-center px-6 py-20 bg-w2">
      <form onSubmit={handleSubmit} className="max-w-md w-full space-y-6 bg-w1 p-8 rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold text-center mb-4">Forgot Password</h1>
        {message && <p className="text-green-600">{message}</p>}
        {error && <p className="text-red-600">{error}</p>}
        <label htmlFor="email" className="block font-semibold mb-1 text-g1">Email address</label>
        <input
          id="email"
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-3 border rounded focus:outline-none focus:border-r1 focus:ring-1 focus:ring-r1"
          placeholder="your.email@example.com"
        />
        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 rounded-full bg-r1 text-w1 font-semibold hover:bg-r2 transition"
        >
          {loading ? "Sending..." : "Send Reset Email"}
        </button>
      </form>
    </main>
  );
}
