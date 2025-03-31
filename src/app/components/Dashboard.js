'use client'

import { useState, useEffect } from "react";
import { useTranslations } from "@/hooks/useTranslations";
import { ToastContainer, toast } from "react-toastify";
import { useRouter } from "next/navigation";

export default function Dashboard() {
    const t = useTranslations('dashboard');
    const [numCalls, setNumCalls] = useState(null);
    const [loading, setLoading] = useState(true);
    const [userEmail, setUserEmail] = useState('');
    const router = useRouter();
    
    useEffect(() => {
        const getCalls = async () =>{
            try{
                const response = await fetch("/api/v1/dashboard", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                })
    
                if (!response.ok) {
                    router.push('/login?error=unauthorized');
                    return;
                };

                const data = await response.json();
                setNumCalls(data.numcalls);
                setUserEmail(data.email);
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
        {/* <h1>{t('header.title', { name: userEmail || 'User'})}</h1>
        <p>{t('header.subtitle')}</p>
        <p>{t('stats.usage', { tokens: numCalls })}</p> */}
        <div className="min-h-screen flex items-center justify-center px-4">
            <div className="w-full max-w-md bg-gray-800 rounded-xl shadow-lg p-8 space-y-6">
                <h1 className="text-3xl font-bold text-center text-white">{t('header.title')}</h1>

                <div className="text-center">
                <p className="text-lg text-white">{t('header.subtitle')}</p>
                <p className="text-xl font-semibold text-amber-300">{userEmail}</p>
            </div>

            <div className="flex flex-col items-center">
            <p className="text-lg text-white">{t('header.apiCalls')}</p>
            <p className="text-4xl font-bold text-amber-300">{numCalls}</p>
            </div>
        </div>
        </div>
        </>
    )
}
