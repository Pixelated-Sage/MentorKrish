import React, { useState } from "react";
import { useRouter } from "next/router";

export default function VerifyOtp() {
  const [otp, setOtp] = useState("");
  const [msg, setMsg] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { email, mode } = router.query;

  async function handleVerify() {
    setError("");
    setMsg("");
    setLoading(true);
    try {
      let res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/verify-otp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, otp }),
      });
      if (!res.ok) throw new Error(await res.text());
      setMsg("✅ OTP verified!");

      if (mode === "reset") {
        setTimeout(() => router.push(`/reset?email=${encodeURIComponent(email)}`), 1500);
      } else {
        setTimeout(() => router.push("/login"), 1500);
      }
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }

  async function handleResend() {
    setError("");
    setMsg("");
    try {
      let res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/resend-otp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      if (!res.ok) throw new Error(await res.text());
      setMsg("📩 OTP resent! Check your email.");
    } catch (e) {
      setError(e.message);
    }
  }

  return (
    <main className="min-h-[70vh] flex flex-col justify-center items-center p-6 bg-gray-50">
      <div className="max-w-md w-full space-y-6 p-6 bg-white rounded shadow-md">
        <h1 className="text-xl font-semibold text-center">Verify OTP for {email}</h1>
        {msg && <p className="text-green-600 text-center">{msg}</p>}
        {error && <p className="text-red-600 text-center">{error}</p>}

        <input
          type="text"
          placeholder="Enter OTP"
          value={otp}
          maxLength={6}
          onChange={e => setOtp(e.target.value)}
          className="w-full p-3 border rounded"
          disabled={loading}
        />

        <button onClick={handleVerify} disabled={loading || otp.length !== 6}
          className="w-full p-3 bg-blue-600 text-white rounded">
          {loading ? "Verifying..." : "Verify OTP"}
        </button>

        <button onClick={handleResend} disabled={loading}
          className="w-full p-3 border rounded">
          Resend OTP
        </button>
      </div>
    </main>
  );
}
