import Container from "~/components/container";
import AllProducts from "~/components/product/all-product";
import { getAllProducts } from "~/server/data/product";

const ProductPage = async () => {
  const product = await getAllProducts();

  return (
    <>
      <Container>
        <div className="flex w-full flex-col items-center">
          <AllProducts products={product} />
        </div>
      </Container>
    </>
  );
};

export default ProductPage;
