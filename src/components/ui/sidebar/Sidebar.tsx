'use client';

import { useAddressStore, useUiStore } from '@/store';
import clsx from 'clsx';
import Link from 'next/link';
import { IoCloseOutline, IoFemaleOutline, IoLogInOutline, IoLogOutOutline, IoMaleOutline, IoPeopleOutline, IoPersonOutline, IoSearchOutline, IoShirtOutline, IoTicketOutline } from 'react-icons/io5'



import { logout } from '@/actions/auth/logout';
import { useSession } from 'next-auth/react';
import { TbMoodKid } from 'react-icons/tb';
import { useState } from 'react';
import { useRouter } from 'next/navigation';


export const Sidebar = () => {
  const issideMenuOpen = useUiStore(state => state.isSideMenuOpen);
  const closeMenu = useUiStore(state => state.closeSideMenu);

  const { data: session } = useSession()

  const cleanAddress = useAddressStore(state => state.cleanAddress)

  const isAuthenticated = session?.user ? true : false;
  const isAdmin = session?.user.role === 'admin';
  const user = session?.user.name;

  const [termOfSearch, setTermOfSearch] = useState<string>('')
  const router = useRouter()

  const onLogout = async () => {
    await logout();
    cleanAddress();
    localStorage.removeItem('address-storage')
    window.location.replace('/')
  }

  const onSubmit =  () => {
    if(!termOfSearch){
      return;
    }
    router.replace(`/tag/${ termOfSearch }`)
      
   }

   const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTermOfSearch(e.target.value)
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
        // efecto slide
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
          <div className='w-full my-5 mt-20'>
          <h1 className='my-2 font-bold text-blue-800'>
            {user ? `Hola ${user}` : ''}
          </h1>
          </div>

        {/* input */}

        <div className='relative'>
          <IoSearchOutline size={20} className='absolute top-2 left-2'
           onClick={() =>{
            onSubmit();
            closeMenu();
           }}
          />


          <input type="text"
            placeholder='buscar'
            className='w-full bg-gray-50 rounded pl-10 py-1 pr-10 border-b-2 text-xl border-gray-200 focus:outline-none focus:border-blue-500 '
            value={termOfSearch}
            onChange={e => handleSearchChange(e)}
            />
        </div>

        {/* menu */}

          <Link href={'/gender/men'}
              className='flex items-center mt-5 p-2 hover:bg-gray-100 rounded transition-all'
              onClick={closeMenu}
            >
              <IoMaleOutline size={30} />
              <span className='ml-3 text-xl'>Hombres</span>
          </Link>

          <Link href={'/gender/women'}
              className='flex items-center mt-5 p-2 hover:bg-gray-100 rounded transition-all'
              onClick={closeMenu}
            >
              <IoFemaleOutline size={30} />
              <span className='ml-3 text-xl'>Mujeres</span>
          </Link>
          <Link href={'/gender/kid'}
              className='flex items-center mt-5 p-2 hover:bg-gray-100 rounded transition-all'
              onClick={closeMenu}
            >
              <TbMoodKid size={30} />
              <span className='ml-3 text-xl'>Niños</span>
          </Link>
          <div className='w-full h-px bg-gray-200 my-5' />
        
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
            {/*  <Link href='/profile'
              onClick={closeMenu}
              className='flex items-center mt-5 p-2 hover:bg-gray-100 rounded transition-all'
            >
              <IoPersonOutline size={30} />
              <span className='ml-3 text-xl'>Perfil</span>
            </Link> */}
            <Link href='/orders' 
                  className='flex items-center mt-5 p-2 hover:bg-gray-100 rounded transition-all'
                  onClick={closeMenu}
                  >
              <IoTicketOutline size={30} />
              <span className='ml-3 text-xl'>Mis Ordenes</span>
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
            <Link href='/admin/products'
                  className='flex items-center mt-5 p-2 hover:bg-gray-100 rounded transition-all'
                  onClick={closeMenu}
                  >
              <IoShirtOutline size={30} />
              <span className='ml-3 text-xl'>Productos</span>
            </Link>
            <Link href='/admin/orders' 
                  className='flex items-center mt-5 p-2 hover:bg-gray-100 rounded transition-all'
                  onClick={closeMenu}
                  >
              <IoTicketOutline size={30} />
              <span className='ml-3 text-xl'>Ordenes</span>
            </Link>
            <Link href='/admin/users' 
                  className='flex items-center mt-5 p-2 hover:bg-gray-100 rounded transition-all'
                  onClick={closeMenu}
                  >
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
