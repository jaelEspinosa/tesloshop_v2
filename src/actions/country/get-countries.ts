'use server'

import prisma from "@/lib/prisma"


export const getCountries = async () => {

    try {
        const countries = await prisma.country.findMany({
            orderBy:{
                name: "asc"
            }
        })
        return countries
    } catch (error) {
        console.log(error)
        return []
    }


}
export const getCountry = async (countryId: string) =>{

    try {

       const country = await prisma.country.findUnique({
        where:{
            id: countryId 
        }
       }) 
       if(!country) return null;
       return country;
          
    } catch (error) {
        console.log(error)
        return null
    }

}    