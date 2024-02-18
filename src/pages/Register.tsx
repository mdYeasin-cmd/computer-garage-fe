import { Button, Form, Typography } from "antd";
import { FieldValues } from "react-hook-form";
import { NavLink } from "react-router-dom";
import { z } from "zod";
import BaseForm from "../components/form/BaseForm";
import BaseInput from "../components/form/BaseInput";

const { Title } = Typography;

const registerSchema = z.object({
  name: z.string({ required_error: "Name is required" }),
  email: z
    .string({ required_error: "Email is required" })
    .email("Invalid email address"),
  photoUrl: z
    .string()
    .url({ message: "Please provide a valid photo url" })
    .optional(),
  password: z
    .string({ required_error: "Password is required" })
    .min(6, { message: "Password must be at least 6 characters" })
    .max(32, { message: "Password can't be more than 32 characters" }),
});

const Register = () => {
  const onSubmit = (data: FieldValues) => {
    console.log(data);
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
        <BaseForm validationSchema={registerSchema} onSubmit={onSubmit}>
          <Title style={{ textAlign: "center" }} level={2}>
            Register Account
          </Title>
          <BaseInput label="Name" type="text" name="name" />
          <BaseInput label="Email" type="text" name="email" />
          <BaseInput label="Photo URL (Optional)" type="text" name="photoUrl" />
          <BaseInput label="Password" type="text" name="password" />
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
              Register
            </Button>
            <p style={{ marginTop: "10px" }}>Or</p>
            <NavLink to="/login">Login</NavLink>
          </Form.Item>
        </BaseForm>
      </div>
    </div>
  );
};

export default Register;
