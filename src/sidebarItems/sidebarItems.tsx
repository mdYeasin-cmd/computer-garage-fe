import { MenuProps } from "antd";
import { NavLink } from "react-router-dom";

const sidebarItems: MenuProps["items"] = [
  {
    key: "/",
    label: <NavLink to="/">Products</NavLink>,
  },
  {
    key: "/sales",
    label: <NavLink to="/sales">Sales</NavLink>,
  },
];

export default sidebarItems;
