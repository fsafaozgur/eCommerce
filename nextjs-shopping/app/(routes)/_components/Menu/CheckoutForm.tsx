"use client"

import React, { useState } from 'react'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import useCartStore from '@/hooks/useCartStore'
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useToast } from '@/hooks/use-toast'
import axios from 'axios'
import { Toast } from '@/components/ui/toast'
import { useRouter } from 'next/navigation'
import createOrder from '@/actions/Cart/createOrder'
import deleteToCart from '@/actions/Cart/deleteToCart'
import { UserRoundMinusIcon } from 'lucide-react'


const formSchema = z.object({
    name: z.string().min(2, {message: "Username must be at least 2 characters."}),
    phone: z.string().min(2, {message: "Phone must be at least 2 characters."}),
    address: z.string().min(2, {message: "Address must be at least 2 characters."}),
    holdername: z.string().min(2, {message: "Holder name  must be at least 2 characters."}),
    ccnumber: z.string().regex(/^\d{16}$/, {message: "Credit number must be at 16 digits."}),
    month:  z.preprocess((val) => Number(val), z.number().min(1, {message: "Month is required."}).max(12, {message: "Username must be at least 2 characters."})),
    year: z.preprocess((val) => Number(val), z.number().min(new Date().getFullYear(), {message: "Year must be the current year or later."})),
    cvc: z.string().regex(/^\d{3,4}$/, {message: "cvc must be 3 or 4 digits."})
  })

  interface CheckOutFormProps {
    subtotal:string
    userId:string
    jwt:string
  }

