import { Category, Product } from "@/sanity.types";
import React from "react";
import Categories from "./Categories";
import Container from "./Container";
import ProductGrid from "./ProductGrid";

interface Props {
  products: Product[];
  categories: Category[];
  title?: boolean;
}

const ProductsList = ({ products, title, categories }: Props) => {
  return (
    <div className="pb-32">
      <Container>
        <Categories categories={categories} />
        {title && (
          <div className="pb-10">
            <h2 className="text-2xl font-semibold text-gray-600">
              Day of the <span className="text-lightBlue">Deal</span>
            </h2>
            <p className="text-sm font-thin text-gray-500">
              Don&apos;t wait. The time will never be just right
            </p>
          </div>
        )}
        <ProductGrid products={products} />
      </Container>
    </div>
  );
};

export default ProductsList;
