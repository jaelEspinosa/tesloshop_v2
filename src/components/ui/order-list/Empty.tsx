'use client'

import Link from "next/link"
import {  IoBanOutline } from "react-icons/io5"

export const Empty = () => (
    <div className="flex justify-center items-center h-[400px]">

        <IoBanOutline size={80} className="mx-5" />

        <div className="flex flex-col items-center">
            <h1>Aún no tienes pedidos.</h1>
            <Link href='/' className=" text-blue-500 text-3xl hover:underline hover:text-blue-700 hover:font-bold transition-all ">Regresar</Link>

        </div>
    </div>
)
