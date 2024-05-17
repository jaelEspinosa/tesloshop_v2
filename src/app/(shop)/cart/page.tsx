import { QuantitySelector, Title } from "@/components";
import { initialData } from "@/seed/seed";

import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import { IoTrashOutline } from "react-icons/io5";

const productsIncart = [
    initialData.products[0],
    initialData.products[1],
    initialData.products[2]
]

export default function  CartPage(){


    /* redirect('/empty'); */

    return (
        <div className="flex justify-center items-center mb-72 px-10 sm:px-0">
        <div className="flex flex-col w-[1000px]">
           <Title title="Carrito"/>
           <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">

            {/* Carrito */}
             <div className="flex flex-col mt-5">
              <span className="text-xl">Agregar más items</span>
              <Link href='/' className="underline mb-5">Continúa comprando</Link>
             
             {/* items */}
             {
                productsIncart.map( product => (
                    <div key={product.slug} className="flex mb-5">
                   <Image 
                     src={`/products/${product.images[0]}`}
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
                            <p>{product.title}</p>
                            <p> ${product.price}</p>
                            <div className="flex flex-col md:justify-around md:flex-row">
                            <QuantitySelector quantity={3}/>
                            <button className="underline mt-3 mb-3 hover:text-blue-700">
                              <IoTrashOutline size={30}/>  
                            </button>
                            </div>
                        </div>
                 </div>
                ))
            }
            </div>

            {/* Checkout - Resumen de orden */}

            <div className="bg-white rounded-xl shadow-xl p-7 h-72">
                <h2 className="text-2xl mb-2">Resumen del pedido</h2>
                <div className="grid grid-cols-2">
                    <span>No. Productos</span>
                    <span className="text-right ">3 Articulos</span>

                    <span>Subtotal</span>
                    <span className="text-right ">$ 100</span>

                    <span>Impuestos(21%)</span>
                    <span className="text-right ">$ 21</span>

                    <span className="mt-5 text-2xl">Total</span>
                    <span className="text-right mt-5 text-2xl ">$ 121</span>
                </div>
                <div className="mt-5 mb-2 w-full">
                    <Link 
                        href='/checkout/address'
                        className="flex btn-primary justify-center"
                        >Confirmar</Link>
                </div>
            </div>

           </div>
        </div>
        </div>
    )
}
