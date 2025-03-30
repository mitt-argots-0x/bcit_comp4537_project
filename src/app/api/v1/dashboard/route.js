import connectToDatabase from '../../../../lib/mongodb';
export async function POST(req) {
    try {
        const { db } = await connectToDatabase();
        const body = await req.json();

        // log api call
        const apiCallsLog = await db.collection('apiCalls').updateOne({ email: body.email }, { $inc: { dashboard: 1 } });

        // check session
        const validSession = await db.collection('sessions').findOne({ email: body.email, token: body.session });
        if (validSession) {
            const user = await db.collection('apiCalls').findOne({ email: body.email })
            const numcalls = user?.game ?? 0;
            return new Response(JSON.stringify({ numcalls }))
        }

    } catch (error) {
        console.log(error)
        return new Response(JSON.stringify({
            error: "Something went wrong"
        }), { status: 500, headers: { "Content-Type": "application/json" } });
    }

    return new Response(JSON.stringify({
        message: "Something Redirected"
    }), { status: 308, headers: { "Content-Type": "application/json" } });
}