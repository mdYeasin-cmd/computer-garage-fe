import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Sale from "../pages/Sale";
import Product from "../pages/Product";
import Login from "../pages/Login";
import Register from "../pages/Register";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <Product />,
      },
      {
        path: "sales",
        element: <Sale />,
      },
    ],
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/login",
    element: <Login />,
  },
]);

export default router;
