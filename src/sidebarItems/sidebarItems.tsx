import { MenuProps } from "antd";
import { NavLink } from "react-router-dom";

const sidebarItems: MenuProps["items"] = [
  {
    key: "Products",
    label: <NavLink to="/">Products</NavLink>,
  },
  {
    key: "Sales",
    label: <NavLink to="/sales">Sales</NavLink>,
  },
];

export default sidebarItems;
