import { Layout, Menu } from "antd";
import userSidebarItems from "../sidebarItems/sidebarItems";

const { Sider } = Layout;

const Sidebar = () => {
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
        theme="dark"
        mode="inline"
        defaultSelectedKeys={["4"]}
        items={userSidebarItems}
      />
    </Sider>
  );
};

export default Sidebar;
