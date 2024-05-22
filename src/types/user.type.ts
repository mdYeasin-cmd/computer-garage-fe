export type TUser = {
  name: string;
  email: string;
  photoUrl?: string;
  password: string;
  role: "buyer" | "seller";
};
