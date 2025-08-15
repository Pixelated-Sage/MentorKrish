// src/lib/auth.js
import { jwtDecode } from 'jwt-decode'; // ✅ Correct import for v4+

export function getTokenInfo() {
  const token = typeof window !== 'undefined' ? localStorage.getItem('authToken') : null;
  
  if (!token) {
    console.log('No authToken in storage');
    return null;
  }

  try {
    const decoded = jwtDecode(token);
    console.log('Decoded JWT:', decoded);
    return decoded;
  } catch (err) {
    console.error('Token decode failed:', err);
    return null;
  }
}

export function isAdminAuthenticated() {
  const info = getTokenInfo();
  if (!info) { 
    console.log('No token info, not authenticated');
    return false; 
  }

  const now = Date.now() / 1000;

  if (info.role !== 'ADMIN') {
    console.log('JWT role mismatch:', info.role, '(should be ADMIN)');
    return false;
  }

  if (info.exp && info.exp <= now) {
    console.log('JWT expired:', info.exp, 'now:', now);
    return false;
  }

  console.log('Authenticated as ADMIN!');
  return true;
}
