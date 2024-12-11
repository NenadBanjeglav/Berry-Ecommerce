"use client";

import Container from "@/components/Container";
import Loader from "@/components/Loader";
import NoAccessToCart from "@/components/NoAccessToCart";
import PriceFormater from "@/components/PriceFormater";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import userCartStore from "@/store";
import { useAuth, useUser } from "@clerk/nextjs";
import { ShoppingBag, Trash2 } from "lucide-react";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";

const CartPage = () => {
  const [isClient, setIsClient] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const {
    deleteCartProduct,
    getItemCount,
    getSubtotalPrice,
    getTotalPrice,
    resetCart,
    getGroupedItems,
  } = userCartStore();

  const { isSignedIn } = useAuth();
  const { user } = useUser();

  const groupedItems = getGroupedItems();

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return <Loader />;
  }

  const handleCheckout = () => {
    toast.success("Checkout will apply soon!");
  };

  return (
    <div className="bg-gray-50 pb-10">
      {isSignedIn ? (
        <Container>
          {groupedItems.length ? (
            <>
              <div className="flex items-center gap-2  py-5">
                <ShoppingBag className="size-6 text-primary" />
                <h1 className="text-2xl font-semibold"> Shopping Cart</h1>
              </div>
              <div className="grid lg:grid-cols-3 md:gap-8">
                <div className="col-span-1">
                  <div className="hidden md:inline-block w-full bg-white p-6 rounded-lg border">
                    <h2 className="text-xl font-semibold mb-4">
                      Order Summary
                    </h2>
                    <div className="space-y-2 w-full">
                      <div className="flex justify-between items-center">
                        <span>Price</span>
                        <PriceFormater amount={getTotalPrice()} />
                      </div>

                      <div className="flex place-items-center justify-between">
                        <span> Discount</span>
                        <PriceFormater
                          amount={getSubtotalPrice() - getTotalPrice()}
                        />
                      </div>
                      <Separator />
                      <div className="flex place-items-center justify-between">
                        <span> Total</span>
                        <PriceFormater amount={getSubtotalPrice()} />
                      </div>
                      <div className="flex flex-col gap-2">
                        <Button onClick={handleCheckout}>
                          Proceed to Checkout
                        </Button>
                        <Link
                          href="/"
                          className="text-center text-sm text-primary hover:underline hoverEffect"
                        >
                          Continue Shopping
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="lg:col-span-2">
                  <div className="grid grid-cols-5 md:grid-cols-6 border rounded-tr-lg rounded-tl-lg bg-white p-2.5 text-base font-semibold">
                    <h2 className="col-span-2 md:col-span-3">Product</h2>
                    <h2> Price</h2>
                    <h2>Quantity</h2>
                    <h2>Total</h2>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <div>Empty Cart</div>
          )}
        </Container>
      ) : (
        <NoAccessToCart />
      )}
    </div>
  );
};

export default CartPage;
