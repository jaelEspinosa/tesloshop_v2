import { create } from "zustand";
import { persist } from "zustand/middleware";

interface State {
  address: {
    firstName: string;
    lastName: string;
    address: string;
    address2?: string;
    postalCode: string;
    city: string;
    country: string;
    phone: string;
  };

  //methods

  setAddress: (address: State["address"]) => void;
  cleanAddress : () => void;

  
}

export const useAddressStore = create<State>()(
  persist(
    (set, get) => ({
      address: {
        firstName: "",
        lastName: "",
        address: "",
        address2: "",
        postalCode: "",
        city: "",
        country: "",
        phone: "",
      },
      setAddress: (address) => {
        set({ address });
      },
      cleanAddress: ()=> {
        set({
          address: {
            firstName: "",
            lastName: "",
            address: "",
            address2: "",
            postalCode: "",
            city: "",
            country: "",
            phone: "",
          }
        })
      },
    }),
    {
      name: "address-storage",
    }
  )
);
