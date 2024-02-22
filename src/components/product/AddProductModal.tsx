import { Button, Form, Modal, Typography } from "antd";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { openModal } from "../../redux/features/product/productSlice";
import BaseForm from "../form/BaseForm";
import { FieldValues } from "react-hook-form";
import BaseInput from "../form/BaseInput";
import BaseSelect from "../form/BaseSelect";
import BaseTextArea from "../form/BaseTextArea";
import { RootState } from "../../redux/store";
import { useAddProductMutation } from "../../redux/features/product/productApi";
import { toast } from "sonner";

const { Title } = Typography;

const AddProductModal = () => {
  const { openModal: open } = useAppSelector(
    (state: RootState) => state.product
  );
  const dispatch = useAppDispatch();
  const [addProduct] = useAddProductMutation();

  const handleProductSubmit = async (data: FieldValues) => {
    try {
      const res = await addProduct(data);

      if (res) {
        toast.success("Product added successfully");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Modal
      centered
      open={open}
      onCancel={() => dispatch(openModal(false))}
      width={1000}
      footer={null}
    >
      <Title level={3}>Add a Product</Title>

      <span
        style={{ display: "inline-block", marginBottom: "10px", color: "red" }}
      >
        * All fields are mandatory.
      </span>

      <BaseForm onSubmit={handleProductSubmit}>
        <div>
          <label style={{ display: "inline-block", marginLeft: "10px" }}>
            Name <span style={{ color: "red" }}>*</span>
          </label>
          <BaseInput label="Name" type="text" name="name" />
        </div>

        {/* Category and Brand */}
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <div style={{ width: "49%" }}>
            <label
              style={{
                display: "inline-block",
                marginLeft: "10px",
              }}
            >
              Category <span style={{ color: "red" }}>*</span>
            </label>
            <BaseSelect
              name="category"
              label="Category"
              options={[
                { value: "laptop", label: "Laptop" },
                { value: "monitor", label: "Monitor" },
                { value: "Computer Parts", label: "Computer Parts" },
              ]}
            />
          </div>

          <div style={{ width: "49%" }}>
            <label style={{ display: "inline-block", marginLeft: "10px" }}>
              Brand <span style={{ color: "red" }}>*</span>
            </label>
            <BaseInput label="Brand" type="text" name="brand" />
          </div>
        </div>

        {/* Price and Quantity */}
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <div style={{ width: "49%" }}>
            <label style={{ display: "inline-block", marginLeft: "10px" }}>
              Price <span style={{ color: "red" }}>*</span>
            </label>
            <BaseInput label="Price" type="number" name="price" />
          </div>
          <div style={{ width: "49%" }}>
            <label style={{ display: "inline-block", marginLeft: "10px" }}>
              Quantity <span style={{ color: "red" }}>*</span>
            </label>
            <BaseInput label="Quantity" type="number" name="quantity" />
          </div>
        </div>

        {/* Availability and Warrenty Period */}
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <div style={{ width: "49%" }}>
            <label style={{ display: "inline-block", marginLeft: "10px" }}>
              Availability <span style={{ color: "red" }}>*</span>
            </label>
            <BaseSelect
              name="availability"
              options={[
                { value: "in stock", label: "In Stock" },
                { value: "out of stock", label: "Out Of Stock" },
              ]}
            />
          </div>
          <div style={{ width: "49%" }}>
            <label style={{ display: "inline-block", marginLeft: "10px" }}>
              Warranty Period
            </label>
            <BaseInput
              label="Warranty Period"
              type="number"
              name="warrantyPeriod"
            />
          </div>
        </div>

        {/* Compatibility and Interface */}
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <div style={{ width: "49%" }}>
            <label style={{ display: "inline-block", marginLeft: "10px" }}>
              Compatibility
            </label>
            <BaseSelect
              name="compatibility"
              label="Compatibility"
              options={[
                { value: "windows", label: "Windows" },
                { value: "mac", label: "Mac" },
                { value: "linux", label: "Linux" },
              ]}
            />
          </div>

          <div style={{ width: "49%" }}>
            <label style={{ display: "inline-block", marginLeft: "10px" }}>
              Interface
            </label>
            <BaseInput label="Interface" type="text" name="interface" />
          </div>
        </div>

        {/* Color and Capacity */}
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <div style={{ width: "49%" }}>
            <label style={{ display: "inline-block", marginLeft: "10px" }}>
              Color
            </label>
            <BaseInput label="Color" type="text" name="color" />
          </div>
          <div style={{ width: "49%" }}>
            <label style={{ display: "inline-block", marginLeft: "10px" }}>
              Capacity
            </label>
            <BaseInput label="Capacity" type="text" name="capacity" />
          </div>
        </div>

        {/* Condition */}
        <div>
          <label style={{ display: "inline-block", marginLeft: "10px" }}>
            Condition
          </label>
          <BaseSelect
            name="condition"
            label="Condition"
            options={[
              { value: "brand new", label: "Brand New" },
              { value: "second hand", label: "Second Hand" },
            ]}
          />
        </div>

        {/* Description */}
        <div>
          <label style={{ display: "inline-block", marginLeft: "10px" }}>
            Description
          </label>

          <BaseTextArea label="Description" name="description" />
        </div>

        <Form.Item
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            textAlign: "center",
          }}
        >
          <Button
            // disabled
            style={{ margin: "10px" }}
            type="primary"
            htmlType="submit"
            onClick={() => dispatch(openModal(false))}
          >
            Submit
          </Button>
        </Form.Item>
      </BaseForm>
    </Modal>
  );
};

export default AddProductModal;
