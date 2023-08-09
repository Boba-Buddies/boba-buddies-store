import { create } from 'zustand'
import { CartClient } from '../../models/Cart'

type CartStore = {
  cart: CartClient[]
  setCart: (cart: CartClient[]) => void
}

export const useCartStore = create<CartStore>((set) => ({
  cart: [],
  setCart: (cart) => set({ cart }),
}))
