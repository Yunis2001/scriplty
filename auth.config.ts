import { NextAuthConfig } from "next-auth";
import Credentials  from "next-auth/providers/credentials"
import bycrypt from "bcryptjs";

import { db } from "./lib/prisma";
import { LoginFormSchema } from '@/schemas';


export default {
    providers: [
        Credentials({
            async authorize(credentials) {
                const validatedFields = LoginFormSchema.safeParse(credentials);

                if(validatedFields.success){
                    const { email , password} = validatedFields.data;

                    const user = await db.user.findUnique({
                        where: {
                            email:email
                        }
                    })

                    if(!user || !user.password) {
                        return null;
                    }
                    
                    const passWordMatch = await bycrypt.compare(password,user.password);

                    if (!passWordMatch) {
                        return null;
                    }

                    return {
                        id:`${user.id}`,
                        name:user.name,
                        email:user.email,                        
                    };
                }

                return null;
            }
        })
    ]
} satisfies NextAuthConfig