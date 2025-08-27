import React, { useState } from "react";
import { useRouter } from "next/router";

export default function Reset() {
  const router = useRouter();
  const { email } = router.query;

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] =useState("");
  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleReset(e) {
    e.preventDefault();
    setError("");
    setMsg("");

    if (newPassword !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    if (newPassword.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    setLoading(true);
    try {
      let res = await fetch(process.env.NEXT_PUBLIC_API_URL+"/api/auth/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, otp: "", newPassword }),
      });
      if (!res.ok) throw new Error(await res.text());
      setMsg("Password updated successfully, redirecting to login...");
      setTimeout(() => router.push("/login"), 3000);
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-[70vh] flex flex-col justify-center items-center p-6 bg-gray-50">
      <form onSubmit={handleReset} className="max-w-md w-full space-y-6 p-6 bg-white rounded shadow-md">
        <h1 className="text-xl font-semibold text-center">Reset Password</h1>
        {msg && <p className="text-green-600">{msg}</p>}
        {error && <p className="text-red-600">{error}</p>}

        <input
          type="password"
          placeholder="New Password"
          className="w-full p-3 border rounded"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          disabled={loading}
          required
        />
        <input
          type="password"
          placeholder="Confirm New Password"
          className="w-full p-3 border rounded"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          disabled={loading}
          required
        />
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-r1 text-white p-3 rounded disabled:opacity-50"
        >
          {loading ? "Updating..." : "Change Password"}
        </button>
      </form>
    </main>
  );
}
