"use client"
 
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from 'zod'
import { useRouter } from "next/navigation"
import { Eye, EyeOff, RotateCw } from "lucide-react"

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
    const [isVisible, setIsVisible] = useState(false);

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
        setIsVisible(false)

        try {
            const response = await fetch('/api/add-user',{
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

            const data = await response.json();
            
            if(!response.ok){
                setError(data.message)
                setLoading(false);
            }
            else {
                setSuccess(data.message)
                setTimeout(()=>router.push('/login'),2000);
            }
        } catch (error) {
            setError('Something went wrong');
        }
        finally {
            setLoading(false);
        }
    };

    return (
        <main className="h-full flex flex-col justify-center items-center">
            <CardWrapper
                headerLabel = "Create An Account"
                backButtonLabel="Already Have An Account?"
                backButtonHref="/login"
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
                                            <div className="relative">
                                                <Input 
                                                    {...field}
                                                    placeholder="*********" 
                                                    type={isVisible ? "text" : "password"}
                                                />
                                                <div className="absolute top-1/4 right-4">
                                                    {!isVisible? <Eye onClick={()=> setIsVisible(true)} className="w-5 h-5 cursor-pointer" /> : <EyeOff onClick={()=> setIsVisible(false)} className="w-5 h-5 cursor-pointer"/>}
                                                </div>
                                            </div>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField 
                                control={form.control}
                                name="confirmPassword"
                                render={({field}) => (
                                    <FormItem>
                                        <FormLabel>Confirm Password</FormLabel>
                                        <FormControl>
                                            <div className="relative">
                                                <Input 
                                                    {...field}
                                                    placeholder="*********" 
                                                    type={isVisible ? "text" : "password"}
                                                />
                                                <div className="absolute top-1/4 right-4">
                                                    {!isVisible? <Eye onClick={()=> setIsVisible(true)} className="w-5 h-5 cursor-pointer" /> : <EyeOff onClick={()=> setIsVisible(false)} className="w-5 h-5 cursor-pointer"/>}
                                                </div>
                                            </div>                                           
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                        <FormError message={error}/>
                        <FormSuccess message={success}/>
                        <Button type="submit" disabled={loading} className='w-full disabled:bg-gray-500'>
                            {loading ? <span> <RotateCw className="w-5 h-5 animate-spin"/></span> : <span>Create An Account</span>}
                        </Button>
                    </form>
                </Form>

            </CardWrapper>
        </main>
     );
}
 
export default RegisterForm;