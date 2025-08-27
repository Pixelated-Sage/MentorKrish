import React, { useState } from "react";
import { useRouter } from "next/router";

export default function Forgot() {
  const [email, setEmail] = useState("");
  const [msg, setMsg] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleSubmit(e) {
    e.preventDefault();
    setMsg("");
    setError("");
    setLoading(true);
    try {
      let res = await fetch(process.env.NEXT_PUBLIC_API_URL+'/api/auth/forgot-password', {
        method: 'POST',
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify({email})
      });
      if (!res.ok) throw new Error(await res.text());
      setMsg('OTP sent to your email');
      // Redirect to OTP verification for password reset
      router.push(`/verifyotp?email=${encodeURIComponent(email)}&mode=reset`);
    } catch(e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-[70vh] flex flex-col justify-center items-center p-6 bg-gray-50">
      <form onSubmit={handleSubmit} className="max-w-md w-full space-y-6 p-6 bg-white rounded shadow-md">
        <h1 className="text-xl font-semibold text-center">Forgot Password</h1>
        {msg && <p className="text-green-600">{msg}</p>}
        {error && <p className="text-red-600">{error}</p>}
        <input
          type="email"
          placeholder="Enter your email"
          required
          className="w-full p-3 border rounded"
          value={email}
          onChange={e => setEmail(e.target.value)}
          disabled={loading}
        />
        <button type="submit" disabled={loading}
          className="w-full bg-r1 text-white p-3 rounded disabled:opacity-50">
          {loading ? 'Sending...' : 'Send OTP'}
        </button>
      </form>
    </main>
  );
}
