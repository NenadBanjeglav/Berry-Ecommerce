import Container from "@/components/Container";
import ProductGrid from "@/components/ProductGrid";
import ProductsList from "@/components/ProductsList";
import { getAllCategories, getProductsByCategory } from "@/sanity/helpers";
import React from "react";

interface Props {
  params: Promise<{ slug: string }>;
}

const CategoryPage = async ({ params }: Props) => {
  const { slug } = await params;
  const categories = await getAllCategories();
  const products = await getProductsByCategory(slug);

  return (
    <div className="flex flex-col items-center bg-gray-100">
      <Container className="p-8 bg-white rounded-lg shadow-md mt-3 w-full">
        <h1 className="text-2xl md:text-3xl font-bold">
          Search results for{" "}
          <span className="text-darkBlue">
            {slug
              .split("-")
              .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
              .join(" ")}
          </span>{" "}
          collection
        </h1>
        <ProductsList products={products} categories={categories} />
      </Container>
    </div>
  );
};

export default CategoryPage;
