import DiscountBanner from "@/components/DiscountBanner";
import ProductsList from "@/components/ProductsList";
import { getAllCategories, getAllProducts, getSale } from "@/sanity/helpers";

export default async function Home() {
  const sales = await getSale();
  const products = await getAllProducts();
  const categories = await getAllCategories();

  return (
    <div>
      <DiscountBanner sales={sales} />
      <ProductsList products={products} title={true} categories={categories} />
    </div>
  );
}
