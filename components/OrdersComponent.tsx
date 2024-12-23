"use client";

import { MY_ORDERS_QUERYResult } from "@/sanity.types";
import React, { useState } from "react";
import { TableBody, TableCell, TableRow } from "./ui/table";
import { Tooltip, TooltipContent, TooltipProvider } from "./ui/tooltip";
import { TooltipTrigger } from "@radix-ui/react-tooltip";
import PriceFormater from "./PriceFormater";
import OrderDetailsDialog from "./OrderDetailsDialog";

const OrdersComponent = ({ orders }: { orders: MY_ORDERS_QUERYResult }) => {
  const [selectedOrder, setSelectedOrder] = useState<
    MY_ORDERS_QUERYResult[number] | null
  >(null);

  const handleOrderClicked = (order: MY_ORDERS_QUERYResult[number]) => {
    setSelectedOrder(order);
  };

  return (
    <>
      <TableBody>
        <TooltipProvider>
          {orders.map((order) => (
            <Tooltip key={order.orderNumber}>
              <TooltipTrigger asChild>
                <TableRow
                  onClick={() => handleOrderClicked(order)}
                  className="cursor-pointer hover:bg-gray-100 h-12"
                >
                  <TableCell className="font-medium">
                    ...{order.orderNumber?.slice(-10) ?? "N/A"}
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    {order._createdAt &&
                      new Date(order._createdAt).toLocaleDateString()}
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    {order.customerName}
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    {order.email}
                  </TableCell>
                  <TableCell>
                    <PriceFormater
                      amount={order.discountedPrice}
                      className="text-black font-medium"
                    />
                  </TableCell>
                  <TableCell>
                    <span
                      className={`capitalize px-2 py-1 rounded-full text-xs font-semibold ${order.status === "confirmed" ? "bg-green-100 text-green-600" : "bg-yellow-100 text-yellow-800"}`}
                    >
                      {order.status}
                    </span>
                  </TableCell>
                </TableRow>
              </TooltipTrigger>
              <TooltipContent>
                <p>Click to see order details</p>
              </TooltipContent>
            </Tooltip>
          ))}
        </TooltipProvider>
      </TableBody>
      <OrderDetailsDialog
        order={selectedOrder}
        isOpen={!!selectedOrder}
        onClose={() => setSelectedOrder(null)}
      />
    </>
  );
};

export default OrdersComponent;
