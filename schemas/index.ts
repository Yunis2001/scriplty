import * as z from 'zod'

export const LoginFormSchema = z.object({
    email:z.string().email({
        message:'Please enter a valid email address'
    }),
    password:z.string().min(1,{
        message:'Please enter a valid password'
    }),
})

export const RegisterFormSchema = z.object({
    email:z.string().email({
        message:'Please enter a valid email address'
    }),
    password:z.string().min(1,{
        message:'Please enter a valid password'
    }),
    name:z.string().min(1,{
        message:"Name is required!"
    })
})

