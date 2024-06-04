'use server'
import prisma from "@/lib/prisma";



export const getProductByslug = async (slug:string)=>{


    try {
         const product = await prisma.product.findUnique({
            
            include: {
                ProductImage:true            
            },
            where:{
                slug:slug,
            },
         })

         if(!product) return null;

         

         return {            
            ...product,
            images: product.ProductImage.map( image => image.url )
           }
        
    } catch (error) {
        console.log('el error es...',error)
        throw new Error ('No se pudo cargar el producto por slug');
    }
}