import { create } from 'zustand'
import { fetchCart, deleteProduct } from '../apis/cart'
import { CartClient } from '../../models/Cart'

type CartStore = {
  cart: CartClient[]
  loading: boolean
  error: unknown
  fetchCart: () => Promise<void>
  deleteProduct: (productId: number) => Promise<void>
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
  deleteProduct: async (productId: number) => {
    set({ loading: true, error: null })
    try {
      const cart = await deleteProduct(productId)
      set({ cart, loading: false })
    } catch (error) {
      set({ loading: false, error })
    }
  },
}))
