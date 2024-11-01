import { configureStore, createSlice } from '@reduxjs/toolkit';

const productSlice = createSlice({
  name: 'products',
  initialState: {
    veg: [
      { name: 'potato', price: 200.8 },
      { name: 'tomato', price: 200.8 }
    ],
    nonveg: [
      { name: 'chicken', price: 400.8 },
      { name: 'Fish', price: 400.8 }
    ],
  },
  reducers: {}
});

const cartSlice = createSlice({
  name: 'cart',
  initialState: [],
  reducers: {
    addToCart: (state, action) => {
      const item = state.find(item => item.name === action.payload.name);
      if (item) {
        item.quantity += 1;
      } else {
        state.push({
          ...action.payload,
          quantity: 1
        });
      }
    },

    increament: (state, action) => {
      const item = state.find(item => item.name === action.payload.name);
      if (item) {
        item.quantity += 1;
      }
    },

    decreament: (state, action) => {
      const item = state.find(item => item.name === action.payload.name);
      if (item) {
        if (item.quantity > 1) {
          item.quantity -= 1;
        } else {
          return state.filter(item => item.name !== action.payload.name);
        }
      }
      return state;
    },

    removeCart: (state, action) => {
      return state.filter(item => item.name !== action.payload.name);
    }
  }
});

export const { addToCart, increament, decreament, removeCart } = cartSlice.actions;

const store = configureStore({
  reducer: {
    products: productSlice.reducer,
    cart: cartSlice.reducer,
  }
});

export default store;
