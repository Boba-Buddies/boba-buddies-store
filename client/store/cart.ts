import { create } from 'zustand'
import { fetchCart, removeProduct } from '../apis/cart'
import { CartClient } from '../../models/Cart'

type CartStore = {
  cart: CartClient[]
  loading: boolean
  error: unknown
  fetchCart: () => Promise<void>
  removeProduct: (productId: number) => Promise<void>
}

export const useCartStore = create<CartStore>((set) => ({
  cart: [],
  loading: false,
  error: null,
  fetchCart: async () => {
    set({ loading: true, error: null })
    try {
      const cart = await fetchCart()
      set({ cart, loading: false })
    } catch (error) {
      set({ loading: false, error })
    }
  },
  removeProduct: async (productId: number) => {
    set({ loading: true, error: null })
    try {
      const cart = await removeProduct(productId)
      set({ cart, loading: false })
    } catch (error) {
      set({ loading: false, error })
    }
  },
}))
