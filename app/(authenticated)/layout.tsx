import { auth } from "@/auth";
import DashboardHeader from "@/components/dashboard/dashboard-header";
import Sidebar from "@/components/dashboard/sidebar";
import { SessionProvider } from "next-auth/react"

interface LayoutProps {
    children: React.ReactNode
}

const DashboardLayout = async({children}:LayoutProps) => {
    const user = await auth();
    return (
        <SessionProvider session={user}>
            <div className="h-full pr-3 lg:pr-10 flex justify-between">
                <Sidebar />
                <div className="w-full ml-5 overflow-scroll">
                    <DashboardHeader />
                    <div className="text-2xl font-bold">
                        Welcome Back <span>{user?.user?.name}</span>
                    </div>
                    {children}
                </div>
            </div>
        </SessionProvider>
    )
}
 
export default DashboardLayout;