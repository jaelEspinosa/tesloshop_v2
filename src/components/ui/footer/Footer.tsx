import { titleFont } from '@/config/fonts'
import React from 'react'

export const Footer = () => {
  return (
    <div className='flex w-full justify-center text-xs mb-10'>
        <span className={`${titleFont.className} antialiased font-bold`}>Teslo | shop </span>
      
        <span className='mx-1'> © { new Date().getFullYear() }</span>
    </div>
  )
}
