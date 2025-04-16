import { NextResponse } from "next/server";
import { users } from "../../../../db";

export async function POST(req:Request) {
console.log("total users ",users)
  const origin = req.headers.get('origin');
  
  const {user,pwd} = await req.json();

  const foundUser = users.find((u)=>u.user === user);
  const foundPwd = users.find((u)=>u.pwd === pwd);

  if(foundUser && foundPwd){
    return new NextResponse(JSON.stringify({user,pwd,roles:['user'],accessToken: `${user}-access-token`}),
    {
      status : 200,
      headers : {
        'Access-Control-Allow-Origin': origin || '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      'Access-Control-Allow-Credentials': 'true',
      }

    })
    // throw { status: 409, message: "username already exists" };
  }else if(foundUser || foundPwd){
    return new NextResponse(JSON.stringify({message:"Invalid credentials"}),
    {
      status : 400,
      headers : {
        'Access-Control-Allow-Origin': origin || '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      'Access-Control-Allow-Credentials': 'true',
      }

    })
  }
 

  return new NextResponse(JSON.stringify({message:"Unathourized"}),
  {
    status : 401,
    headers : {
      'Access-Control-Allow-Origin': origin || '*',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    'Access-Control-Allow-Credentials': 'true',
    }

  })

}