

// https://tailwindcomponents.com/component/hoverable-table


import { getPaginatedOrders } from '@/actions/order/get-paginated-orders';
import { Title } from '@/components';
import { Empty } from '@/components/ui/order-list/Empty';
import clsx from 'clsx';

import Link from 'next/link';
import { redirect } from 'next/navigation';
import { IoCardOutline } from 'react-icons/io5';

export default async function OrdersPage() {

  const resp  = await getPaginatedOrders()
  if(!resp?.ok){
    redirect('/auth/login')
}
  const orderList = resp!.orderList


  

  return (
    <>
      <Title title="Todos los Pedidos" />

      <div className="mb-10">
        <table className="min-w-full">
          <thead className="bg-gray-200 border-b">
            <tr>
              <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                #ID
              </th>
              <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                Nombre completo
              </th>
              <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                Estado
              </th>
              <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                Opciones
              </th>
            </tr>
          </thead>
          <tbody>

            
           { 
             orderList!.map(order => (

            <tr key={order.id} className="bg-white border-b transition duration-300 ease-in-out hover:bg-gray-100">

              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900"># {order.id.split('-').at(-1)}</td>
              <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
              {order.OrderAddress?.firstName} {order.OrderAddress?.lastName}
              </td>
              <td className="flex items-center text-sm  text-gray-900 font-light px-6 py-4 whitespace-nowrap">

                <IoCardOutline className={clsx(
                  {
                    'mx-2 text-green-800': order.isPaid,
                    'mx-2 text-red-800' : !order.isPaid
                  }
                )} />
                <span className={clsx(
                  {
                    'mx-2 text-green-800': order.isPaid,
                    'mx-2 text-red-800' : !order.isPaid
                  }
                )}>
                  {
                    order.isPaid ? 'Pagada' : 'Pendiente de Pago'
                  }
                </span>

              </td>
              <td className="text-sm text-gray-900 font-light px-6 ">
                <Link href={`/orders/${order.id}`} className="hover:underline">
                  Ver orden
                </Link>
              </td>
            </tr>

             ))
           }
          
          </tbody>
        </table>
           {
              orderList!.length < 1 && (
                <Empty />
              )
            }

      </div>
    </>
  );
}