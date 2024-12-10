import Container from "@/components/Container";
import ProductGrid from "@/components/ProductGrid";
import { searchProductsByName } from "@/sanity/helpers";
import React from "react";

interface Props {
  searchParams: {
    query: string;
  };
}

const SearchPage = async ({ searchParams }: Props) => {
  const { query } = await searchParams;
  const products = await searchProductsByName(query);

  if (!products?.length) {
    return (
      <div className="flex min-h-screen justify-center bg-gray-100 p-4">
        <div className="h-40 w-full rounded-lg bg-white p-8 text-center shadow-md md:max-w-4xl">
          <h1 className="mb-3 text-3xl font-bold">
            No Products found for <span className="text-darkBlue">{query}</span>
          </h1>
          <p className="text-gray-600">Try searching with different keywords</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-start bg-gray-100">
      <Container className="mt-3 rounded-lg bg-white p-8 shadow-md">
        <h1 className="mb-3 text-3xl font-bold">
          Search results for <span className="text-darkBlue">{query}</span>
        </h1>
        <ProductGrid products={products} />
      </Container>
    </div>
  );
};

export default SearchPage;
