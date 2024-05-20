import { CartProduct } from "@/interfaces";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface State {
  cart: CartProduct[];

  getTotalItems: () => number;

  addProductToCart: (product: CartProduct) => void;
  // updateProductToCart
  // removeProduct
}

export const useCartStore = create<State>()(
  persist(
    (set, get) => ({
      cart: [],

      // Methods

      getTotalItems() {
          const { cart } = get();
          return cart.reduce( (total, item) => total + item.quantity , 0);
      },

      addProductToCart: (product: CartProduct) => {
        const { cart } = get();

        // 1. revisar si el producto existe en el carrito  con la talla seleccionada
        const productInCart = cart.some(
          (item) => item.id === product.id && item.size === product.size
        );
        //Si no existe lo añado al carrito y return, la función se acaba
        if (!productInCart) {
          set({ cart: [...cart, product] });
          return;
        }
        // 2. En este punto sé que el producto existe con la misma talla, tengo que incrementar.
        const updatedCartProducts = cart.map((item) => {
          if (item.id === product.id && item.size === product.size) {
            return { ...item, quantity: item.quantity + product.quantity };
          }
          return item;
        });

        set({ cart: updatedCartProducts });
      },
    }),

    {
      name: "shoping-cart",
    }
  )
);
