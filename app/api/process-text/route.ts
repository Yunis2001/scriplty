import { processText } from "@/lib/process-text";
import { NextResponse } from "next/server";

export async function POST(req:Request) {
    try {
        const body = await req.json();
        const text = body

        const result = await processText(text);

        return NextResponse.json({message:'ok',result,status:200})
    }
    catch(error){
        return NextResponse.json({message:'error',error})
    }
}