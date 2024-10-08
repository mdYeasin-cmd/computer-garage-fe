import { baseApi } from "../../api/baseApi";

const saleApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    addASaleInfo: builder.mutation({
      query: (sellData) => ({
        url: "/sales",
        method: "POST",
        body: sellData,
      }),
      invalidatesTags: ["sales", "products"],
    }),
    getAllSalesHistory: builder.query({
      query: () => ({
        url: "/sales/sale-history",
        method: "GET",
      }),
      providesTags: ["sales"],
    }),
    getAllPurchasesHistory: builder.query({
      query: () => ({
        url: "/sales/purchase-history",
        method: "GET",
      }),
      providesTags: ["sales"],
    }),
  }),
});

export const {
  useAddASaleInfoMutation,
  useGetAllSalesHistoryQuery,
  useGetAllPurchasesHistoryQuery,
} = saleApi;
