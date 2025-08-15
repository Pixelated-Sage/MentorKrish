import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { isAdminAuthenticated } from '../lib/auth';

export default function AdminRouteGuard({ children }) {
  const router = useRouter();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    console.log('AdminRouteGuard running');
    const ok = isAdminAuthenticated();
    if (!ok) {
      console.log('Not authenticated as admin, redirecting...');
      router.replace('/login');
      return;
    }
    setReady(true);
  }, [router]);


  if (!ready) return null;
  return children;
}