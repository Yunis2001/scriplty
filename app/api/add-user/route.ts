import { db } from "@/lib/prisma";
import { NextResponse } from "next/server";
import {hash} from 'bcrypt'

import * as z from "zod";


export const RegisterFormSchema = z.object({
    email:z.string().email({
        message:'Please enter a valid email address'
    }),
    password:z.string().min(6,{
        message:'Please enter a valid password'
    }),
    name:z.string().min(1,{
        message:"Name is required!"
    })
})

export async function POST(req:Request){
    try {
        const body = await req.json();
        const validatedFields = RegisterFormSchema.parse(body);

        const {name,email,password} = validatedFields;

        // Checking if the provided email already exists
        const isExistingUserByEmail = await db.user.findUnique({
            where: {
                email:email
            }
        })

        if (isExistingUserByEmail) {
            return NextResponse.json({user:null, message: "Email already in use. Try logging in instead"},{status:409})
        }

        const hashedPassword = await hash(password,10);

        const newUser = await db.user.create({
            data: {
                name:name,
                email:email,
                password:hashedPassword,
            }
        })

        const { password: newUserPassword, ...rest } = newUser;

       return NextResponse.json({user:rest, message: "User created successfully"},{ status:201}); 

    } catch (error) {
        if(error instanceof z.ZodError){
            const errorMessages = error.errors.map((err) => err.message);
            console.log(errorMessages);
            return NextResponse.json({ message: errorMessages},{status: 400});
        }
        console.log(error);
        return NextResponse.json({message: "Something went wrong!"},{status:500})
    }

}