'use server'

import { Address } from "@/interfaces"
import prisma from "@/lib/prisma";





export const deleteUserAddress = async ( userId: string) => {

    try {
      await prisma.userAddress.delete({
        where:{ userId }
      })

      return {
        ok: true,
        message: 'Se ha borrado la dirección.'
      }
        
    } catch (error) {
        console.log( error );
        return {
            ok: false,
            message: 'No se pudo borrar la dirección.'
        }  
    }
}