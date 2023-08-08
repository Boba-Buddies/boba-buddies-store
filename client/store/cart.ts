import { create } from 'zustand'
import { fetchCart, deleteProductFromCart } from '../apis/cart'
import { CartClient } from '../../models/Cart'

type CartStore = {
  cart: CartClient[]
  loading: boolean
  error: Error | null
  fetchCart: () => Promise<void>
  deleteProductFromCart: (productId: number) => Promise<void>
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
  deleteProductFromCart: async (productId: number) => {
    set((state) => ({ ...state, loading: true, error: null }))

    const cart = await deleteProductFromCart(productId)
    set((state) => ({ ...state, cart, loading: false }))
  },
}))
