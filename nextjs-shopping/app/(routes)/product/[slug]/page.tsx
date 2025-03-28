
import getProducts from '@/actions/getProducts'
import React from 'react'
import ProductImages from '../../_components/Product/ProductImages'
import ProductForm from '../../_components/Product/ProductForm'
import RecentProduct from '../../_components/Product/RecentProduct'




const ProductDetailPage = async({params}) => {

    const slug = params.slug;
    const url = `/products?sort[0]=id:desc&filters[slug][$eq]=${slug}&populate=*`

    const products = await getProducts(url);


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
                    <RecentProduct />
        </div>
    </>
  )
}

export default ProductDetailPage
