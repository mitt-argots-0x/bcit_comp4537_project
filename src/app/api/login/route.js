import connectToDatabase from '../../../lib/mongodb';
import { cookies } from 'next/headers';
import { hash, compare } from '../../../lib/hash';
import crypto from 'crypto'

export async function POST(req){
    try{
        const {db} = await connectToDatabase();
        const body = await req.json();
        
        // Validation errors object
        const errors = {};

        if (!body.email || !/^[\w.-]+@([\w-]+\.)+[a-zA-Z]{2,}$/.test(body.email)) {
            errors.email = "Valid email is required";
        }
        if (!body.password || body.password.length < 3) {
            errors.password = "Password must be at least 3 characters";
        }

        // If there are errors, return them along with the partially filled data
        if (Object.keys(errors).length > 0) {
            return Response.json({
                success: false,
                message: errors.email + errors.password,
                formData: body
            },
                { status: 400, headers: { "Content-Type": "application/json" } }
            );
        }

        console.log(errors.length)

        //checks for existing user with same email
        const existingUser = await db.collection('users').findOne({ email: body.email });
        console.log(existingUser)
        if(!existingUser){
            return Response.json({
                success: false,
                message: "User does not exist",
                formData: body
            },
                { status: 400, headers: { "Content-Type": "application/json" } }
            );
        }

        const correctPassword = compare(body.password, existingUser.password);

        if (!correctPassword) {
            return Response.json({ success: false, message: 'Incorrect Password or Username!', formData: body }, { status: 401 })
        }

        const hashedSession = hash(crypto.randomBytes(32).toString("hex"));
        const newSession = await db.collection('sessions').insertOne({email: body.email, token: hashedSession, expiry: new Date(Date.now() + 60 * 60 * 1000)})
        
        await cookies().set({
            name: 'sessionToken',
            value: hashedSession,
            httpOnly: true,
            path: '/',
            sameSite: 'strict',
            secure: true,
            maxAge: 60 * 60 // 1 Hour
        });

    } catch(error) {
        console.log(error);
        return new Response(JSON.stringify({
            error: "Something went wrong"
        }), { status: 500, headers: { "Content-Type": "application/json" } });
    }
}