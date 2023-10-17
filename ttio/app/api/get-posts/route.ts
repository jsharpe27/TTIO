import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET(request: Request){
    const supabase = createRouteHandlerClient({ cookies });

    const {
        data: { user },
    } = await supabase.auth.getUser();
    
    if (user){
        const { data, error } = await supabase
            .from("posts")
            .select('title')
            .eq("id", user?.id);
    
    let responseJSON = {};
        if (!error) {
            responseJSON = { message: "Posts retrieved successfully", data };

            return NextResponse.json(responseJSON);
        } else {
            responseJSON = { error: error };

            return NextResponse.json(responseJSON)
        }
    }
}



