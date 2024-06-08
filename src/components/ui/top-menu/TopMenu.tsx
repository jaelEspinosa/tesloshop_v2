'use client'

import { titleFont } from '@/config/fonts'
import { useCartStore, useUiStore } from '@/store'
import clsx from 'clsx'


import Link from 'next/link'
import { redirect, useRouter } from 'next/navigation'


import React, { useEffect, useState } from 'react'
import { IoSearchOutline, IoCartOutline } from "react-icons/io5"

export const TopMenu = () => {

  const openMenu     = useUiStore( state => state.openSideMenu );
  const totalItemsInCart = useCartStore( state => state.getTotalItems() );
  const [loaded, setLoaded] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [termOfSearch, setTermOfSearch] = useState<string>('')
  const router = useRouter()
  
const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  setTermOfSearch(e.target.value)
 }
  useEffect(() => {
    setLoaded(true)
    
    }, [])
  const onSubmit =  () => {
    if(!termOfSearch){
      return;
    }
   router.replace(`/tag/${ termOfSearch }`)
     
  }
  
  return (
    <nav className='flex px-5 justify-between items-center w-full'>
      {/* logo */}
      <div>
        
        <Link href="/">
            <span className={`${ titleFont.className} antialiased font-bold`}>Teslo</span>
            <span> | Shop</span>
        </Link>
        </div>    

        {/* center menu */}

        <div className={clsx(
          {
            'hidden sm:block' : !isSearching,
            'hidden' : isSearching
          }
        )}>
          <Link className='m-2 p-2 rounded-md transition-all hover:bg-gray-100 ' href={'/gender/men'}>Hombres</Link>
          <Link className='m-2 p-2 rounded-md transition-all hover:bg-gray-100 ' href={'/gender/women'}>Mujeres</Link>
          <Link className='m-2 p-2 rounded-md transition-all hover:bg-gray-100 ' href={'/gender/kid'}>Niños</Link>
        </div>

        {/* search, cart, menu */}

        <div className='flex items-center'>
       
           <div className='hidden sm:block'>
           <button className={clsx(
                
                {
                  'mx-2 transition-all' : !isSearching,
                  'hidden transition-all' : isSearching
                }
              )}
               onClick={()=> setIsSearching(!isSearching)}
              >
                <IoSearchOutline className='w-5 h-5' />
              </button>
  
              <div className={clsx(
                  
                { 
                  'flex transition-all': isSearching,
                  'hidden transition-all': !isSearching
                }
              )}>
              <IoSearchOutline className='w-5 h-5' 
                onClick={()=>{
                  setIsSearching(!isSearching)
                  onSubmit()
                }}
              />
              <input 
                  type="text" 
                  className='border-b mx-2 focus:outline-none focus:border-blue-500'
                  value={termOfSearch}
                  onChange={e => handleSearchChange(e)}

                  />
              </div>
           </div>
       
          

          
          
          <Link href={
            ((totalItemsInCart === 0  && loaded) 
              ? '/empty'
              : '/cart'
            )
          } className='mx-2'>
            <div className='relative'>

              {(totalItemsInCart > 0 && loaded) && (
              <span className='absolute fade-in text-xs px-1 rounded-full font-bold -top-2 -right-2 bg-blue-700 text-white'>
                { totalItemsInCart }
              </span>
              )
            }


              <IoCartOutline className='w-5 h-5'/>
            </div>
          </Link>
       <button className='m-2 p-2 rounded-md transition-all hover:bg-gray-100' onClick={ openMenu }>
        Menú
       </button>

        </div>
    </nav>

  )
}
