export const revalidate = 60480; //7 dias



import { getProductByslug } from "@/actions/products/get-product-by-slug";
import { ProductSlideshow, ProductSlideshowMobile, QuantitySelector, SizeSelector, StockLabel } from "@/components";
import { titleFont } from "@/config/fonts";
import { Metadata, ResolvingMetadata } from "next";

import { notFound } from "next/navigation";
import { AddTocart } from "./ui/AddTocart";
import { currencyFormat } from "@/utils";

interface Props {
    params: {
        slug: string;
    }
}

export async function generateMetadata(
    { params }: Props,
    parent: ResolvingMetadata
): Promise<Metadata> {
    // read route params
    const slug = params.slug

    // fetch data
    const product = await getProductByslug(slug)

    // optionally access and extend (rather than replace) parent metadata
    // const previousImages = (await parent).openGraph?.images || []

    return {
        title: product?.title,
        description: product?.description ?? '',
       
    }
}

export default async function ProductPage({ params }: Props) {

    const { slug } = params;
    const product = await getProductByslug(slug)

    if (!product) {
        notFound()
    }
    return (


        <div className="mt-5 mb-20 grid md:grid-cols-5">
            {/* slideshow */}
            <div className="col-span-1 md:col-span-3">
                {/* Desktop */}
                <ProductSlideshow images={product.images} title={product.title} className="hidden md:block " />

                {/* Mobile */}
                <ProductSlideshowMobile images={product.images} title={product.title} className="block md:hidden" />
            </div>

            {/* Detalles */}

            <div className="col-span-1 md:col-span-2 px-5">
                <StockLabel slug={product.slug} />
                <h1 className={`${titleFont.className} antialiased font-bold text-xl`}>
                    {product.title}
                </h1>
                <p className="text-lg mb-5">{currencyFormat(product.price)}</p>

                 <AddTocart product={product}/>

                {/* Descripción */}
                <h3 className="font-bold text-sm">Descripción</h3>
                <p className="font-light">
                    {product.description}
                </p>

            </div>
        </div>

    )
}