const CheckoutForm = ({subtotal,userId, jwt}: CheckOutFormProps) => {

    const { items, fetchItems } = useCartStore();

    console.log(items)

    const [response, setResponse] = useState(null);
    const {toast} = useToast();

    const router = useRouter();

    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "Safa",
            phone: "+90 555 333 22 11",
            address: "Ankara Turkey",
            holdername: "Fatih",
            ccnumber: "5890040000000016",
            month: "04",
            year: "2029",
            cvc: "159",
        },
      })


    const onSubmit = async(data) => {
        
        const paymentCard = {
            cardHolderName: data.holdername,
            cardNumber: data.ccnumber,
            expireMonth: data.month,
            expireYear: data.year,
            cvc: data.cvc,
            registeredCard: '0'
        }

        const buyer = {
            id: 'BY789',
            name: data.name,
            surname: 'dummy',
            gsmNumber: data.phone,
            email: 'dummy@hotmail.com',
            identityNumber: '23432167590',
            lastLoginDate: '2015-10-05 12:43:35',
            registrationDate: '2023-04-21 15:12:09',
            registrationAddress: data.address,
            ip: '85.34.78.112',
            city: 'Ankara',
            country: 'Turkey',
            zipCode: '06800'
        }

        const shippingAddress = {
            contactName: data.name,
            city: 'Ankara',
            country: 'Turkey',
            address: data.address,
        }

        
        const billingAddress = {
            contactName: data.name,
            city: 'Ankara',
            country: 'Turkey',
            address: data.address,
        }

        const basketItems = items.map((item) => ({
            id: item.id,
            name: item.name,
            category1: 'dummyCate1',
            itemType: 'VIRTUAL',
            price: item.amount
        }))

        const paymentData = {
            price: subtotal,
            paidPrice: subtotal,
            currency: 'TRY',
            basketId: '888342',
            paymentCard: paymentCard,
            buyer: buyer,
            shippingAddress: shippingAddress,
            billingAddress: billingAddress,
            basketItems: basketItems
        }


        try {
            const response = await axios.post('http://localhost:3001/api/payment', paymentData, {
                headers: {
                    'Content-Type' : 'application/json'
                }
            })

            setResponse(response.data)
            console.log(response.data)


            if (response.data.result.status === 'success'){

                const payload = {
                    data: {
                        name:data.name,
                        address:data.address,
                        phone:data.phone,
                        userId:userId,
                        subtotal:subtotal,
                        paymentText:'Iyzico',
                        OrderItemList:items.map(item => {
                            return{
                                amount:item.amount,
                                size:item.size,
                                color:item.color,
                                quantity:item.quantity,
                                product:item.product,
                        }}),
                    }
                }

                await createOrder(payload, jwt)

                items.forEach((item,index) => {
                    deleteToCart(item.id, jwt).then(resp=>{
                        
                    })
                    
                });


                toast({
                    variant:"success",
                    title: "Order Success"
                })

                fetchItems(userId, jwt)

                router.push("/my-order")
            }
            else {
                toast({
                    variant:"destructive",
                    title: "Order failure"
                })
            }
            console.log(response.data)
        } catch (error) {
            toast({
                variant:"destructive",
                title: "Order Error" + error
            })
            console.error('Error', error)
        }

    }

  return (
    <div className='p-8'>
      <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <h2 className='border-b borderone text-2xl'>Address</h2>
        <div className='flex flex-row gap-4'>
            <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
                <FormItem className='w-full'>
                <FormLabel className='textone'>Username</FormLabel>
                <FormControl>
                    <Input placeholder="John doe" {...field}  className='bg-white dark:bg-black'/>
                </FormControl>
                <FormMessage className='validationLogin'/>
                </FormItem>
            )}
            />

            <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
                <FormItem className='w-full'>
                <FormLabel className='textone'>Phone</FormLabel>
                <FormControl>
                    <Input placeholder="+90 555 333 22 61 " {...field}  className='bg-white dark:bg-black'/>
                </FormControl>
                <FormMessage className='validationLogin'/>
                </FormItem>
            )}
            />

        </div>

        <div>
        <FormField
            control={form.control}
            name="address"
            render={({ field }) => (
                <FormItem className='w-full'>
                <FormLabel className='textone'>Address</FormLabel>
                <FormControl>
                    <Input placeholder="street, city etc." {...field}  className='bg-white dark:bg-black'/>
                </FormControl>
                <FormMessage className='validationLogin'/>
                </FormItem>
            )}
            />

        </div>
            
        <div className='h-8'></div>

        <h2 className='border-b borderone text-2xl'>Card Information</h2>

        <div className='flex flex-row gap-4'>
            <FormField
            control={form.control}
            name="holdername"
            render={({ field }) => (
                <FormItem className='w-full'>
                <FormLabel className='textone'>Holder Name</FormLabel>
                <FormControl>
                    <Input placeholder="Holder Name" {...field}  className='bg-white dark:bg-black'/>
                </FormControl>
                <FormMessage className='validationLogin'/>
                </FormItem>
            )}
            />

            <FormField
            control={form.control}
            name="ccnumber"
            render={({ field }) => (
                <FormItem className='w-full'>
                <FormLabel className='textone'>Credit Number</FormLabel>
                <FormControl>
                    <Input placeholder="Credit Number" {...field}  className='bg-white dark:bg-black'/>
                </FormControl>
                <FormMessage className='validationLogin'/>
                </FormItem>
            )}
            />

        </div>


        <div className='flex flex-row gap-4'>

            <FormField
            control={form.control}
            name="month"
            render={({ field }) => (
                <FormItem className='w-full'>
                <FormLabel className='textone'>Month</FormLabel>
                <FormControl>
                    <Input type='number' placeholder="Month" {...field}  className='bg-white dark:bg-black'/>
                </FormControl>
                <FormMessage className='validationLogin'/>
                </FormItem>
            )}
            />


            
            <FormField
            control={form.control}
            name="year"
            render={({ field }) => (
                <FormItem className='w-full'>
                <FormLabel className='textone'>Year</FormLabel>
                <FormControl>
                    <Input type='number' placeholder="Year" {...field}  className='bg-white dark:bg-black'/>
                </FormControl>
                <FormMessage className='validationLogin'/>
                </FormItem>
            )}
            />


            <FormField
            control={form.control}
            name="cvc"
            render={({ field }) => (
                <FormItem className='w-full'>
                <FormLabel className='textone'>CVC</FormLabel>
                <FormControl>
                    <Input placeholder="cvc" {...field}  className='bg-white dark:bg-black'/>
                </FormControl>
                <FormMessage className='validationLogin'/>
                </FormItem>
            )}
            />

        </div>

        <Button type="submit">Submit</Button>
      </form>
    </Form>
    </div>
  )
}

export default CheckoutForm
