import connectToDatabase from '../../../../lib/mongodb';
import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function GET(req) {
    try {
        const { db } = await connectToDatabase();

        const cookieStore = await cookies();
        const sessionToken = cookieStore.get('sessionToken')?.value;

        if (!sessionToken) {
            return new Response(JSON.stringify({ error: "No session token found" }), { status: 400 });
        }

        //find session in db
        const session = await db.collection('sessions').findOne({ token: sessionToken });

        if (!session) {
            return new Response(JSON.stringify({ error: "Session not found" }), { status: 404 });
        }

        const email = session.email;

        if (!email) {
            return NextResponse.json({ error: "Missing email" }, { status: 400 });
        }

        await db.collection('apiCalls').updateOne({ email: email }, { $inc: { game: 1 } }, { upsert: true });

        return NextResponse.json({ message: "Game API is running" });
    } catch (error) {
        console.error("Error in /api/v1/game:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }

}
