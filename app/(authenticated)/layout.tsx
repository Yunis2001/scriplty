import { auth } from "@/auth";
import Header from "@/components/auth/header";
import DashboardHeader from "@/components/dashboard/dashboard-header";
import Sidebar from "@/components/dashboard/sidebar";
import { SessionProvider } from "next-auth/react"

interface LayoutProps {
    children: React.ReactNode
}

const DashboardLayout = async({children}:LayoutProps) => {
    const session = await auth();
    return (
        <SessionProvider session={session}>
            <div className="h-full pr-3 lg:pr-10 flex justify-between">
                <Sidebar />
                <div className="w-full ml-5 overflow-scroll">
                    <DashboardHeader />
                    {children}
                </div>
            </div>
        </SessionProvider>
    )
}
 
export default DashboardLayout;