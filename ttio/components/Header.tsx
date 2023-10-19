'use client'

import Image from "next/image"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils";

import { Montserrat, Saira_Stencil_One } from 'next/font/google';
import { ModeToggle } from "./ModeToggle";
import MobileMenuBar from "./MobileMenuBar";
import { useLoginModal } from "@/hooks/LoginModal";

const font = Montserrat({ weight: "600", subsets: ["latin"] });
const font2 = Saira_Stencil_One({ weight: "400", subsets: ["latin"] });


const Header = () => {
  const loginState = useLoginModal();

  return (
    <nav className="w-full flex items-center justify-between max-w-5xl mx-auto mt-4 px-8 md:px-2">
        <div
            className="flex items-center gap-x-2"
        >
            <div
                className='w-10 h-10 md:w-16 md:h-16 relative'
            >
                <Image
                    src={'/logo.png'}
                    alt="logo"
                    layout='fill'
                    objectFit='contain'
                    className="w-full h-full object-cover"
                />
            </div>

            <div
                className='flex flex-col items-center justify-center'
            >
                <span
                    className={cn('text-xs md:text-sm text-primary/50', font.className)}
                >
                    The Truth Is Out There
                </span>

                <span
                    className={cn('font-bold text-3xl md:text-5xl', font2.className)}
                >
                    TTIOT
                </span>
            </div>
        </div>

        <div
            className="items-center gap-x-4 transition-all duration-100 hidden md:flex"
        >

            <Button
                size={'lg'}
                variant={'post'}
                className="rounded-3xl"
            >
                Post
            </Button>

            <Button
                size={'lg'}
                variant={'outline'}
                className="text-lg text-black rounded-3xl bg-white"
                onClick={loginState.open}
            >
                Login/Signup
            </Button>

            <ModeToggle />
        </div>

        <div className="flex items-center gap-x-4 md:hidden">
            <ModeToggle />
            <MobileMenuBar />
        </div>
    </nav>
  )
}

export default Header