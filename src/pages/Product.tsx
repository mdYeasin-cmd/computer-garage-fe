import { useGetAllProductsQuery } from "../redux/features/product/productApi";

const Product = () => {
  const { data } = useGetAllProductsQuery(undefined);

  console.log(data, "products");

  return (
    <div>
      <h1>This is Product component</h1>
    </div>
  );
};

export default Product;
