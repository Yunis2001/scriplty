'use client'

import { Button } from "../ui/button";
import { Home, LogOut, Menu, Trash} from "lucide-react";
import { Sheet, SheetClose, SheetContent, SheetFooter, SheetTrigger } from "../ui/sheet";
import { logOut } from "@/app/actions/Logout";
import Link from "next/link";


const MobileNav = () => {
    const onClick = ()=> {
        logOut();
    }

    return ( 
        <Sheet>
            <SheetTrigger asChild>
                <Menu className="w-10 h-10 stroke-1" />
            </SheetTrigger>
            <SheetContent className='pt-32' side="left">
                <div className="flex flex-col justify-between h-full">
                    <div className="flex flex-col items-start gap-10 w-full">
                        <SheetClose asChild>
                            <Link className="flex items-center gap-3" href="/dashboard">
                                <Home className="w-7 h-7"/> <span className="text-lg">Home</span>
                            </Link>
                        </SheetClose>
                        <SheetClose asChild>
                            <Link className="flex items-center gap-3" href="/trash">
                                <Trash className="w-7 h-7"/> <span className="text-lg">Trash</span>
                            </Link>
                        </SheetClose>
                    </div>

                    <div className="flex justify-start">
                        <SheetFooter>
                            <SheetClose asChild>
                                <Button onClick={onClick} className="flex items-center justify-start gap-3" variant="link">
                                    <LogOut className="w-7 h-7"/> <span className="text-lg">Sign Out</span>
                                </Button>
                            </SheetClose>
                        </SheetFooter>
                    </div>
                </div>
            </SheetContent>
        </Sheet>
    );
}
 
export default MobileNav;