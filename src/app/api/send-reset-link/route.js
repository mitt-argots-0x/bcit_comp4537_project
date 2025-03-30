import connectToDatabase from '../../../lib/mongodb';
import { cookies } from 'next/headers';
import { hash, compare } from '../../../lib/hash';
import emailjs from '@emailjs/nodejs';
import crypto from 'crypto'

export async function POST(req) {
  try {
    const {db} = await connectToDatabase();
    const body = await req.json();
    const { email } = body;


    const user = await db.collection('users').findOne({ email });

    if (!user) {
      return Response.json({ success: false, message: 'Email not found' }, { status: 404 });
    }

    const resetToken = crypto.randomUUID();
    // const resetLink = `http://localhost:3000/reset-password?token=${resetToken}`;
    const resetLink = `https://edge21-crt9y.ondigitalocean.app/reset-password?token=${resetToken}`;

    // after 15 minutes, this token will be expired
    const tokenExpiry = new Date(Date.now() + 1000 * 60 * 15);
    await db.collection('users').updateOne(
      { email },
      {
        $set: {
          resetToken,
          resetTokenExpiry: tokenExpiry
        }
      }
    );

    await emailjs.send(
        process.env.EMAILJS_SERVICE_ID,
        process.env.EMAILJS_TEMPLATE_ID,
        {
          user_email: email,
          reset_link: resetLink,
        },
        {publicKey: process.env.EMAILJS_PUBLIC_KEY}
    );



    return Response.json({ success: true, message: 'Reset link sent' });
  } catch (error) {
    console.error(error);
    return Response.json({ success: false, message: 'Server error' }, { status: 500 });
  }
}
