import { Form, Input } from "antd";
import { Controller } from "react-hook-form";

const { TextArea } = Input;

type TBaseTextArea = {
  name: string;
  label: string;
};

const BaseTextArea = ({ name, label }: TBaseTextArea) => {
  return (
    <Controller
      name={name}
      render={({ field }) => (
        <Form.Item>
          <TextArea {...field} placeholder={label} id={name} rows={4} />
        </Form.Item>
      )}
    />
  );
};

export default BaseTextArea;
