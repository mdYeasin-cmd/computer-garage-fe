import { ReactNode } from "react";
const ProtectedRoute = ({ children }: { children: ReactNode }) => {
  //   if (!token) {
  //     return <Navigate to="/login" replace={true}></Navigate>;
  //   }

  return children;
};

export default ProtectedRoute;
