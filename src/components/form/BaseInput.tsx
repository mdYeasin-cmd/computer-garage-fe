import { Form, Input } from "antd";
import { Controller, useFormContext } from "react-hook-form";

type TBaseInput = {
  type: string;
  name: string;
  label: string;
};

const BaseInput = ({ type, name, label }: TBaseInput) => {
  const {
    formState: { errors },
  } = useFormContext();

  const showErrorMessage = () => {
    for (const error in errors) {
      if (error === name) {
        return (
          <span
            style={{
              display: "inline-block",
              color: "red",
              marginTop: "5px",
              marginLeft: "5px",
            }}
          >{`${errors[error]?.message}`}</span>
        );
      }
    }

    return <></>;
  };

  return (
    <Controller
      name={name}
      render={({ field }) => (
        <Form.Item>
          <Input {...field} type={type} placeholder={label} id={name} />
          {showErrorMessage()}
        </Form.Item>
      )}
    />
  );
};

export default BaseInput;
