import { Button, Table, TableColumnsType, Input, Popover } from "antd";
import {
  useBulkProductDeleteMutation,
  useGetAllProductsQuery,
} from "../redux/features/product/productApi";
import { useAppDispatch } from "../redux/hooks";
import {
  openDeleteConfirmationModal,
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

const { Search } = Input;

type TProduct = {
  _id: string;
  name: string;
  category: string;
  brand: string;
  compatibility: string;
  quantity: number;
  interface: string;
  condition: string;
  capacity: string;
  price: number;
  warrantyPeriod: number;
  color?: string;
  availability: "in stock" | "out of stock";
};

const Product = () => {
  const dispatch = useAppDispatch();
  const { data } = useGetAllProductsQuery(undefined);
  const [bulkProductDelete] = useBulkProductDeleteMutation();

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
          <div
            onClick={() => {
              dispatch(openDeleteConfirmationModal(true));
              dispatch(selectedProduct(record));
            }}
            style={{ display: "flex", alignItems: "center", gap: 10 }}
          >
            <Button
              onClick={(e) => {
                e.stopPropagation();
                dispatch(selectedProduct(record));
                dispatch(openCreateSaleModal(true));
              }}
            >
              Sell
            </Button>
            <DeleteIcon />
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

  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);

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
            <Button onClick={() => dispatch(openModal(true))}>
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
          columns={columns}
          dataSource={rows}
          rowSelection={rowSelection}
        />
      </div>

      <AddProductModal />
      <DeleteProductConfirmationModal />
      <CreateSaleModal />
    </>
  );
};

export default Product;
