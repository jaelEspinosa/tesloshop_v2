
 'use server'

import { PaypalOrderStatusResponse } from "@/interfaces";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";


 export const paypalCheckPayment = async (paypalTransactionId: string) => {
     const authToken = await getPaypalBearerToken();
   
     if( !authToken ) {
        return {
            ok:false,
            message: 'No se pudo obtener el token de verificación.'
        }
     }
    const resp = await verifyPaypalPayment( authToken, paypalTransactionId )

    
    if( !resp ){
        return{
            ok:false,
            message:' Error al verificar el pago.'
        }
    }

   const { status, purchase_units } = resp;
   const {invoice_id: orderId } = purchase_units[0]; 


   if(status !== 'COMPLETED') {
    return {
        ok: false,
        message: 'Aún no se ha completado el pago en Paypal.'
    }
   }
  // Actualizar la transaccion como pagada en nuestra base de datos.


  try {
          
      const orderToUpdatePayment = await prisma.order.update({
        where:{id: orderId},
        data: {
            isPaid: true,
            paidAt: new Date()
        }
      })

   //Revalidar el path 
   revalidatePath (`/orders/${orderId}`)
   
   return {
    ok: true,
    message: 'Pago realizado con éxito.'
   }
    
  } catch (error) {
    console.log(error)
    return {
        ok:false,
        message: '500 - No se pudo completar el pago de la transacción.'
    }
  }
 }



 
 const getPaypalBearerToken = async ():Promise<string | null> => {
    
    const PAYPAL_CLIENT_ID = process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID
    const PAYPAL_SECRET = process.env.PAYPAL_SECRET
    const OAUTH_URL = process.env.PAYPAL_OAUTH_URL || ''
    const base64Token = Buffer.from(
        `${ PAYPAL_CLIENT_ID }:${ PAYPAL_SECRET }`,
        'utf-8'
    ).toString('base64');

    const myHeaders = new Headers();
myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
myHeaders.append("Authorization", `Basic ${ base64Token }`);

const urlencoded = new URLSearchParams();
urlencoded.append("grant_type", "client_credentials");

const requestOptions: any = {
  method: "POST",
  headers: myHeaders,
  body: urlencoded,
  cache:'no-store'
  
};


try {
    const response = await fetch(OAUTH_URL, requestOptions);
    const result = await response.json();
    return result.access_token  
  } catch (error) {
    console.error(error);
    return null;
  }

}



const verifyPaypalPayment = async ( authToken: string, paypalTransactionId: string ):Promise<PaypalOrderStatusResponse | null> => {
    const ORDERS_URL = process.env.PAYPAL_ORDERS_URL || '';
    const myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${authToken}`);
    
    const requestOptions:any = {
      method: "GET",
      headers: myHeaders,
      cache:'no-store'
     
    };

    try {
       const resp = await fetch(`${ ORDERS_URL }/${ paypalTransactionId }`, requestOptions)
       const result = await resp.json()    
       return result  
    } catch (error) {
       console.log(error)
       return null 
    }
    
}