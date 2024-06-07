'use server'

import prisma from "@/lib/prisma"

interface PaginationOptions {
    page?  : number;
    take?  : number;
    
}

export const getProductByTag = async (tags:string[], {page = 1, take =12 }:PaginationOptions) => {

    try {

        // 1. obtener los productos 
        const products = await prisma.product.findMany({
            take: take,
            skip: ( page - 1 ) * take,
            include: {
                ProductImage:{
                   take: 2,
                   select:{
                    url: true
                   }
                }            
            },
            where:{
                tags:{
                    hasSome: tags
                }
            }
        })
        
         // 2. obtener el total de paginas

       const totalProducts = await prisma.product.count({
          where:{
            tags:{
                hasSome: tags
            }
          }
       })  

    const totalPages = Math.ceil( totalProducts / take)

        return{
            currentPage: page,
            totalPages,
            products: products.map( product => ({
                ...product,
                   images: product.ProductImage.map(img => img.url)
            }))

            
        }
    } catch (error) {
        console.log(error)
        throw new Error('No se pudieron cargar los productos.')
            
        
    }
}