export const revalidate = 60; //se regenera la pagina cada 60 segundos

import { getPaginatedProductsWithImages } from "@/actions";
import { Pagination, ProductGrid, Title } from "@/components";
import { Gender } from "@prisma/client";
import { Metadata, ResolvingMetadata } from "next";
import { redirect } from "next/navigation";





interface Props {
    params: {
        gender: string;
    },
    searchParams: {
        page? : string;
      }
}

export async function generateMetadata(
    { params }: Props,
    parent: ResolvingMetadata
): Promise<Metadata> {
    // read route params
    const gender = params.gender

    return {
        title: gender,
    }
}


export default async function  GenderPage({params, searchParams}:Props){
    const { gender } = params 
    const page = searchParams.page ? parseInt( searchParams.page ) : 1

    const {products, totalPages, currentPage} = await getPaginatedProductsWithImages({ page,gender:gender as Gender } )
    
    

    if(products.length === 0){
        redirect(`/gender/${gender}`)
      }
    const labels:Record<string, string> = {
        "men": "Para ellos",
        "women": "Para ellas",
        "kid" : "Para niños",
        "unisex" : "Para todos"
    }

    /* if(id === 'kids'){
        notFound();
    } */
    
    return (
        <>
      <Title 
          title="Tienda"
          subTitle={`${labels[gender]}`}
          className="mb-2" 
      />

      <ProductGrid products={ products }/>
      <Pagination totalPages={ totalPages }/>
    </>
    )
}