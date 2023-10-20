'use client'

import { useSignUpState } from "@/hooks/SignUpState"
import { Button } from "./ui/button"

const Verify = () => {
    const signupState = useSignUpState();

    const openEmailProvider = (email: string) => {
        const domain = email.split('@')[1];

        const emailProviders: {
            [key: string]: string;
        } = {
            'gmail.com': 'https://mail.google.com/mail/u/0/#inbox',
            'outlook.com': 'https://outlook.live.com/owa/',
            'yahoo.com': 'https://mail.yahoo.com',
            'hotmail.com': 'https://outlook.live.com/owa/',
            'msn.com': 'https://outlook.live.com/owa/',
        };

        const defaultProvider = 'https://mail.google.com/mail/u/0/#inbox'; // default to gmail

        if (emailProviders[domain]) {
            window.open(emailProviders[domain]);
        } else {
            window.open(defaultProvider);
        }
    }

    return (
        <div
            className="flex flex-col w-full items-center justify-center gap-y-4 h-screen"
        >
            <h1
                className="text-3xl font-bold text-primary"
            >
                Please verify your email to continue
            </h1>


            <p
                className="text-sm text-primary/50"
            >
                We sent an email to
                <span className="font-bold"> {signupState.email} </span>
                with a link to verify your account.
            </p>

            <Button
                variant={'post'}
                className="rounded-3xl"
                size={'lg'}
                onClick={
                    () => {
                        openEmailProvider(signupState.email);
                    }
                }
            >
                Open Mail
            </Button>
        </div>
    )
}

export default Verify