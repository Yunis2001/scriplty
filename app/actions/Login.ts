"use server"

import * as z from 'zod'
import { DEFAULT_LOGIN_REDIRECT_URL } from "@/routes";
import { AuthError } from "next-auth";
import { LoginFormSchema } from '@/schemas';
import { signIn } from '@/auth';
import { db } from '@/lib/prisma';

export const login = async(values: z.infer<typeof LoginFormSchema>) => {
    const validatedFields = LoginFormSchema.safeParse(values);
    
    if(!validatedFields.success){
        return {error: "Invalid Fields"}
    }

    const { email , password } = validatedFields.data;

    try {
        await signIn("credentials",{
            email,
            password,
            redirectTo:DEFAULT_LOGIN_REDIRECT_URL,
        })
    } catch (error) {
        if(error instanceof AuthError){
            switch(error.type){
                case "CredentialsSignin":
                    return {error: "Invalid Credentials!"}
                default :
                    return {error: "Something went wrong"};
            }
        }
        throw error;
    }
}