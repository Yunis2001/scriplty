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
    password:z.string().min(6,{
        message:'Please enter a valid password'
    }),
    name:z.string().min(1,{
        message:"Name is required!"
    }),
    confirmPassword:z.string().min(6,{
        message:"Please confirm your password"
    })
}).refine(data => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"], // Set the path of the error to the confirmPassword field
  });
  

