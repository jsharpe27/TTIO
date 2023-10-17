import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";
// read one post by id
export async function GET(request: Request) {
    const supabase = createRouteHandlerClient({ cookies });
    const {
        data: { user },
    } = await supabase.auth.getUser();
    const requestUrl = new URL(request.url)
    if (!user) return NextResponse.redirect(`${requestUrl.origin}/login?error=Please login Again!`) // redirect if not authenticated
    const { id } = await request.json();
    if (!id) return NextResponse.json({ success: false, message: "Invalid id!" });
    let { data, error } = await supabase
    .from('posts')
    .select('*')
     .eq("id", id);

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
// create
export async function POST(request: Request) {
    const supabase = createRouteHandlerClient({ cookies });
    const {
        data: { user },
    } = await supabase.auth.getUser();
    const requestUrl = new URL(request.url)
    if (!user) return NextResponse.redirect(`${requestUrl.origin}/login?error=Please login Again!`) // redirect if not authenticated

    const { title, body } = await request.json();
    if (!title || !body) return NextResponse.json({ success: false, message: "Invalid data!" });
    const { data, error } = await supabase
        .from("posts")
        .insert([
            { user_id: user.id },
            { title: title },
            { body: body },
        ])
        .select()
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
// update
export async function PUT(request: Request) {
    const supabase = createRouteHandlerClient({ cookies });
    const {
        data: { user },
    } = await supabase.auth.getUser();
    const requestUrl = new URL(request.url)
    if (!user) return NextResponse.redirect(`${requestUrl.origin}/login?error=Please login Again!`) // redirect if not authenticated

    const { id, title, body } = await request.json();
    if (!id || !title || !body) return NextResponse.json({ success: false, message: "Invalid data!" });

    const { data, error } = await supabase
        .from("posts")
        .update({
            title: title,
            body: body
        })
        .eq("id", id)
        .select()

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
// delete
export async function DELETE(request: Request) {
    const supabase = createRouteHandlerClient({ cookies });
    const {
        data: { user },
    } = await supabase.auth.getUser();
    const requestUrl = new URL(request.url)
    if (!user) return NextResponse.redirect(`${requestUrl.origin}/login?error=Please login Again!`) // redirect if not authenticated

    const { id } = await request.json();
    if (!id) return NextResponse.json({ success: false, message: "Invalid id!" });


    const { error } = await supabase
        .from('posts')
        .delete()
        .eq('id', id)

    if (error) {
        return NextResponse.json({
            success: false,
            error
        });
    } else {
        return NextResponse.json({
            success: true,
        })
    }
}