'use client'
import { useEffect, useState } from 'react'


import { useCartStore } from '@/store'
import Image from 'next/image'


import { currencyFormat } from '@/utils'
import { LoadingSpinner, ProductImage } from '@/components'


export const ProductsInCart = () => {

  const [loaded, setLoaded] = useState<boolean>(false);

  const productsIncart = useCartStore( state => state.cart )
  

  useEffect(() => {
    setLoaded(true)
    }, [])
  
  

  if(!loaded){
    return (
        <LoadingSpinner/>
    )
  }
  
  return (
    
    <>
    {
                productsIncart.map( product => (
                    <div key={`${product.slug}-${product.size}`} className="flex mb-5">
                   <ProductImage 
                     src={ product.image }
                     width={100}
                     height={100}
                     style={{
                        width:'100px',
                        height:'100px'
                     }}
                     alt={product.title}
                     className="mr-5 rounded"
                     
                   />
                        <div className="w-full">                            
                            
                            <div>
                              <span>{product.size}-{product.title} </span>
                              <p>({product.quantity} x { currencyFormat(product.price) })</p>
                            </div>

                            <p className='font-bold'>{currencyFormat(product.price * product.quantity)}</p>

                            <div className="flex flex-col md:justify-around md:flex-row">
                           
                            </div>
                        </div>
                 </div>
                ))
            }
    </>
  )
}
