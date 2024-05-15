import { Product } from "@/interfaces"


interface Props
{
    products: Product[];
}



import React from 'react'
import { ProductGridItem } from "./ProductGridItem";

export const ProductGrid = ({products}:Props) => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-10 mb-10">
    {
       products.map( product => (
           <ProductGridItem key={product.slug} product={product}/>
       ))
    }
   </div>
  )
}
