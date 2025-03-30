// app/api/posts/route.js
import { connectToDatabase } from '../../../../lib/mongodb';

export const dynamic = 'force-static';

export async function GET() {
  const { db } = await connectToDatabase();
  const posts = await db.collection('posts').find({}).toArray();
  return Response.json({ success: true, data: posts });
}

export async function POST(request) {
  const { db } = await connectToDatabase();
  const postData = await request.json();
  const result = await db.collection('posts').insertOne(postData);
  return Response.json({ success: true, data: result.ops[0] });
}
