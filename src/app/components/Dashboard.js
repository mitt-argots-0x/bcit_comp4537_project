'use client'

import { useState, useEffect } from "react";
import { useTranslations } from "@/hooks/useTranslations";
import { ToastContainer, toast } from "react-toastify";
import { useRouter } from "next/navigation";

export default function Dashboard() {
    const t = useTranslations('dashboard');
    const [numCalls, setNumCalls] = useState(null);
    const [loading, setLoading] = useState(true);
    const router = useRouter();
    
    useEffect(() => {
        const getCalls = async () =>{
            const email = sessionStorage.getItem("email");
            const session = sessionStorage.getItem("sessionToken");

            try{
                const response = await fetch("/api/v1/dashboard", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({email, session}),
                })
    
                if (!response.ok) {
                    router.push('/login?error=unauthorized');
                    return;
                };

                const data = await response.json();
                setNumCalls(data.numcalls);
                if (data.numcalls > 20) {
                    toast.warn("API Calls have exceeded limit!");
                }

            } catch(error){
                console.log(error);
            } finally {
                setLoading(false);
            }
        }

        getCalls();
    }, [router]);

    if (loading) return null; // Waits for information to load before loading the page

    return(
        <>
        <ToastContainer />
        <h1>{t('header.title', { name: sessionStorage.getItem('email') || 'User'})}</h1>
        <p>{t('header.subtitle')}</p>
        <p>{t('stats.usage', { tokens: numCalls })}</p>
        </>
    )
}
