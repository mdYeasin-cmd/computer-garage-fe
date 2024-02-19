import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  products: [],
};

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    getAllProducts: (state, action) => {
      state.products = action.payload;
    },
  },
});

export const { getAllProducts } = productSlice.actions;

export default productSlice.reducer;
