import { Menu } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "./ui/dropdown-menu"
import { Button } from "./ui/button";

const MobileMenuBar = () => {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild className="md:hidden">
                <Menu size={28} />
            </DropdownMenuTrigger>

            <DropdownMenuContent>
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

                <DropdownMenuItem
                    className="w-full flex justify-center"
                >
                    <Button
                        size={'lg'}
                        variant={'outline'}
                        className="text-lg text-black rounded-3xl bg-white"
                    >
                        Login/Signup
                    </Button>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

export default MobileMenuBar