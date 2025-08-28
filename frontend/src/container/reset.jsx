import { useRouter } from "next/router";
import React, { useState, useEffect } from "react";

export default function Reset() {
  const router = useRouter();
  const { email, otp } = router.query;

  const [newPassword, setNewPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  // Optional: Prevent showing form before query params ready
  if (!email || !otp) {
    return <p>Invalid or missing reset parameters.</p>;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setMessage("");

    if (newPassword !== confirm) {
      setError("Passwords do not match");
      return;
    }
    if (newPassword.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    if (!otp) {
      setError("Invalid or missing OTP");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/reset-password`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, otp, newPassword }),
      });

      if (!res.ok) {
        const text = await res.text();
        throw new Error(text || "Failed to reset password");
      }

      setMessage("Password updated successfully! Redirecting to login...");
      setTimeout(() => router.push("/login"), 3000);
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-[70vh] flex flex-col justify-center items-center p-6 bg-gray-50">
      <form onSubmit={handleSubmit} className="max-w-md w-full space-y-6 p-6 bg-white rounded shadow-md">
        <h1 className="text-xl font-semibold text-center mb-6">Reset Password</h1>
        {message && <p className="text-green-600 text-center">{message}</p>}
        {error && <p className="text-red-600 text-center">{error}</p>}

        <input
          type="password"
          placeholder="New Password"
          value={newPassword}
          onChange={e => setNewPassword(e.target.value)}
          className="w-full p-3 border rounded"
          disabled={loading}
          required
        />
        <input
          type="password"
          placeholder="Confirm New Password"
          value={confirm}
          onChange={e => setConfirm(e.target.value)}
          className="w-full p-3 border rounded"
          disabled={loading}
          required
        />
        <button type="submit" disabled={loading} className="w-full p-3 bg-blue-600 text-white rounded">
          {loading ? "Updating..." : "Change Password"}
        </button>
      </form>
    </main>
  );
}
