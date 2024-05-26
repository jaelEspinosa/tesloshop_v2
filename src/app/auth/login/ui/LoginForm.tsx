'use client';


import { authenticate } from '@/actions/auth/login';
import clsx from 'clsx';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useEffect } from 'react';


import { useFormState, useFormStatus } from 'react-dom';
import { FiAlertOctagon } from 'react-icons/fi';


export const LoginForm = () => {

    const [state, dispatch ] = useFormState(authenticate, undefined); 
    const { data: session } = useSession();
    const searchParams = useSearchParams();
    const params = searchParams.get('redirecTo')

    useEffect(()=>{
        
        if (state === "Success"){
          params ? window.location.replace(params) : window.location.replace('/')
        }
    },[state, params])
     
    return (
        <form action={ dispatch } className="flex flex-col">

            <label htmlFor="email">Correo electrónico</label>
            <input
                className="px-5 py-2 border bg-gray-200 rounded mb-5"
                type="email"
                name='email'
                autoComplete='email'
                 />


            <label htmlFor="email">Contraseña</label>
            <input
                autoComplete='current-password'
                className="px-5 py-2 border bg-gray-200 rounded mb-5"
                type="password"
                name='password'
                />

        <div
          className="flex h-8 items-end space-x-1"
          aria-live="polite"
          aria-atomic="true"
        >
          {state && state !== 'Success' &&(
            <div className='flex flex-row mb-2 gap-2'>
              <FiAlertOctagon className="h-5 w-5 text-red-500" />
              <p className="text-sm text-red-500">{state}</p>
            </div>
          )}
         </div>
         
          <LoginButton />

            {/* divisor l ine */}
            <div className="flex items-center my-5">
                <div className="flex-1 border-t border-gray-500"></div>
                <div className="px-2 text-gray-800">O</div>
                <div className="flex-1 border-t border-gray-500"></div>
            </div>

            <Link
                href={params ? `/auth/new-account?redirecTo=${params}` : "/auth/new-account"}
                className="btn-secondary text-center">
                Crear una nueva cuenta
            </Link>

        </form>
    )
}


function LoginButton() {
    const { pending } = useFormStatus();
   
    return (
        <button
        type='submit'
        className={clsx({
            'btn-primary': !pending,
            'btn-disabled': pending
        })}
        disabled = { pending }    
            >
        Ingresar
    </button>
    );
  }