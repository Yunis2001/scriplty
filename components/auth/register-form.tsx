"use client"
 
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from 'zod'
import { useRouter } from "next/navigation"
import { RotateCw } from "lucide-react"

import { RegisterFormSchema } from "@/schemas"

import {
    Form,
    FormControl,
    FormLabel,
    FormItem,
    FormMessage,
    FormField,
} from "@/components/ui/form"
import CardWrapper from "@/components/auth/card-wrapper";
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import FormError from "@/components/form-error"
import FormSuccess from "@/components/form-success"
import { useState } from "react"

const RegisterForm = () => {
    const [success, setSuccess] = useState("");
    const [error,setError] = useState("");
    const [loading,setLoading] = useState(false);

    const router = useRouter();
    const form = useForm<z.infer<typeof RegisterFormSchema>>({
        resolver:zodResolver(RegisterFormSchema),
        defaultValues: {
            name:"",
            email: "",
            password: "",
        }
    });

    const onSubmit = async (values:z.infer<typeof RegisterFormSchema>) => {
        setError("")
        setSuccess("")
        setLoading(true);
        const response = await fetch('/api/auth/add-user',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name:values.name,
                email:values.email.toLowerCase(),
                password:values.password,
            })
        })
        
        if(!response.ok){
            setError("Invalid Fields")
        }
        else {
            setSuccess("Account Successfully Created")
            setTimeout(()=>router.push('/auth/login'),2000);
        }

    };

    return (
        <main className="h-full flex flex-col justify-center items-center">
            <CardWrapper
                headerLabel = "Create An Account"
                backButtonLabel="Already Have An Account?"
                backButtonHref="/auth/login"
                showSocial
            >
                <Form {...form}>
                    <form className="space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
                        <div className="space-y-4">
                            <FormField 
                                    control={form.control}
                                    name="name"
                                    render={({field}) => (
                                        <FormItem>
                                            <FormLabel>Name</FormLabel>
                                            <FormControl>
                                                <Input 
                                                    {...field}
                                                    placeholder="Jane Doe" type="name"
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                            <FormField 
                                control={form.control}
                                name="email"
                                render={({field}) => (
                                    <FormItem>
                                        <FormLabel>Email</FormLabel>
                                        <FormControl>
                                            <Input 
                                                {...field}
                                                placeholder="example@mail.com" type="email"
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField 
                                control={form.control}
                                name="password"
                                render={({field}) => (
                                    <FormItem>
                                        <FormLabel>Password</FormLabel>
                                        <FormControl>
                                            <Input 
                                                {...field}
                                                placeholder="*********" type="password"
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                        <FormError message={error}/>
                        <FormSuccess message={success}/>
                        <Button type="submit" className="w-full">
                            {loading ? <span> <RotateCw className="w-5 h-5 animate-spin"/></span> : <span>Create An Account</span>}
                        </Button>
                    </form>
                </Form>

            </CardWrapper>
        </main>
     );
}
 
export default RegisterForm;