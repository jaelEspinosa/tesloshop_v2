import { QuantitySelector, SizeSelector } from "@/components";
import { titleFont } from "@/config/fonts";
import { initialData } from "@/seed/seed";
import { notFound } from "next/navigation";

interface Props {
    params:{
        slug: string;
    }

}

export default function  ProductPage({ params }:Props){

    const { slug } = params;
    const product = initialData.products.find(product => product.slug === slug)

    if (!product){
        notFound()
    }
    return (

        <div className="mt-5 mb-20 grid md:grid-cols-3 gap-3">
        {/* slideshow */}
        <div className="col-span-1 md:col-span-2 ">
            <h1>slideShow</h1>
        </div>

        {/* Detalles */}

        <div className="col-span-1 px-5">
        <h1 className={`${titleFont.className} antialiased font-bold text-xl`}>
            {product.title}
        </h1>
        <p className="text-lg mb-5">$ {product.price}</p>

        {/* Selector de tallas */}
        <SizeSelector availableSizes={product.sizes} selectedSize={product.sizes[0]}/>


        {/* Selector de cantidad */}
        <QuantitySelector quantity={1}/>

        {/* boton */}

        <button className="btn-primary my-5">Agregar al Carrito</button>

        {/* Descripción */}
         <h3 className="font-bold text-sm">Descripción</h3>
         <p className="font-light">
            {product.description}
         </p>

        </div>
        </div>
    )
}
