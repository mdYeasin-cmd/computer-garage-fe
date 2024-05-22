import { jwtDecode } from "jwt-decode";

export const decodedUser = (token: string) => {
  return jwtDecode(token);
};
