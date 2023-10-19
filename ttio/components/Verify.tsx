'use client'

import { useSignUpState } from "@/hooks/SignUpState"
import { Button } from "./ui/button"

const Verify = () => {
  const signupState = useSignUpState();

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
                        window.open('https://mail.google.com/mail/u/0/#inbox')
                    }
                }
            >
                Open Mail
            </Button>
        </div>
  )
}

export default Verify