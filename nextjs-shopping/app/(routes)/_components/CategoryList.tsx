'use server'
import getCategories from '@/actions/getCategories';
import Image from 'next/image';
import Link from 'next/link';
//import React, { useEffect, useState } from 'react'
//import CategorySkeleton from './Menu/Skeleton/CategorySkeleton';




export default async function CategoryList() {

  const categories = await getCategories();

  return (
    <div className='w-[95%] m-4 md:m-8 lg:m-12 items-center grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-7 gap-4'>
                {categories?.map( (category,index) => (
                <div key={index}>

                <Link href={`/search?category=` + category.slug} key={category?.id} 
                className='flex flex-col rounded-xl gap-2 items-center p-3 border borderone cursor-pointer'>

                    <Image
                        alt=''
                        unoptimized={true}
                        src={process.env.NEXT_PUBLIC_BACKEND_URL + category?.image?.formats?.thumbnail?.url}
                        width={500}
                        height={300}
                        className='w-16 h-16'
                        />
                    {category?.name}
                </Link>
              </div>
                   
            ))}

            </div>
  )
}


/*
export default async function CategoryList () {

//const CategoryList = ({categories}) => {

//  const [categories, setCategories] = useState([]);
//     const [loading, setLoading] = useState(true);

//     useEffect( () => {

//       const fetchCategories = async() => {
 
//         try {
//           const categories = await getCategories();
//           setCategories(categories);
//         } catch (error) {
//             console.error('Failed to fetch categories', error);
//         }
//         finally{
//           setLoading(false);
//         }
//       } 

//       fetchCategories();

//     },[])


const request = await fetch('http://localhost:1337/api/categories?populate=*')
const data = await request.json();
const categories = data.data;


  return (
    <>
    {categories ? (
        <CategorySkeleton />
    ) : (
        <div className='mt-10 container'>
            <h2 className='textone font-semibold text-2xl lg:text-3xl'>
                Shop by Category
            </h2>
            <div className='grid mt-8 grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-7 gap-4'>
                {categories?.map( (category) => (
                <div>

                <Link href={`./category/` + category?.slug} key={category?.id} 
                className='flex flex-col rounded-xl gap-2 items-center p-3 border borderone cursor-pointer'>

                    <Image
                        alt=''
                        unoptimized={true}
                        src={process.env.NEXT_PUBLIC_BACKEND_URL + category?.image?.formats?.thumbnail?.url}
                        width={500}
                        height={300}
                        className='w-16 h-16'
                        />
                    {category?.name}
                </Link>
              </div>
                   
            ))}

            </div>

        </div>
    )}
    
    
    </>
  )
}

//export default CategoryList*/
