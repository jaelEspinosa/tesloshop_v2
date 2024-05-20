'use client'


import { QuantitySelector, SizeSelector } from '@/components'
import { CartProduct, Product, Size } from '@/interfaces'
import { useCartStore } from '@/store'
import { useState } from 'react'



interface Props {
    product: Product
}

export const AddTocart = ({ product }: Props) => {

    const addProductToCart = useCartStore(state => state.addProductToCart);
    const [size, setSize] = useState<Size | undefined>()
    const [quantity, setQuantity] = useState<number>(1)
    const [posted, setPosted] = useState<boolean>(false)

   


    const addTocart = () => {
        setPosted(true)
        if (!size) return;

        /* console.log({size, quantity, product}) */
        const cartProduct: CartProduct = {
            id: product.id,
            slug: product.slug,
            title: product.title,
            price:product.price,
            quantity,
            size: size,
            image: product.images[0]
        }
        addProductToCart( cartProduct );
        setPosted (false);
        setQuantity (1);
        setSize ( undefined )
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
