import { Modal } from "antd";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { RootState } from "../../redux/store";
import { openDeleteConfirmationModal } from "../../redux/features/product/productSlice";
import { useDeleteAProductMutation } from "../../redux/features/product/productApi";
import { toast } from "sonner";

const DeleteProductConfirmationModal = () => {
  const dispatch = useAppDispatch();
  const { openDeleteConfirmationModal: open, selectedProduct } = useAppSelector(
    (state: RootState) => state.product
  );

  const { name, _id } = selectedProduct;

  const [deleteAProduct] = useDeleteAProductMutation();

  return (
    <Modal
      title="Delete confirmation"
      centered
      open={open}
      onOk={async () => {
        dispatch(openDeleteConfirmationModal(false));
        await deleteAProduct(_id);
        toast.success("Product is deleted successfully.");
      }}
      onCancel={() => dispatch(openDeleteConfirmationModal(false))}
    >
      <div style={{ margin: "40px 0px" }}>
        <p style={{ textAlign: "center", fontSize: "16px" }}>
          Are you sure you want to dele{" "}
          <span style={{ color: "red" }}>{name}</span>?
        </p>
      </div>
    </Modal>
  );
};

export default DeleteProductConfirmationModal;
