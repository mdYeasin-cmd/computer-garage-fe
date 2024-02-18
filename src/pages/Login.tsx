import { Button, Form, Typography } from "antd";
import { NavLink } from "react-router-dom";
import BaseForm from "../components/form/BaseForm";
import BaseInput from "../components/form/BaseInput";
import { z } from "zod";
import { FieldValues } from "react-hook-form";

const { Title } = Typography;

const loginSchema = z.object({
  email: z
    .string({ required_error: "Email is required" })
    .email("Invalid email address"),
  password: z
    .string({ required_error: "Password is required" })
    .min(6, { message: "Password must be at least 6 characters" })
    .max(32, { message: "Password can't be more than 32 characters" }),
});

const Login = () => {
  const onSubmit = (data: FieldValues) => {
    console.log(data, "login form data");
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <div
        style={{
          width: "400px",
          border: "1px solid black",
          padding: "20px",
          borderRadius: "5px",
        }}
      >
        <BaseForm validationSchema={loginSchema} onSubmit={onSubmit}>
          <Title level={2} style={{ textAlign: "center" }}>
            Login
          </Title>
          <BaseInput label="Email" type="text" name="email" />
          <BaseInput label="Password" type="text" name="password" />
          <Form.Item
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              textAlign: "center",
            }}
          >
            <Button type="primary" htmlType="submit">
              Login
            </Button>
            <p style={{ marginTop: "10px" }}>Or</p>
            <NavLink to="/register">Register</NavLink>
          </Form.Item>
        </BaseForm>
      </div>
    </div>
  );
};

export default Login;
