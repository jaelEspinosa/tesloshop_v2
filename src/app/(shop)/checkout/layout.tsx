import { auth } from "@/auth.config";
import { redirect } from "next/navigation";



export default async function  CheckoutLaout({children}: {
    children: React.ReactNode;
}){

    const session = await auth()

   if(!session?.user) {
     redirect('/auth/login?redirecTo=/checkout/address')
   }

    return (
        <>
          {children}
        </>
    );
}
