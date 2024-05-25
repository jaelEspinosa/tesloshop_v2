'use client'

import clsx from "clsx";
import Link from "next/link"
import { SubmitHandler, useForm } from "react-hook-form";
import { registerUser } from '../../../../actions/auth/register';
import { useState } from "react";
import { login } from "@/actions/auth/login";

type FormInputs = {
    name: string;
    email: string;
    password: string;
}

export const RegisterForm = () => {

    const [errorMessage, setErrorMessage] = useState('')

    const { register, handleSubmit, formState: { errors } } = useForm<FormInputs>()

    const onSubmit: SubmitHandler<FormInputs> = async (data) => {

        const { name, email, password } = data
        //server action
        const resp = await registerUser ( name, email, password )

        if (!resp.ok){
            setErrorMessage(resp.message)
            return;
        }

        await login( email.toLowerCase(), password);
        window.location.replace('/');
    }

    return (

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col">

            <label htmlFor="nombre">Nombre completo</label>

            <input
                className={clsx(
                    "px-5 py-2 border bg-gray-200 rounded mb-5",
                    {
                        'border border-red-500': errors.name
                    }
                )}
                type="text"
                autoFocus
                {...register('name', { required: true })}
            />

            <label htmlFor="email">Correo electrónico</label>
            <input
                className={clsx(
                    "px-5 py-2 border bg-gray-200 rounded mb-5",
                    {
                        'border border-red-500': errors.email
                    }
                )}
                type="text"
                {...register('email', { required: true, pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/ })}
            />
            {
                errors.email && errors.email.type === 'pattern' && (

                    <span className="text-red-500">* Email no válido</span>
                )
            }

            <label htmlFor="email">Contraseña</label>
            <input
                className={clsx(
                    "px-5 py-2 border bg-gray-200 rounded mb-5",
                    {
                        'border border-red-500': errors.password
                    }
                )}
                type="password"
                {...register('password', { required: true, pattern: /^(?=.*[a-z])(?=.*[A-Z]).{8,}$/ })}
            />

           {
                errors.password && errors.password.type === 'pattern' && (

                    <span className="text-red-500 mb-3">* Debe tener al menos 8 caracteres con una letra may. y otra min.</span>
                )
            }

{
              
             errorMessage &&  (
                    <span className="text-red-500 mb-3">* No se ha podido crear el usuario.</span>
                    )
            }
            <button

                className="btn-primary">
                Crear cuenta
            </button>


            {/* divisor l ine */}
            <div className="flex items-center my-5">
                <div className="flex-1 border-t border-gray-500"></div>
                <div className="px-2 text-gray-800">O</div>
                <div className="flex-1 border-t border-gray-500"></div>
            </div>

            <Link
                href="/auth/login"
                className="btn-secondary text-center">
                Ingresar
            </Link>

        </form>
    )
}
