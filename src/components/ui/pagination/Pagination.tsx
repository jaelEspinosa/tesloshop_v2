'use client'


import { generatePaginationNumbers } from '@/utils';
import clsx from 'clsx';
import Link from 'next/link';
import { redirect, usePathname, useSearchParams } from 'next/navigation';
import React from 'react'
import { IoChevronBackOutline, IoChevronForwardOutline } from 'react-icons/io5';

interface Props{
     totalPages: number;
}

export const Pagination = ({totalPages}:Props) => {
   const pathname = usePathname();
   const searchParams = useSearchParams();
   
   
   const pageString = searchParams.get('page') ?? 1;
   const currentPage = isNaN( Number( pageString ) ) ? 1 : Number(pageString)
   
   
   const allPages = generatePaginationNumbers(currentPage, totalPages)
   
   if(currentPage < 1) redirect ('/')

  const createPageUrl = (pageNumber: number | string)=>{

    
    const params = new URLSearchParams( searchParams )

    if( pageNumber === '...'){
        
        return `${ pathname}?${ params.toString() }`;
    }

    if (Number( pageNumber ) <= 0 ){
        
        return `${ pathname }` ; // href='/'
    }

    if (Number( pageNumber) > totalPages) {
        return `${ pathname }?${ params.toString() }`;
    }

    params.set('page', pageNumber.toString());
    return `${ pathname }?${ params.toString()}`;
  }
    
  return (
    <div className="flex justify-center text-center mt-10 mb-16">
    <nav>
      <ul className="flex list-style-none">

        <li className="page-item disabled">
            <Link            
            className="page-link relative block py-1.5 px-3 border-0 bg-transparent outline-none transition-all duration-300 rounded text-gray-800 hover:text-gray-800 hover:bg-gray-200 focus:shadow-none"
            href={createPageUrl(currentPage - 1)}> 
            <IoChevronBackOutline size={30}/>
            </Link>
            </li>

            {
              allPages.map( (page, index) => (
                <li className="page-item" key={page + '-' + index}>
            <Link
                className={clsx
                  (
                    "page-link relative block py-1.5 px-3 border-0 outline-none transition-all duration-300 rounded text-gray-800 hover:text-gray-800 hover:bg-gray-200 focus:shadow-none",
                    {
                      'bg-blue-800 text-white shadow-md hover:bg-blue-700 hover:text-white':page === currentPage
                    }
                  )
                }
                href={createPageUrl(page)}>{page}</Link>
            </li>
              ))
            }

      

       

        <li className="page-item">
            <Link
            className="page-link relative block py-1.5 px-3 border-0 bg-transparent outline-none transition-all duration-300 rounded text-gray-800 hover:text-gray-800 hover:bg-gray-200 focus:shadow-none"
            href={createPageUrl(currentPage === 0 ? currentPage + 2 : currentPage + 1)}>
                
            <IoChevronForwardOutline size={30}/>
            </Link>
                </li>

      </ul>
    </nav>
  </div>
  )
}
