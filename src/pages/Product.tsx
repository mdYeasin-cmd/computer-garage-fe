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
import { openCreateSaleModal } from "../redux/features/sale/saleSlice";
import EditIcon from "../assets/icons/EditIcon";
import { TProduct } from "../types";
import EditProductModal from "../components/product/EditProductModal";
import { RootState } from "../redux/store";

const { Search } = Input;

// const defaultProduct: TProduct = {
//   _id: "",
//   name: "",
//   category: "",
//   brand: "",
//   compatibility: "",
//   quantity: 0,
//   interface: "",
//   condition: "",
//   capacity: "",
//   price: 0,
//   warrantyPeriod: 0,
//   color: "",
//   availability: "Out of stock",
//   description: "",
// };

const Product = () => {
  // local state
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);

  // redux state
  const dispatch = useAppDispatch();
  const { data, isLoading: isProductsFetching } =
    useGetAllProductsQuery(undefined);
  const [bulkProductDelete] = useBulkProductDeleteMutation();
  const [editProduct, setEditProduct] = useState<Partial<TProduct>>({});
  const { openModal: open, openEditModal: editOpen } = useAppSelector(
    (state: RootState) => state.product
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
    {
      title: "Availability",
      dataIndex: "availability",
    },
    {
      title: "Action",
      dataIndex: "action",
      render: (_: any, record: any) => {
        return (
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
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

  const content = (
    <div>
      <p
        onClick={async () => {
          await bulkProductDelete(selectedRowKeys);
          toast.success("bulk product deleted");
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
              >
                <Button style={{ marginLeft: "10px" }}>More Options</Button>
              </Popover>
            )}
          </div>
        </div>
        <Table
          loading={isProductsFetching}
          columns={columns}
          dataSource={rows}
          rowSelection={rowSelection}
        />
      </div>

      {open && <AddProductModal />}
      {editOpen && <EditProductModal product={editProduct} />}
      <DeleteProductConfirmationModal />
      <CreateSaleModal />
    </>
  );
};

export default Product;
