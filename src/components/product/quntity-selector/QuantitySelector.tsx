'use client'

import { useState } from "react"
import { IoAddCircleOutline, IoRemoveCircleOutline } from "react-icons/io5"


interface Props {
  quantity: number;
  onQuantityChanged:( value: number) => void;
}

export const QuantitySelector = ({quantity, onQuantityChanged}:Props) => {



  const onValuleChanged = (value: number) => {
    if(quantity+value > 5 || quantity +value < 1) return

    onQuantityChanged(quantity + value)
  }
  return (
    <div className="flex">
      <button>
        <IoRemoveCircleOutline size={30} onClick={()=>onValuleChanged(-1)}/>
      </button>
     <span className="w-20 mx-5 flex items-center justify-center bg-gray-200 rounded">
        {quantity}
     </span>
     <button>
        <IoAddCircleOutline size={30} onClick={()=>onValuleChanged(+1)}/>
      </button>
   
    </div>
  )
}
