export type TProduct = {
  _id: string;
  name: string;
  category: string;
  brand: string;
  compatibility: string;
  quantity: number;
  interface: string;
  condition: string;
  capacity: string;
  price: number;
  warrantyPeriod: number;
  color?: string;
  availability: "In stock" | "Out of stock";
  description: string;
  userId: string;
};
