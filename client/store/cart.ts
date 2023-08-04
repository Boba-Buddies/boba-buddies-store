import { create } from 'zustand'
import { fetchCartByUserId } from '../apis/cart'
import { CartClient } from '../../models/Cart'

type CartStore = {
  cart: CartClient[]
  loading: boolean
  error: any
  fetchCart: (userId: string) => Promise<void>
}

export const useCartStore = create<CartStore>((set) => ({
  cart: [],
  loading: false,
  error: null,
  fetchCart: async (userId: string) => {
    set({ loading: true, error: null })
    try {
      const cart = await fetchCartByUserId(userId)
      set({ cart, loading: false })
    } catch (error) {
      set({ loading: false, error })
    }
  },
}))
