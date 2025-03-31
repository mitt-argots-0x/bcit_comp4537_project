import connectToDatabase from '../../../../lib/mongodb';
import { cookies } from 'next/headers';

export async function DELETE(req){
    try{
        const {db} = await connectToDatabase();
        
        const cookieStore = await cookies();
        const sessionToken = cookieStore.get('sessionToken')?.value;

        //check sessionToken from cookie
        if(!sessionToken){
            return new Response(JSON.stringify({error:"No session token found"}), {status: 400});
        }
        
        //find session in db
        const session = await db.collection('sessions').findOne({ token: sessionToken });

        if (!session) {
            return new Response(JSON.stringify({ error: "Session not found" }), { status: 404 });
        }        

        const email = session.email;

        // log api call
        const apiCallsLog = await db.collection('apiCalls').updateOne({email: email}, {$inc: {signout: 1}});

        await db.collection('sessions').deleteOne({token:sessionToken});

        // overwrites and immediately ends cookie
        cookieStore.set({
            name: 'sessionToken',
            value: '',
            httpOnly: true,
            path: '/',
            sameSite: 'strict',
            secure: true,
            maxAge: 0
        });

        return new Response(JSON.stringify({
            message: "Sign out success",
        }), { status: 200, headers: { "Content-Type": "application/json" } });

    } catch(error) {
        console.log(error);
        return new Response(JSON.stringify({
            error: "Something went wrong"
        }), { status: 500, headers: { "Content-Type": "application/json" } });
    }
}