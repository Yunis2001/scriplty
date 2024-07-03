import { auth, signOut } from "@/auth";

const DashBoard = async() => {
    const session = await auth();
    return ( 
        <div>
            {JSON.stringify(session)}
            <form action={async() => {
                "use server"

                await signOut({
                    redirectTo:'/login',
                });
            }}>
                <button type="submit">Sign Out</button>
                <p><span>Welcome back</span> {session?.user?.name}</p>
            </form>
        </div>
     );
}
 
export default DashBoard;