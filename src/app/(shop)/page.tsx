
export const revalidate = 60; //se regenera la pagina cada 60 segundos

import { getPaginatedProductsWithImages } from "@/actions";
import { Pagination, ProductGrid, Title } from "@/components";
import { redirect } from "next/navigation";


interface Props {
  searchParams: {
    page? : string
  }
}


export default async function Home({ searchParams }:Props) {
  const page = searchParams.page ? parseInt( searchParams.page ) : 1
  const { products, currentPage, totalPages } = await getPaginatedProductsWithImages({ page })

  

  if(products.length === 0){
    redirect('/')
  }
  return (
    <>
      <Title 
          title="Tienda"
          subTitle="Todos los productos"
          className="mb-2 ml-2 sm:ml-0 " 
      />

      <ProductGrid products={ products }/>

      <Pagination totalPages ={ totalPages }/>
        
    </>
  );
}
