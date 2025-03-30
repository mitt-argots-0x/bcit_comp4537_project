export default function Docs() {
    return (
      <div className="p-8 text-white bg-gray-900 min-h-screen">
        <h1 className="text-3xl font-bold mb-6">Edge21 API Documentation</h1>
  
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-2">POST /api/signup</h2>
          <p>Registers a new user.</p>
          <pre className="bg-gray-800 p-4 rounded mt-2 text-sm">
  {`Request Body:
  {
    "email": "string",
    "password": "string",
    "confirmPassword": "string"
  }`}
          </pre>
          <p className="mt-2">Response: <code>{`200 OK`}</code> or validation errors</p>
        </section>
  
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-2">POST /api/login</h2>
          <p>Authenticates a user.</p>
          <pre className="bg-gray-800 p-4 rounded mt-2 text-sm">
  {`Request Body:
  {
    "email": "string",
    "password": "string"
  }`}
          </pre>
          <p className="mt-2">Response: <code>{`200 OK`}</code> with session token</p>
        </section>
  
        {/* Add more endpoints as needed */}
      </div>
    );
  }
  