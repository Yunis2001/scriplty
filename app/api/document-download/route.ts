import { db } from '@/lib/prisma';
import { NextResponse } from 'next/server';
// @ts-ignore
import htmlToDocx from 'html-to-docx-typescript';
import showdown from 'showdown';

export async function POST(req:Request) {
    try {
        const body = await req.json();
        const documentId = body.document_id;
        const converter = new showdown.Converter();

        const document  = await db.document.findUnique({
            where: {
                document_id:documentId,
            },
            select: {
                processedText:true,
                title:true,
            }
        })

        if (!document) {
            return NextResponse.json({ message: 'Document not found', status:404})
        }

        const processedHTMLText = converter.makeHtml(document.processedText);

        const buffer = await htmlToDocx(processedHTMLText,'',{margins:0},'');

        const response = new Response(buffer);

        // Set the appropriate headers for file download
        response.headers.set('Content-Disposition', `attachment; filename=${document.title}.docx`)
        response.headers.set('Content-Type', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document')

        return response;
    } catch (error) {
        console.error('Error converting to docx:', error)
        return NextResponse.json({ message: 'Internal Server Error' ,status:500})
    }
}