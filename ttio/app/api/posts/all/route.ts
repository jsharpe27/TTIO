import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";
// read all
export async function GET(request: Request) {
    const supabase = createRouteHandlerClient({ cookies });
    const {
        data: { user },
    } = await supabase.auth.getUser();
    if (!user) return NextResponse.redirect(`/login?error=Please login Again!`) // redirect if not authenticated

    let { data, error } = await supabase
    .from('posts')
    .select('*')
     .eq("user_id", user?.id);

    if (error) {
        return NextResponse.json({
            success: false,
            error
        });
    } else {
        return NextResponse.json({
            success: true,
            data
        })
    }
}