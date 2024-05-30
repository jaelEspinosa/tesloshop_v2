'use server'

import { auth } from "@/auth.config"
import prisma from "@/lib/prisma"

export const getOrdersByUser = async () => {
    const session = await auth();

if(!session) {
    return {
        ok:false,
        message: 'Debe estar autenticado.'
    }
}

try {
    //obtener listado de ordenes

    const orderList= await prisma.order.findMany({
        where:{
            userId: session.user.id
        },
        select:{
            OrderAddress: {
                select:{
                    firstName:true,
                    lastName: true,
                }
            },
            isPaid:true,
            id: true,
            userId: true,
        }
    })

    return {
        ok: true,
        orderList
    }
} catch (error) {
    console.log(error)
    return {
        ok: false,
        message: 'Error al obtener las ordenes'
    }
}






}