"use client"
 
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from 'zod'
import { LoginFormSchema } from "@/schemas"

import { Form,FormControl,FormLabel,FormItem,FormMessage,FormField} from "@/components/ui/form"
import CardWrapper from "@/components/auth/card-wrapper";
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import FormError from "@/components/form-error"
import { useState, useTransition } from "react"
import { Eye, EyeOff, RotateCw } from "lucide-react"
import { login } from "@/app/actions/Login"

const LoginForm = () => {
    const [error, setError] = useState<string | undefined>("");
    const [isVisible,setIsVisible] = useState(false);
    const [isPending, startTransition] = useTransition();

    const form = useForm<z.infer<typeof LoginFormSchema>>({
        resolver:zodResolver(LoginFormSchema),
        defaultValues: {
            email: "",
            password: "",
        }
    });

    const onSubmit = async (values:z.infer<typeof LoginFormSchema>) => {
        setError("");
        setIsVisible(false);

        startTransition(()=> {
            login(values).then((data)=> {
                if(data?.error){
                    setError('Invalid credentials');
                }
            });
        })
    };

    return (
        <main className="h-full flex flex-col justify-center items-center">
            <CardWrapper
                headerLabel = "Welcome Back"
                backButtonLabel = "Don't Have an Account?"
                backButtonHref="/register"
                showSocial
            >
                <Form {...form}>
                    <form className="space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
                        <div className="space-y-4">
                            <FormField 
                                control={form.control}
                                name="email"
                                disabled={isPending}
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
                                disabled={isPending}
                                render={({field}) => (
                                    <FormItem>
                                        <FormLabel>Password</FormLabel>
                                        <FormControl>
                                            <div className="relative">
                                                <Input 
                                                    {...field}
                                                    placeholder="*********" type={isVisible? 'text': 'password'}
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
                        <Button type="submit" disabled={isPending} className="w-full">
                            {isPending ? <span><RotateCw className="w-5 h-5 animate-spin"/></span> : <span>Login</span>}
                        </Button>
                    </form>
                </Form>

            </CardWrapper>
        </main>
     );
}
 
export default LoginForm;