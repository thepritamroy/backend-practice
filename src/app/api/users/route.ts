import { NextResponse } from 'next/server';
// import jwt from 'jsonwebtoken';

export async function GET(req:Request) {
  const origin = req.headers.get('origin') || '*';
  const authHeader = req.headers.get('authorization');
  const token = authHeader?.split(' ')[1]; // Extract "Bearer <token>"

  // 1. Deny access if no token
  if (!token) {
    return new NextResponse(
      JSON.stringify({ error: 'Unauthorized: No token provided' }),
      {
        status: 401,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': origin,
          'Access-Control-Allow-Methods': 'GET, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type, Authorization',
        },
      }
    );
  }

  // 2. Verify token
  try {
    // const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // 3. Mock user data (replace with DB query)
    const users = [
      { id: 1, username: 'user1', roles: ['user'] },
      { id: 2, username: 'admin', roles: ['admin'] },
    ];

    // 4. Return success response
    return new NextResponse(
      JSON.stringify({ users, accessToken: token }), // Reuse token or refresh it
      {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': origin,
          'Access-Control-Allow-Methods': 'GET, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type, Authorization',
          'Access-Control-Allow-Credentials': 'true',
        },
      }
    );
  } catch (err) {
    // 5. Handle invalid/expired tokens
    console.error(err)
    return new NextResponse(
      JSON.stringify({ error: 'Unauthorized: Invalid token' }),
      {
        status: 401,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': origin,
          'Access-Control-Allow-Methods': 'GET, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type, Authorization',
        },
      }
    );
  }
}

// Optional: Handle OPTIONS preflight for CORS
export async function OPTIONS() {
  return new NextResponse(null, {
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    },
  });
}