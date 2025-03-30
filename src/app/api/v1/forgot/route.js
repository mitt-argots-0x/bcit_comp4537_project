import connectToDatabase from '../../../../lib/mongodb';
import emailjs from 'emailjs-com';
require("dotenv").config();

export default async function POST(req) {
    try {
        const { db } = await connectToDatabase();
        const body = await req.json();

        const response = await emailjs.send(
            process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID,
            process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID,
            {
                user_name: userName,
                user_email: email,
                reset_link: resetLink,
            },
            process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY
        );


        const existingUser = await db.collection('users').findOne({ email: body.email });
        if (existingUser) {

            return Response.json({
                success: true,
                message: "User exists",
                formData: body
            },
                { status: 400, headers: { "Content-Type": "application/json" } }
            );
        }

    } catch (error) {
        console.log(error);
        return new Response(JSON.stringify({
            error: "Something went wrong"
        }), { status: 500, headers: { "Content-Type": "application/json" } });
    }
}