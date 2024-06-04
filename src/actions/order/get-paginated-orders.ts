'use server'

import { auth } from "@/auth.config"
import prisma from "@/lib/prisma"

export const getPaginatedOrders = async () => {
    const session = await auth();

if(session?.user.role !== 'admin') {
    return {
        ok:false,
        message: 'Debe ser usuario administrador.'
    }
}

try {
    //obtener listado de ordenes

    const orderList= await prisma.order.findMany({
        orderBy:{
            createdAt:'desc'
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