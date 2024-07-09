import { auth } from "@/auth";
import { db } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(){ 
    try {
        const session = await auth();

        if(!session || !session.user?.email){
            return NextResponse.json({message: "Unauthorized user",status:401})
        }
    
        const user = await db.user.findUnique({
            where: {
                email:session?.user?.email,
            }
        })
    
        if(!user){
            return NextResponse.json({message:"User not found",status:401})
        }

        const documents = await db.document.findMany({
            where: {
                user_id:user.id,
            },
            orderBy: {
                upload_date: "desc",
            }
        })

        if(documents.length < 1){
            return NextResponse.json({error:"Please Add documents"})    
        }

        return NextResponse.json({documents, message:"Documents successfully fetched",status:201})
    } catch (error) {
        return NextResponse.json({message:error});
    }
}