import { Layout, Menu } from "antd";
import { NavLink } from "react-router-dom";

const { Sider } = Layout;

const Sidebar = () => {
  const sidebarItems = [
    {
      key: "Products",
      label: <NavLink to="/">Products</NavLink>,
    },
    {
      key: "Sales",
      label: <NavLink to="/sales">Sales</NavLink>,
    },
  ];

  return (
    <Sider breakpoint="lg" collapsedWidth="0" width={250}>
      <div
        style={{
          color: "white",
          textAlign: "center",
          height: "4rem",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <h1>Computer Garage</h1>
      </div>
      <Menu
        theme="dark"
        mode="inline"
        defaultSelectedKeys={["4"]}
        items={sidebarItems}
      />
    </Sider>
  );
};

export default Sidebar;
