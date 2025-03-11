export async function POST(req) {
    try {
      const body = await req.json();
      console.log("Received Data:", body);

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
                formData: body },
                { status: 400, headers: { "Content-Type": "application/json" } }
            );
        }
  
        return new Response(JSON.stringify({
            message: "Form submitted successfully",
            formData: body
        }), { status: 200, headers: { "Content-Type": "application/json" } });
    } catch (error) {
        return new Response(JSON.stringify({
            error: "Something went wrong"
        }), { status: 500, headers: { "Content-Type": "application/json" } });    }
}