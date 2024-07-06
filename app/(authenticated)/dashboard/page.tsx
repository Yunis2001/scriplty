'use client'

import { logOut } from "@/app/actions/Logout";
import DocumentsGrid from "@/components/dashboard/document-grid";
import { useCurrentUser } from "@/hooks/use-current-user";

const DashBoard = () => {
    const user = useCurrentUser();
    const onClick = ()=> {
        logOut();
    }

    return ( 
        <div>
            <div className="mt-5">
                <h1 className='text-xl font-bold'>
                    Welcome Back {user?.name}
                </h1>
            </div>
            <DocumentsGrid showUploadComponent />
        </div>
     );
}
 
export default DashBoard;