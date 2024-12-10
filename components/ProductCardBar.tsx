import { ArrowLeftRight, Eye, Heart, ShoppingBag } from "lucide-react";
import React from "react";

const ProductCardBar = () => {
  return (
    <div className="flex items-center justify-center gap-2.5 text-lg text-gray-500">
      <div className="hoverEffect rounded-xl border bg-white p-2 shadow-md hover:bg-darkBlue hover:text-white">
        <Heart />
      </div>
      <div className="hoverEffect rounded-xl border bg-white p-2 shadow-md hover:bg-darkBlue hover:text-white">
        <Eye />
      </div>
      <div className="hoverEffect rounded-xl border bg-white p-2 shadow-md hover:bg-darkBlue hover:text-white">
        <ArrowLeftRight />
      </div>
      <div className="hoverEffect rounded-xl border bg-white p-2 shadow-md hover:bg-darkBlue hover:text-white">
        <ShoppingBag />
      </div>
    </div>
  );
};

export default ProductCardBar;
