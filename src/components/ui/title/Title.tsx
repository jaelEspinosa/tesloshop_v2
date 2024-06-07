import { titleFont } from "@/config/fonts";

interface Props {
    title       : string;
    subTitle?   : string;
    className?  : string;
}



import React from 'react'

export const Title = ({title, subTitle, className}:Props) => {
  return (
    <div className={` mt-3 ${ className }`}>
       <h1 className={`${ titleFont.className} antialiased sm:text-4xl text-xl font-semibold mx-2 my-4`}>
        {title}
       </h1>

       {
        subTitle && (
            <h3 className="text-xl mb-5">{ subTitle }</h3>
        )
       }
    </div>
  )
}

