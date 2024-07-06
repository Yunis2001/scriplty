'use client'

import { Home, LogOut, Trash } from "lucide-react"
import Link from "next/link"
import { logOut } from "@/app/actions/Logout"

function Sidebar() {
    const onClick = ()=>{
        logOut();
    }

  return (
    <div className="w-[300px] hidden px-10 pt-44 pb-32 lg:flex flex-col justify-between min-h-screen bg-blue-700">
        <div>
            <Link className="flex gap-2 items-center text-white" href="/dashboard">
                <Home className="w-7 h-7 stroke-[1px]" /> <span className="text-xl">Home</span>
            </Link>
        </div>

        <div>
            <button onClick={onClick} className="text-white flex gap-2 items-center text-left justify-start w-full font-extrabold">
                <LogOut className="w-7 h-7 stroke-[1px]"/> <span className="text-xl">Sign Out</span>
            </button>
        </div>
    </div>
  )
}

export default Sidebar
