import axios from "axios";
import { NextResponse } from "next/server";

export async function POST(req:Request) {
    const {captcha} = await req.json();

    if (!captcha) {
        return new NextResponse("missing email or captcha", {status: 400});
    }

    try {
        const response = await axios.post(
            `https://www.google.com/recaptcha/api/siteverify?secret=${process.env.RECAPTCHA_SECRET_KEY}&response=${captcha}`
            , 
            {
                Headers: {
                    "Content-Type": "application/x-www-form-urlencoded; charset=utf-8"
                }
            }
        )

        const validation = response.data;
        if (validation.success){
            return new NextResponse("success", {status: 200});
        }

        return new NextResponse("failed captcha", {status: 400});

    } catch (error) {
        console.log("THERE WAS AN ERROR VERIFYING THE CAPTCHA", error);
        return new NextResponse("error", {status: 500});
    }
}