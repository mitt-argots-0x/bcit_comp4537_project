import { cookies } from 'next/headers';

export async function GET(req) {
    const cookieStore = await cookies();
    const session = cookieStore.get('sessionToken');
    
    if(session) {
        return Response.json({ isLoggedIn: true });
    } else {
        return Response.json({ isLoggedIn: false });
    }
}