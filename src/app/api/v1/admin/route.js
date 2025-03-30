import connectToDatabase from '../../../../lib/mongodb';
import { cookies } from 'next/headers';

export async function POST(req) {
    try {
        // connect to db
        const { db } = await connectToDatabase();
        const body = await req.json();

        // log api call
        
        const cookieStore = await cookies();
        const token = cookieStore.get('sessionToken')?.value;
        
        // check valid session
        const validSession = await db.collection('sessions').findOne({ token });
        
        if (!validSession || validSession.email !== 'admin@admin.com') {
            const apiCallsLog = await db.collection('apiCalls').updateOne({ email: validSession.email }, { $inc: { admin: 1 } });
            return new Response(JSON.stringify({ error: "Invalid session" }), { status: 401 });
        }        

        // get all user info
        const info = await db.collection('apiCalls').find({}, { projection: { email: 1, admin: 1, dashboard: 1, forgot: 1, game: 1, login: 1, resetPassword: 1, sendResetLink: 1, signout: 1, signup: 1, _id: 0 } }).toArray();
        
        console.log(info);

        return new Response(JSON.stringify(info), {
            status: 200,
            headers: { "Content-Type": "application/json" },
        })

    } catch (error) {
        console.log(error)
        return new Response(JSON.stringify({
            error: "Something went wrong"
        }), { status: 500, headers: { "Content-Type": "application/json" } });
    }
}