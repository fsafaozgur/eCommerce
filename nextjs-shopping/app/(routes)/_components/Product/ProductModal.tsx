
import { Product } from '@/constants/type'
import React from 'react'
import ProductImages from './ProductImages';
import ProductForm from './ProductForm';
//import ProductForm from './ProductForm';


interface ProductModalProps {
    product:Product;
}

const ProductModal =  ({product}:ProductModalProps) => {



  return (
    <div className='w-full'>
        <div className='grid grid-cols-1 md:grid-cols-2 bgone p-7 gap-3'>
          
          <ProductImages images={product?.images} />

          <div className='flex flex-col gap-3'>
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

              <ProductForm
                product={product}
                btnVisible={true} 
              />
            
          </div>
        </div>

    </div>
  )
}

export default ProductModal
