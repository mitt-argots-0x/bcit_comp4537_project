'use client'
// used AI here to help with writing and debugging the loops (Steven)
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

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

    useEffect(() => {
        const email = sessionStorage.getItem("email");
        const session = sessionStorage.getItem("sessionToken");

        const getInfo = async () => {
            try {
                const response = await fetch("/api/v1/admin", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ email, session })
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
            <h2>Your endpoints report:</h2>
            <table className = 'gap-2 p-3' >
                <thead>
                    <tr>
                        <th>Method</th>
                        <th>Endpoint</th>
                        <th>Requests</th>
                    </tr>
                </thead>
                <tbody>
                    <tr><td>POST</td><td>/api/v1/admin</td><td>{totals.adminReq}</td></tr>
                    <tr><td>POST</td><td>/api/v1/dashboard</td><td>{totals.dashboardReq}</td></tr>
                    <tr><td>POST</td><td>/api/v1/forgot</td><td>{totals.forgotReq}</td></tr>
                    <tr><td>GET</td><td>/api/v1/game</td><td>{totals.gameReq}</td></tr>
                    <tr><td>POST</td><td>/api/v1/login</td><td>{totals.loginReq}</td></tr>
                    <tr><td>PATCH</td><td>/api/v1/reset-password</td><td>{totals.resetPasswordReq}</td></tr>
                    <tr><td>POST</td><td>/api/v1/send-reset-link</td><td>{totals.sendResetLinkReq}</td></tr>
                    <tr><td>DELETE</td><td>/api/v1/signout</td><td>{totals.signoutReq}</td></tr>
                    <tr><td>POST</td><td>/api/v1/signup</td><td>{totals.signupReq}</td></tr>
                </tbody>
            </table>

            <h2>Your users report:</h2>
            <table className = 'gap-2 p-3'>
                <thead>
                    <tr>
                        <th>Email</th>
                        <th>Requests</th>
                    </tr>
                </thead>
                <tbody>
                    {userInfo}
                </tbody>
            </table>
        </>
    );
}
