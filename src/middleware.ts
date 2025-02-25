// middleware.ts
import { NextResponse, NextRequest } from 'next/server';
import { decodeToken } from '../src/app/utils/jwt';

export function middleware(request: NextRequest) {
    console.log("In middleware")
    // console.log("Received Headers:", JSON.stringify(Object.fromEntries(request.headers.entries()), null, 2));
    const bearertoken = request.headers.get('authorization');

    if (!bearertoken) {
        return NextResponse.json({ message: "Authentication Failed" }, { status: 401 });
    }

    // Extract and decode the token
    const token = bearertoken.replace('Bearer ', '');
    const decodedToken = decodeToken(token);

    if (!decodedToken || typeof decodedToken !== "object" || !("user" in decodedToken)) {
        return NextResponse.json({ message: "Invalid token structure" }, { status: 401 });
    }

    // Create a new Headers instance so we can pass the user ID to the next handlers.
    const requestHeaders = new Headers(request.headers);
    requestHeaders.set('x-user-id', decodedToken.user.id);

    // Pass the updated headers along to the next response.
    return NextResponse.next({
        request: {
            headers: requestHeaders,
        },
    });
}

// Exclude routes starting with /api/free-route
export const config = {
    matcher: ['/api/controllers/videos'],
};
