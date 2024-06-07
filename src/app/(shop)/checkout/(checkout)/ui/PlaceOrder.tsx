'use client'

import { getCountry } from "@/actions/country/get-countries"
import { placeOrder } from "@/actions/order/place-order"
import { LoadingSpinner } from "@/components"
import { useAddressStore, useCartStore } from "@/store"
import { currencyFormat } from "@/utils"
import clsx from "clsx"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

export const PlaceOrder = () => {

    const router = useRouter();

    const [loaded, setLoaded] = useState(false);
    const [country, setCountry] = useState<string>();
    const [isPlacingOrder, setIsPlacingOrder] = useState<boolean>(false);
    const [errorMessage, setErrorMessage] = useState<string>();

    const { itemsInCart, subTotal, tax, total } = useCartStore(state => state.getSumaryInformation());
    const address = useAddressStore(state => state.address);
    const cart = useCartStore( store => store.cart);
    const clearCart = useCartStore( store => store.clearCart);


    const onPlaceOrder = async () => {
    
    setIsPlacingOrder(true)

    const productsToOrder = cart.map( product => ({
        productId: product.id,
        quantity: product.quantity,
        size: product.size
    }))

  

    // Server Action
    
      const resp = await placeOrder(productsToOrder, address)
      if(!resp.ok){
        setIsPlacingOrder(false);
        setErrorMessage(resp.message);
        return;
      }
     //* todo salio bien.
     clearCart()
     router.replace('/orders/' + resp.order?.id);
    }


    useEffect(() => {
        setLoaded(true)
        const getCountryDb = async () => {
            const countryDb = await getCountry(address.country)
            setCountry(countryDb?.name)
        }
        getCountryDb()
    }, [address.country])


    if (!loaded) {
        return <LoadingSpinner />
    }

    return (
        <div className="bg-white rounded-xl shadow-xl p-7 h-auto">



            <h2 className="text-2xl font-bold mb-2">Dirección de entrega</h2>
            <div className="mb-10 ">
                <p className="text-xl">{address.firstName} {address.lastName}</p>
                <p>{address.address}</p>
                <p>{address.address2}</p>
                <p>{address.postalCode}</p>
                <p>{address.city}</p>
                <p>{country}</p>
                <p>{address.phone}</p>
            </div>
            {/* divider */}
            <div className="w-full h-0.5 rounded bg-gray-200 mb-10"></div>

            <h2 className="text-2xl mb-2 font-bold">Resumen del pedido</h2>
            <div className="grid grid-cols-2">
                <span>No. Productos</span>
                <span className="text-right ">{itemsInCart === 1 ? 'Un articulo' : `${itemsInCart} Articulos`}</span>

                <span>Subtotal</span>
                <span className="text-right ">{currencyFormat(subTotal)}</span>

                <span>Impuestos(21%)</span>
                <span className="text-right ">21% {currencyFormat(tax)} </span>

                <span className="mt-5 text-2xl">Total</span>
                <span className="text-right mt-5 text-2xl "> {currencyFormat(total)}</span>
            </div>
            <div className="mt-5 mb-2 w-full">
                <p className="text-red-500">{errorMessage}</p>
                <button
                    disabled={isPlacingOrder}
                    /*  href='/orders/123' */
                    className={clsx(
                        {
                            "flex btn-primary justify-center":!isPlacingOrder,
                            "flex btn-disabled justify-center": isPlacingOrder
                        }
                    )}
                    onClick={ onPlaceOrder }
                >Finalizar</button>
            </div>
        </div>
    )
}
