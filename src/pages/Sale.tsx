import { Table, Typography } from "antd";
import { useGetAllSalesHistoryQuery } from "../redux/features/sale/saleApi";

const { Title } = Typography;

const Sale = () => {
  const { data } = useGetAllSalesHistoryQuery(undefined);

  console.log(data, "sales data");

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
    },
    {
      title: "Quantity",
      dataIndex: "quantity",
    },
    {
      title: "Buyer Name",
      dataIndex: "buyerName",
    },
    {
      title: "Date of Sale",
      dataIndex: "dateOfSale",
    },
  ];

  const rows = data?.data?.map((item: any) => {
    return {
      key: item._id,
      ...item,
      name: item.productId.name,
    };
  });

  return (
    <div>
      <Title style={{ textAlign: "center", marginBottom: "20px" }} level={3}>
        Sales History
      </Title>
      <Table columns={columns} dataSource={rows} />
    </div>
  );
};

export default Sale;
