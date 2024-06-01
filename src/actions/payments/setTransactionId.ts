'use server'

import prisma from "@/lib/prisma"





export const setTransactionId = async (orderId: string, transactionId: string) => {


    try {
      
        
      
        const order = await prisma.order.update({
            where:{id: orderId},
            data:  { transactionId } ,
        })

        if(!order) {
            return {
                ok: false,
                message: 'No se ha encontrado la transacción.'
            }
        }

        return {
            ok: true,
            message: 'Orden actualizada.'
        }
        
    } catch (error) {
        console.log(error);
        return {
            ok: false,
            message: 'No se ha podido realizar la operación.'
        }
        
    }

}