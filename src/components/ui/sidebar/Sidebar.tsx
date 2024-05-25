'use client';

import { useUiStore } from '@/store';
import clsx from 'clsx';
import Link from 'next/link';
import { IoCloseOutline, IoLogInOutline, IoLogOutOutline, IoPeopleOutline, IoPersonOutline, IoSearchOutline, IoShirtOutline, IoTicketOutline } from 'react-icons/io5'



import { logout } from '@/actions/auth/logout';
import { useSession } from 'next-auth/react';

export const Sidebar = () => {
  const issideMenuOpen = useUiStore(state => state.isSideMenuOpen);
  const closeMenu = useUiStore(state => state.closeSideMenu);

  const { data: session } = useSession()

  const isAuthenticated = session?.user ? true : false;
  const isAdmin = session?.user.role === 'admin';


  const onLogout = async () => {
    await logout();
    window.location.replace('/')
  }

  return (
    <div>
      {/* background black */}
      {
        issideMenuOpen && (
          <div className='fixed top-0 left-0 w-screen h-screen z-10 bg-black opacity-30' />
        )

      }


      {/* blur */}
      {
        issideMenuOpen && (
          <div className='fade-in fixed top-0 left-0 w-screen h-screen z-10 backdrop-filter backdrop-blur-sm' onClick={closeMenu} />
        )

      }

      {/*  Sidemenu */}

      <nav
        //todo efecto slide
        className={
          clsx(
            "fixed p-5 right-0 top-0 w-[300px] h-screen bg-white z-20 shadow-2xl transform transition-all duration-300",
            {
              "translate-x-full": !issideMenuOpen
            }
          )
        }>

        <IoCloseOutline
          size={50}
          className='absolute top-5 right-5 cursor-pointer'
          onClick={closeMenu}
        />

        {/* input */}

        <div className='relative mt-14'>
          <IoSearchOutline size={20} className='absolute top-2 left-2' />
          <input type="text"
            placeholder='buscar'
            className='w-full bg-gray-50 rounded pl-10 py-1 pr-10 border-b-2 text-xl border-gray-200 focus:outline-none focus:border-blue-500 ' />
        </div>

        {/* menu */}
        {!isAuthenticated &&
          (
            <>
           
            <Link href='/auth/login'
              className='flex items-center mt-5 p-2 hover:bg-gray-100 rounded transition-all'
              onClick={closeMenu}
            >
              <IoLogInOutline size={30} />
              <span className='ml-3 text-xl'>Ingresar</span>
            </Link>
            </>
          )
        }
        {
          isAuthenticated &&
          (
            <>
             <Link href='/profile'
              onClick={closeMenu}
              className='flex items-center mt-5 p-2 hover:bg-gray-100 rounded transition-all'
            >
              <IoPersonOutline size={30} />
              <span className='ml-3 text-xl'>Perfil</span>
            </Link>
            <Link href='/' className='flex items-center mt-5 p-2 hover:bg-gray-100 rounded transition-all'>
              <IoTicketOutline size={30} />
              <span className='ml-3 text-xl'>Ordenes</span>
            </Link>

              <button className='w-full flex items-center mt-5 p-2 hover:bg-gray-100 rounded transition-all'
                onClick={() => {
                  onLogout()
                  closeMenu()            
                }
                }
              >
                <IoLogOutOutline size={30} />
                <span className='ml-3 text-xl'>Salir</span>
              </button>
            </>
          )
        }

        {/* Line Separator */}

       {
        isAdmin && (
          <>
            <div className='w-full h-px bg-gray-200 my-5' />
            <Link href='/' className='flex items-center mt-5 p-2 hover:bg-gray-100 rounded transition-all'>
              <IoShirtOutline size={30} />
              <span className='ml-3 text-xl'>Productos</span>
            </Link>
            <Link href='/' className='flex items-center mt-5 p-2 hover:bg-gray-100 rounded transition-all'>
              <IoTicketOutline size={30} />
              <span className='ml-3 text-xl'>Ordenes</span>
            </Link>
            <Link href='/' className='flex items-center mt-5 p-2 hover:bg-gray-100 rounded transition-all'>
              <IoPeopleOutline size={30} />
              <span className='ml-3 text-xl'>Usuarios</span>
            </Link>
          </>

        )
       }   
      </nav>

    </div>
  )
}
