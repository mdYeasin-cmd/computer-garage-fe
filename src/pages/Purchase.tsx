import { Table, Typography } from "antd";
import { useGetAllPurchasesHistoryQuery } from "../redux/features/sale/saleApi";
import dayjs from "dayjs";
import { TSale } from "../types";

const { Title } = Typography;

const Purchase = () => {
  const { data, isLoading } = useGetAllPurchasesHistoryQuery(undefined);

  console.log(data, "sales data");

  const columns = [
    {
      title: "Name",
      dataIndex: "productName",
    },
    {
      title: "Quantity",
      dataIndex: "quantity",
    },
    {
      title: "Seller Name",
      dataIndex: "sellerName",
    },
    {
      title: "Date of Sale",
      dataIndex: "dateOfSale",
      render: (_: string, record: TSale) => {
        return <span>{dayjs(record?.dateOfSale).format("YYYY-MM-DD")}</span>;
      },
    },
  ];

  const rows = data?.data?.map(
    (item: {
      _id: string;
      sellerId: {
        name: string;
        _id: string;
      };
      buyerId: string;
      productId: string;
      productName: string;
      quantity: number;
      buyerName: string;
      dateOfSale: dayjs.Dayjs;
    }) => {
      return {
        key: item?._id,
        ...item,
        sellerName: item?.sellerId?.name,
      };
    }
  );

  return (
    <div>
      <Title style={{ textAlign: "center", marginBottom: "20px" }} level={3}>
        Purchases History
      </Title>
      <Table loading={isLoading} columns={columns} dataSource={rows} />
    </div>
  );
};

export default Purchase;
