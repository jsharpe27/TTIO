"use client"
import { useState } from "react";
import { cn } from "@/lib/utils";
import { Montserrat, Saira_Stencil_One } from 'next/font/google';

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

const font = Montserrat({ weight: "600", subsets: ["latin"] });

interface UserSideBarProps {
  open: boolean;
}

export default function LinksMenu() {
    const [open, setOpen] = useState(false);

  return (
    <>
     
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button className="text-xl" variant='outline' >
            Links
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem >
          <a href='https://www.reddit.com/r/UFOs' target="_blank" 
              className={cn('hover:scale-110 ',font.className)}>
              UFOs subreddit</a>
          </DropdownMenuItem>
          <DropdownMenuItem>
          <a href='https://www.mufon.com/' target="_blank"
              className={cn(font.className)}>
              Mutual UFO Network</a>
          </DropdownMenuItem>
          <DropdownMenuItem>
          <a href='https://www.theblackvault.com/' target="_blank"
              className={cn(font.className)}>
              The Black Vault</a>
          </DropdownMenuItem>

        </DropdownMenuContent>
        
      </DropdownMenu>
      
    </>
  )
}

/*   
<a href='https://www.reddit.com/r/UFOs' target="_blank" 
              className={cn('hover:scale-110 transition-all bg-green-300 py-1 px-3 rounded-md' , font.className)}>
              UFOs subreddit</a>
              <a href='https://www.mufon.com/' target="_blank"
              className={cn('hover:scale-110 transition-all bg-green-300 p-1 rounded-md' , font.className)}>
              Mutual UFO Network</a>
              <a href='https://www.theblackvault.com/' target="_blank"
              className={cn('hover:scale-110 transition-all bg-green-300 p-1 rounded-md' , font.className)}>
              The Black Vault</a>
*/