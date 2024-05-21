
import { CartProduct } from "@/interfaces";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface State {
  cart: CartProduct[];

  getTotalItems: () => number;
  getSumaryInformation: () => {
    subTotal: number;
    tax: number;
    total: number;
    itemsInCart: number;
    };
  addProductToCart: (product: CartProduct) => void;
  updateProductQuantity: (product: CartProduct, quantity: number) => void;
  removeProduct: (product: CartProduct) => void;
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

      getSumaryInformation() {
          const { cart } = get();

          const subTotal = cart.reduce( (subTotal, product) => (product.quantity * product.price) + subTotal, 0);
          const tax = subTotal * 0.21;
          const total = subTotal + tax;
          const itemsInCart = cart.reduce( (total, item) => total + item.quantity , 0);

          return {
            subTotal, tax, total, itemsInCart
          }
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

      updateProductQuantity(product: CartProduct, quantity: number) {
        console.log('la quantity es ',quantity)
           const { cart } = get ();
           const updatedCartProductQuantity = cart.map(item => {
            if (item.id === product.id && item.size === product.size){
              return { ...item, quantity:  quantity }
            }
            return item
           });
         
          set({cart : updatedCartProductQuantity})
      },
      removeProduct(product: CartProduct) {
          const { cart } = get();
         
          const updatedCart = cart.filter( item => {
            if(item.id === product.id){
              if(item.size === product.size) return null;
              return item;
            }
            return item;
          })
          set({cart : updatedCart})
      },
    
    }),

    {
      name: "shoping-cart",
    }
  )
);
