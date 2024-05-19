'use client'


import { getSizesBySlog } from "@/actions";
import type { Size } from "@/interfaces"
import clsx from "clsx";
import { useEffect, useState } from "react";


/* interface Props {
    selectedSize: Size;
    availableSizes: Size[];
} */

interface Props {
  slug:string
}

export const SizeSelector = ({slug}:Props) => {

  const [availableSizes, setAvailableSizes] = useState<Size [] | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedSize, setSelectedSize] = useState('');

  useEffect(() => {
   getSizes()  
  }, [])
  

  const getSizes = async ()=>{
    const sizes = await getSizesBySlog( slug )
    console.log( 'las tallas diponibles ;',sizes )
    
    setAvailableSizes( sizes )
    setIsLoading ( false )
    
    }

  const setSize = (valor: string) => {
    setSelectedSize( valor )
    
  }  
 
  
  
  return (
    <div className="my-5">
        <h3 className="font-bold mb-4">Tallas disponibles</h3>
    <div className="flex">

    {
      !isLoading && availableSizes ? 
      (
        availableSizes.map(size =>(
          <button 
            onClick={() => setSize(size)}
            key={size}
            className={clsx(
              "mx-2 hover:underline text-lg",
              {
              'underline text-blue-600' : size === selectedSize
              }
            )}
            >
            {size}
          </button>  
       ))
      )
      :
      (
       <div className="antialiased font-bold text-xl bg-gray-300 rounded-md animate-pulse w-[150px]">
         &nbsp;
       </div>
      )
    }      
    
    </div>


    </div>
  )
}
