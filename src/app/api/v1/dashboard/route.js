import connectToDatabase from '../../../../lib/mongodb';
import { cookies } from 'next/headers';

export async function POST(req) {
    try {
        const { db } = await connectToDatabase();

        // log api call
        
        // check session
        const cookieStore = await cookies();
        const token = cookieStore.get('sessionToken')?.value;
        const validSession = await db.collection('sessions').findOne({ token });
        
        if (validSession) {
            console.log('valid session')
            const user = await db.collection('apiCalls').findOne({ email: validSession.email });
            const apiCallsLog = await db.collection('apiCalls').updateOne({ email: validSession.email }, { $inc: { dashboard: 1 } });
            const numcalls = user?.game ?? 0;
            return new Response(JSON.stringify({ numcalls, email:validSession.email }), { status: 200 });
        }

    } catch (error) {
        console.log(error)
        return new Response(JSON.stringify({
            error: "Something went wrong"
        }), { status: 500, headers: { "Content-Type": "application/json" } });
    }
    return new Response(JSON.stringify({
        message: "Something Redirected"
    }), { status: 308, headers: { "Content-Type": "application/json" } });
}