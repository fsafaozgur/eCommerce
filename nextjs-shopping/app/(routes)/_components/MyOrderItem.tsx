import Image from 'next/image'
import React from 'react'

interface MyOrderItemProps {
    orderItem:any
}


const MyOrderItem = ({orderItem}:MyOrderItemProps) => {
  return (
    <div className='container item'>
        <div className='grid grid-cols-6 mt-3 items-center border borderone p-2 bgone gap-8'>
            <Image 
                        unoptimized={true}
                        width={95}
                        height={95}
                        alt={orderItem.product.name}
                        src={process.env.NEXT_PUBLIC_BACKEND_URL + orderItem.product.images[0].url} 
                        className='border borderone p-2'
            />

            <div className='col-span-1'>{orderItem.product.name}</div>
            <div className='col-span-1'>Color: {orderItem.color}</div>
            <div className='col-span-1'>Size: {orderItem.size}</div>
            <div className='col-span-1'>Quantity: {orderItem.quantity}</div>
            <div className='col-span-1'>Total Price: {orderItem.amount} </div>



        </div>
    </div>
  )
}

export default MyOrderItem
