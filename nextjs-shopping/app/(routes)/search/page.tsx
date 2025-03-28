'use client'
import React, { useEffect, useState } from 'react'
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
  } from "@/components/ui/pagination"


  import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"
import { useRouter, useSearchParams } from 'next/navigation'
import axios from 'axios'
import { Input } from '@/components/ui/input'
import HomeProductSkeleton from '../_components/Menu/Skeleton/HomeProductSkeleton'
import ProductItem from '../_components/Product/ProductItem'
import RecentProduct from '../_components/Product/RecentProduct'
import { time } from 'console'



const SearchPage = () => {

    const router = useRouter();
    const searchParams = useSearchParams();

    const [products, setProducts] = useState([]);
    const [colors, setColors] = useState([]);
    const [sizes, setSizes] = useState([]);
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);

    const [search, setSearch] = useState(searchParams.get('q') || '');
    const [color, setColor] = useState(searchParams.get('color') || 'all');
    const [size, setSize] = useState(searchParams.get('size') || 'all');
    const [category, setCategory] = useState(searchParams.get('category') || 'all');

    const [page, setPage] = useState(parseInt(searchParams.get('page') || '1'));
    const [pageSize] = useState(8);
    const [totalPages, setTotalPages] = useState(1);
    const [debounceTimeout, setDebounceTimeout] = useState(null)


    useEffect(()=>{

        fetchColorsSizesCategories();
        fetchProducts({
            search:searchParams.get("q"),
            category:searchParams.get("category"),
            color:searchParams.get("color"),
            size:searchParams.get("size"),
            page:parseInt(searchParams.get("page")) || 1
        })



    },[searchParams])


    const fetchColorsSizesCategories = async() => {

        try {

            const colorsResponse = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/colors`);
            setColors(colorsResponse.data.data);
            const sizesResponse = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/sizes`);
            setSizes(sizesResponse.data.data);
            const categoriesResponse = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/categories`);
            setCategories(categoriesResponse.data.data);
            
        } catch (error) {
            
        }
    }


    const fetchProducts = async(filters) => {

        setLoading(true);

        try {

            const params = new URLSearchParams();


            if (filters.search){
                params.append('filters[name][$contains]', filters.search)
            }

            if (filters.category && filters.category !== 'all'){
                params.append('filters[category][slug][$eq]', filters.category)
            }

            if (filters.color && filters.color !== 'all'){
                params.append('filters[colors][name][$eq]', filters.color)
            }

            if (filters.sie && filters.size !== 'all'){
                params.append('filters[sizes][name][$eq]', filters.size)
            }

            params.append('pagination[page]', filters.page)
            params.append('pagination[pageSize]', pageSize)


            console.log(params)

            const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/products?sort[0]=id:desc&populate=*&${params.toString()}`);
            setProducts(response.data.data);
            setTotalPages(response.data.meta.pagination.pageCount);
        } catch (error) {
            
        }


        setLoading(false);



    }


    const updateURL = (key, value) => {

        const newParams = new URLSearchParams(searchParams);
        
        if (value && value !== 'all'){
            newParams.set(key, value);
        }else {
            newParams.delete(key);
        }

        if (key !== 'page') {
            newParams.set('page', '1');
        }

        router.push(`/search?${newParams.toString()}`);

    }



    const handleSearchChange = (e) => {
        const value = e.target.value
        setSearch(value);
        if(debounceTimeout){
            clearTimeout(debounceTimeout)
        }

        const timeout = setTimeout(()=>{
            updateURL('q', value)
        }, 2000)

        setDebounceTimeout(timeout)
    }

    const handleColorChange = (value) => {
        setColor(value);
        updateURL('color', value);
    }

    const handleSizeChange = (value) => {
        setSize(value);
        updateURL('size', value);
    }

    const handleCategoryChange = (value) => {
        setCategory(value);
        updateURL('category', value);
    }

    const handlePageChange = (newPage) => {
        if (newPage < 1 || newPage > totalPages)  return ;
        
            setPage(newPage);
            updateURL('page', newPage);
        
    }


  return (
    <div className='container mt-8 m-8'>
      <div className='grid grid-cols-1 lg:grid-cols-4 gap-4 bgone borderone p-2 rounded-md'>
        <Input className='w-full bg-white dark:bg-black ' placeholder='Search...' onChange={handleSearchChange} />

        <Select onValueChange={handleColorChange}>
            <SelectTrigger className="w-full bg-white dark:bg-black '">
                <SelectValue placeholder="All Colors" />
            </SelectTrigger>
            <SelectContent>
                <SelectItem value="all">All Color</SelectItem>
                {colors?.map((color)=>(
                    <SelectItem key={color?.id} value={color?.name}>{color?.name}</SelectItem>
                ))}
            </SelectContent>
        </Select>


        <Select onValueChange={handleSizeChange}>
            <SelectTrigger className="w-full bg-white dark:bg-black ">
                <SelectValue placeholder="All Sizes" />
            </SelectTrigger>
            <SelectContent>
                <SelectItem value="all">All size</SelectItem>
                {sizes?.map((size)=>(
                    <SelectItem key={size?.id} value={size?.name}>{size?.name}</SelectItem>
                ))}
            </SelectContent>
        </Select>


        <Select onValueChange={handleCategoryChange}>
            <SelectTrigger className="w-full bg-white dark:bg-black ">
                <SelectValue placeholder="All Categories" />
            </SelectTrigger>
            <SelectContent>
                <SelectItem value="all">All category</SelectItem>
                {categories?.map((category)=>(
                    <SelectItem key={category?.id} value={category?.slug}>{category?.name}</SelectItem>
                ))}
            </SelectContent>
        </Select>


      </div>

      <div>
        
        {loading ? (
            <HomeProductSkeleton />
        ):(

            <div>

                <div className='grid grid-cols-4 md:grid-col-3 lg:grid-cold-4 gap-5 mt-8 mb-8'>
                {products && products?.map( (product) => (
                <ProductItem
                product={product}
                key={product?.id}
                />           
                ))}
                </div>

                <div className='flex justify-center items-center mt-8 mb-8'>
                <Pagination>
                    <PaginationContent>
                        <PaginationItem>
                        <PaginationPrevious href="#"  disabled={page === 1} onClick={() => handlePageChange(page - 1)} />
                        </PaginationItem>
                        {[...Array(totalPages)].map((_, i) => (
                            
                            <PaginationItem key={i+1}>
                                <PaginationLink href="#"
                                onClick={() => handlePageChange(i+1)}
                                className={i+1 === page ? 'border border-blue-500' : ''}>
                                {i+1} 
                                </PaginationLink>
                            </PaginationItem>
                        ))}
                        
                        <PaginationItem>
                        <PaginationEllipsis />
                        </PaginationItem>
                        <PaginationItem>
                        <PaginationNext href="#" disabled={page === totalPages} onClick={() => handlePageChange(page + 1)} />
                        </PaginationItem>
                    </PaginationContent>
                    </Pagination>
                
                </div>

            </div>

        )}

    </div>

    <div className='mb-10'>
    <RecentProduct />
    </div>
    

    </div>
  )
}

export default SearchPage
