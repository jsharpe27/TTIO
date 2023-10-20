import db from "@/lib/db";
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";
const supabase = createRouteHandlerClient({ cookies });

export async function GET(request: Request) {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return NextResponse.redirect(`${process.env.NEXT_PUBLIC_BASE_URL}?error=Please login Again!`)

  const {id} = await request.json()

  try {
    const profile = await db.profile.findUnique({
      where:{
        userId: id
      }
    })

    return new NextResponse(JSON.stringify({
      success: true,
      profile
    }));

  } catch (error) {
    console.log('THERE WAS AN ERROR GETTING THE PROFILE', error);
    return new NextResponse(JSON.stringify({
      success: false,
      error
    }));
  
  }
}
export async function PUT(request: Request) {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return NextResponse.redirect(`${process.env.NEXT_PUBLIC_BASE_URL}?error=Please login Again!`)

  const body = await request.json();

  try {

    const response = await db.profile.update({
      where: {
        userId: body.userId,
      },
      data: {
        email: body.email,
        name: body.name,
        username: body.username,
        bio: body.bio,
        website: body.website,
        avatar: body.avatar,
      },
    });

    return NextResponse.json({
      success: true,
      data: response,
    });
    
  } catch (error) {
    console.log('THERE WAS AN ERROR UPDATING THE PROFILE', error);
    return NextResponse.json({
      success: false,
      error: error,
    });
  }
}

export async function POST(request: Request) {
  const body = await request.json();

  try {
    const response = await db.profile.create({
      data: {
        userId: body.userId,
        email: body.email,
      },
    });

    return NextResponse.json({
      success: true,
      data: response,
    });

  } catch (error) {
    console.log('THERE WAS AN ERROR CREATING THE PROFILE', error);
    
    return NextResponse.json({
      success: false,
      error: error,
    });
  }
}