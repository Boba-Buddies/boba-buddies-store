import { create } from 'zustand'

interface CartState {
  bears: number
  increase: (by: number) => void
}

// const useCartStore = create<BearState>()((set) => ({
//   bears: 0,
//   increase: (by) => set((state) => ({ bears: state.bears + by })),
// }))