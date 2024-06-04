import { getProductByslug } from '@/actions/products/get-product-by-slug';
import { Title } from '@/components';
import { redirect } from 'next/navigation';
import React from 'react'
import { ProductForm } from './ui/ProductForm';
import { getCategories } from '@/actions/category/get-categories';



interface Props {
    params: {
        slug: string
    }
}

export default async function Productpage({params}:Props) {

    const {slug} = params;

    const [ product, categories ] = await Promise.all([
        getProductByslug(slug),
        getCategories()
    ])


    
 // TODO: new
    if(!product && slug!== 'new' ) {
        redirect('admin/products')
    }

    const title = (slug === 'new') ? 'Nuevo producto' : 'Editar producto'
  return (
    <>
     <Title title={title}/> 

     <ProductForm product={ product ?? {} } categories={categories}/>
    </>
  )
}
