import { Layout, Menu } from "antd";
import userSidebarItems from "../sidebarItems/sidebarItems";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

const { Sider } = Layout;

const Sidebar = () => {
  const location = useLocation();
  const [current, setCurrent] = useState(location.pathname);

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
        items={userSidebarItems}
      />
    </Sider>
  );
};

export default Sidebar;
