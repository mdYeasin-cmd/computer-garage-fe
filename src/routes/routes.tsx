import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Sale from "../pages/Sale";
import Product from "../pages/Product";

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
]);

export default router;
