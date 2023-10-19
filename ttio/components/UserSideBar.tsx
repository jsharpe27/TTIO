import React from 'react'
import { cn } from "@/lib/utils";
import { Montserrat, Saira_Stencil_One } from 'next/font/google';

const font = Montserrat({ weight: "600", subsets: ["latin"] });

export default function UserSideBar() {
  return (
    <div className='absolute right-4 sm:flex sm:items-center top-4
    sm:flex-col flex sm:w-fit sm:py-2 sm:px-5 gap-5 p-2 dark:text-black dark:border
     dark:border-white border border-black rounded-md shadow-black border-3
     font-Montserrat hover:text-bold w-screen justify-center
    '>
            <a href='https://www.reddit.com/r/UFOs' target="_blank" 
            className={cn('hover:scale-110 transition-all bg-green-300 py-1 px-3 rounded-md' , font.className)}>
            UFOs subreddit</a>
            <a href='https://www.mufon.com/' target="_blank"
            className={cn('hover:scale-110 transition-all bg-green-300 p-1 rounded-md' , font.className)}>
            Mutual UFO Network</a>
            <a href='https://www.theblackvault.com/' target="_blank"
            className={cn('hover:scale-110 transition-all bg-green-300 p-1 rounded-md' , font.className)}>
            The Black Vault</a>
    </div>
  )
}
