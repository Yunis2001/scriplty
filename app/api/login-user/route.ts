import { db } from "@/lib/prisma";
import { NextResponse } from "next/server";
import {hash} from 'bcrypt'
import * as z from 'zod'

export const LoginSchema = z.object({
    email:z.string().email({
        message:'Please enter a valid email address'
    }),
    password:z.string().min(1,{
        message:'Please enter a valid password'
    }),
})

export async function GET(req:Request){

}