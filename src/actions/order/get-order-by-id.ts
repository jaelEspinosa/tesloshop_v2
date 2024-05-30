'use server'

import { auth } from "@/auth.config"
import { Product } from "@/interfaces"
import prisma from "@/lib/prisma"


export const getOrderById = async (id: string) => {


     const session = await auth()

     if(!session){
        return {
            ok:false,
            message: 'Debe estar autenticado.'
        }
     }

     try {
         //buscar la order 
         const order = await prisma.order.findFirst({
           where:{id},
           include: {
            OrderAddress:true,
            orderItem: {
                select:{
                    price:true,
                    quantity: true,
                    size: true,

                    product:{
                        select:{
                            title:true,
                            slug:true,
                            ProductImage: {
                                select:{
                                    url: true,
                                },
                                take: 1
                            }
                        }
                    }
                }
            }
           }
         })
    
         if(!order) throw `${ id } no se ha encontrado.`

         if( session.user.role === 'user' ) {
            if(session.user.id !== order.userId) {
                throw `${ id }, No pertenece a este usuario.`
            }
         }
        
         return {
           ok:true,
           order
         }



        
        
     } catch (error) {
        console.log( error )
        return{
            ok:false,
            message: 'Orden no encontrada.'
        }
     }

}