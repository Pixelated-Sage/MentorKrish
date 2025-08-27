import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";

export default function VerifyOtp() {
  const router = useRouter();
  const { email, mode } = router.query; // mode=reset or default

  const [otp, setOtp] = useState("");
  const [msg, setMsg] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleVerify() {
    setError("");
    setMsg("");
    setLoading(true);
    try {
      let res = await fetch(process.env.NEXT_PUBLIC_API_URL+"/api/auth/forgot-password/verify-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, otp }),
      });
      if (!res.ok) throw new Error(await res.text());
      setMsg("OTP verified");
      // Redirect to reset page if in reset mode
      if (mode === "reset") {
        router.push(`/reset?email=${encodeURIComponent(email)}`);
      } else {
        router.push("/login");
      }
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-[70vh] flex flex-col justify-center items-center p-6 bg-gray-50">
      <div className="max-w-md w-full space-y-6 p-6 bg-white rounded shadow-md">
        <h1 className="text-xl font-semibold text-center">Verify OTP</h1>
        {msg && <p className="text-green-600">{msg}</p>}
        {error && <p className="text-red-600">{error}</p>}
        <input
          type="text"
          placeholder="Enter OTP"
          value={otp}
          maxLength={6}
          onChange={(e) => setOtp(e.target.value)}
          className="w-full p-3 border rounded"
          disabled={loading}
        />
        <button
          onClick={handleVerify}
          disabled={loading || otp.length !== 6}
          className="w-full bg-r1 text-white p-3 rounded disabled:opacity-50"
        >
          {loading ? "Verifying..." : "Verify OTP"}
        </button>
      </div>
    </main>
  );
}
