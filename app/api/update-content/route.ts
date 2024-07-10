import { db } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req:Request){
    try {
        const body = await req.json();
        const documentId = body.document_id;
        const content = body.content;

        if(!documentId || !content) {
            return NextResponse.json({message: 'No folder',status:'404'})
        }

        const updatedContent = await db.document.update({
            where: {document_id:documentId},
            data: {
                processedText:content,
                last_modified:new Date(),
            },
        })

        if(updatedContent){
            return NextResponse.json({message:'Updated content',status:201});
        }
        else {
            return NextResponse.json({message:"No Document",status:404});
        }
    } catch (error) {
        console.error('Error updating rewritten content:', error)
        return NextResponse.json({ message: 'Internal Server Error',status:500})
    }
}