'use client'

import { logOut } from "@/app/actions/Logout"
import { LogOut } from "lucide-react";
import { Button } from "../ui/button";

interface LogoutButtonProps {
    className?: string;
}

const LogoutButton = ({className}:LogoutButtonProps) => {
    const onClick = ()=> {
        logOut();
    }

  return (
    <div className={`flex items-center gap-3 ${className?className:""}`}>
        <LogOut className='h-7 w-7 stroke-[1px]' />
        <Button onClick={onClick} variant='link' className={`text-2xl font-[400] ${className?className:''}`}>Sign Out</Button>
    </div>
  )
}

export default LogoutButton
