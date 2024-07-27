import { createSlice } from "@reduxjs/toolkit";
import { fetchGetLstCarts } from "../thunks/cartThunk";

export const cartsSlice = createSlice({
  name: "cartsSlice",
  initialState: {
    lstCarts: [],
  },
  reducers: {
    addToCard(state, action) {
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchGetLstCarts.fulfilled, (state, action) => {
      state.lstCarts = action.payload || {};
    })
  },
});

export const {} = cartsSlice.actions;

export default cartsSlice.reducer;

export const selectCarts = (state) => state.carts.lstCarts;
