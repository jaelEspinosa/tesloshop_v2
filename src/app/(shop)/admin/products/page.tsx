

// https://tailwindcomponents.com/component/hoverable-table



import { getPaginatedProductsWithImages } from '@/actions/products/product-pagination';
import { Pagination, ProductImage, Title } from '@/components';
import { currencyFormat } from '@/utils';


import Image from 'next/image';

import Link from 'next/link';



interface Props {
  searchParams: {
    page? : string
  }
}



export default async function ProductsPage({searchParams}:Props) {

  const page = searchParams.page ? parseInt( searchParams.page ) : 1
  const { products, currentPage, totalPages } = await getPaginatedProductsWithImages({ page })




  

  return (
    <>
      <Title  title="Mantemimiento de productos" />

      <div className='flex justify-end mb-5'>
           <Link href='/admin/product/new' className='btn-primary text-red-500 mr-2'>Nuevo Producto</Link>

      </div>

      <div className="mb-10 my_table myScroll">
        <table className="min-w-full">
          <thead className="bg-gray-200 border-b">
            <tr>
              <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                Imagen
              </th>
              <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                Titulo
              </th>
              <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                Precio
              </th>
              <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                Género
              </th>
              <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                Stock
              </th>
              <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                Tallas
              </th>
            </tr>
          </thead>
          <tbody>

            
           { 
             products!.map(product => (

            <tr key={product.id} className="bg-white border-b transition duration-300 ease-in-out hover:bg-gray-100">
            
              <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap pointer">
              <Link href={`/product/${product.slug}`}>

                      <ProductImage 
                                src={product.ProductImage[0]?.url}
                                alt={product.title}
                                width={80}
                                height={80}
                                className='w-20 h-20 sahdow-lg rounded-xl object-cover'
                      />                     
                </Link>
              </td>
              <td className="text-sm text-gray-900  px-6 hover:underline">
              <Link href={`/admin/product/${product.slug}`}>
                {product.title}
              </Link>
              </td>

              
              <td className="text-sm text-gray-900 px-6 font-bold">
                {currencyFormat(product.price)}
              </td>
              
              <td className="text-sm text-gray-900  px-6 ">
                {product.gender}
              </td>
              
              <td className="text-sm text-gray-900 font-bold px-6 ">
                {product.inStock}
              </td>
            
              <td className="text-sm text-gray-900 font-bold px-6 ">
                {product.sizes.join(', ')}
              </td>
            </tr>

             ))
           }
          
          </tbody>
        </table>


      </div>
          <Pagination totalPages={ totalPages }/>
    </>
  );
}