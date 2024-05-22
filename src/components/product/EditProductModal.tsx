import { Button, Form, Modal, Typography, Input, Select } from "antd";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { openEditModal } from "../../redux/features/product/productSlice";
import { RootState } from "../../redux/store";
import { useEditAProductMutation } from "../../redux/features/product/productApi";
import { toast } from "sonner";
import { TProduct } from "../../types";
import { useState } from "react";

const { Title } = Typography;
const { TextArea } = Input;

type TEditProductModalProps = {
  product: Partial<TProduct>;
};

const EditProductModal = ({ product }: TEditProductModalProps) => {
  const { openEditModal: open } = useAppSelector(
    (state: RootState) => state.product
  );
  const dispatch = useAppDispatch();
  // const [addProduct] = useAddProductMutation();
  const [editProduct] = useEditAProductMutation();
  const [productFormData, setProductFormData] =
    useState<Partial<TProduct>>(product);
  const [form] = Form.useForm();

  console.log(productFormData, "product edit from state");

  const handleProductSubmit = async () => {
    dispatch(openEditModal(false));

    form.resetFields();

    try {
      const res = await editProduct(productFormData);

      if (res) {
        toast.success("Product updated successfully");
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
        dispatch(openEditModal(false));
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
              defaultValue={productFormData?.name}
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
                defaultValue={productFormData?.category}
                style={{ width: "100%" }}
                onChange={(value) => {
                  setProductFormData({
                    ...productFormData,
                    category: value,
                  });
                }}
                options={[
                  { value: "Laptop", label: "Laptop" },
                  { value: "Monitor", label: "Monitor" },
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
                defaultValue={productFormData?.brand}
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
                defaultValue={productFormData?.price}
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
                defaultValue={productFormData?.quantity}
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
                defaultValue={productFormData?.availability}
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
                defaultValue={productFormData?.warrantyPeriod}
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
                defaultValue={productFormData?.compatibility}
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
                defaultValue={productFormData?.interface}
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
                defaultValue={productFormData?.color}
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
                defaultValue={productFormData?.capacity}
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
              defaultValue={productFormData?.condition}
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
              defaultValue={productFormData?.description}
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
          >
            Submit
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default EditProductModal;
