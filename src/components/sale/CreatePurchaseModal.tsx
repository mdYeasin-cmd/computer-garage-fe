import { DatePicker, Form, Input, Modal, Typography } from "antd";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { RootState } from "../../redux/store";
import { openPhurchaseModal } from "../../redux/features/sale/saleSlice";
import { useState } from "react";
import { useAddASaleInfoMutation } from "../../redux/features/sale/saleApi";
import { toast } from "sonner";
import { TProduct, TSale } from "../../types";
import { selectCurrentUser } from "../../redux/features/auth/authSlice";
import dayjs from "dayjs";

const { Title } = Typography;

const CreatePurchaseModal = () => {
  const user = useAppSelector(selectCurrentUser);
  const { openPhurchaseModal: open } = useAppSelector(
    (state: RootState) => state.sale
  );

  const { selectedProduct } = useAppSelector(
    (state: RootState) => state.product
  );

  const { _id, name, quantity, userId } = selectedProduct as TProduct;

  const dispatch = useAppDispatch();
  const [addASaleInfo] = useAddASaleInfoMutation();
  const [form] = Form.useForm();

  const [saleState, setSaleState] = useState<Partial<TSale>>({
    buyerName: user?.name,
    dateOfSale: dayjs(),
  });

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
              `You can't purchase more than available products. Now have only ${quantity} ${name}.`
            );

            return;
          }

          dispatch(openPhurchaseModal(false));
          form.resetFields();

          const purchaseInfo = {
            productId: _id,
            productName: name,
            sellerId: userId,
            ...saleState,
          };

          console.log(purchaseInfo, "purchase info");

          await addASaleInfo(purchaseInfo);

          toast.success("You purchased the product successfully.");
          setSaleState({
            buyerName: user?.name,
            dateOfSale: dayjs(),
          });
        } catch (error) {
          console.log(error);
        }
      }}
      onCancel={() => {
        dispatch(openPhurchaseModal(false));
        form.resetFields();
        setSaleState({
          buyerName: user?.name,
          dateOfSale: dayjs(),
        });
      }}
    >
      <Title level={4}>Purchasing {name}</Title>

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
              defaultValue={saleState.buyerName}
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
            <DatePicker
              size="large"
              style={{ width: "100%" }}
              placeholder="Date"
              defaultValue={saleState.dateOfSale}
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

export default CreatePurchaseModal;
