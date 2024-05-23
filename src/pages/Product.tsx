import { Button, Table, TableColumnsType, Input, Popover } from "antd";
import {
  useBulkProductDeleteMutation,
  useGetAllProductsQuery,
} from "../redux/features/product/productApi";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import {
  openDeleteConfirmationModal,
  openEditModal,
  openModal,
  selectedProduct,
} from "../redux/features/product/productSlice";
import AddProductModal from "../components/product/AddProductModal";
import DeleteIcon from "../assets/icons/DeleteIcon";
import DeleteProductConfirmationModal from "../components/product/DeleteProductConfirmationModal";
import { useState } from "react";
import { toast } from "sonner";
import CreateSaleModal from "../components/sale/CreateSaleModal";
import {
  openCreateSaleModal,
  openPhurchaseModal,
} from "../redux/features/sale/saleSlice";
import EditIcon from "../assets/icons/EditIcon";
import { TProduct } from "../types";
import EditProductModal from "../components/product/EditProductModal";
import { RootState } from "../redux/store";
import { selectCurrentUser } from "../redux/features/auth/authSlice";
import CreatePurchaseModal from "../components/sale/CreatePurchaseModal";

const { Search } = Input;

const Product = () => {
  // local state
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [openMoreOptions, setOpenMoreOptions] = useState<boolean>(false);

  // redux state
  const user = useAppSelector(selectCurrentUser);
  const dispatch = useAppDispatch();
  const { data, isLoading: isProductsFetching } =
    useGetAllProductsQuery(undefined);
  const [bulkProductDelete] = useBulkProductDeleteMutation();
  const [editProduct, setEditProduct] = useState<Partial<TProduct>>({});
  const { openModal: open, openEditModal: editOpen } = useAppSelector(
    (state: RootState) => state.product
  );
  const { openPhurchaseModal: purchaseOpen } = useAppSelector(
    (state: RootState) => state.sale
  );

  // console.log(editProduct, "edited product");

  const columns: TableColumnsType<TProduct> = [
    {
      title: "Name",
      dataIndex: "name",
    },
    {
      title: "Category",
      dataIndex: "category",
      responsive: ["md"],
    },
    {
      title: "Brand",
      dataIndex: "brand",
      responsive: ["md"],
    },
    {
      title: "Price",
      dataIndex: "price",
    },
    {
      title: "Quantity",
      dataIndex: "quantity",
      responsive: ["md"],
    },
    user?.role === "seller"
      ? {
          title: "Availability",
          dataIndex: "availability",
        }
      : {},
    {
      title: "Action",
      dataIndex: "action",
      render: (_: string, record: TProduct) => {
        return (
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            {user?.role === "seller" && (
              <>
                <Button
                  onClick={(e) => {
                    e.stopPropagation();
                    dispatch(openCreateSaleModal(true));
                    dispatch(selectedProduct(record));
                  }}
                >
                  Sell
                </Button>

                <span
                  onClick={(e) => {
                    e.stopPropagation();
                    setEditProduct(record);
                    dispatch(openEditModal(true));
                  }}
                >
                  <EditIcon />
                </span>

                <span
                  onClick={(e) => {
                    e.stopPropagation();
                    dispatch(openDeleteConfirmationModal(true));
                    dispatch(selectedProduct(record));
                  }}
                >
                  <DeleteIcon />
                </span>
              </>
            )}

            {user?.role === "buyer" && (
              <>
                <Button
                  onClick={(e) => {
                    e.stopPropagation();
                    dispatch(openPhurchaseModal(true));
                    dispatch(selectedProduct(record));
                  }}
                >
                  Purchase
                </Button>
              </>
            )}
          </div>
        );
      },
    },
  ];

  const rows: TProduct[] = data?.data?.map((item: TProduct) => {
    return {
      key: item._id,
      ...item,
    };
  });

  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    console.log("selectedRowKeys changed: ", newSelectedRowKeys);
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  const hide = () => {
    setOpenMoreOptions(false);
  };

  const handleOpenChange = (newOpen: boolean) => {
    setOpenMoreOptions(newOpen);
  };

  const content = (
    <div>
      <p
        onClick={async () => {
          const numberOfProduct = selectedRowKeys?.length;
          hide();
          await bulkProductDelete(selectedRowKeys);
          setSelectedRowKeys([]);
          toast.success(
            `${
              numberOfProduct > 1
                ? numberOfProduct + " products are"
                : "1 product is"
            } deleted successfully.`
          );
        }}
        style={{
          cursor: "pointer",
          border: "1px solid black",
          padding: "6px",
          borderRadius: "5px",
        }}
      >
        Bulk Products Delete
      </p>
    </div>
  );

  return (
    <>
      <div>
        <div
          style={{
            display: "flex",
            gap: 5,
            justifyContent: "space-between",
            width: "100%",
            marginBottom: "25px",
          }}
        >
          <div style={{ width: "80%" }}>
            <Search
              placeholder="Search Product"
              allowClear
              // onSearch={onSearch}
              style={{ width: "100%" }}
            />
          </div>
          {user?.role === "seller" && (
            <div
              style={{
                width: "20%",
                display: "flex",
                justifyContent: "flex-end",
              }}
            >
              <Button
                onClick={() => {
                  dispatch(openModal(true));
                }}
              >
                Add Product
              </Button>

              {selectedRowKeys.length > 0 && (
                <Popover
                  placement="bottomRight"
                  content={content}
                  trigger="click"
                  open={openMoreOptions}
                  onOpenChange={handleOpenChange}
                >
                  <Button style={{ marginLeft: "10px" }}>More Options</Button>
                </Popover>
              )}
            </div>
          )}
        </div>
        <Table
          loading={isProductsFetching}
          columns={columns}
          dataSource={rows}
          rowSelection={user?.role === "seller" ? rowSelection : undefined}
        />
      </div>

      {open && <AddProductModal />}
      {editOpen && <EditProductModal product={editProduct} />}
      <DeleteProductConfirmationModal />
      <CreateSaleModal />
      {purchaseOpen && <CreatePurchaseModal />}
    </>
  );
};

export default Product;
