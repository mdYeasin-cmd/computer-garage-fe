import dayjs from "dayjs";

export type TSale = {
  sellerId: string;
  productId: string;
  productName: string;
  quantity: number;
  buyerName: string;
  dateOfSale: dayjs.Dayjs;
};
