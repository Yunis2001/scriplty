import { db } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(request:Request,{ params }: { params: { id: string } }){
    const {id} = params;

    try {
        if(!id){
            return NextResponse.json({message:"Invalid request",status:404})
        }
    
        const document = await db.originalDocument.findUnique({
            where:{
                document_id:Number(id),
            }
        })

        if(!document){
            return NextResponse.json({message:"No document found",status:404})
        }

        return NextResponse.json({message:"Document found",document,status:201});
    } catch (error) {
        return NextResponse.json({message:error});
    }
}