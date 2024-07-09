import { db } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function DELETE(req:Request) {
    try {
        const documentId = await req.json();

        if(!documentId || documentId === undefined) {
            return NextResponse.json({message: 'Document not found',status: 404})
        }

        await db.document.delete({
            where: {
                document_id:documentId,
            }
        })

        return NextResponse.json({message: documentId})
    } catch (error) {
        return NextResponse.json(error);
    }
} 