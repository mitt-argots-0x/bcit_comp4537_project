import connectToDatabase from '../../../lib/mongodb';
import { hash } from '../../../lib/hash';

export async function POST(req) {
    try {
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
        if (body.confirmPassword !== body.password) {
            errors.confirmPassword = "Passwords do not match";
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
        //checks for existing user with same email
        const existingUser = await db.collection('users').findOne({ email: body.email });
        if (existingUser) {
            return Response.json({
                success: false,
                message: "User already exists",
                formData: body
            },
                { status: 400, headers: { "Content-Type": "application/json" } }
            );
        }

        //hash password with bcrypt
        const hashedPassword = await hash(body.password);

        //send to db
        const newUser = await db.collection('users').insertOne({ email: body.email, password: hashedPassword, numcalls: 0 });

        return new Response(JSON.stringify({
            message: "Signup success",
            formData: body
        }), { status: 200, headers: { "Content-Type": "application/json" } });
    } catch (error) {
        console.log(error)
        return new Response(JSON.stringify({
            error: "Something went wrong"
        }), { status: 500, headers: { "Content-Type": "application/json" } });
    }
}