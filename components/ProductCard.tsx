import { Product } from "@/sanity.types";
import { urlFor } from "@/sanity/lib/image";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import ProductCardBar from "./ProductCardBar";

interface Props {
  product: Product;
}

const ProductCard = ({ product }: Props) => {
  return (
    <div className="border border-gray-300 rounded-lg overflow-hidden group text-sm">
      <div className="borde-b border-b-gray-300 overflow-hidden relative">
        {product.image && (
          <Link href={`/product/${product.slug?.current}`}>
            <Image
              src={urlFor(product.image).url()}
              alt="product image"
              width={500}
              height={500}
              loading="lazy"
              className={`w-full max-h-96 object-cover overflow-hidden transition-transform duration-500 ${product.stock !== 0 && "group-hover:scale-105"}`}
            />
          </Link>
        )}
        {product.stock === 0 && (
          <div className="absolute top-0 left-0 size-full bg-black/50 flex items-center justify-center">
            <p className="text-lg font-bold text-white">Out of Stock</p>
          </div>
        )}
        {product?.status && product.stock != 0 && (
          <div className="absolute left-1 top-1 z-10 flex flex-col items-center space-y-1 group-hover:opacity-0 transition-opacity duration-300">
            {product?.status.split("").map((char, index) => (
              <span className="font-semibold uppercase" key={index}>
                {char}
              </span>
            ))}
          </div>
        )}
        {product.stock !== 0 && (
          <div>
            <ProductCardBar />
          </div>
        )}
      </div>
      <div className="p-5">Description</div>
    </div>
  );
};

export default ProductCard;
