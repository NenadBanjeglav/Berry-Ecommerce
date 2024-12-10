"use client";

import { Product } from "@/sanity.types";
import React from "react";
import { Button } from "./ui/button";
import { Minus, Plus } from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

interface Props {
  product: Product;
  className?: string;
  borderStyle?: string;
}

const QuantityButtons = ({ product, className, borderStyle }: Props) => {
  const handleRemoveProduct = () => {
    toast("Remove Clicked");
  };
  const handleAddProduct = () => {
    toast("Add Clicked");
  };
  const itemCount = 0;
  return (
    <div className={cn("flex items-center gap-1 pb-1 text-base", className)}>
      <Button
        variant="outline"
        size="icon"
        className="size-6"
        onClick={handleRemoveProduct}
      >
        <Minus />
      </Button>
      <span className="w-8 text-center font-semibold text-darkBlue">
        {itemCount}
      </span>
      <Button
        variant="outline"
        size="icon"
        className="size-6"
        onClick={handleAddProduct}
      >
        <Plus />
      </Button>
    </div>
  );
};

export default QuantityButtons;
