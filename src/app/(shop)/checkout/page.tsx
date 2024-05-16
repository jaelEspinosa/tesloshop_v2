import { Title } from "@/components";
import { initialData } from "@/seed/seed";
import Image from "next/image";
import Link from "next/link";






const productsIncart = [
    initialData.products[0],
    initialData.products[1],
    initialData.products[2]
]

export default function  CheckoutPage(){
    return (
        <div className="flex justify-center items-center mb-72 px-10 sm:px-0">
        <div className="flex flex-col w-[1000px]">
           <Title title="Confirmar pedido"/>
           <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">

            {/* Carrito */}
             <div className="flex flex-col mt-5">
              <span className="text-xl">Modificar pedido</span>
              <Link href='/cart' className="underline mb-5">Volver al carrito</Link>
             
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
                            <p className="font-bold"> Subtotal:$ {product.price * 3}</p>
                            
                        </div>
                 </div>
                ))
            }
            </div>

            {/* Checkout - Resumen de orden */}

            <div className="bg-white rounded-xl shadow-xl p-7">


                <h2 className="text-2xl font-bold mb-2">Dirección de entrega</h2>
                <div className="mb-10 ">
                     <p className="text-xl">Jael Espinosa Lucia</p>
                     <p>c/ Tejodillo, 23</p>
                     <p>11500 pto sta Maria</p>
                     <p>Cadiz</p>
                     <p>España</p>
                     <p>678562523</p>
                </div>
                {/* divider */}
                <div className="w-full h-0.5 rounded bg-gray-200 mb-10"></div>

                <h2 className="text-2xl mb-2 font-bold">Resumen del pedido</h2>
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
                        href='/orders/123'
                        className="flex btn-primary justify-center"
                        >Finalizar</Link>
                </div>
            </div>

           </div>
        </div>
        </div>
    )
}





