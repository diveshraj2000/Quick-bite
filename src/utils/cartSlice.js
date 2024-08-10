import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    netItem: [],
    items: [],
  },
  reducers: {
    addItem: (state, action) => {
      const existingItem = state.items.find(
        (item) => item.card.info.id === action.payload.card.info.id
      );
      if (existingItem) {
        state.items = state.items.map((item) =>
          item.card.info.id === action.payload.card.info.id
            ? { ...item, qty: item.qty + 1 }
            : item
        );
        console.log(state.items);
      } else {
        state.items.push(action.payload);
      }
    },
    removeItem: (state, action) => {
      state.items = state.items.filter(
        (item) => item.card.info.id !== action.payload.card.info.id
      );
      // state.items.pop();
    },

    incrementQty: (state, action) => {
      state.items = state.items.map((item) =>
        item.card.info.id === action.payload.card.info.id
          ? { ...item, qty: item.qty + 1 }
          : item
      );
    },
    decrementQty: (state, action) => {
      state.items = state.items.map((item) =>
        item.card.info.id === action.payload.card.info.id
          ? { ...item, qty: item.qty - 1 }
          : item
      );
    },

    clearCart: (state) => {
      // state.items=[];
      state.items.length = 0;
    },
  },
});

export const { addItem, removeItem, clearCart, incrementQty, decrementQty } =
  cartSlice.actions;
export default cartSlice.reducer;

// 118213833
