'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Layout from './components/Layout';

export default function Home() {
  const router = useRouter();
  const [numCalls, setNumCalls] = useState(null);
  const [isLoading, setIsLoading] = useState(true); // new state to block render

  useEffect(() => {
      const email = sessionStorage.getItem("email")
      const session = sessionStorage.getItem("sessionToken")
  
      const getCalls = async () =>{
          try{
            const response = await fetch("/api/dashboard", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({email, session}),
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
      <h1 className='font-bold'>Welcome to the Home Page</h1>
      <p>This is the main landing page of your application.</p>
    </Layout>
  );
}
