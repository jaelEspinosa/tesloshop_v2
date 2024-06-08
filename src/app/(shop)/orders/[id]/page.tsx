
import { getCountry } from "@/actions/country/get-countries";
import { getOrderById } from "@/actions/order/get-order-by-id";
import {  OrderStatus, PaypalButton, ProductImage, Title } from "@/components";
import { currencyFormat } from "@/utils";

import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";



interface Props {
    params:{
        id:string
    }
}


export default async function  OrderPage({params}:Props){

    const { id } = params;
    //  llamar el server Action.
    const {ok, order} = await getOrderById( id )

    if(!ok){
        redirect('/')
    }
    const  orderAddress  = order!.OrderAddress
    const  orderItem  = order!.orderItem

    console.log(orderItem)

    const country = await getCountry(orderAddress!.countryId)

    

    //Todo: verificar 
    // redirect(/)
    return (

        <div className="flex justify-center items-center mb-72 px-10 sm:px-0">
        <div className="flex flex-col w-[1000px]">
           <Title title={`Orden #${ id.split('-').at(-1) }`}/>

           <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">

            {/* Carrito */}
             <div className="flex flex-col mt-5">
          
               <OrderStatus isPaid = { order!.isPaid } />
             
             {/* items */}
             {
                orderItem.map( item => (
                    <div key={item.product.slug+item.size} className="flex mb-5">
                   <ProductImage 
                     src={item.product.ProductImage[0].url}
                     width={100}
                     height={100}
                     style={{
                        width:'100px',
                        height:'100px'
                     }}
                     alt={item.product.title}
                     className="mr-5 rounded"
                   />
                        <div className="w-full">
                            <Link href={`/product/${item.product.slug}`} className="pointer">{item.product.title}</Link>
                            <p>{currencyFormat(item.price)}</p>
                            <p className="font-bold"> Subtotal: {currencyFormat(item.price * item.quantity)}</p>
                            
                        </div>
                 </div>
                ))
            }
            </div>

            {/* Checkout - Resumen de orden */}

            <div className="bg-white rounded-xl shadow-xl p-7 h-auto">


                <h2 className="text-2xl font-bold mb-2">Dirección de entrega</h2>
                <div className="mb-10 ">
                     <p className="text-xl">{orderAddress?.firstName} {orderAddress?.lastName}</p>
                     <p>{orderAddress?.address}</p>
                     <p>{orderAddress?.address2}</p>
                     <p>{orderAddress?.postalCode}</p>
                     <p>{orderAddress?.city}</p>
                    { country && 
                    (
                        <p>{country.name}</p>
                    )
                     }
                     <p>{orderAddress?.phone}</p>
                </div>
                {/* divider */}
                <div className="w-full h-0.5 rounded bg-gray-200 mb-10"></div>

                <h2 className="text-2xl mb-2 font-bold">Resumen del pedido</h2>
                <div className="grid grid-cols-2 mb-5">
                    <span>No. Productos</span>
                    <span className="text-right ">{order?.itemsInOrder}</span>

                    <span>Subtotal</span>
                    <span className="text-right ">{currencyFormat(order!.subTotal)}</span>

                    <span>Impuestos(21%)</span>
                    <span className="text-right ">{currencyFormat(order!.tax)}</span>

                    <span className="mt-5 text-2xl">Total</span>
                    <span className="text-right mt-5 text-2xl ">{currencyFormat(order!.total)}</span>
                </div>
                {
                    !order?.isPaid ? (
                         <>
                         <div className=" flex-col sm:flex mb-3 border-red-500 border p-3 rounded-xl">
                            <p>Usuario dummy paypal: <span className="font-bold">buy_testing@gmail.com</span></p>
                            <p>Password paypal: <span className="font-bold">A123456789</span></p>
                         </div>
                            
                        <PaypalButton amount={order!.total} orderId={order!.id}/>
                         </>
                    ):(
                        <OrderStatus isPaid = { order!.isPaid } />
                    )
                }

            </div>

           </div>
        </div>
        </div>
    )
}
