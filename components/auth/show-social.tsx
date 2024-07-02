"use client"
import { FcGoogle } from "react-icons/fc";
import { Button } from "@/components/ui/button";
import { signIn } from "next-auth/react";
import { DEFAULT_LOGIN_REDIRECT_URL } from "@/routes";

const ShowSocial = () => {
    const onClick = (provider: "google") => {
        signIn(provider,{
            callbackUrl:DEFAULT_LOGIN_REDIRECT_URL
        })
    }

    return (
        <div className="w-full flex gap-3 justify-center">
            <Button className="w-full flex gap-3 items-center justify-center" size='lg' variant="outline" onClick={()=>onClick("google")}>
                <FcGoogle className="w-6 h-6"/>
                <span>Continue with Google</span>
            </Button>
        </div>
    );
}
 
export default ShowSocial;