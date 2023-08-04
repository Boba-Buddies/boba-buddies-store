import { create } from 'zustand'
import { CartClient } from '../../models/Cart'

interface CartState {
  cartItems: CartClient
  insertCartItems: (cartItems: CartClient) => void
}

const useCartStore = create<CartState>()((set) => ({
  cartItems: [],
  insertCartItems: (cartItems) => set({ ...cartItems }),
}))
