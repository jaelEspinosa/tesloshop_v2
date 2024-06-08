export const revalidate = 60; //se regenera la pagina cada 60 segundos



import { getProductByTag } from "@/actions/products/get-product-by-tag";
import { getPaginatedProductsWithImages } from "@/actions/products/product-pagination";
import {  Pagination, ProductGrid, Title } from "@/components";

import { Metadata, ResolvingMetadata } from "next";






interface Props {
    params: {
        tag: string;
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
    const tag = params.tag.split('%20').join(' ')

    return {
        title: tag,
    }
}


export default async function  TagPage({params, searchParams}:Props){
    const  tag  = params.tag.split('%20')

    const termOfSearch = tag.join(' ')

    console.log('tags ',tag)
    const page = searchParams.page ? parseInt( searchParams.page ) : 1

    const {currentPage, products, totalPages} = await getProductByTag( tag,{page} )

    if(!products.length){
      const {currentPage, products: otherProducts, totalPages} = await getPaginatedProductsWithImages({})
      return(
        <>
        <h1 className="text-xl font-bold mb-2">{`No hemos encontrado nada relacionado con tu busqueda, "${tag}"`}</h1>
        <h1 className="text-2xl text-blue-800 font-bold mb-10">Estos productos te pueden interesar.</h1>
        <ProductGrid products={ otherProducts }/>
        <Pagination totalPages={ totalPages }/>
        </>
      )
    }
     

 
    return (
        <>
      <Title 
          title="Busqueda por: "
          subTitle={`"${termOfSearch}"`}
          className="mb-2" 
      />
      <div>Busqueda por: {termOfSearch}</div>
      <ProductGrid products={ products }/>
      <Pagination totalPages={ totalPages }/>
    </>
    )
}