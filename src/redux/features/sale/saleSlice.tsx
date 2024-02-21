import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  openCreateSaleModal: false,
  sales: [],
};

const saleSlice = createSlice({
  name: "sale",
  initialState,
  reducers: {
    openCreateSaleModal: (state, action) => {
      state.openCreateSaleModal = action.payload;
    },
  },
});

export const { openCreateSaleModal } = saleSlice.actions;

export default saleSlice.reducer;
