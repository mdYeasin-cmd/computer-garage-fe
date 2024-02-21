import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  openModal: false,
  products: [],
};

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    getAllProducts: (state, action) => {
      state.products = action.payload;
    },
    openModal: (state, action) => {
      state.openModal = action.payload;
    },
  },
});

export const { getAllProducts, openModal } = productSlice.actions;

export default productSlice.reducer;
