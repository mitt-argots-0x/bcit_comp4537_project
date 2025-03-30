'use client';
import { useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';

export default function ResetPasswordPage() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const token = searchParams.get('token');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleReset = async () => {
    const res = await fetch('/api/reset-password', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ token, password }),
    });

    const data = await res.json();
    setMessage(data.message);

    if (data.success) {
      setTimeout(() => router.push('/login'), 2000);
    }
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h1>Reset Your Password</h1>
      <input
        type="password"
        placeholder="New password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        style={{ padding: '0.5rem', marginTop: '1rem' }}
      />
      <button
        onClick={handleReset}
        style={{ marginLeft: '1rem', padding: '0.5rem 1rem' }}
      >
        Reset
      </button>
      {message && <p style={{ marginTop: '1rem' }}>{message}</p>}
    </div>
  );
}
