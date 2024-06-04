import { auth } from "@/auth.config";
import { redirect } from "next/navigation";


export default async function AdminLyout({children}: {
    children: React.ReactNode;
}){

    const session = await auth();
    if(!session?.user){
        redirect('/auth/login')
    }
    
    if(session?.user.role !== 'admin'){
        redirect('/')
    }

    return (
        <>
           {children}
        </>
    );
}
