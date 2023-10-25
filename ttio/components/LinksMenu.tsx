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
          <Button className="text-lg" variant='outline' >
            Links
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className={cn(font.className)}>
          <DropdownMenuItem >
          <a href='https://www.reddit.com/r/UFOs' target="_blank" 
              className='hover:scale-110 '>
              UFOs subreddit</a>
          </DropdownMenuItem>
          <DropdownMenuItem>
          <a href='https://www.mufon.com/' target="_blank"
              className='hover:scale-110 '>
              Mutual UFO Network</a>
          </DropdownMenuItem>
          <DropdownMenuItem>
          <a href='https://www.theblackvault.com/' target="_blank"
              className='hover:scale-110 '>
              The Black Vault</a>
          </DropdownMenuItem>

        </DropdownMenuContent>
      </DropdownMenu>
    </>
  )
}