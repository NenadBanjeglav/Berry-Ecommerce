import { cn } from "@/lib/utils";
import React from "react";

interface Props {
  amount: number | undefined;
  className?: string;
}

const PriceFormater = ({ amount, className }: Props) => {
  // eslint-disable-next-line no-new-wrappers
  const formattedPrice = new Number(amount).toLocaleString("en-US", {
    currency: "USD",
    style: "currency",
    minimumFractionDigits: 2,
  });
  return (
    <span className={cn("text-sm font-semibold text-darkText", className)}>
      {formattedPrice}
    </span>
  );
};

export default PriceFormater;
