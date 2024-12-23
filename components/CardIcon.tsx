"use client";

import userCartStore from "@/store";
import { ShoppingCart } from "lucide-react";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const CartIcon = () => {
  const [isClient, setIsClient] = useState(false);

  const itemCount = userCartStore((state) =>
    state.items.reduce((total, item) => total + item.quantity, 0)
  );

  useEffect(() => {
    setIsClient(true);
  }, []);
  if (!isClient) return null;

  return (
    <Link
      href="/cart"
      className="flex  items-center text-xs md:text-sm md:gap-2 gap-1 border border-gray-200 px-2 py-1 rounded-md shadow-md hover:shadow-none hoverEffect"
    >
      <ShoppingCart className="text-darkBlue md:size-6 size-5" />
      <div className="flex flex-col">
        <p className="text-xs">
          <span className="font-semibold">{itemCount}</span> items
        </p>
        <p className="font-semibold hidden md:block">Cart</p>
      </div>
    </Link>
  );
};

export default CartIcon;
