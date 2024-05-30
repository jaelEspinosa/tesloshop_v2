'use client'


import { QuantitySelector, SizeSelector } from '@/components'
import { CartProduct, Product, Size } from '@/interfaces'
import { useCartStore } from '@/store'
import { useRouter } from 'next/navigation'
import { useState } from 'react'



interface Props {
    product: Product
}

export const AddTocart = ({ product }: Props) => {

    const addProductToCart = useCartStore(state => state.addProductToCart);
    const [size, setSize] = useState<Size | undefined>();
    const [quantity, setQuantity] = useState<number>(1);
    const [posted, setPosted] = useState<boolean>(false);
    const [showModal, setShowModal] = useState<boolean>(false)
    const router = useRouter()
   
const resolveShoping = ()=> {
  setShowModal(false);
}

const placeOrder = ()=>{
  setShowModal(false);
  router.replace('/cart')
}
    const addTocart = () => {
      setPosted(true)
      if (!size) return;
      setShowModal(true)

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
{
  showModal && (
        <div style={{'zIndex': '99'}} className="fixed left-0 top-0 flex h-full w-full items-center justify-center bg-black bg-opacity-50 py-10 backdrop-filter backdrop-blur-sm transition-all ">
          <div className="max-h-full w-full max-w-xl overflow-y-auto sm:rounded-2xl bg-white">
            <div className="w-full">
              <div className="m-8 my-20 max-w-[400px] mx-auto">
                <div className="mb-8">
                  <h1 className="mb-4 text-3xl font-extrabold">Agregado a la cesta</h1>
                  <p className="text-gray-600">¡Producto agregado a la cesta de su compra!</p>
                </div>
                <div className="space-y-4">
                  <button className="p-3 bg-blue-500 hover:bg-blue-700 rounded-full text-white w-full font-semibold transition-colors"
                          onClick={placeOrder}
                  >Tramitar Pedido</button>
                  <button className="p-3 bg-white border hover:bg-gray-400 transition-colors rounded-full w-full font-semibold"
                          onClick={resolveShoping}
                  >Seguir comprando</button>
                </div>
              </div>
            </div>
          </div>
        </div>
  )
}





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
