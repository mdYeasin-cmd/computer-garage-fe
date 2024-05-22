import { MenuProps } from "antd";
import { NavLink } from "react-router-dom";

export const sellerSidebarItems: MenuProps["items"] = [
  {
    key: "/",
    label: <NavLink to="/">Products</NavLink>,
  },
  {
    key: "/sales",
    label: <NavLink to="/sales-history">Sales History</NavLink>,
  },
];

export const buyerSidebarItems: MenuProps["items"] = [
  {
    key: "/",
    label: <NavLink to="/">Products</NavLink>,
  },
  {
    key: "/sales",
    label: <NavLink to="/purchase-history">Purchase History</NavLink>,
  },
];
