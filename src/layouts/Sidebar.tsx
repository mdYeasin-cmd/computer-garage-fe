import { Layout, Menu } from "antd";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { useAppSelector } from "../redux/hooks";
import { selectCurrentToken } from "../redux/features/auth/authSlice";
import {
  buyerSidebarItems,
  sellerSidebarItems,
} from "../sidebarItems/sidebarItems";
import { decodedUser } from "../utils/decodedUser";
import { TUser } from "../types";

const { Sider } = Layout;

const Sidebar = () => {
  const token = useAppSelector(selectCurrentToken);
  const location = useLocation();
  const [current, setCurrent] = useState(location.pathname);

  let user;

  if (token) {
    user = decodedUser(token);
  }

  let sidebarItems;

  switch ((user as TUser).role) {
    case "seller":
      sidebarItems = sellerSidebarItems;
      break;

    case "buyer":
      sidebarItems = buyerSidebarItems;
      break;

    default:
      break;
  }

  useEffect(() => {
    if (current === location.pathname) {
      setCurrent(location.pathname);
    }
  }, [location, current]);

  function handleClick(item: { key: string }) {
    setCurrent(item.key);
  }

  return (
    <Sider breakpoint="lg" collapsedWidth="0" width={250}>
      <div
        style={{
          color: "white",
          height: "4rem",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <h1>Computer Garage</h1>
      </div>
      <Menu
        onClick={handleClick}
        theme="dark"
        mode="inline"
        // defaultSelectedKeys={["/"]}
        selectedKeys={[current]}
        items={sidebarItems}
      />
    </Sider>
  );
};

export default Sidebar;
