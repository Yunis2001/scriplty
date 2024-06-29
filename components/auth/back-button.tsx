'use client'

import Link from "next/link";
import { Button } from "../ui/button";

interface BackButtonProps {
    href: string;
    label:string;
}

const BackButton = ({href,label}: BackButtonProps) => {
    return (
        <Button variant='link' size='sm' className="w-full text-sm">
            <Link
                href={href}
            >
                {label}
            </Link>
        </Button>
    );
}
 
export default BackButton