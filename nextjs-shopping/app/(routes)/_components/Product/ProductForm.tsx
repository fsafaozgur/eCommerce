
'use client'

import { Product } from '@/constants/type'
import { useProductsFormStore } from '@/hooks/useForm'
import React, { useEffect, useState } from 'react'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"
import { Button } from '@/components/ui/button'
import { Loader2Icon, MinusIcon, PlusIcon } from 'lucide-react'
import Link from 'next/link'
import addToCart from '@/actions/Cart/addToCart'
import { Toaster } from "@/components/ui/toaster"
import { useToast } from '@/hooks/use-toast'
import useCartStore from '@/hooks/useCartStore'
import { useRouter } from 'next/navigation'



interface ProductFormProps {
    product:Product
    btnVisible?:boolean
}

const ProductForm = ({product,btnVisible}:ProductFormProps) => {

    const [loading, setLoading] = useState(false);
    const { toast } = useToast();
    const router = useRouter();
    const fetchItems = useCartStore((state)=>state.fetchItems);

    //deneme için eklendi
    const addItem = useCartStore((state)=>state.addItem);
    //deneme için eklendi
    const items_zu = useCartStore(state => state.items_zu);


    const {quantity, selectedColor, selectedSize, incrementQuantity, decrementQuantity, setColor, setSize, reset} = useProductsFormStore();

    useEffect(()=>{
        reset();
    },[product])

    const handleColorChange = (color) => {
        setColor(color);
    }

    const handleSizeChange = (size) => {
        setSize(size);
    }

    const totalPrice = (quantity * product?.sellingPrice).toFixed(2);


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

    
    const onAddCart = async() => {

        if (!userId && !jwt){
            router.push('/login')
        }

        if (!selectedColor || !selectedSize) {
            toast({
                title: "Color and Size required",
                variant:'destructive',
            });
            return;
        }

        try {

            setLoading(true)
    
            const data = {
                data: {
                    quantity: quantity,
                    amount: totalPrice,
                    color: selectedColor,
                    size: selectedSize,
                    products: product.id,
                    users_permissions_user:userId,
                    userId:userId
                }  
            }


            //sepete ürünü ekliyoruz
            await addToCart(data, jwt)

            //sağ üstteki sepet iconuna tıklanınca sağda açılan menüde gelecek item listesini güncelliyoruz(hooks/useCartStore içerisindeki items)
            fetchItems(userId, jwt)
            //zustand ile de client üzerinde kaydediyoruz, örnek kod olsun diye
            addItem(data);
            console.log(items_zu)

            toast({
                title: "Added to Cart",
                variant:'success',
            });

            
            
        } catch (error) {
            console.log('error', error)

        }finally{
            setLoading(false)
        }

    }
    


  return (
    <>
    <div className='flex flex-row'>
        <Select onValueChange={handleColorChange}>
            <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Color" />
            </SelectTrigger>
            <SelectContent>
                {product?.colors?.map((color)=> (
                    <SelectItem value={color?.name}>{color?.name}</SelectItem>
                ))}
            </SelectContent> 
        </Select>


    <Select onValueChange={handleSizeChange}>
        <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Size" />
        </SelectTrigger>
        <SelectContent>
            {product?.sizes?.map((size)=> (
                <SelectItem value={size?.name}>{size?.name}</SelectItem>
            ))}
        </SelectContent>
    </Select>
    </div>

    <div className='flex flex-row item-center gap-4 mt-8'>
            <Button size="xs" disabled={quantity===1} onClick={decrementQuantity}>
                <MinusIcon/>   
            </Button>
            <h2>{quantity}</h2>
            <Button size="xs" onClick={incrementQuantity}>
                <PlusIcon />
            </Button>
            <p>{totalPrice}</p>
    </div>

    <div className='flex flex-row gap-4 mt-8'>
        <Button onClick={onAddCart} variant='destructive'>
            {loading ? <Loader2Icon className='animate-spin'/> : 'Add To Card'   }
        </Button>

        {btnVisible && 
            <Button asChild>
                <Link href={`product/${product?.slug}`}>
                    Detail
                </Link>   
            </Button>
        }

    </div>

    
    </>
  )
}

export default ProductForm
