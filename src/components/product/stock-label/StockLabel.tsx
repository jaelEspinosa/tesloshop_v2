
'use client'




import { getStockBySlog } from '@/actions/products/get-stock-by-slug'
import { titleFont } from '@/config/fonts'
import clsx from 'clsx'
import { useEffect, useState } from 'react'

interface Props {
    slug: string
}


export const StockLabel = ({ slug }: Props) => {
    const [stock, setStock] = useState(0);
    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
        getStock()
    }, []);

    const getStock = async () => {
        const stock = await getStockBySlog(slug)
        setStock(stock)
        setIsLoading(false)
    }

    /* const product = await getProductByslug( slug ) */
    return (
        <>
            {
                !isLoading ?
                    (
                        <h1 className={clsx(
                            `${titleFont.className} antialiased font-bold text-l rounded-md text-center w-fit px-2`,
                            {
                                'bg-green-600': stock > 10,
                                'bg-orange-500': stock < 10 && stock >= 1,
                                'bg-red-600': stock < 1
                            }
                        )}>
                            {stock > 10 ? 'Disponible' : stock < 10 && stock >= 1 ? 'Últimas unidades' : stock < 1 ? 'Agotado' : null}
                        </h1>
                    )
                    :
                    (
                        <h1 className={`${titleFont.className} antialiased font-bold text-xl bg-gray-300 rounded-md animate-pulse w-[150px]`}>
                            &nbsp;
                        </h1>

                    )
            }
        </>
    )
}
