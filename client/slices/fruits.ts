import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { getFruits } from '../apis/fruits'

export const fetchFruits = createAsyncThunk('fruits/fetchFruits', async () => {
  return await getFruits()
})

const slice = createSlice({
  name: 'fruits',
  initialState: [] as string[],
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchFruits.fulfilled, (_, action) => {
      return action.payload
    })
  },
})

export default slice.reducer
