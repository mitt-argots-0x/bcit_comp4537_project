'use client';
import { useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';
import { useTranslations } from '@/hooks/useTranslations';

export default function ResetPasswordPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const t = useTranslations('resetPassword');

  const token = searchParams.get('token');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleReset = async () => {
    const res = await fetch('/api/v1/reset-password', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ token, password, confirmPassword }),
    });

    const data = await res.json();
    setMessage(data.message);

    if (data.success) {
      setTimeout(() => router.push('/login'), 2000);
    }
  };

  return (
    // <div style={{ padding: '2rem' }}>
    //   <h1>Reset Your Password</h1>
    //   <input
    //     type="password"
    //     placeholder="New password"
    //     value={password}
    //     onChange={(e) => setPassword(e.target.value)}
    //     style={{ padding: '0.5rem', marginTop: '1rem' }}
    //   />
    //   <button
    //     onClick={handleReset}
    //     style={{ marginLeft: '1rem', padding: '0.5rem 1rem' }}
    //   >
    //     Reset
    //   </button>
    //   {message && <p style={{ marginTop: '1rem' }}>{message}</p>}
    // </div>

    <div className='flex w-full h-full justify-center pt-12 md:pt-36'>
      <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-md">
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">{t('title')}</h2>

      <form className="space-y-4" onSubmit={handleReset}>
        <div>
          <label htmlFor="new-password" className="block text-sm font-medium text-gray-600">{t('passwordLabel')}</label>
          <input type="password" id="new-password" name="new-password" value={password} onChange={(e) => setPassword(e.target.value)} required
                className="mt-1 w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500" />
        </div>

        <div>
          <label htmlFor="confirm-password" className="block text-sm font-medium text-gray-600">{t('passwordConfirmLabel')}</label>
          <input type="password" id="confirm-password" name="confirm-password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required
                className="mt-1 w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500" />
        </div>

        <button type="submit"
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 rounded-lg transition">
          {t('resetButton')}
        </button>
      </form>

      <p className="mt-6 text-sm text-center text-gray-500">
        {t('rememberPasswordLabel')}
        <a href="/login" className="text-indigo-600 hover:underline">{t('loginButton')}</a>
      </p>
      </div>
    </div>
  );
}
