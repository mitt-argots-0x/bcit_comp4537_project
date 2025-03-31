'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Layout from './components/Layout';
import { useTranslations } from '@/hooks/useTranslations';

export default function Home() {
  const router = useRouter();
  const [numCalls, setNumCalls] = useState(null);
  const [isLoading, setIsLoading] = useState(true); // new state to block render
  const t = useTranslations('home');

  useEffect(() => {
      const getCalls = async () =>{
          try{
            const response = await fetch("/api/v1/dashboard", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
            })

            if (!response.ok) {
              router.push('/login');
              return;
            };

            const data = await response.json();
            console.log(data);
            setNumCalls(data.numcalls);
            setIsLoading(false);
          } catch(error){
            console.log(error);
          }
      }
      getCalls();
  }, [router]);

  if (isLoading) {
    return null;
  }

  return (
    <Layout>
   <main className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-gray-900 via-black to-gray-800 text-white px-4">
      <div className="text-center space-y-6 animate-fade-in">
        <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight drop-shadow">
          {t('title')}
        </h1>
        <p className="text-lg md:text-xl text-gray-300 max-w-xl mx-auto">
          {t('subtitle')}
        </p>
        <div className="mt-6">
          <a
            href="/dashboard"
            className="inline-block px-6 py-3 bg-amber-400 hover:bg-amber-300 text-white font-semibold rounded-lg shadow transition-transform transform hover:scale-105"
          >
            {t('cta')}
          </a>
        </div>
      </div>
    </main>
    </Layout>
  );
}
