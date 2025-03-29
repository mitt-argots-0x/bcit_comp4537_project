'use client';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import Layout from './components/Layout';

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    // Checks if the user is currently logged into a session.
    const checkAuth = async () => {
      const res = await fetch('/api/authenticate');
      if (!res.ok) {
        router.push('/login');
      }
    }

    checkAuth();
  }, [router]);

  return (
    <Layout>
      <h1 className='font-bold'>Welcome to the Home Page</h1>
      <p>This is the main landing page of your application.</p>
    </Layout>
  );
}
