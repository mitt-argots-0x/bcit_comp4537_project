'use client';
// This document is AI generated (Steven)
export default function ApiDocs() {
    return (
        <div className="p-8 max-w-3xl mx-auto text-white bg-gray-900 min-h-screen">
            <h1 className="text-3xl font-bold mb-6">API Documentation (v1)</h1>

            <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-2">POST /api/v1/admin</h2>
                <p>Displays admin information.</p>
                <h3 className="font-semibold mt-2">Request Body:</h3>
                <pre className="bg-gray-800 p-3 rounded text-sm">{`
{
    "email": "string",
    "session": "string",
}`}</pre>
                <h3 className="font-semibold mt-2">Response (200):</h3>
                <pre className="bg-gray-800 p-3 rounded text-sm">{`
[
    {
        "email": "user1@example.com",
        "admin": 5,
        "dashboard": 3,
        "forgot": 0,
        "game": 12,
        "login": 7,
        "resetPassword": 1,
        "sendResetLink": 2,
        "signout": 4,
        "signup": 8
    },
    {
        "email": "user2@example.com",
        "admin": 2,
        "dashboard": 0,
        "forgot": 1,
        "game": 6,
        "login": 5,
        "resetPassword": 0,
        "sendResetLink": 1,
        "signout": 2,
        "signup": 3
    }
]`}
                </pre>
                <h3 className="font-semibold mt-2">Response (401):</h3>
                <pre className="bg-gray-800 p-3 rounded text-sm">{`
{
  "error": "Invalid session"
}
`}
                </pre>
                <h3 className="font-semibold mt-2">Response (500):</h3>
                <pre className="bg-gray-800 p-3 rounded text-sm">{`
{
  "error": "Something went wrong"
}
`}
                </pre>
            </section>

            <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-2">POST /api/v1/dashboard</h2>
                <p>Returns the number of game API calls made by the user.</p>

                <h3 className="font-semibold mt-2">Request Body:</h3>
                <pre className="bg-gray-800 p-3 rounded text-sm">{`
{
    "email": "string",
    "session": "string"
}`}</pre>

                <h3 className="font-semibold mt-2">Response (200):</h3>
                <pre className="bg-gray-800 p-3 rounded text-sm">{`
{
    "numcalls": 12
}
`}</pre>

                <h3 className="font-semibold mt-2">Response (308):</h3>
                <pre className="bg-gray-800 p-3 rounded text-sm">{`
{
    "message": "Something Redirected"
}
`}</pre>

                <h3 className="font-semibold mt-2">Response (500):</h3>
                <pre className="bg-gray-800 p-3 rounded text-sm">{`
{
    "error": "Something went wrong"
}
`}</pre>
            </section>


            <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-2">POST /api/v1/forgot</h2>
                <p>Sends a password reset email to the user via EmailJS and logs the request.</p>

                <h3 className="font-semibold mt-2">Request Body:</h3>
                <pre className="bg-gray-800 p-3 rounded text-sm">{`
{
    "email": "string",
    "userName": "string",
    "resetLink": "string"
}
`}</pre>

                <h3 className="font-semibold mt-2">Response (200):</h3>
                <pre className="bg-gray-800 p-3 rounded text-sm">{`
{
    "success": true,
    "message": "Reset link sent"
}
`}</pre>

                <h3 className="font-semibold mt-2">Response (400):</h3>
                <pre className="bg-gray-800 p-3 rounded text-sm">{`
{
    "success": true,
    "message": "User exists",
    "formData": {
        "email": "string",
        "userName": "string",
        "resetLink": "string"
    }
}
`}</pre>

                <h3 className="font-semibold mt-2">Response (500):</h3>
                <pre className="bg-gray-800 p-3 rounded text-sm">{`
{
    "error": "Something went wrong"
}
`}</pre>
            </section>

            <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-2">GET /api/v1/game</h2>
                <p>Logs a game API usage and returns a simple confirmation message.</p>

                <h3 className="font-semibold mt-2">Query Parameters:</h3>
                <pre className="bg-gray-800 p-3 rounded text-sm">{`
?email=string (required)
`}</pre>

                <h3 className="font-semibold mt-2">Response (200):</h3>
                <pre className="bg-gray-800 p-3 rounded text-sm">{`
{
    "message": "Game API is running"
}
`}</pre>

                <h3 className="font-semibold mt-2">Response (400):</h3>
                <pre className="bg-gray-800 p-3 rounded text-sm">{`
{
    "error": "Missing email parameter"
}
`}</pre>

                <h3 className="font-semibold mt-2">Response (500):</h3>
                <pre className="bg-gray-800 p-3 rounded text-sm">{`
{
    "error": "Internal Server Error"
}
`}</pre>
            </section>
            <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-2">POST /api/v1/login</h2>
                <p>Logs a login attempt, verifies user credentials, and returns a session token on success.</p>

                <h3 className="font-semibold mt-2">Request Body:</h3>
                <pre className="bg-gray-800 p-3 rounded text-sm">{`
{
    "email": "string",
    "password": "string"
}
`}</pre>

                <h3 className="font-semibold mt-2">Response (200):</h3>
                <pre className="bg-gray-800 p-3 rounded text-sm">{`
{
    "message": "Login success",
    "email": "user@example.com",
    "sessionToken": "hashed_token",
    "formData": {
        "email": "user@example.com",
        "password": "******"
    }
}
`}</pre>

                <h3 className="font-semibold mt-2">Response (400) - Validation Error:</h3>
                <pre className="bg-gray-800 p-3 rounded text-sm">{`
{
    "success": false,
    "message": "Password must be at least 3 characters",
    "formData": {
        "email": "user@example.com",
        "password": ""
    }
}
`}</pre>

                <h3 className="font-semibold mt-2">Response (400) - User does not exist:</h3>
                <pre className="bg-gray-800 p-3 rounded text-sm">{`
{
    "success": false,
    "message": "User does not exist",
    "formData": { ... }
}
`}</pre>

                <h3 className="font-semibold mt-2">Response (400) - Incorrect Password:</h3>
                <pre className="bg-gray-800 p-3 rounded text-sm">{`
{
    "message": "Login failure",
    "formData": { ... }
}
`}</pre>

                <h3 className="font-semibold mt-2">Response (500):</h3>
                <pre className="bg-gray-800 p-3 rounded text-sm">{`
{
    "error": "Something went wrong"
}
`}</pre>
            </section>
            <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-2">PATCH /api/v1/reset-password</h2>
                <p>Resets a user's password using a valid reset token and clears the reset token after successful reset.</p>

                <h3 className="font-semibold mt-2">Request Body:</h3>
                <pre className="bg-gray-800 p-3 rounded text-sm">{`
{
    "email": "string",
    "token": "string",
    "password": "string"
}
`}</pre>

                <h3 className="font-semibold mt-2">Response (200):</h3>
                <pre className="bg-gray-800 p-3 rounded text-sm">{`
{
    "success": true,
    "message": "Password updated"
}
`}</pre>

                <h3 className="font-semibold mt-2">Response (400) - Invalid Token:</h3>
                <pre className="bg-gray-800 p-3 rounded text-sm">{`
{
    "success": false,
    "message": "Invalid token"
}
`}</pre>

                <h3 className="font-semibold mt-2">Response (400) - Token Expired:</h3>
                <pre className="bg-gray-800 p-3 rounded text-sm">{`
{
    "success": false,
    "message": "Token expired"
}
`}</pre>

                <h3 className="font-semibold mt-2">Response (500):</h3>
                <pre className="bg-gray-800 p-3 rounded text-sm">{`
{
    "success": false,
    "message": "Server error"
}
`}</pre>
            </section>

            <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-2">POST /api/v1/send-reset-link</h2>
                <p>Generates and sends a password reset link to the specified email if it exists in the system.</p>

                <h3 className="font-semibold mt-2">Request Body:</h3>
                <pre className="bg-gray-800 p-3 rounded text-sm">{`
{
    "email": "string"
}
`}</pre>

                <h3 className="font-semibold mt-2">Response (200):</h3>
                <pre className="bg-gray-800 p-3 rounded text-sm">{`
{
    "success": true,
    "message": "Reset link sent"
}
`}</pre>

                <h3 className="font-semibold mt-2">Response (404) - Email Not Found:</h3>
                <pre className="bg-gray-800 p-3 rounded text-sm">{`
{
    "success": false,
    "message": "Email not found"
}
`}</pre>

                <h3 className="font-semibold mt-2">Response (500):</h3>
                <pre className="bg-gray-800 p-3 rounded text-sm">{`
{
    "success": false,
    "message": "Server error"
}
`}</pre>
            </section>
            <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-2">GET /api/v1/session</h2>
                <p>Checks if the user has a valid session token stored in an HTTP-only cookie.</p>

                <h3 className="font-semibold mt-2">Request:</h3>
                <p>No request body required.</p>

                <h3 className="font-semibold mt-2">Response (200) - Session Active:</h3>
                <pre className="bg-gray-800 p-3 rounded text-sm">{`
{
    "isLoggedIn": true
}
`}</pre>

                <h3 className="font-semibold mt-2">Response (200) - No Session:</h3>
                <pre className="bg-gray-800 p-3 rounded text-sm">{`
{
    "isLoggedIn": false
}
`}</pre>

                <h3 className="font-semibold mt-2">Response (500):</h3>
                <pre className="bg-gray-800 p-3 rounded text-sm">{`
{
    "error": "Something went wrong"
}
`}</pre>
            </section>
            <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-2">DELETE /api/v1/signout</h2>
                <p>Logs the user out by deleting the session token and clearing the session cookie.</p>

                <h3 className="font-semibold mt-2">Request Body:</h3>
                <pre className="bg-gray-800 p-3 rounded text-sm">{`
{
    "email": "string"
}
`}</pre>

                <h3 className="font-semibold mt-2">Response (200) - Success:</h3>
                <pre className="bg-gray-800 p-3 rounded text-sm">{`
{
    "message": "Sign out success",
    "email": "user@example.com"
}
`}</pre>

                <h3 className="font-semibold mt-2">Response (400) - Missing Session Token:</h3>
                <pre className="bg-gray-800 p-3 rounded text-sm">{`
{
    "error": "No session token found"
}
`}</pre>

                <h3 className="font-semibold mt-2">Response (500):</h3>
                <pre className="bg-gray-800 p-3 rounded text-sm">{`
{
    "error": "Something went wrong"
}
`}</pre>
            </section>
            <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-2">POST /api/v1/signup</h2>
                <p>Registers a new user, creates session and logs the signup API call.</p>

                <h3 className="font-semibold mt-2">Request Body:</h3>
                <pre className="bg-gray-800 p-3 rounded text-sm">{`
{
    "email": "string",
    "password": "string",
    "confirmPassword": "string"
}
`}</pre>

                <h3 className="font-semibold mt-2">Response (200) - Successful Registration:</h3>
                <pre className="bg-gray-800 p-3 rounded text-sm">{`
{
    "message": "Signup success",
    "formData": {
        "email": "user@example.com",
        "password": "*******",
        "confirmPassword": "*******"
    },
    "email": "user@example.com",
    "sessionToken": "hashed_token"
}
`}</pre>

                <h3 className="font-semibold mt-2">Response (400) - Validation Errors:</h3>
                <pre className="bg-gray-800 p-3 rounded text-sm">{`
{
    "success": false,
    "errors": {
        "email": "Valid email is required",
        "password": "Password must be at least 3 characters",
        "confirmPassword": "Passwords do not match"
    },
    "formData": { ... }
}
`}</pre>

                <h3 className="font-semibold mt-2">Response (400) - User Already Exists:</h3>
                <pre className="bg-gray-800 p-3 rounded text-sm">{`
{
    "success": false,
    "message": "User already exists",
    "formData": { ... }
}
`}</pre>

                <h3 className="font-semibold mt-2">Response (500):</h3>
                <pre className="bg-gray-800 p-3 rounded text-sm">{`
{
    "error": "Something went wrong"
}
`}</pre>
            </section>

        </div>
    );
}
