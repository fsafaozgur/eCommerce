'use client'
import React, { useEffect, useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { DeleteIcon, ShoppingBag } from 'lucide-react'
import useCartStore from '@/hooks/useCartStore'
import { useRouter } from 'next/navigation'
import CartItem from './CartItem'
import deleteToCart from '@/actions/Cart/deleteToCart'

interface CartProps {
  jwt:string,
  userId:string
}


const Cart = ({jwt, userId}:CartProps) => {

  const {items, fetchItems} = useCartStore();
  const [subTotal, setSubTotal] = useState(0);
  const router = useRouter();

    //deneme için eklendi
    const items_zu = useCartStore(state => state.items_zu);
    //deneme için eklendi
    const removeItem = useCartStore(state => state.removeItem);

  useEffect(() => {
      fetchItems(userId, jwt)
  },[fetchItems])



  useEffect(() => {
    let total = 0
    items.forEach((element)=>{
      total = total + element.amount
    })
    setSubTotal(total.toFixed(2))
},[items])



  const onDeleteItem = async(id) => {
      await deleteToCart(id, jwt)
      fetchItems(userId,jwt)
  }



   const itemCount = items.length

  return (
    <Sheet>
  <SheetTrigger>
    <div className='absolute cursor-pointer'>
        <span className='absolute bg-mycolor3 text-mycolor1 text-xs font-semibold
         -right-2 -top-1 w-5 h-5 
         rounded-lg items-center justify-center text-center '>{itemCount}</span>
         <ShoppingBag/>

    </div>
    
  </SheetTrigger>
  <SheetContent className='bgone'>
    <SheetHeader>
      <SheetTitle>Your Shopping Cart</SheetTitle>
      <SheetDescription>
        Here are the items currently in your cart.
      </SheetDescription>
        <div>
          {itemCount === 0 ? (
            <p>Your cart is empty </p>
          ) : (
            <ul>
              {items.map((item, index) => (
                <ul key={index}>
                  <CartItem item={item} onDeleteItem={onDeleteItem}  />
                </ul>
              ))}

            </ul>
          )}

        </div>

        <SheetClose>
          <div className='absolute w-[90%] bottom-6 flex-col'>
            <h2 className='text-lg flex justify-between'>
              SubTotal <span>${subTotal}</span>
            </h2>

            <div>
              <Button disabled={itemCount == 0} onClick={()=>router.push(jwt ? "/checkout" : "/login")}>Checkout</Button>
            </div>

          </div>
        </SheetClose>
    </SheetHeader>
  </SheetContent>
</Sheet>
  )
}

export default Cart
