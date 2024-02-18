import { Button, Form, Typography } from "antd";
import { FieldValues } from "react-hook-form";
import { NavLink, useNavigate } from "react-router-dom";
import { z } from "zod";
import BaseForm from "../components/form/BaseForm";
import BaseInput from "../components/form/BaseInput";
import { useRegisterMutation } from "../redux/features/auth/authApi";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

const { Title } = Typography;

const registerSchema = z.object({
  name: z.string({ required_error: "Name is required" }),
  email: z
    .string({ required_error: "Email is required" })
    .email("Invalid email address"),
  password: z
    .string({ required_error: "Password is required" })
    .min(6, { message: "Password must be at least 6 characters" })
    .max(32, { message: "Password can't be more than 32 characters" }),
});

const Register = () => {
  const navigate = useNavigate();
  const [register] = useRegisterMutation();

  const onSubmit = async (data: FieldValues) => {
    const toastId = toast.loading("Please wait...");
    try {
      const res = await register(data).unwrap();

      if (res.success) {
        toast.success("Registration successfull", { id: toastId });
        navigate("/login");
      }
    } catch (error: any) {
      toast.error(error.data.errorSources[0].message, { id: toastId });
    }
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
        <BaseForm resolver={zodResolver(registerSchema)} onSubmit={onSubmit}>
          <Title style={{ textAlign: "center" }} level={2}>
            Register Account
          </Title>
          <BaseInput label="Name" type="text" name="name" />
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
