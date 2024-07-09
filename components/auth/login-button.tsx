"use client"

import { useRouter } from "next/navigation";

interface LoginButtonProps { 
    children:React.ReactNode;
    mode?:'login' | 'register';
    asChild?:boolean;
}

const LoginButton = ({children,mode='register',asChild}:LoginButtonProps) => {
    const router = useRouter();
    const onClick = () => {
        router.push(`${mode}`)
    }

    return (
        <span onClick={onClick} className="cursor-pointer">
            {children}
        </span>
    )
}

export default LoginButton
