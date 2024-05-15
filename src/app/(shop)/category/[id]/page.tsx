import { ProductGrid, Title } from "@/components";
import { Category } from "@/interfaces";
import { initialData } from "@/seed/seed";



interface Props {
    params: {
        id: Category;
    }
}
const products = initialData.products;

export default function  CategoryPage({params}:Props){
    const { id } = params
    const productsToshow = products.filter (product => product.gender === id)

    const labels:Record<Category, string> = {
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
          subTitle={`${labels[id]}`}
          className="mb-2" 
      />

      <ProductGrid products={productsToshow}/>
        
    </>
    )
}
