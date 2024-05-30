"use server";

import { auth } from "@/auth.config";
import { Address, Size } from "@/interfaces";
import prisma from "@/lib/prisma";

interface ProductToOrder {
  productId: string;
  quantity: number;
  size: Size;
}
/* 
            Desde un 'use client' accedo al session con useSession
            const { data: session } = useSession()
            */

export const placeOrder = async (
  productsId: ProductToOrder[],
  address: Address
) => {
  const session = await auth();
  const userId = session?.user.id;

  // verificar sesión de usuario.
  if (!userId) {
    return {
      ok: false,
      message: "No hay sesion de usuario.",
    };
  }

  // Buscamos en nuestra tabla de productos los productos que vienen en la orden.
  // Nota: recordar que podemos llevar mas 2 productos con el mismo Id:

  const products = await prisma.product.findMany({
    where: {
      id: {
        in: productsId.map((p) => p.productId),
      },
    },
  });
  // Calcular la cantidad de articulos.
  const itemsInOrder = productsId.reduce((count, p) => count + p.quantity, 0);

  // Calcular los totales, tax y precio de cada articulo.

  const { subTotal, tax, total } = productsId.reduce(
    (totals, item) => {
      const productQuantity = item.quantity;
      const product = products.find((product) => product.id === item.productId);

      if (!product) throw new Error(`${item.productId} no existe - 500`);
      const subTotal = productQuantity * product.price;

      totals.subTotal += subTotal;
      totals.tax += subTotal * 0.21;
      totals.total += subTotal * 1.21;
      return totals;
    },
    { subTotal: 0, tax: 0, total: 0 }
  );

  console.log({ subTotal, tax, total });

  // Crear la transacción en base de datos.

  try {
    const prismaTx = await prisma.$transaction(async (tx) => {
      //1. actualizar el stock de los productos en funcion de la cantidad de la orden,
      const uptadedProdutsPromises = products.map((product) => {
        // Acumular los valores
        const productQuantity = productsId
          .filter((p) => p.productId === product.id)
          .reduce((acc, item) => item.quantity + acc, 0);

        if (productQuantity === 0) {
          throw new Error(`${product.id} no tiene catidadd definida.`);
        }

        return tx.product.update({
          where: { id: product.id },
          data: {
            inStock: {
              decrement: productQuantity,
            },
          },
        });
      });

      const updatedProducts = await Promise.all(uptadedProdutsPromises);

      // verificar valores negativos en stock

      updatedProducts.forEach((product) => {
        if (product.inStock < 0) {
          throw new Error(
            `No quedan suficientes unidades de, ${product.title}`
          );
        }
      });

      //2. Crear la orden - Encabezado - Detalles

      const order = await tx.order.create({
        data: {
          userId: userId,
          itemsInOrder: itemsInOrder,
          subTotal: subTotal,
          tax: tax,
          total: total,

          orderItem: {
            createMany: {
              data: productsId.map((p) => ({
                quantity: p.quantity,
                size: p.size,
                productId: p.productId,
                price:
                  products.find((product) => product.id === p.productId)
                    ?.price ?? 0,
              })),
            },
          },
        },
      });

      // Validar, si el price es 0, entonces, lanzamos un error.

      //3. Crear la direccion de la orden.

      const { country, ...restAddress } = address;

      const orderAddress = await tx.orderAddress.create({
        data: {
          ...restAddress,
          countryId: address.country,
          orderId: order.id,
        },
      });

      return {
        order: order,
        updatedProducts: updatedProducts,
        orderAddress: orderAddress,
      };
    });
    return{
      ok: true,
      order: prismaTx.order,
      prismaTx: prismaTx,
    }
  } catch (error:any) {
    console.log(error);
    return {
      ok: false,
      message: error?.message,
    }
  }
};
