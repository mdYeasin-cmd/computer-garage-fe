import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  openModal: false,
  openEditModal: false,
  openDeleteConfirmationModal: false,
  products: [],
  selectedProduct: {
    _id: "",
    name: "",
  },
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
    openEditModal: (state, action) => {
      state.openEditModal = action.payload;
    },
    openDeleteConfirmationModal: (state, action) => {
      state.openDeleteConfirmationModal = action.payload;
    },
    selectedProduct: (state, action) => {
      state.selectedProduct = action.payload;
    },
  },
});

export const {
  getAllProducts,
  openModal,
  openEditModal,
  openDeleteConfirmationModal,
  selectedProduct,
} = productSlice.actions;

export default productSlice.reducer;
