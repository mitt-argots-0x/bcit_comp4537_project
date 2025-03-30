import connectToDatabase from '../../../lib/mongodb';
import { hash } from '../../../lib/hash'; // your hashing logic
import { ObjectId } from 'mongodb';

export async function PATCH(req) {
  try {
    const body = await req.json();
    const { token, password } = body;

    const { db } = await connectToDatabase();

    const user = await db.collection('users').findOne({ resetToken: token });

    if (!user) {
      return Response.json({ success: false, message: 'Invalid token' }, { status: 400 });
    }

    if (new Date() > new Date(user.resetTokenExpiry)) {
      return Response.json({ success: false, message: 'Token expired' }, { status: 400 });
    }

    const hashedPassword = hash(password);

    // Update password and clear token
    await db.collection('users').updateOne(
      { _id: new ObjectId(user._id) },
      {
        $set: { password: hashedPassword },
        $unset: { resetToken: "", resetTokenExpiry: "" }
      }
    );

    return Response.json({ success: true, message: 'Password updated' });
  } catch (error) {
    console.error(error);
    return Response.json({ success: false, message: 'Server error' }, { status: 500 });
  }
}
