import { Table, Typography } from "antd";
import { useGetAllSalesHistoryQuery } from "../redux/features/sale/saleApi";
import dayjs from "dayjs";

const { Title } = Typography;

const Sale = () => {
  const { data } = useGetAllSalesHistoryQuery(undefined);

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
      title: "Buyer Name",
      dataIndex: "buyerName",
    },
    {
      title: "Date of Sale",
      dataIndex: "dateOfSale",
      render: (_: any, record: any) => {
        return <span>{dayjs(record?.dateOfSale).format("YYYY-MM-DD")}</span>;
      },
    },
  ];

  const rows = data?.data?.map((item: any) => {
    return {
      key: item?._id,
      ...item,
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
