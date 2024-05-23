import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  openCreateSaleModal: false,
  openPhurchaseModal: false,
  sales: [],
};

const saleSlice = createSlice({
  name: "sale",
  initialState,
  reducers: {
    openCreateSaleModal: (state, action) => {
      state.openCreateSaleModal = action.payload;
    },
    openPhurchaseModal: (state, action) => {
      state.openPhurchaseModal = action.payload;
    },
  },
});

export const { openCreateSaleModal, openPhurchaseModal } = saleSlice.actions;

export default saleSlice.reducer;
