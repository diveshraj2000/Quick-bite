import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [],
  },
  reducers: {
    addItem: (state, action) => {
      ///earlier older  vanilla redux says that do not mutate stae

      //but here we are mutatting the state directly

      //we are mutating the state here (modifiying the state)
      state.items.push(action.payload);
    },
    removeItem: (state, action) => {
      // state.items=state.items.filter((item)=>item.id!==action.payload.id);
      state.items.pop();
    },
    clearCart: (state) => {
      // state.items=[];
      state.items.length = 0;
    },
  },
});

export const { addItem, removeItem, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
