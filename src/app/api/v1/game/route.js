import connectToDatabase from '../../../../lib/mongodb';
import { NextResponse } from 'next/server';

export async function GET(req) {
  try {
    const { db } = await connectToDatabase();

    const email = req.nextUrl.searchParams.get('email');
    
    if (!email) {
        return NextResponse.json({ error: "Missing email parameter" }, { status: 400 });
    }

    await db.collection('apiCalls').updateOne({ email: email },{ $inc: { game: 1 } },{ upsert: true });

    return NextResponse.json({ message: "Game API is running" });
} catch (error) {
    console.error("Error in /api/v1/game:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
}

}
