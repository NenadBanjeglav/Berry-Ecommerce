"use client";

import { Product } from "@/sanity.types";
import React, { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import QuantityButtons from "./QuantityButtons";
import PriceFormater from "./PriceFormater";
import userCartStore from "@/store";

interface Props {
  product: Product;
  className?: string;
}

const AddToCartButton = ({ product, className }: Props) => {
  const [isClient, setIsClient] = useState(false);
  const { addItem, getItemCount } = userCartStore();

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) return null;

  const itemCount = getItemCount(product._id);
  const isOutOfStock = product.stock === 0;

  const handleAddToCart = () => {
    addItem(product);
    toast.success(`${product.name?.substring(0, 12)}...added successfully!`);
  };

  return (
    <div>
      {itemCount ? (
        <div className="text-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs text-muted-foreground">Quantity</span>
            <QuantityButtons product={product} />
          </div>
          <div className="flex items-center justify-between border-t pt-1">
            <span>Subtotal</span>
            <PriceFormater
              amount={product.price ? product.price * itemCount : 0}
            />
          </div>
        </div>
      ) : (
        <Button
          onClick={handleAddToCart}
          disabled={isOutOfStock}
          className={cn(
            "bg-darkBlue/10 text-black border-darkBlue py-2 mt-2 border w-full rounded-md font-medium hover:bg-darkBlue hover:text-white hoverEffect disabled:hover:cursor-not-allowed disabled:bg-darkBlue/10 disabled:text-gray-400 disabled:border-darkBlue/10",
            className
          )}
        >
          Add to cart
        </Button>
      )}
    </div>
  );
};

export default AddToCartButton;
