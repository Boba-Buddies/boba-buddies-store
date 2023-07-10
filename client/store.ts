import { Action, configureStore } from '@reduxjs/toolkit'
import type {
  ThunkDispatch,
  ThunkAction as BaseThunkAction,
} from '@reduxjs/toolkit'

import reducers from './slices'

const store = configureStore({
  reducer: reducers,
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = ThunkDispatch<RootState, never, Action>
export type ThunkAction = BaseThunkAction<
  Promise<unknown>,
  RootState,
  never,
  Action
>
export default store
