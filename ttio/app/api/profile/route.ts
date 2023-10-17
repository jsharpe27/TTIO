import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

const getProfile = async (id: any) => {
  const supabase = createRouteHandlerClient({ cookies });
  const { data, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", id)

  return { profile: data ? data[0] : null, err: error };
}

export async function GET(request: Request) {
  const supabase = createRouteHandlerClient({ cookies });
  const {
    data: { user },
  } = await supabase.auth.getUser();
  const requestUrl = new URL(request.url)
  if (!user) return NextResponse.redirect(`${requestUrl.origin}/login?error=Please login Again!`)

  const result = await getProfile(user.id)
  if (result.err) {
    return NextResponse.json({
      success: false,
      error: result.err
    });
  } else {
    return NextResponse.json({
      success: true,
      profile: result.profile
    })
  }
}
export async function PUT(request: Request) {
  const supabase = createRouteHandlerClient({ cookies });
  const {
    data: { user },
  } = await supabase.auth.getUser();
  const requestUrl = new URL(request.url)
  if (!user) return NextResponse.redirect(`${requestUrl.origin}/login?error=Please login Again!`)

  const body = await request.json();

  const result = await getProfile(user.id)
  if (result.err) return NextResponse.json({
    success: false,
    error: result.err
  });

  const { data, error } = await supabase
    .from("profiles")
    .update({
      username: body.username ? body.username : result.profile.username,
      full_name: body.full_name ? body.full_nameusername : result.profile.full_name,
      avatar_url: body.avatar_url ? body.avatar_url : result.profile.avatar_url,
      website: body.website ? body.website : result.profile.website,
    })
    .eq("id", user.id);

  if (error) {
    return NextResponse.json({
      success: false,
      error
    });
  } else {
    return NextResponse.json({
      success: true,
      data
    });
  }

}

