import { baseApi } from "../../api/baseApi";

const productApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllProducts: builder.query({
      query: () => ({
        url: "/products",
        method: "GET",
      }),
      providesTags: ["products"],
    }),
    getAProduct: builder.query({
      query: (productId) => {
        return {
          url: `/products/${productId}`,
          method: "GET",
        };
      },
      providesTags: ["products"],
    }),
    addProduct: builder.mutation({
      query: (productInfo) => ({
        url: "/products",
        method: "POST",
        body: productInfo,
      }),
      invalidatesTags: ["products"],
    }),
    editAProduct: builder.mutation({
      query: (productInfo) => {
        console.log(productInfo, "product info here");

        return {
          url: `/products/${productInfo._id}`,
          method: "PATCH",
          body: productInfo,
        };
      },
      invalidatesTags: ["products"],
    }),
    deleteAProduct: builder.mutation({
      query: (productId) => ({
        url: `/products/${productId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["products"],
    }),
    bulkProductDelete: builder.mutation({
      query: (productIds) => ({
        url: `/products/bulk-product-delete`,
        method: "PUT",
        body: productIds,
      }),
      invalidatesTags: ["products"],
    }),
  }),
});

export const {
  useGetAllProductsQuery,
  useAddProductMutation,
  useEditAProductMutation,
  useDeleteAProductMutation,
  useBulkProductDeleteMutation,
  useGetAProductQuery,
} = productApi;
