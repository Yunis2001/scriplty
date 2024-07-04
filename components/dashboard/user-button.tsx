"use client"

import { 
    DropdownMenu, 
    DropdownMenuItem, 
    DropdownMenuContent,
    DropdownMenuTrigger, 
} from "@radix-ui/react-dropdown-menu";

import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { useCurrentUser } from "@/hooks/use-current-user";
import { LogOut, User, Wrench } from "lucide-react";
import { logOut } from "@/app/actions/Logout";


const UserButton = () => {
    const user = useCurrentUser();
    const onClick = () => {
        logOut();
    }
    return ( 
        <DropdownMenu>
            <DropdownMenuTrigger>
                <Avatar>
                    <AvatarImage src={user?.image || ""} />
                    <AvatarFallback>
                        <User />
                    </AvatarFallback>
                </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="bg-[#313132] opacity-90 text-white">
                <DropdownMenuItem onClick={onClick} className="flex p-3 m-1 shadow-xl items-center gap-2 cursor-pointer">
                    <LogOut className="h-4 w-4" />
                    Sign Out
                </DropdownMenuItem>
                <DropdownMenuItem onClick={onClick} className="flex p-3 m-1 shadow-xl items-center gap-2 cursor-pointer">
                    <Wrench />
                    Account Settings
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
 
export default UserButton;