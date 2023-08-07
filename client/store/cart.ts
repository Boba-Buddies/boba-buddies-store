import { create } from 'zustand'
import { fetchCart, removeProduct } from '../apis/cart'
import { CartClient, RemovedProduct } from '../../models/Cart'

type CartStore = {
  cart: CartClient[]
  loading: boolean
  error: unknown
  fetchCart: () => Promise<void>
  removeProduct: (removedProduct: RemovedProduct) => Promise<void>
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
  removeProduct: async (removedProduct: RemovedProduct) => {
    set({ loading: true, error: null })
    try {
      const cart = await removeProduct(removedProduct)
      set({ cart, loading: false })
    } catch (error) {
      set({ loading: false, error })
    }
  },
}))
