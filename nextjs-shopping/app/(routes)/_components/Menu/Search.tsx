'use client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Keyboard, SearchIcon } from 'lucide-react'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'



const Search = () => {

  
  const router = useRouter();

  const [query, setQuery] = useState('');

  const handleInputChange = (event) => {
    setQuery(event.target.value)
  }


  const handleSearh = () => {
    if (query.trim()) {
      router.push(`/search?q=${query}`)
    }
  }



  return (
    <div className='w-full xl:max-w-xl lg:max-w-xl lg:flex hidden relative'>
        <Input onChange={handleInputChange}/>
        <Button onClick={handleSearh} variant='ghost' className='absolute right-0 top-0 text-lg h-10'>
            <SearchIcon/>
        </Button>
      
    </div>
  )
}

export default Search
