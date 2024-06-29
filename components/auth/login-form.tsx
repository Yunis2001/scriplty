"use client"
 
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from 'zod'
import { LoginFormSchema } from "@/schemas"

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
import BackButton from "./back-button"

const LoginForm = () => {
    const form = useForm<z.infer<typeof LoginFormSchema>>({
        resolver:zodResolver(LoginFormSchema),
        defaultValues: {
            email: "",
            password: "",
        }
    });

    const onSubmit = (values:z.infer<typeof LoginFormSchema>) => {
        console.log(values);
    };

    return (
        <main className="h-full flex flex-col justify-center items-center">
            <CardWrapper
                headerLabel = "Welcome Back"
                backButtonLabel = "Don't Have an Account?"
                backButtonHref="/auth/register"
                showSocial
            >
                <Form {...form}>
                    <form className="space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
                        <div className="space-y-4">
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
                        <FormError message=""/>
                        <FormSuccess message=""/>
                        <Button type="submit" className="w-full">
                            Login
                        </Button>
                    </form>
                </Form>

            </CardWrapper>
        </main>
     );
}
 
export default LoginForm;