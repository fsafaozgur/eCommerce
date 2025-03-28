import { Trash2Icon } from 'lucide-react'
import Image from 'next/image'
import React from 'react'

interface CartItemProps {
    item:any,
    onDeleteItem: (id)=>void
}


const CartItem = ({item, onDeleteItem}:CartItemProps) => {
  return (
    <div className='flex justify-between items-center p-2 mb-5  '>
        <div className='flex gap-4 items-center'>
            <Image 
            unoptimized={true}
            width={95}
            height={95}
            alt={item.name}
            src={process.env.NEXT_PUBLIC_BACKEND_URL + item.images} 
            className='border borderone p-2'
            />
        

            <div className='space-y-1'>
                <h2 className='font-bold'>{item.name}</h2>
                <h2 className='font-bold'>{item.id}</h2>
                <h2 className='text-xs'>Quantity: {item.quantity}</h2>
                <h2 className='text-xs'>{item.color} {item.size}</h2>
                <h2 className='text-lg font-bold text-mycolor3'>{item.amount}</h2>
            </div>
        </div>

        <Trash2Icon className='cursor-pointer' onClick={()=>onDeleteItem(item.id)} />
      
    </div>
  )
}

export default CartItem
