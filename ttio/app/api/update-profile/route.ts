import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  var body = await request.json();
  const supabase = createRouteHandlerClient({ cookies });

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (user) {
    const { data, error } = await supabase
      .from("profiles")
      .update({
        username: body.username,
      })
      .eq("id", user?.id);

    let responseJSON = {};
    if (!error) {
      responseJSON = { message: "Profile updated successfully", data };

      return NextResponse.json(responseJSON);
    } else {
      responseJSON = { error: error };

      return NextResponse.json(responseJSON)
    }
  }
}
