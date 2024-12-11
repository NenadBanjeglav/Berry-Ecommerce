"use client";

import Container from "@/components/Container";
import Loader from "@/components/Loader";
import NoAccessToCart from "@/components/NoAccessToCart";
import userCartStore from "@/store";
import { useAuth, useUser } from "@clerk/nextjs";
import React, { useEffect, useState } from "react";

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

  return (
    <div className="bg-gray-50 pb-10">
      {isSignedIn ? (
        <Container>
          {groupedItems.length ? <div>items</div> : <div>Empty Cart</div>}
        </Container>
      ) : (
        <NoAccessToCart />
      )}
    </div>
  );
};

export default CartPage;
