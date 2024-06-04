'use server'

import { auth } from "@/auth.config";
import prisma from "@/lib/prisma";
import { Role } from "@prisma/client";
import { revalidatePath } from "next/cache";



export const changeUserRole =  async (userId: string, userRole: string) => {

    const session = await auth();

    if (session?.user.role !== "admin") {
      return {
        ok: false,
        message: "Debe ser usuario administrador.",
      };
    }
       try {

        const user = await prisma.user.update({
            where:{id:userId},
            data:{
                role: userRole as Role
            }
        })
        revalidatePath('/admin/users')
        return { ok:true }
       } catch (error) {
        console.log(error)
       }

    
}