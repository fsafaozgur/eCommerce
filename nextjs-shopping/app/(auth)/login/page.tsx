﻿
"use client"

import React from 'react'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../../../components/ui/form'
import { Input } from '../../../components/ui/input'
import { Button } from '../../../components/ui/button'
import { startSession } from '@/lib/session'
import loginUser from '@/actions/login'
import { useToast } from '@/hooks/use-toast'
import { useRouter } from 'next/navigation'
import useAuthStore from '@/hooks/useAuth'
import { Loader2Icon } from 'lucide-react'




const formSchema = z.object({
    email: z.string().min(2, {
        message: "Email must be at least 2 characters.",
    }),
    password: z.string().min(2, {
        message: "Password must be at least 2 characters.",
    }),

})

const LoginPage = () => {

    const {loader, setLoader} = useAuthStore();
    const {toast} = useToast(); 
    const {router} = useRouter();

     const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            password: ""
        },
    })


    const onSubmit = (data:z.infer<typeof formSchema>) => {
        setLoader(true);

        loginUser(data.email, data.password).then(
            (resp)=>{
                startSession(resp.user, resp.jwt);
                toast( {
                    variant:'success',
                    title:'Successful login',
                })
                setLoader(false);
                router.push("/");
            },
            (error) => {
                setLoader(false);
                toast( {
                    variant:'destructive',
                    title:'Something went wrong!',
                })
            }
        ).finally(()=>{
            setLoader(false);
        })
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="w-4/5 space-y-8">
                <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                                <Input placeholder="email@gmail.com" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Password</FormLabel>
                            <FormControl>
                                <Input placeholder="Password" type='password' {...field} />
                            </FormControl>
                            <FormMessage className='validationLogin'/>
                        </FormItem>
                    )}
                />
                <Button className='w-full' type="submit">
                    
                    {loader ? <Loader2Icon className='animate-spin'/> : 'Login'}
    
                </Button>
            </form>
            <div className='mt-8'>
                <label className='flex flex-col items-center'>
                    Dont have an account
                </label>
                <a href='/create-user' className='text mt-5 font-semibold'>
                    Create here to create a new account
                </a>
            </div>
        </Form>
    
    )
}

export default LoginPage
