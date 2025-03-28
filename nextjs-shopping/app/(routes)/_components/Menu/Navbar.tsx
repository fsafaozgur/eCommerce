
'use client'
import Logo from '@/components/Logo'
import Search from './Search'
import Cart from './Cart'
import UserMenu from './UserMenu'
//import { useEffect, useState } from 'react'
//import { getCategories } from '@/actions/getCategories'
import { ModeToggle } from '@/components/ModeToggle'
//import NavSkeleton from './Skeleton/NavSkeleton'
import MobileMenu from './MobileMenu'
import getCategories from '@/actions/getCategories';
import Link from 'next/link'
import { useEffect, useState } from 'react'


const Navbar = () => {

  //Normalde burada server side rendering kullanılıyordu ancak localstorage bu şekilde çalışmadı, useEffect ile çalışılmak zorunda kalındı
  //const categories = await getCategories();


    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect( () => {

      const fetchCategories = async() => {
 
        try {
          const categories = await getCategories();
          setCategories(categories);
        } catch (error) {
            console.error('Failed to fetch categories', error);
        }
        finally{
          setLoading(false);
        }
      } 

      fetchCategories();

    },[]) 

 


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

 

  return (
    <>
    <header className='flex py-4 border-b borderone bgone'>
      <div className='container flex items-center justify-between mx-auto px-4'>
        
        <Logo/>
      
        <Search/>
  

        <div className='space-x-10 flex items-center'>
        
            <Cart jwt={jwt} userId={userId} />
            <UserMenu />
            <ModeToggle />
            <div className='flex lg:hidden'>
              <MobileMenu categories={categories} />
            </div>
            
        </div>
        


      </div>


    </header>

    <nav className='hidden border-b borderone bgone lg:flex py-4 justify-center'>
      <div className='hidden lg:flex gap-8'>
        {categories?.map( (category) => (
                <div key={category.id}>
                  <Link href={`/search?category=` + category.slug}>
                {category.name}
              </Link>
              </div>
                   
        ))}
      
          
        
        
      </div>

    </nav>
    </>
  )
}



export default Navbar