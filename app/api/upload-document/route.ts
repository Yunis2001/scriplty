import { NextResponse } from "next/server";
import mammoth from 'mammoth';
import { db } from "@/lib/prisma";
import { auth } from "@/auth";
import TurndownService from "turndown";
import { OpenAI } from 'openai';

const openai = new OpenAI({apiKey: process.env.OPEN_AI_KEY})

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
        return NextResponse.json({ message: "User not found",status:404 });
    }

    try {
        if (!file) {
            return NextResponse.json({ message: "No file uploaded" ,status:400});
        }

        const fileBuffer = await file.arrayBuffer();
        const buffer = Buffer.from(fileBuffer);

        const options = {
            ignoreEmptyParagraphs: false,
            convertImage: mammoth.images.imgElement(function(image) {
              return Promise.resolve ({
                src: "", // Empty src to effectively remove the image
                style: "display: none;" // Hide the image
              });
            })
        };  


        const result = await mammoth.convertToHtml({buffer},options);
        const textContent = result.value;

        const turnDownService  = new TurndownService();
        const markdown = turnDownService.turndown(textContent);

        const rewrittenMarkdown = await rewriteWithOpenAI(markdown);

        const uploadedDocument = await db.document.create({
            data: {
                title:file.name,
                content:markdown,
                user_id:user?.id,
                processedText:rewrittenMarkdown,              
            }
        })

        return NextResponse.json({ message: "File Uploaded Succesfully", documentId: uploadedDocument.document_id, status: 200 });
    } catch (error) {
        console.error('Error processing document:', error);
        return NextResponse.json({ message: "Error processing document" ,status: 500});
    }
}


async function rewriteWithOpenAI(markdown: string): Promise<string> {
    const completion = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content: "You are a helpful assistant that rewrites content while preserving markdown structure. Rewrite the given text to be more engaging and clear do not summarize it or anything just rewrite it fixing grammar and spell checks, but keep all headings, links, and formatting intact."
        },
        {
          role: "user",
          content: markdown
        }
      ],
      max_tokens: 2000,  // Adjust based on your needs and OpenAI's limits
    });
  
    return completion.choices[0].message.content || markdown;
  }