'use client'

import { 
    Card,
    CardContent,
    CardHeader,
    CardTitle,
    CardFooter
} from "@/components/ui/card";
import Header from "@/components/auth/header";
import ShowSocial from "@/components/auth/show-social";
import BackButton from "@/components/auth/back-button";

interface CardWrapperProps {
    children: React.ReactNode;
    headerLabel:string;
    backButtonLabel:string;
    backButtonHref:string;
    showSocial?:boolean;
}

const CardWrapper = ({children,headerLabel,backButtonLabel,backButtonHref}:CardWrapperProps) => {
    return (
        <Card className="w-[400px] shadow-md">
            <CardHeader>
                <Header label={headerLabel}/>
            </CardHeader>
            <CardContent>
                {children}
            </CardContent>
            <CardFooter>
                <ShowSocial />
            </CardFooter>
            <CardFooter>
                <BackButton href={backButtonHref} label={backButtonLabel}/>
            </CardFooter>
        </Card>
    );
}
 
export default CardWrapper;