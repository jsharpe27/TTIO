'use client'

import { Menu } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "./ui/dropdown-menu"
import { Button } from "./ui/button";
import { useLoginModal } from "@/hooks/LoginModal";
import { User } from "@supabase/supabase-js";
import { useEffect, useState } from "react";
import LinksMenu from "./LinksMenu";

interface MobileMenuBarProps {
    user: User | null;
}

const MobileMenuBar = ({ user }: MobileMenuBarProps) => {
    const loginState = useLoginModal();
    const [anonToken, setAnonToken] = useState('');

    useEffect(() => {
        const anonToken = localStorage.getItem('anonToken');
        setAnonToken(anonToken!);
    }, []);

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild className="md:hidden">
                <Menu size={28} />
            </DropdownMenuTrigger>

            <DropdownMenuContent
                className="w-64"
            >
                <DropdownMenuItem
                    className="w-full flex justify-center"
                >
                    <Button
                        size={'lg'}
                        variant={'post'}
                        className="rounded-3xl"
                    >
                        Post
                    </Button>
                </DropdownMenuItem>

                {(user || anonToken) &&
                    <DropdownMenuItem>
                        <div
                            className="w-full flex justify-center"
                        >
                            <LinksMenu />
                        </div>
                    </DropdownMenuItem>
                }

                {!user && !anonToken && <DropdownMenuItem
                    className="w-full flex justify-center"
                >
                    <Button
                        size={'lg'}
                        variant={'outline'}
                        className="text-lg text-black rounded-3xl bg-white"
                        onClick={loginState.open}
                    >
                        Login/Signup
                    </Button>
                </DropdownMenuItem>}
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

export default MobileMenuBar