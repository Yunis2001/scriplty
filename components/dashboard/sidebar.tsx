'use client'

import { Home, LogOut, Trash } from "lucide-react"
import Link from "next/link"
import { logOut } from "@/app/actions/Logout"
import LogoutButton from "../logout-button"

function Sidebar() {
    const onClick = ()=>{
        logOut();
    }

  return (
    <div className="w-[300px] hidden px-10 pt-44 pb-32 lg:flex flex-col justify-between min-h-screen bg-blue-700">
        <div>
            <Link className="flex gap-3 items-center text-white" href="/dashboard">
                <Home className="w-7 h-7 stroke-[1px]" /> <span className="text-2xl">Home</span>
            </Link>
        </div>
        <LogoutButton className="text-white" />
    </div>
  )
}

export default Sidebar
