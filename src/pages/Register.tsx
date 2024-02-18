import { Button, Form, Input, Typography } from "antd";
import { useForm } from "react-hook-form";
import { NavLink } from "react-router-dom";

const { Title } = Typography;

const Register = () => {
  const { register, handleSubmit } = useForm();

  const onSubmit = (data) => {
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
        onSubmitCapture={handleSubmit(onSubmit)}
      >
        <Title>h1. Ant Design</Title>
        <Form.Item
          // name="name"
          rules={[{ required: true, message: "Please input your Name!" }]}
          id="name"
          {...register("name")}
        >
          <Input type="text" placeholder="Name" />
        </Form.Item>

        <Form.Item
          name="email"
          rules={[{ required: true, message: "Please input your Email!" }]}
        >
          <Input
            type="email"
            placeholder="Email"
            id="email"
            {...register("email")}
          />
        </Form.Item>

        <Form.Item name="photoUrl">
          <Input
            type="text"
            placeholder="Photo URL"
            id="photoUrl"
            {...register("photoUrl")}
          />
        </Form.Item>

        <Form.Item
          name="password"
          rules={[{ required: true, message: "Please input your Password!" }]}
        >
          <Input
            type="password"
            placeholder="Password"
            id="password"
            {...register("password")}
          />
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
            Register
          </Button>
          <p style={{ marginTop: "10px" }}>Or</p>
          <NavLink to="/login">Login</NavLink>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Register;
