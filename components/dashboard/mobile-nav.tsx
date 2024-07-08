'use client'

import { Home,Menu} from "lucide-react";
import { Sheet, SheetClose, SheetContent,SheetTrigger } from "../ui/sheet";
import Link from "next/link";
import LogoutButton from "../auth/logout-button";


const MobileNav = () => {
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
                                <Home className="w-7 h-7"/> <span className="text-2xl">Home</span>
                            </Link>
                        </SheetClose>
                    </div>
                    <SheetClose asChild>
                        <LogoutButton />
                    </SheetClose>
                </div>
            </SheetContent>
        </Sheet>
    );
}
 
export default MobileNav;