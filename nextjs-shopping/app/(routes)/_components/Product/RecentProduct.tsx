'use client'
import React, { useEffect, useState } from 'react'
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
  } from "@/components/ui/carousel"
import ProductItem from './ProductItem';
import axios from 'axios';

const RecentProduct = () => {

    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);


    useEffect(()=>{

        getRecentProduct();


    },[])


    const getRecentProduct = async() => {

        setLoading(true);

        try {
            const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/products?sort[0]=id:desc&filters[recent]=true&pagination[start]=0&pagination[limit]=8&populate=*`);
            setProducts(response.data.data);
            console.log(products);
        } catch (error) {
            console.log('Data not fetched', error);
        }finally{
            setLoading(false);
        }

    }

    
      return (
        <>
     
    
            <div className='p-10 container'>
                <h2 className='textone font-semibold text-2xl lg:text-3xl mb-8'>
                   Recent Products
                </h2>
            
                <Carousel className='w-full mb-11'>
                <CarouselContent className='flex flex-row -ml-1 w-full gap-4 lg:px-36 lg:-ml-36'>
                {products && products?.map( (product, index) => (
                    <CarouselItem key={index} className='pl-1 md:basis-1/2 lg:basis-1/3'>
                        <ProductItem
                  product={product}
                  key={product?.id}
                  />
                    </CarouselItem>
                ))}
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
                </Carousel>


                
            </div>
    
    
        </>
      )
}

export default RecentProduct
