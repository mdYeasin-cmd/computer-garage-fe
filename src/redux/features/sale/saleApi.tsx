import { baseApi } from "../../api/baseApi";

const saleApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    addASaleInfo: builder.mutation({
      query: (sellData) => ({
        url: "/sales",
        method: "POST",
        body: sellData,
      }),
    }),
  }),
});

export const { useAddASaleInfoMutation } = saleApi;
