'use client'

import { getCountry } from "@/actions/country/get-countries"
import { LoadingSpinner } from "@/components"
import { useAddressStore, useCartStore } from "@/store"
import { currencyFormat } from "@/utils"
import { useEffect, useState } from "react"

export const PlaceOrder = () => {
    const [loaded, setLoaded] = useState(false)
    const [country, setCountry] = useState<string>()

    const address = useAddressStore(state => state.address)
    const { itemsInCart, subTotal, tax, total } = useCartStore(state => state.getSumaryInformation());






    useEffect(() => {
        setLoaded(true)
        getCountryDb()
    }, [])

    const getCountryDb = async () => {
        const countryDb = await getCountry(address.country)
        setCountry(countryDb?.name)
    }

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
                <button
                    /*  href='/orders/123' */
                    className="flex btn-primary justify-center"
                >Finalizar</button>
            </div>
        </div>
    )
}
