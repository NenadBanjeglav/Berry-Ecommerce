import { Category, Product } from "@/sanity.types";
import React from "react";
import Categories from "./Categories";
import Container from "./Container";
import ProductCard from "./ProductCard";

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
        <div className="pb-5">
          <h2 className="text-2xl font-semibold text-gray-600">
            Day of the <span className="text-lightBlue">Deal</span>
          </h2>
          <p className="text-sm text-gray-500 font-thin">
            Don't wait. The time will never be just right
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {products.map((product) => (
              <ProductCard product={product} key={product._id} />
            ))}
          </div>
        </div>
      </Container>
    </div>
  );
};

export default ProductsList;
