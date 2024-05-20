'use client'


import { QuantitySelector, SizeSelector } from '@/components'
import { Product, Size } from '@/interfaces'
import clsx from 'clsx'
import { useState } from 'react'



interface Props {
    product: Product
}

export const AddTocart = ({ product }: Props) => {

    const [size, setSize] = useState<Size | undefined>()
    const [quantity, setQuantity] = useState<number>(1)
    const [posted, setPosted] = useState<boolean>(false)




    const addTocart = () => {
        setPosted(true)
        if (!size) return;

        console.log({size, quantity})
        }

    return (
        <>   
           <div className='h-[7px]'>
            {
                posted && !size &&
                (
                    <span className='text-red-500 font-bold transition-all fade-in'>*Debe seleccionar una talla.</span>
                )
            }
           </div>


            {/* Selector de tallas */}
            <SizeSelector availableSizes={product.sizes} selectedSize={size} onSizeChanged={(size) => setSize(size)} />


            {/* Selector de cantidad */}
            <QuantitySelector quantity={quantity} onQuantityChanged={(quantity) => setQuantity(quantity)} />

            {/* boton */}

            <button
                className="btn-primary my-5"
                onClick={() => addTocart()}
            >Agregar al Carrito</button></>
    )
}
