'use client';
import { useEffect, useState } from 'react';
import Layout from './components/Layout';

export default function Home() {

  const [numCalls, setNumCalls] = useState(null);
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

                if (!response.ok) throw new Error("Failed to fetch data");

                const data = await response.json();
                setNumCalls(data.numcalls);

            } catch(error){
                console.log(error);
            }
        }
        getCalls();
  }, []);

  return (
    <Layout>
      <h1 className='font-bold'>Welcome to the Home Page</h1>
      <p>This is the main landing page of your application.</p>
    </Layout>
  );
}
