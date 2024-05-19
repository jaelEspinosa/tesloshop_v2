
'use server'
import prisma from "@/lib/prisma";



export const getStockBySlog = async  (slug:string) => {
    try {

        const product = await prisma.product.findFirst({
            where:{
                slug:slug
            },
            select:{
                inStock:true
            }
            
        })
        return product?.inStock ? product.inStock : 0
        
    } catch (error) {
        
        throw new Error ('No se pudo cargar el stock por slug');
    }
}