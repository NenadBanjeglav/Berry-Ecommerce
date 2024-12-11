import { sanityFetch } from "../lib/live";
import {
  CATEGORIES_QUERY,
  PRODUCT_BY_CATEGORY_QUERY,
  PRODUCT_BY_SLUG,
  PRODUCT_SEARCH_QUERY,
  PRODUCTS_QUERY,
  SALE_QUERY,
} from "./queries";

export const getSale = async () => {
  try {
    const sales = await sanityFetch({
      query: SALE_QUERY,
    });
    return sales.data || [];
  } catch (error) {
    console.error("Error fetching Sale data:", error);
    return [];
  }
};

export const getProducts = async (
  category = "",
  sortField = "price",
  sortOrder = "desc"
) => {
  try {
    let dynamicQuery = `*[_type == "product"`;

    // Add category filter if provided
    if (category) {
      dynamicQuery += ` && category->name == "${category}"`;
    }

    // Close the filter section and add sorting
    dynamicQuery += `] | order(${sortField} ${sortOrder})`;

    const products = await sanityFetch({
      query: dynamicQuery,
    });

    return products.data || [];
  } catch (error) {
    console.error("Error fetching Products data:", error);
    return [];
  }
};

export const getAllProducts = async () => {
  try {
    const products = await sanityFetch({
      query: PRODUCTS_QUERY,
    });
    return products.data || [];
  } catch (error) {
    console.error("Error fetching Products data:", error);
    return [];
  }
};

export const getAllCategories = async () => {
  try {
    const categories = await sanityFetch({
      query: CATEGORIES_QUERY,
    });
    return categories.data || [];
  } catch (error) {
    console.error("Error fetching Categories data:", error);
    return [];
  }
};

export const getProductBySlug = async (slug: string) => {
  try {
    const product = await sanityFetch({
      query: PRODUCT_BY_SLUG,
      params: {
        slug,
      },
    });
    return product.data || null;
  } catch (error) {
    console.error("Error fetching Product data:", error);
    return null;
  }
};

export const searchProductsByName = async (searchParam: string) => {
  try {
    const products = await sanityFetch({
      query: PRODUCT_SEARCH_QUERY,
      params: {
        searchParam,
      },
    });

    return products?.data || [];
  } catch (error) {
    console.error("Fetching product by name error", error);
    return [];
  }
};

export const getProductsByCategory = async (categorySlug: string) => {
  try {
    const products = await sanityFetch({
      query: PRODUCT_BY_CATEGORY_QUERY,
      params: {
        categorySlug,
      },
    });

    return products?.data || [];
  } catch (error) {
    console.error("Fetching product by category error", error);
    return [];
  }
};
