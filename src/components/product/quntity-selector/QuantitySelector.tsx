'use client'

import { useState } from "react"
import { IoAddCircleOutline, IoRemoveCircleOutline } from "react-icons/io5"


interface Props {
  quantity: number
}

export const QuantitySelector = ({quantity}:Props) => {

  const [count, setCount] = useState(quantity)

  const onQuantityChanged = (value: number) => {
    if(count+value > 5 || count+value < 1) return

    setCount(count+value)
  }
  return (
    <div className="flex">
      <button>
        <IoRemoveCircleOutline size={30} onClick={()=>onQuantityChanged(-1)}/>
      </button>
     <span className="w-20 mx-5 flex items-center justify-center bg-gray-200 rounded">
        {count}
     </span>
     <button>
        <IoAddCircleOutline size={30} onClick={()=>onQuantityChanged(+1)}/>
      </button>
   
    </div>
  )
}
