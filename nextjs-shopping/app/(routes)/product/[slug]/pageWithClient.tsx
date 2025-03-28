'use client'
import getProducts from '@/actions/getProducts'
import React from 'react'
import axios from 'axios'
import { useEffect, useState } from 'react'
import ProductImages from '../../_components/Product/ProductImages'
import ProductForm from '../../_components/Product/ProductForm'
import RecentProduct from '../../_components/Product/RecentProduct'
import { Product } from '@/constants/type'
import HomeProductSkeleton from '../../_components/Menu/Skeleton/HomeProductSkeleton'
import { Router } from 'next/router'
import { useParams, useRouter } from 'next/navigation'
import { useDynamicRouteParams } from 'next/dist/server/app-render/dynamic-rendering'



interface ProductDetailPageProps {
    paramss: {
        slug:string
    }
}







const ProductDetailPage = () => {

    const router = useRouter();
    const params = useParams();
    console.log(params)

    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);


    useEffect(()=>{

            fetchProducts();
            
    },[params])


    const fetchProducts = async() => {

        setLoading(true);

        try {
            const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/products?sort[0]=id:desc&filters[slug][$eq]=${params.slug}&populate=*&`);
            setProducts(response.data.data);
            console.log(products)

        } catch (error) {
            console.log('cannot be fetched', error);
        }finally {
            console.log(products);
            setLoading(false);
        }



    }



  return (
    <>
        <div className='m-10 container'>

                    {products?.map((product, index) => (
                    <div className='flex flex-row gap-10 m-8 container'>
                        <div><ProductImages images={product?.images} /></div>
                    <div>
                        <div className='flex flex-col gap-3 m-8'>
                            <h2 className='text-3xl font-semibold textone'>{product?.name}</h2>
                            <h2 className='text-lg font-semibold text-mycolor3 dark:text-mycolor5'>{product?.category?.name}</h2>
                            <p>{product?.description}</p>

                            <div className='flex gap-3'>
                                {product?.sellingPrice &&
                                    <h2 className='text-3 xl text-mycolor3 font-semibold'>${product?.sellingPrice}</h2>
                                }
                                <h2 className={product?.sellingPrice ? 'line-through text-gray-500' : ''}>
                                    ${product?.mrp}
                                </h2>
                            </div>
                            <div>
                            <ProductForm
                                product={product}
                                btnVisible={false} 
                            />
                            </div>
                            
                    
                        </div>
                    </div>
                    </div>

                    ))}
            
        </div>
    </>
  )
}

export default ProductDetailPage
