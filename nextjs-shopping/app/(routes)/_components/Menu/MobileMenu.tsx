import { Category } from '@/constants/type'
import React from 'react'
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
  } from "@/components/ui/sheet"
import { MenuIcon } from 'lucide-react';
import Link from 'next/link';

interface MobilMenuProps {
    categories:Category[];
}


const MobileMenu = ({categories}:MobilMenuProps) => {
  return (
    <Sheet>
  <SheetTrigger>
    <MenuIcon />
  </SheetTrigger>
  <SheetContent className="w-[400px] sm:w-[540px] bgone">
    <div className='flex flex-col space-y-5 mt-8'>
        {categories.map( (category, index) => (
                <div key={index}>
                  <Link href={`/search?category=` + category.slug}>
                  {category.name}
                    </Link>
                </div>
                    
                ))}
    </div>
  </SheetContent>
</Sheet>
  )
}

export default MobileMenu
