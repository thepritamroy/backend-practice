import { NextResponse } from "next/server";
import { users } from "../../../../db";

export async function POST(req:Request) {

  const origin = req.headers.get('origin');
  
  const {user,pwd} = await req.json();

  const foundUser = users.find((u)=>u.user === user);

  if(foundUser){
    return new NextResponse(JSON.stringify({message:"username already exist"}),
    {
      status : 409,
      headers : {
      'Access-Control-Allow-Origin': origin || '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      'Access-Control-Allow-Credentials': 'true',
      }

    })
    // throw { status: 409, message: "username already exists" };
  }

  const newUser = {
    user,
    pwd,
    accessToken: `${user}-access-token`,
    roles : ['user']
  }

  users.push(newUser);

  return new NextResponse(JSON.stringify({message:"signup successful"}),
  {
    status : 200,
    headers : {
    'Access-Control-Allow-Origin': origin || '*',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    'Access-Control-Allow-Credentials': 'true',
    }

  })

}