import { Button, Form, Modal, Typography, Input, Select } from "antd";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { openModal } from "../../redux/features/product/productSlice";
import { RootState } from "../../redux/store";
import { useAddProductMutation } from "../../redux/features/product/productApi";
import { toast } from "sonner";
import { TProduct } from "../../types";
import { useState } from "react";

const { Title } = Typography;
const { TextArea } = Input;

const AddProductModal = () => {
  const { openModal: open } = useAppSelector(
    (state: RootState) => state.product
  );
  const dispatch = useAppDispatch();
  const [addProduct] = useAddProductMutation();
  const [productFormData, setProductFormData] = useState<Partial<TProduct>>({});
  const [form] = Form.useForm();

  const handleProductSubmit = async () => {
    form.resetFields();

    try {
      const res = await addProduct(productFormData);

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
      onCancel={() => {
        dispatch(openModal(false));
        setProductFormData({});
        form.resetFields();
      }}
      width={1000}
      footer={null}
    >
      <Title level={3}>Add a Product</Title>

      <span
        style={{ display: "inline-block", marginBottom: "10px", color: "red" }}
      >
        * All fields are mandatory.
      </span>

      <Form onFinish={handleProductSubmit} form={form}>
        {/* Name */}
        <div>
          <label style={{ display: "inline-block", marginLeft: "10px" }}>
            Name <span style={{ color: "red" }}>*</span>
          </label>
          <Form.Item name="name">
            <Input
              type="text"
              onChange={(e) => {
                setProductFormData({
                  ...productFormData,
                  name: e.target.value,
                });
              }}
              placeholder="Name"
              id="name"
              size="large"
            />
          </Form.Item>
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
            <Form.Item name="category">
              <Select
                style={{ width: "100%" }}
                onChange={(value) => {
                  setProductFormData({
                    ...productFormData,
                    category: value,
                  });
                }}
                options={[
                  { value: "laptop", label: "Laptop" },
                  { value: "monitor", label: "Monitor" },
                  { value: "Computer Parts", label: "Computer Parts" },
                ]}
                placeholder="Category"
                size="large"
              />
            </Form.Item>
          </div>

          <div style={{ width: "49%" }}>
            <label style={{ display: "inline-block", marginLeft: "10px" }}>
              Brand <span style={{ color: "red" }}>*</span>
            </label>
            <Form.Item name="brand">
              <Input
                type="text"
                onChange={(e) => {
                  setProductFormData({
                    ...productFormData,
                    brand: e.target.value,
                  });
                }}
                placeholder="Brand"
                id="brand"
                size="large"
              />
            </Form.Item>
          </div>
        </div>

        {/* Price and Quantity */}
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <div style={{ width: "49%" }}>
            <label style={{ display: "inline-block", marginLeft: "10px" }}>
              Price <span style={{ color: "red" }}>*</span>
            </label>
            <Form.Item name="price">
              <Input
                type="number"
                placeholder="Price"
                id="price"
                size="large"
                onChange={(e) => {
                  setProductFormData({
                    ...productFormData,
                    price: Number(e.target.value),
                  });
                }}
              />
            </Form.Item>
          </div>

          <div style={{ width: "49%" }}>
            <label style={{ display: "inline-block", marginLeft: "10px" }}>
              Quantity <span style={{ color: "red" }}>*</span>
            </label>
            <Form.Item name="quantity">
              <Input
                type="number"
                placeholder="Quantity"
                id="quantity"
                size="large"
                onChange={(e) => {
                  setProductFormData({
                    ...productFormData,
                    quantity: Number(e.target.value),
                  });
                }}
              />
            </Form.Item>
          </div>
        </div>

        {/* Availability and Warrenty Period */}
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <div style={{ width: "49%" }}>
            <label style={{ display: "inline-block", marginLeft: "10px" }}>
              Availability <span style={{ color: "red" }}>*</span>
            </label>
            <Form.Item name="availability">
              <Select
                style={{ width: "100%" }}
                onChange={(value) => {
                  setProductFormData({
                    ...productFormData,
                    availability: value as "In stock" | "Out of stock",
                  });
                }}
                options={[
                  { value: "In stock", label: "In Stock" },
                  { value: "Out of stock", label: "Out Of Stock" },
                ]}
                placeholder="Availability"
                size="large"
              />
            </Form.Item>
          </div>

          <div style={{ width: "49%" }}>
            <label style={{ display: "inline-block", marginLeft: "10px" }}>
              Warranty Period
            </label>
            <Form.Item name="warrantyPeriod">
              <Input
                type="number"
                placeholder="Warranty Period"
                id="warrantyPeriod"
                size="large"
                onChange={(e) => {
                  setProductFormData({
                    ...productFormData,
                    warrantyPeriod: Number(e.target.value),
                  });
                }}
              />
            </Form.Item>
          </div>
        </div>

        {/* Compatibility and Interface */}
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <div style={{ width: "49%" }}>
            <label style={{ display: "inline-block", marginLeft: "10px" }}>
              Compatibility
            </label>
            <Form.Item name="compatibility">
              <Select
                style={{ width: "100%" }}
                onChange={(value) => {
                  setProductFormData({
                    ...productFormData,
                    compatibility: value,
                  });
                }}
                options={[
                  { value: "windows", label: "Windows" },
                  { value: "mac", label: "Mac" },
                  { value: "linux", label: "Linux" },
                ]}
                placeholder="Compatibility"
                size="large"
              />
            </Form.Item>
          </div>

          <div style={{ width: "49%" }}>
            <label style={{ display: "inline-block", marginLeft: "10px" }}>
              Interface
            </label>
            <Form.Item name="interface">
              <Input
                type="text"
                placeholder="Interface"
                id="interface"
                size="large"
                onChange={(e) => {
                  setProductFormData({
                    ...productFormData,
                    interface: e.target.value,
                  });
                }}
              />
            </Form.Item>
          </div>
        </div>

        {/* Color and Capacity */}
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <div style={{ width: "49%" }}>
            <label style={{ display: "inline-block", marginLeft: "10px" }}>
              Color
            </label>
            <Form.Item name="color">
              <Input
                type="text"
                onChange={(e) => {
                  setProductFormData({
                    ...productFormData,
                    color: e.target.value,
                  });
                }}
                placeholder="Color"
                id="color"
                size="large"
              />
            </Form.Item>
          </div>

          <div style={{ width: "49%" }}>
            <label style={{ display: "inline-block", marginLeft: "10px" }}>
              Capacity
            </label>
            <Form.Item name="capacity">
              <Input
                type="text"
                placeholder="Capacity"
                id="capacity"
                size="large"
                onChange={(e) => {
                  setProductFormData({
                    ...productFormData,
                    capacity: e.target.value,
                  });
                }}
              />
            </Form.Item>
          </div>
        </div>

        {/* Condition */}
        <div>
          <label style={{ display: "inline-block", marginLeft: "10px" }}>
            Condition
          </label>
          <Form.Item name="condition">
            <Select
              style={{ width: "100%" }}
              onChange={(value) => {
                setProductFormData({
                  ...productFormData,
                  condition: value,
                });
              }}
              options={[
                { value: "brand new", label: "Brand New" },
                { value: "second hand", label: "Second Hand" },
              ]}
              placeholder="Condition"
              size="large"
            />
          </Form.Item>
        </div>

        {/* Description */}
        <div>
          <label style={{ display: "inline-block", marginLeft: "10px" }}>
            Description
          </label>
          <Form.Item name="description">
            <TextArea
              onChange={(e) => {
                setProductFormData({
                  ...productFormData,
                  description: e.target.value,
                });
              }}
              placeholder="Description"
              id="description"
              rows={4}
            />
          </Form.Item>
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
            disabled={
              !productFormData?.name ||
              !productFormData?.category ||
              !productFormData?.brand ||
              !productFormData?.price ||
              !productFormData?.quantity ||
              !productFormData?.availability
            }
            htmlType="submit"
            style={{ margin: "10px" }}
            type="primary"
            onClick={() => {
              dispatch(openModal(false));
              setProductFormData({});
            }}
          >
            Submit
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default AddProductModal;
