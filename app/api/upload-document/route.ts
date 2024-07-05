import { useCurrentUser } from "@/hooks/use-current-user";
import { NextResponse } from "next/server";
import mammoth from 'mammoth';
import { db } from "@/lib/prisma";
import { getSession, useSession } from "next-auth/react";
import { auth } from "@/auth";

export async function POST(req:Request){
    const session = await auth();
    const formData = await req.formData();
    const file = formData.get("original-document") as File | null;

    if(!session?.user?.email) {
        return NextResponse.json({message: "Unauthorized",status:401})
    }

    const user = await db.user.findUnique({
        where: {
            email: session.user.email
        }
    })

    if (!user) {
        return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    try {
        if (!file) {
            return NextResponse.json({ message: "No file uploaded" }, { status: 400 });
        }

        const fileBuffer = await file.arrayBuffer();
        const buffer = Buffer.from(fileBuffer);

        const result = await mammoth.extractRawText({buffer});
        const textContent = result.value;

        const uploadedDocument = await db.originalDocument.create({
            data: {
                title:file.name,
                content:textContent,
                user_id:user?.id,                
            }
        })

        return NextResponse.json({ message: "File Uploaded Succesfully", documentId: uploadedDocument.document_id }, { status: 200 });
    } catch (error) {
        console.error('Error processing document:', error);
        return NextResponse.json({ message: "Error processing document" }, { status: 500 });
    }
}