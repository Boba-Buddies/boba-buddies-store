import { create } from 'zustand'
import { fetchCart, deleteProduct } from '../apis/cart'
import { CartClient } from '../../models/Cart'

type CartStore = {
  cart: CartClient[]
  loading: boolean
  error: Error | null
  fetchCart: () => Promise<void>
  deleteProduct: (productId: number) => Promise<void>
}

export const useCartStore = create<CartStore>((set) => ({
  cart: [],
  loading: false,
  error: null,
  fetchCart: async () => {
    set((state) => ({ ...state, loading: true, error: null }))

    const cart = await fetchCart()
    set((state) => ({ ...state, cart, loading: false }))
  },
  deleteProduct: async (productId: number) => {
    set((state) => ({ ...state, loading: true, error: null }))

    const cart = await deleteProduct(productId)
    set((state) => ({ ...state, cart, loading: false }))
  },
}))
