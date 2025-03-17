import connectToDatabase from '../../../lib/mongodb';
import { compare } from '../../../lib/hash';

export async function POST(req){
    try{
        const {db} = await connectToDatabase();
        const body = await req.json();
        
        // Validation errors object
        const errors = {};

        if (!body.email || !/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(body.email)) {
            errors.email = "Valid email is required";
        }
        if (!body.password || body.password.length < 6) {
            errors.password = "Password must be at least 6 characters";
        }

        // If there are errors, return them along with the partially filled data
        if (Object.keys(errors).length > 0) {
            return Response.json({
                success: false,
                errors,
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
        if(correctPassword){
            console.log("Password match");
            return new Response(JSON.stringify({
                message: "Login success",
                formData: body
            }), { status: 200, headers: { "Content-Type": "application/json" } });
        } else {
            console.log("Password not match.")
            return new Response(JSON.stringify({
                message: "Login failure",
                formData: body
            }), { status: 400, headers: { "Content-Type": "application/json" } });
        }
        

    } catch(error) {
        console.log(error);
        return new Response(JSON.stringify({
            error: "Something went wrong"
        }), { status: 500, headers: { "Content-Type": "application/json" } });
    }
}