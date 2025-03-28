'use client'
import deleteToCart from '@/actions/Cart/deleteToCart';
import useCartStore from '@/hooks/useCartStore';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import CartItem from '../_components/Menu/CartItem';
import CheckoutForm from '../_components/Menu/CheckoutForm';

const CheckOutPage = () => {

    const {items, fetchItems} = useCartStore();
    const [subTotal, setSubTotal] = useState(0);
    const router = useRouter();

    //çerezlerden verileri çekelim
    let jwt = "";
    let user = "";
    let userId = "";

    try {
        if (typeof window != "undefined"){
          jwt = localStorage.getItem('jwt')
          user = localStorage.getItem('user')
  
          if (user) {
              //Kayıt ederken JSON formatta kayıt ettiğimiz için şimdi objeye dönüştürüyoruz
              const userObj = JSON.parse(user)
              userId = userObj.id
          }
        }

    } catch (error) {
        console.log('error', error)
    }




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

  return (
    <div className='w-[95%] m-8'>
        <div className='grid grid-cols-1 lg:grid-cols-4 gap-8'>
            <div className='col-span-1 lg:col-span-3 bgone border borderone rounded-md lg:h-screen'>
                <CheckoutForm subtotal={subTotal} userId={userId} jwt={jwt}/>
            </div>

            <div className='col-span-1 bgone border borderone justify-center items-center rounded-md lg:h-screen'>
                {items.map((item) => (

                    <CartItem key={item.id} item={item} onDeleteItem={onDeleteItem} />

                ))}

                <div className='flex border borderone justify-center items-center'>
                    Subtotal: {subTotal}
                </div>

            </div>


        </div>
        

    </div>
  )
}

export default CheckOutPage
