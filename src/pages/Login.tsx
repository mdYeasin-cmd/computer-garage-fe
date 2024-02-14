import { Button, Form, Input } from "antd";
import { NavLink } from "react-router-dom";

const Login = () => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <Form
        style={{
          width: "400px",
          border: "1px solid black",
          padding: "20px",
          borderRadius: "5px",
        }}
        name="login"
        className="login-form"
        initialValues={{ remember: true }}
      >
        <Form.Item
          name="email"
          rules={[{ required: true, message: "Please input your Email!" }]}
        >
          <Input type="email" placeholder="Email" />
        </Form.Item>

        <Form.Item
          name="password"
          rules={[{ required: true, message: "Please input your Password!" }]}
        >
          <Input type="password" placeholder="Password" />
        </Form.Item>

        <Form.Item
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            textAlign: "center",
          }}
        >
          <Button
            type="primary"
            htmlType="submit"
            className="login-form-button"
          >
            Login
          </Button>
          <p style={{ marginTop: "10px" }}>Or</p>
          <NavLink to="/register">Register</NavLink>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Login;
