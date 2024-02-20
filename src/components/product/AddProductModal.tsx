import { Modal } from "antd";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { openModal } from "../../redux/features/product/productSlice";

const AddProductModal = () => {
  const { openModal: open } = useAppSelector((state) => state.product);
  const dispatch = useAppDispatch();

  return (
    <Modal
      title="Add a Product"
      centered
      open={open}
      onOk={() => dispatch(openModal(false))}
      onCancel={() => dispatch(openModal(false))}
      width={1000}
    >
      <h1>Add Product modal added</h1>
    </Modal>
  );
};

export default AddProductModal;
