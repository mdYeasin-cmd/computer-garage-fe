import { DatePicker, Form, Input, Modal, Typography } from "antd";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { RootState } from "../../redux/store";
import { openCreateSaleModal } from "../../redux/features/sale/saleSlice";
import { useState } from "react";
import { useAddASaleInfoMutation } from "../../redux/features/sale/saleApi";
import { toast } from "sonner";
import { TProduct, TSale } from "../../types";

const { Title } = Typography;

const CreateSaleModal = () => {
  const { openCreateSaleModal: open } = useAppSelector(
    (state: RootState) => state.sale
  );

  const { selectedProduct } = useAppSelector(
    (state: RootState) => state.product
  );

  const { _id, name, quantity } = selectedProduct as TProduct;

  const dispatch = useAppDispatch();
  const [addASaleInfo] = useAddASaleInfoMutation();
  const [form] = Form.useForm();

  const [saleState, setSaleState] = useState<Partial<TSale>>({});

  return (
    <Modal
      centered
      open={open}
      onOk={async () => {
        try {
          if (
            !saleState.quantity ||
            !saleState.buyerName ||
            !saleState.dateOfSale
          ) {
            toast.error("Please fill up all fields value.");
            return;
          }

          if (saleState.quantity > quantity) {
            toast.error(
              `You can't sale more than your available products. Now you have only ${quantity} ${name}.`
            );

            return;
          }

          dispatch(openCreateSaleModal(false));
          form.resetFields();

          const saleInfo = {
            productId: _id,
            productName: name,
            ...saleState,
          };

          await addASaleInfo(saleInfo);

          toast.success("Sale information added successfully.");
          setSaleState({});
        } catch (error) {
          console.log(error);
        }
      }}
      onCancel={() => {
        dispatch(openCreateSaleModal(false));
        form.resetFields();
        setSaleState({});
      }}
    >
      <Title level={4}>Selling {name}</Title>

      <span
        style={{ display: "inline-block", marginBottom: "10px", color: "red" }}
      >
        * All fields are mandatory.
      </span>

      <Form form={form}>
        <div>
          <label
            style={{
              display: "inline-block",
              marginLeft: "10px",
            }}
          >
            Quantity <span style={{ color: "red" }}>*</span>
          </label>
          <Form.Item name="quantity">
            <Input
              onChange={(e) => {
                setSaleState({
                  ...saleState,
                  quantity: Number(e.target.value),
                });
              }}
              type="number"
              placeholder="Quantity"
              size="large"
            />
          </Form.Item>
        </div>

        <div>
          <label
            style={{
              display: "inline-block",
              marginLeft: "10px",
            }}
          >
            Buyer Name <span style={{ color: "red" }}>*</span>
          </label>
          <Form.Item name="buyerName">
            <Input
              type="text"
              placeholder="Buyer Name"
              onChange={(e) =>
                setSaleState({ ...saleState, buyerName: e.target.value })
              }
              size="large"
            />
          </Form.Item>
        </div>

        <div>
          <label
            style={{
              display: "inline-block",
              marginLeft: "10px",
            }}
          >
            Date <span style={{ color: "red" }}>*</span>
          </label>
          <Form.Item name="dateOfSale">
            {/* <Input
              type="text"
              placeholder="Date"
              onChange={(e) =>
                setSaleState({ ...saleState, dateOfSale: e.target.value })
              }
              size="large"
            /> */}
            <DatePicker
              size="large"
              style={{ width: "100%" }}
              placeholder="Date"
              onChange={(value) =>
                setSaleState({ ...saleState, dateOfSale: value })
              }
            />
          </Form.Item>
        </div>
      </Form>
    </Modal>
  );
};

export default CreateSaleModal;
