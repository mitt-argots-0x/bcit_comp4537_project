"use client";

import { useState, useEffect } from 'react';
// import emailjs from '@emailjs/browser';
import { useTranslations } from '@/hooks/useTranslations';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState(false);
  const [message, setMessage] = useState('');
  const t = useTranslations('forgotPassword');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch('/api/v1/send-reset-link', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email }),
    });

    const data = await res.json();
    setStatus(data.success);
    setMessage(data.message);
  };

  // Provide user feedback

  return (
    // <div>
    //   <form onSubmit={handleSubmit}>
    //     <input
    //       type="email"
    //       placeholder="Enter your email"
    //       value={email}
    //       onChange={(e) => setEmail(e.target.value)}
    //       required
    //     />
    //     <button type="submit">Send Reset Link</button>
    //   </form>

    //   {message && <p>{message}</p>}
    // </div>
  <div className='flex w-full h-full justify-center items-center pt-12 md:pt-36'>
      <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-md">
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">{t('title')}</h2>
      
      <form className="space-y-4" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-600">{t('emailLabel')}</label>
          <input type="email" id="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} required
                className="mt-1 w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500" />
        </div>

        <button type="submit"
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 rounded-lg transition">
          {t('resetButton')}
        </button>
      </form>

      <p className="mt-6 text-sm text-center text-gray-500">
        {t('rememberPasswordLabel')}{' '}
        <a href="/login" className="text-indigo-600 hover:underline">{t('loginButton')}</a>
      </p>
      <p className='py-10'>
        { status ? t('status.success') : t('status.fail')}
      </p>
    </div>
  </div>
  );
}
