import { useParams } from "react-router-dom";
import mockProducts from "../data/Mockdata";
import DetailPage from "./DetailedPage";

export default function DetailedWrapper() {
  const { id } = useParams();
  const product = mockProducts.find((p) => p.id === Number(id));

  // Find related products from same category
  const related = mockProducts.filter(
    (p) => p.category === product?.category && p.id !== product?.id
  );

  if (!product) {
    return (
      <div className="p-10 text-center text-gray-500">Product not found.</div>
    );
  }

  return <DetailPage product={product} related={related} />;
}
