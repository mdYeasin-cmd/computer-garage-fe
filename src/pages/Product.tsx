import { Button, Table, TableColumnsType } from "antd";
import { useGetAllProductsQuery } from "../redux/features/product/productApi";
import { useAppDispatch } from "../redux/hooks";
import { openModal } from "../redux/features/product/productSlice";
import AddProductModal from "../components/product/AddProductModal";

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
      title: "Compatibility",
      dataIndex: "compatibility",
    },
    {
      title: "Interface",
      dataIndex: "interface",
    },
    {
      title: "Condition",
      dataIndex: "condition",
    },
    {
      title: "Quantity",
      dataIndex: "quantity",
      responsive: ["md"],
    },
  ];

  const rows: TProduct[] = data?.data?.map((item: TProduct) => {
    return {
      key: item._id,
      ...item,
    };
  });

  return (
    <>
      <div>
        <Button onClick={() => dispatch(openModal(true))}>Add Product</Button>
        <Table columns={columns} dataSource={rows} />;
      </div>

      <AddProductModal />
    </>
  );
};

export default Product;
