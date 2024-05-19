'use server'
import prisma from "@/lib/prisma";



export const getProductByslug = async (slug:string)=>{


    try {
         const product = await prisma.product.findUnique({
            
            include: {
                ProductImage:{
                 select:{
                    url: true
                   }
                }            
            },
            where:{
                slug:slug,
            },
         })

         if(!product) return null;

         const {ProductImage, ...rest} = product

         return {            
            ...rest,
            images: product.ProductImage.map( image => image.url )
           }
        
    } catch (error) {
        throw new Error ('No se pudo cargar el producto por slug');
    }
}