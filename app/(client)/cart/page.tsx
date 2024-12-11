"use client";

import Container from "@/components/Container";
import EmptyCart from "@/components/EmptyCart";
import Loader from "@/components/Loader";
import NoAccessToCart from "@/components/NoAccessToCart";
import PriceFormater from "@/components/PriceFormater";
import QuantityButtons from "@/components/QuantityButtons";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { urlFor } from "@/sanity/lib/image";
import userCartStore from "@/store";
import { useAuth, useUser } from "@clerk/nextjs";
import { ShoppingBag, Trash2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import OrderForm from "@/components/OrderForm";

const CartPage = () => {
  const { user } = useUser();
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

  const groupedItems = getGroupedItems();

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return <Loader />;
  }

  const handleDeleteProduct = (id: string) => {
    deleteCartProduct(id);
    toast.success("Product deleted successfully!");
  };

  const handleResetCart = () => {
    const confirmed = window.confirm(
      `Are you sure you want to reset your Cart?`
    );
    if (confirmed) {
      resetCart();
      toast.success("Cart successfully reseted!");
    }
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
              <div className="grid lg:grid-cols-3 md:gap-8 pb-40">
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
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button className="w-full" size="lg">
                              Proceed to Checkout
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="max-h-[90vh] overflow-y-auto">
                            <DialogHeader>
                              <DialogTitle>Buyer Details</DialogTitle>
                              <DialogDescription className="sr-only" />
                            </DialogHeader>
                            <OrderForm user={user || undefined} />
                          </DialogContent>
                        </Dialog>
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
                  <div className="bg-white border border-t-0 rounded-br-lg rounded-bl-lg">
                    {groupedItems.map(({ product }) => {
                      const itemCount = getItemCount(product._id);
                      return (
                        <div
                          key={product._id}
                          className="grid grid-cols-5 md:grid-cols-6 border-b p-2.5 last:border-b-0"
                        >
                          <div className="col-span-2 md:col-span-3 flex items-center">
                            <Trash2
                              onClick={() => handleDeleteProduct(product._id)}
                              className="size-4 md:size-5 mr-1 text-gray-500 hover:text-red-600 hoverText cursor-pointer"
                            />
                            {product.image && (
                              <Link
                                href={`/product/${product.slug?.current}`}
                                className="border p-0.5 md:p-1 mr-2 rounded-md overflow-hidden group"
                              >
                                <Image
                                  src={urlFor(product.image).url()}
                                  alt="product image"
                                  width={300}
                                  height={300}
                                  className="size-10 md:w-full md:h-14 object-cover group-hover:scale-105 overflow-hidden hoverEffect"
                                />
                              </Link>
                            )}
                            <h2 className="text-sm">{product.name}</h2>
                          </div>
                          <div className="flex items-center">
                            <PriceFormater amount={product.price} />
                          </div>
                          <QuantityButtons
                            product={product}
                            className="text-sm gap-0 md:gap-1"
                          />
                          <div className="flex items-center">
                            <PriceFormater
                              amount={
                                product.price ? product.price * itemCount : 0
                              }
                            />
                          </div>
                        </div>
                      );
                    })}
                    <Button
                      onClick={handleResetCart}
                      variant="destructive"
                      className="m-5 font-semibold"
                    >
                      Reset Cart
                    </Button>
                  </div>
                </div>
              </div>
              <div className="md:hidden fixed bottom-0 left-0 w-full bg-lightBg">
                <div className="bg-white p-4 rounded-lg border mx-4">
                  <h2 className="text-lg font-semibold mb-2">Order Summary</h2>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Price</span>
                      <PriceFormater amount={getTotalPrice()} />
                    </div>
                    <div className="flex justify-between">
                      <span>Discount</span>
                      <PriceFormater
                        amount={getSubtotalPrice() - getTotalPrice()}
                      />
                    </div>
                    <Separator />
                    <div className="flex justify-between">
                      <span>Total</span>
                      <PriceFormater amount={getSubtotalPrice()} />
                    </div>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button className="w-full" size="lg">
                          Proceed to Checkout
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-h-[90vh] overflow-y-auto">
                        <DialogHeader>
                          <DialogTitle>Buyer Details</DialogTitle>
                          <DialogDescription className="sr-only" />
                        </DialogHeader>
                        <OrderForm user={user || undefined} />
                      </DialogContent>
                    </Dialog>

                    <Link
                      href="/"
                      className="block text-center text-sm text-primary hover:underline"
                    >
                      Continue Shopping
                    </Link>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <EmptyCart />
          )}
        </Container>
      ) : (
        <NoAccessToCart />
      )}
    </div>
  );
};

export default CartPage;
