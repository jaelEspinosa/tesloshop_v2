

// https://tailwindcomponents.com/component/hoverable-table



import { Title } from '@/components';
import { Empty } from '@/components/ui/order-list/Empty';

import { redirect } from 'next/navigation';
import { UsersTable } from './ui/UsersTable';
import { getPaginatedUsers } from '@/actions/user/get-paginated-users';
import { User } from '@/interfaces';


export default async function OrdersPage() {

  const {ok, users = []}  = await getPaginatedUsers()

  if(!ok){
    redirect('/auth/login')
   }
  
   


  

  return (
    <>
      <Title title="Mantenimiento de usuarios" />

      <div className="mb-10">
     
         <UsersTable users = {users}/>

           {
              users!.length < 1 && (
                <Empty />
              )
            }

      </div>
    </>
  );
}