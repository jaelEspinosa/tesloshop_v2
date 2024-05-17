
import { ProductGrid, Title } from "@/components";

import { initialData } from "@/seed/seed";


const products = initialData.products;


export default function Home() {
  return (
    <>
      <Title 
          title="Tienda"
          subTitle="Todos los productos"
          className="mb-2 ml-2 sm:ml-0 " 
      />

      <ProductGrid products={products}/>
        
    </>
  );
}
