import AddToCartButton from "@/components/AddToCartButton";
import Container from "@/components/Container";
import PriceView from "@/components/PriceView";
import { getProductBySlug } from "@/sanity/helpers";
import { urlFor } from "@/sanity/lib/image";
import {
  CircleHelp,
  LayoutDashboard,
  LucideStar,
  Share2,
  Truck,
} from "lucide-react";
import Image from "next/image";
import React from "react";

const ProductPage = async ({
  params,
}: {
  params: Promise<{ slug: string }>;
}) => {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  return (
    <div>
      <Container className="flex flex-col gap-10 py-10 md:flex-row">
        {product?.image && (
          <div className="group h-auto w-full overflow-hidden rounded-md border border-darkBlue/20 shadow-md md:w-1/2">
            <Image
              src={urlFor(product.image).url()}
              alt="product image"
              width={700}
              height={700}
              className="hoverEffect max-h-[550px] w-full overflow-hidden rounded-md object-cover group-hover:scale-110"
            />
          </div>
        )}
        <div className="flex w-full flex-col gap-5 md:w-1/2">
          <div>
            <p className="mb-2 text-4xl font-bold">{product?.name}</p>
            <div className="flex items-center gap-2">
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
              <p className="text-sm font-medium text-gray-500">{`(25 reviews)`}</p>
            </div>
          </div>
          <PriceView
            price={product?.price}
            discount={product?.discount}
            label={product?.label}
            className="text-lg font-bold"
          />
          {product?.stock && (
            <p className="w-24 rounded-lg bg-green-100 py-2.5 text-center text-sm font-semibold text-green-600">
              In Stock
            </p>
          )}
          <p className="text-base text-gray-800">
            <span className="mr-2 rounded-md bg-black px-3 py-1 text-sm text-white">
              20
            </span>{" "}
            People are viewing this right now
          </p>
          <p className="text-sm tracking-wide text-gray-600">
            {product?.description}
          </p>
          {product && <AddToCartButton product={product} />}
          <div className="-mt-2 flex flex-wrap items-center justify-between gap-2.5 border-b border-b-gray-200 py-5">
            <div className="hoverEffect flex items-center gap-2 text-sm text-black hover:text-red-600">
              <LayoutDashboard className="text-lg" />
              <p>Compare color</p>
            </div>
            <div className="hoverEffect flex items-center gap-2 text-sm text-black hover:text-red-600">
              <CircleHelp className="text-lg" />
              <p>Ask a question</p>
            </div>
            <div className="hoverEffect flex items-center gap-2 text-sm text-black hover:text-red-600">
              <Truck className="text-lg" />
              <p>Delivery & Return</p>
            </div>
            <div className="hoverEffect flex items-center gap-2 text-sm text-black hover:text-red-600">
              <Share2 className="text-lg" />
              <p>Share</p>
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-5">
            <div className="hoverEffect rounded-md border border-darkBlue/20 p-3 text-center hover:border-darkBlue">
              <p className="text-base font-semibold text-black">
                Free Shipping
              </p>
              <p className="text-sm text-gray-500">
                Free shipping over order 120$
              </p>
            </div>
            <div className="hoverEffect rounded-md border border-darkBlue/20 p-3 text-center hover:border-darkBlue">
              <p className="text-base font-semibold text-black">
                Flexible Payment
              </p>
              <p className="text-sm text-gray-500">
                Pay with Multiple Credit Cards
              </p>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default ProductPage;
