
'use client'

import { useCartStore } from "@/store"
import { useEffect, useState } from "react"
import { currencyFormat } from '../../../../utils/currencyFormats';
import { LoadingSpinner } from "@/components";

export const OrderSumary = () => {

  const { itemsInCart, subTotal, tax, total } = useCartStore(state => state.getSumaryInformation());
  const [loaded, setLoaded] = useState<boolean>(false);


  useEffect(() => {
    setLoaded(true);
  }, [])

  if (!loaded) return (
    <LoadingSpinner />
  )

  return (
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
  )
}
