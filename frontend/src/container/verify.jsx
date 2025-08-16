import React, { useState } from 'react';
import { useRouter } from 'next/router';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { motion } from 'framer-motion';

import { verifyOtp, resendOtp } from '../lib/api'; // you’ll add these helpers

export default function VerifyOtp() {
  const router = useRouter();
  const { email } = router.query;

  const [otp, setOtp] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleVerify = async () => {
    setLoading(true);
    try {
      await verifyOtp({ email, otp });
      setMessage('✅ Email verified! You can now log in.');
      setTimeout(() => router.push('/login'), 1500);
    } catch (err) {
      setMessage('❌ ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    try {
      await resendOtp({ email });
      setMessage('📩 OTP resent. Check your email.');
    } catch (err) {
      setMessage('❌ ' + err.message);
    }
  };

  return (
    <>
      <Navbar />
      <main className="flex flex-col justify-center items-center min-h-[70vh] px-6">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-md w-full bg-white shadow-lg rounded-xl p-8"
        >
          <h1 className="text-2xl font-bold mb-6">Verify Your Email</h1>
          <p className="mb-4 text-gray-600">We sent an OTP to <b>{email}</b>.</p>

          <input
            type="text"
            value={otp}
            onChange={e => setOtp(e.target.value)}
            className="w-full border px-4 py-3 rounded mb-4"
            placeholder="Enter 6-digit OTP"
          />

          <button
            onClick={handleVerify}
            disabled={loading}
            className="w-full bg-r1 text-white py-3 rounded mb-3"
          >
            {loading ? 'Verifying...' : 'Verify Email'}
          </button>

          <button
            onClick={handleResend}
            className="w-full border py-2 rounded"
          >
            Resend OTP
          </button>

          {message && <p className="mt-4 text-center">{message}</p>}
        </motion.div>
      </main>
      <Footer />
    </>
  );
}
