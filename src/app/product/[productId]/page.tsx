import Container from "~/components/container";
import ProductDisplay from "~/components/product/product-display";

type Iparams = {
  productId: string;
};

const ProductPage = ({ params }: { params: Iparams }) => {
  const productId = params.productId;

  return (
    <Container customClass="mt-12 bg-white">
      <ProductDisplay productId={productId} />
    </Container>
  );
};
export default ProductPage;
