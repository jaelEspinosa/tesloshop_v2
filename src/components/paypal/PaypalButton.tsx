'use client'
import { PayPalButtons, usePayPalScriptReducer } from '@paypal/react-paypal-js'
import { CreateOrderData,CreateOrderActions, OnApproveData, OnApproveActions } from '@paypal/paypal-js'
import { setTransactionId } from '../../actions/payments/setTransactionId';
import { paypalCheckPayment } from '@/actions/payments/paypal-check-payment';


interface Props {
  orderId: string;
  amount: number;
}


export const PaypalButton = ({orderId, amount}:Props) => {

  const roundedAmount = (Math.round(amount *100)) / 100

  const [{ isPending }] = usePayPalScriptReducer()
  
  if(isPending){
    return (
     <div className='animate-pulse mb-8'>
      <div className='h-10 bg-gray-400 rounded'/>
      <div className='h-10 bg-gray-400 rounded mt-3'/>
      <div className='h-1 w-40 mx-auto bg-gray-400 rounded mt-5'/>

     </div>
    )
  }
  const createOrder = async (data: CreateOrderData, actions: CreateOrderActions): Promise<string> => {
       const transactionId = await actions.order.create({
        purchase_units:[
          {
            invoice_id: orderId,
            amount: {
              value: `${ roundedAmount }`,
              
            }
          }
        ]
       })
     const { ok } = await setTransactionId(orderId, transactionId)
      if(!ok) {
        throw new Error('No se ha podido actualizar la orden.')
      }
     
  return transactionId
  }

  const onApprove = async (data: OnApproveData, actions: OnApproveActions) => {
      
      const details = await actions.order?.capture();
      if( !details ) return;
     const paypalPaymentStatus = await paypalCheckPayment( details.id );
     
  }
  
  return (
    <div className='relative z-0'>

      <PayPalButtons
        createOrder={createOrder}
        onApprove={ onApprove }
      />
    </div>
  )
}
