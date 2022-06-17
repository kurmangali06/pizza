
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import axios from 'axios'
import { Pizza, PizzaSliceState, SearchPizzaParams, Status } from './types'



const initialState: PizzaSliceState = {
  items: [],
  status: Status.LOADING,
}


export const fetchPizzas = createAsyncThunk <Pizza[],SearchPizzaParams>(
  'pizza/fetchPizzasStatus',
  async (params) => {
    const { sortBy, order, category, search, currentPage } = params
    const { data } = await axios.get <Pizza[]>(`https://627e11c7b75a25d3f3b112d3.mockapi.io/carts?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}${search}`)

    return data 
  }
)





const pizzaSlice = createSlice({
  name: 'pizza',
  initialState,
  reducers: {
    setItems(state, action:PayloadAction<Pizza[]>) {
      state.items = action.payload
    }
  
  },
  extraReducers:(builder) => {
    builder.addCase(fetchPizzas.pending, (state, action) => {
      state.status = Status.LOADING
      state.items = []
    });
    builder.addCase(fetchPizzas.fulfilled, (state, action) => {
      state.items = action.payload;
      state.status = Status.SUCCESS
    });
    builder.addCase(fetchPizzas.rejected, (state) => {
      state.status = Status.ERROR
      state.items = []
    });
  }
}
)



export const { setItems } = pizzaSlice.actions
export default pizzaSlice.reducer