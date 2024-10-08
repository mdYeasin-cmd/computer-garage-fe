import dayjs from "dayjs";

export type TSale = {
  _id: string;
  sellerId: string;
  buyerId: string;
  productId: string;
  productName: string;
  quantity: number;
  buyerName: string;
  dateOfSale: dayjs.Dayjs;
};
