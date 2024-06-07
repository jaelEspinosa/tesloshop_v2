import { Title } from "@/components";
import Link from "next/link";


import { ProductsInCart } from "./ui/ProductsInCart";
import { OrderSumary } from "./ui/OrderSumary";


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
             <ProductsInCart />
            </div>

            {/* Checkout - Resumen de orden */}

            <div className="bg-white rounded-xl shadow-xl p-7 h-80 sm:h-72 ">
                <h2 className="text-2xl mb-2">Resumen del pedido</h2>
                <OrderSumary />

                <div className="mt-5 mb-5 w-full">
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
