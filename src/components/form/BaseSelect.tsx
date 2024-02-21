import { Form, Select } from "antd";
import { Controller } from "react-hook-form";

const BaseSelect = ({
  label,
  name,
  options,
  defaultValue,
}: {
  label?: string;
  name: string;
  defaultValue?: object;
  options: object[];
}) => {
  return (
    <Controller
      name={name}
      render={({ field }) => (
        <Form.Item>
          <Select
            {...field}
            value={field.value}
            defaultValue={defaultValue}
            style={{ width: "100%" }}
            options={options}
            placeholder={label}
          />
        </Form.Item>
      )}
    />
  );
};

export default BaseSelect;
