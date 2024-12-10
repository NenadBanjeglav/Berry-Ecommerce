import { Product } from "@/sanity.types";
import { urlFor } from "@/sanity/lib/image";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import ProductCardBar from "./ProductCardBar";
import { LucideStar } from "lucide-react";
import PriceView from "./PriceView";
import AddToCartButton from "./AddToCartButton";

interface Props {
  product: Product;
}

const ProductCard = ({ product }: Props) => {
  return (
    <div className="group overflow-hidden rounded-lg border border-gray-300 text-sm">
      <div className="relative overflow-hidden border-b border-b-gray-300">
        {product.image && (
          <Link href={`/product/${product.slug?.current}`}>
            <Image
              src={urlFor(product.image).url()}
              alt="product image"
              width={500}
              height={500}
              loading="lazy"
              className={`max-h-96 w-full overflow-hidden object-cover transition-transform duration-500 ${product.stock !== 0 && "group-hover:scale-105"}`}
            />
          </Link>
        )}
        {product.stock === 0 && (
          <div className="absolute left-0 top-0 flex size-full items-center justify-center bg-black/50">
            <p className="text-lg font-bold text-white">Out of Stock</p>
          </div>
        )}
        {product?.status && product.stock !== 0 && (
          <div className="absolute left-1 top-1 z-10 flex flex-col items-center space-y-1 transition-opacity duration-300 group-hover:opacity-0">
            {product?.status.split("").map((char, index) => (
              <span className="font-semibold uppercase" key={index}>
                {char}
              </span>
            ))}
          </div>
        )}
        {product.stock !== 0 && (
          <div className="hoverEffect absolute bottom-0 left-0 w-full translate-y-12 group-hover:-translate-y-4">
            <ProductCardBar />
          </div>
        )}
      </div>
      <div className="flex flex-col gap-2 p-5">
        <div className="flex items-center justify-between">
          <p className="font-medium text-gray-500">Snacks</p>
          <div className="flex items-center gap-1 text-gray-500">
            {Array.from({ length: 5 }).map((_, index) => {
              const isLastStar = index === 4;
              return (
                <LucideStar
                  key={index}
                  size={16}
                  fill={!isLastStar ? "#fca99b" : "transparent"}
                  className={`${isLastStar ? "text-gray-500" : "text-lightOrange"}`}
                />
              );
            })}
          </div>
        </div>
        <p className="line-clamp-1 text-base font-semibold capitalize tracking-wide text-gray-600">
          {product.name}
        </p>
        <PriceView
          price={product.price}
          discount={product.discount}
          label={product.label}
        />
        <AddToCartButton product={product} />
      </div>
    </div>
  );
};

export default ProductCard;
