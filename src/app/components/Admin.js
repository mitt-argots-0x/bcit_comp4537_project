'use client'
// used AI here to help with writing and debugging the loops (Steven)
// used AI here to help with styling
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useTranslations } from '@/hooks/useTranslations';

export default function Admin() {
    const [userInfo, setUserInfo] = useState(null);
    const [totals, setTotals] = useState({
        adminReq: 0,
        dashboardReq: 0,
        forgotReq: 0,
        gameReq: 0,
        loginReq: 0,
        resetPasswordReq: 0,
        sendResetLinkReq: 0,
        signoutReq: 0,
        signupReq: 0,
    });
    const router = useRouter();
    const t = useTranslations('admin');

    useEffect(() => {
        const getInfo = async () => {
            try {
                const response = await fetch("/api/v1/admin", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                });

                if (!response.ok) {
                    router.push('/login?error=unauthorized');
                    return;
                };

                const data = await response.json();
                console.log(data);

                const newTotals = { ...totals };

                for (const entry of data) {
                    newTotals.adminReq += entry.admin || 0;
                    newTotals.dashboardReq += entry.dashboard || 0;
                    newTotals.forgotReq += entry.forgot || 0;
                    newTotals.gameReq += entry.game || 0;
                    newTotals.loginReq += entry.login || 0;
                    newTotals.resetPasswordReq += entry.resetPassword || 0;
                    newTotals.sendResetLinkReq += entry.sendResetLink || 0;
                    newTotals.signoutReq += entry.signout || 0;
                    newTotals.signupReq += entry.signup || 0;
                }

                setTotals(newTotals);

                setUserInfo(data.map((user) => (
                    <tr key={user.email}>
                        <td>{user.email}</td>
                        <td>{user.admin  || 0+
                            user.dashboard  || 0+
                            user.forgot  || 0+
                            user.game  || 0+
                            user.login  || 0+
                            user.resetPassword  || 0+
                            user.sendResetLink  || 0+
                            user.signout  || 0+
                            user.signup || 0}
                        </td>
                    </tr>
                )));
            } catch (error) {
                console.log(error);
            }
        }
        getInfo();
    }, []);

    return (
        <>
            <main className="min-h-screen bg-gray-900 text-white py-10 px-4">
            <div className="max-w-5xl mx-auto space-y-10 animate-fade-in-slow">
                <section>
                    <h2 className="text-3xl font-bold mb-4 text-indigo-400">{t('endpointsReport.title')}</h2>
                    <div className="overflow-x-auto rounded-lg shadow-lg">
                        <table className="min-w-full bg-gray-800 rounded-md overflow-hidden text-sm md:text-base">
                            <thead className="bg-gray-700 text-indigo-300">
                                <tr>
                                    <th className="py-2 px-4 text-left">{t('endpointsReport.methodLabel')}</th>
                                    <th className="py-2 px-4 text-left">{t('endpointsReport.endpointLabel')}</th>
                                    <th className="py-2 px-4 text-center">{t('endpointsReport.requestsLabel')}</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-700">
                                <tr><td className="py-2 px-4">{t('httpMethods.post')}</td><td className="py-2 px-4">{t('endpointsReport.admin')}</td><td className="py-2 px-4 text-center">{totals.adminReq}</td></tr>
                                <tr><td className="py-2 px-4">{t('httpMethods.post')}</td><td className="py-2 px-4">{t('endpointsReport.dashboard')}</td><td className="py-2 px-4 text-center">{totals.dashboardReq}</td></tr>
                                <tr><td className="py-2 px-4">{t('httpMethods.post')}</td><td className="py-2 px-4">{t('endpointsReport.forgot')}</td><td className="py-2 px-4 text-center">{totals.forgotReq}</td></tr>
                                <tr><td className="py-2 px-4">{t('httpMethods.get')}</td><td className="py-2 px-4">{t('endpointsReport.game')}</td><td className="py-2 px-4 text-center">{totals.gameReq}</td></tr>
                                <tr><td className="py-2 px-4">{t('httpMethods.post')}</td><td className="py-2 px-4">{t('endpointsReport.login')}</td><td className="py-2 px-4 text-center">{totals.loginReq}</td></tr>
                                <tr><td className="py-2 px-4">{t('httpMethods.patch')}</td><td className="py-2 px-4">{t('endpointsReport.resetPassword')}</td><td className="py-2 px-4 text-center">{totals.resetPasswordReq}</td></tr>
                                <tr><td className="py-2 px-4">{t('httpMethods.post')}</td><td className="py-2 px-4">{t('endpointsReport.resetLink')}</td><td className="py-2 px-4 text-center">{totals.sendResetLinkReq}</td></tr>
                                <tr><td className="py-2 px-4">{t('httpMethods.delete')}</td><td className="py-2 px-4">{t('endpointsReport.signout')}</td><td className="py-2 px-4 text-center">{totals.signoutReq}</td></tr>
                                <tr><td className="py-2 px-4">{t('httpMethods.post')}</td><td className="py-2 px-4">{t('endpointsReport.signup')}</td><td className="py-2 px-4 text-center">{totals.signupReq}</td></tr>
                            </tbody>
                        </table>
                    </div>
                </section>

                <section>
                    <h2 className="text-3xl font-bold mb-4 text-indigo-400">{t('userReport.title')}</h2>
                    <div className="overflow-x-auto rounded-lg shadow-lg">
                        <table className="min-w-full bg-gray-800 text-sm md:text-base rounded-md overflow-hidden">
                            <thead className="bg-gray-700 text-indigo-300">
                                <tr>
                                    <th className="py-2 px-4 text-left">{t('userReport.emailLabel')}</th>
                                    <th className="py-2 px-4 text-center">{t('userReport.requestsLabel')}</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-700 gap-5">
                                {userInfo}
                            </tbody>
                        </table>
                    </div>
                </section>
            </div>
        </main>
        </>
    );
}
