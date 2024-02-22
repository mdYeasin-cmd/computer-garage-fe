import { Form, Input, Modal, Typography } from "antd";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { RootState } from "../../redux/store";
import { openCreateSaleModal } from "../../redux/features/sale/saleSlice";
import { useState } from "react";
import { useAddASaleInfoMutation } from "../../redux/features/sale/saleApi";
import { toast } from "sonner";

const { Title } = Typography;

const CreateSaleModal = () => {
  const { openCreateSaleModal: open } = useAppSelector(
    (state: RootState) => state.sale
  );

  const { selectedProduct } = useAppSelector(
    (state: RootState) => state.product
  );

  const { _id, name } = selectedProduct;

  const dispatch = useAppDispatch();
  const [addASaleInfo] = useAddASaleInfoMutation();

  const [saleState, setSaleState] = useState({
    quantity: "",
    buyerName: "",
    dateOfSale: "",
  });

  return (
    <Modal
      centered
      open={open}
      onOk={async () => {
        try {
          dispatch(openCreateSaleModal(false));

          await addASaleInfo({
            productId: _id,
            productName: name,
            ...saleState,
          });

          toast.success("Sale information added successfully.");
          setSaleState({
            quantity: "",
            buyerName: "",
            dateOfSale: "",
          });
        } catch (error) {
          console.log(error);
        }
      }}
      onCancel={() => {
        dispatch(openCreateSaleModal(false));
        setSaleState({
          quantity: "",
          buyerName: "",
          dateOfSale: "",
        });
      }}
    >
      <Title level={4}>Add Sell Information</Title>

      <span
        style={{ display: "inline-block", marginBottom: "10px", color: "red" }}
      >
        * All fields are mandatory.
      </span>

      <div>
        <label
          style={{
            display: "inline-block",
            marginLeft: "10px",
          }}
        >
          Quantity <span style={{ color: "red" }}>*</span>
        </label>
        <Form.Item>
          <Input
            onChange={(e) =>
              setSaleState({ ...saleState, quantity: e.target.value })
            }
            type="number"
            placeholder="Quantity"
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
        <Form.Item>
          <Input
            type="text"
            placeholder="Buyer Name"
            onChange={(e) =>
              setSaleState({ ...saleState, buyerName: e.target.value })
            }
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
        <Form.Item>
          <Input
            type="text"
            placeholder="Date"
            onChange={(e) =>
              setSaleState({ ...saleState, dateOfSale: e.target.value })
            }
          />
        </Form.Item>
      </div>
    </Modal>
  );
};

export default CreateSaleModal;
