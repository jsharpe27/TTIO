'use client'

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog"
import AuthForm from "./AuthForm"
import { useLoginModal } from "@/hooks/LoginModal";
import { Separator } from "./ui/separator";
import { Button } from "./ui/button";
import Image from "next/image";
import Link from "next/link";

const LoginModal = () => {

    const loginState = useLoginModal();

    return (
        <Dialog open={loginState.isOpen} onOpenChange={loginState.close}
        >
            <DialogContent
                className="w-full max-w-md mx-auto p-4 flex flex-col items-center"
            >
                <DialogHeader
                    className="flex items-center justify-center space-y-4"
                >
                    <DialogTitle
                        className="text-2xl font-bold text-primary/80"
                    >
                        Login/SignUp
                    </DialogTitle>
                    <Separator className="bg-primary/20 w-72" />
                </DialogHeader>

                <AuthForm />
            </DialogContent>
        </Dialog>
    )
}

export default LoginModal