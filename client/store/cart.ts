import { create } from 'zustand'
import { CartClient } from '../../models/Cart'

interface CartState {
  userCart: CartClient
}

// const useCartStore = create<BearState>()((set) => ({
//   bears: 0,
//   increase: (by) => set((state) => ({ bears: state.bears + by })),
// }))