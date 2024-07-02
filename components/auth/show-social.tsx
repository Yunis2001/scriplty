'use client'

import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import { Button } from "@/components/ui/button";

const ShowSocial = () => {
    const onClick = () => {

    }

    return (
        <div className="w-full flex gap-3 justify-center">
            <Button className="w-full flex gap-3 items-center justify-center" size='lg' variant="outline" onClick={onClick}>
                <FcGoogle className="w-6 h-6"/>
                <span>Continue with Google</span>
            </Button>
        </div>
    );
}
 
export default ShowSocial;