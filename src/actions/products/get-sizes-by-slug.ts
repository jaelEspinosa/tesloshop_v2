
'use server'
import prisma from "@/lib/prisma";



export const getSizesBySlog = async  (slug:string) => {
    try {

        const product = await prisma.product.findFirst({
            where:{
                slug:slug
            },
            select:{
                sizes:true
            }
            
        })
        if(!product) return null;
        return product.sizes
        
    } catch (error) {
        
        throw new Error ('No se pudo cargar el stock por slug');
    }
}