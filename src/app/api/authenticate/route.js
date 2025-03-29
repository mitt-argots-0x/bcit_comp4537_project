import { cookies } from 'next/headers';
import connectToDatabase from '../../../lib/mongodb';
import { hash } from '../../../lib/hash';

/*
  Endpoint used to authenticate if users are logged in to access protected pages such as dashboard, game, etc.
*/
export async function GET() {
  const cookieStore = await cookies();
  const sessionToken = cookieStore.get('sessionToken')?.value;

  if (!sessionToken) {
    return new Response(JSON.stringify({ error: "Not authenticated" }), { status: 401 });
  }

  const { db } = await connectToDatabase();
  const hashedToken = hash(sessionToken);

  const session = await db.collection('sessions').findOne({ token: hashedToken });
  if (!session || new Date(session.expiry) < new Date()) {
    return new Response(JSON.stringify({ error: "Session expired or invalid" }), { status: 401 });
  }

  return new Response(JSON.stringify({ email: session.email }), { status: 200 });
}