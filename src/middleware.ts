
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
 
const originAllowed = process.env.NODE_ENV === 'production' ?
  ['https://example.com', 'https://form-validation-eight-omega.vercel.app','http://localhost:5173'] :
  ['http://localhost:3000', 'https://www.google.com','http://localhost:5173']


export function middleware(request: NextRequest) {

  const origin = request.headers.get('origin');
  
  console.log('Request origin:', origin)
  console.log('Allowed origins:', originAllowed)
  console.log('Is origin allowed:', origin && !originAllowed.includes(origin))

  if (request.method === 'OPTIONS') {
    return new NextResponse(null, {
      headers: {
        'Access-Control-Allow-Origin': origin || '*',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
        'Access-Control-Allow-Credentials': 'true',
      },
    })
  }

  if(origin && !originAllowed.includes(origin)){
    return new NextResponse(JSON.stringify({message: 'Not Allowed'}), {
      status : 403,
      statusText : 'Forbidden',
      headers : {
        'Content-Type' : 'application/json',
        // 'Access-Control-Allow-Origin' : origin
      }
    })
  }
  return NextResponse.next();
}
 

export const config = {
  matcher: '/api/:path*',
}