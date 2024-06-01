'use client'
import { useEffect, useState } from 'react'

import { LoadingSpinner, QuantitySelector } from '@/components'
import { useCartStore } from '@/store'
import Image from 'next/image'
import { IoTrashOutline } from 'react-icons/io5'
import Link from 'next/link'
import { CartProduct } from '@/interfaces'
import { currencyFormat } from '@/utils'
import { useRouter } from 'next/navigation'


export const ProductsInCart = () => {

  const [loaded, setLoaded] = useState<boolean>(false);
  const router = useRouter()

  const productsIncart = useCartStore( state => state.cart )
  const updateProductQuantity = useCartStore( state => state.updateProductQuantity);
  const removeProduct = useCartStore( state => state.removeProduct)
  const totalItemsInCart = useCartStore( state => state.getTotalItems() );

  useEffect(() => {
    setLoaded(true)
    }, [])


    useEffect(() => {
      if ( totalItemsInCart === 0 && loaded === true )   {
        router.replace('/empty')
      } 
      
    }, [loaded, router, totalItemsInCart])  
  
  const onRemoveProduct = ( product: CartProduct) => {
   removeProduct(product)
  }

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
                   <Image 
                     src={`/products/${product.image}`}
                     width={100}
                     height={100}
                     style={{
                        width:'100px',
                        height:'100px'
                     }}
                     alt={product.title}
                     className="mr-5 rounded"
                     priority={true}
                   />
                        <div className="w-full">                            
                            
                            <div className='h-[25px] overflow-hidden'>
                              <Link
                                className='hover: underline hover:text-blue-500 hover:font-bold cursor-pointer transition-all ' 
                                href={`/product/${product.slug}`}
                                >{product.size}-{product.title}</Link>
                            </div>

                            <p>{currencyFormat(product.price)}</p>
                            <div className="flex flex-col md:justify-around md:flex-row">
                            <QuantitySelector quantity={product.quantity} onQuantityChanged={value => updateProductQuantity(product, value )}/>
                            <button className="underline mt-3 mb-3 hover:text-blue-700"  onClick={()=> onRemoveProduct(product)} >
                              <IoTrashOutline size={30}/>  
                            </button>
                            </div>
                        </div>
                 </div>
                ))
            }
    </>
  )
}
