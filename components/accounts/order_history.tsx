// components/accounts/order_history.tsx
"use client";
import React, { useEffect, useState } from "react";
import { useUser } from "@/context/userContext";
import Loading from "@/components/ui/Loading";
import * as ScrollArea from "@radix-ui/react-scroll-area";

export default function OrderHistory() {
  const [loading, setLoading] = useState(true);
  const { user } = useUser();

  const [orders, setOrders] = useState<any[]>([]);
  const [selectedOrder, setSelectedOrder] = useState<any | null>(null);

  useEffect(() => {
    if (!user?.userId) return;

    let ignore = false;
    async function fetchOrders() {
      try {
        setLoading(true);
        const res = await fetch(`/api/order-history?userId=${user?.userId}`);
        const text = await res.text();

        if (!text || ignore) return;

        const data = JSON.parse(text);
        setOrders(data.orders || []);
      } catch (error) {
        console.error("Failed to fetch orders:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchOrders();
    return () => {
      ignore = true;
    };
  }, [user?.userId]);

  const handleOrderClick = (order: any) => {
    setSelectedOrder(order);
  };

  return (
    <>
      <div className="">
        <h3 className="text-xl sm:text-2xl font-bold mb-5 sm:mb-6">
          Order History
        </h3>

        {loading ? (
          <Loading />
        ) : (
          <div className="flex gap-8 items-start">
            {!selectedOrder && (
              <div className="flex-1 bg-background rounded-lg shadow p-6 border border-border">
                <table className="w-full table-fixed">
                  <thead className="bg-gray-100 sticky top-0 z-10">
                    <tr className="text-left">
                      <th className="py-2 px-3 sm:w-[200px] lg:w-[250px]">
                        Ref. No.
                      </th>
                      <th className="py-2 px-3 w-[100px]">Date</th>
                      <th className="py-2 px-3 w-[100px]">Status</th>
                      <th className="pl-2 px-3 pr-8 w-[100px] text-right">
                        Total
                      </th>
                      <th className="pl-2 px-3 pr-8 w-[60px] text-right">
                        Action
                      </th>
                    </tr>
                  </thead>
                </table>

                <ScrollArea.Root
                  type="always"
                  className="w-full h-auto max-h-[400px] overflow-y-auto"
                >
                  <ScrollArea.Viewport className="w-full">
                    <table className="w-full table-fixed">
                      <tbody>
                        {Array.isArray(orders) &&
                          orders.map((order: any) => (
                            <tr
                              key={order.order_id}
                              className="border-b border-border last:border-none"
                            >
                              <td className="py-4 px-3 sm:w-[200px] lg:w-[250px] font-medium text-[14px]">
                                <span
                                  className="font-medium text-[14px] align-middle cursor-pointer hover:underline hover:text-blue-600"
                                  onClick={() => handleOrderClick(order)}
                                >
                                  {order.payment_reference}
                                </span>
                              </td>
                              <td className="pr-8 w-[100px]">
                                {order.order_date
                                  ? new Date(
                                      order.order_date
                                    ).toLocaleDateString("en-GB", {
                                      day: "numeric",
                                      month: "long",
                                      year: "numeric",
                                    })
                                  : ""}
                              </td>
                              <td className="pr-8 w-[100px]">
                                <span
                                  className={
                                    order.status === "completed"
                                      ? "text-green-600 font-medium"
                                      : order.status === "pending"
                                      ? "text-blue-600 font-medium"
                                      : order.status === "canceled"
                                      ? "text-red-600 font-medium"
                                      : "text-gray-600 font-medium"
                                  }
                                >
                                  {order.status
                                    ? order.status.charAt(0).toUpperCase() +
                                      order.status.slice(1)
                                    : ""}
                                </span>
                              </td>
                              <td className="pr-8 w-[100px] text-right">
                                ${order.total_amount || "0.00"}
                                {/* ?.toFixed(2) */}
                              </td>
                              <td className="pr-8 items-center w-[60px] text-right">
                                <span
                                  className="font-medium text-[14px] align-middle cursor-pointer hover:underline text-blue-600 "
                                  onClick={() => handleOrderClick(order)}
                                >
                                  Detail
                                </span>
                              </td>
                            </tr>
                          ))}
                      </tbody>
                    </table>
                  </ScrollArea.Viewport>
                  <ScrollArea.Scrollbar
                    orientation="vertical"
                    className="flex select-none touch-none p-0.5 rounded w-2"
                  >
                    <ScrollArea.Thumb className="flex-1 bg-gray-400 rounded-full" />
                  </ScrollArea.Scrollbar>
                  <ScrollArea.Corner />
                </ScrollArea.Root>
              </div>
            )}
          </div>
        )}

        {/* Selected Order Details */}
        {selectedOrder && (
          <div className="w-full lg:w-1/2 border border-border rounded-lg p-6 shadow bg-white">
            <h3 className="text-lg font-semibold mb-4">Order Details</h3>
            <div className="mb-2">
              <strong>Order Ref:</strong> {selectedOrder.payment_reference}
            </div>
            <div className="mb-2">
              <strong>Date:</strong> {selectedOrder.order_date}
            </div>
            <div className="mb-2">
              <strong>Status:</strong> {selectedOrder.status}
            </div>
            <div className="mb-2">
              <strong>Total Amount:</strong> ${selectedOrder.total_amount}
            </div>
            <button
              className="mt-4 text-sm text-blue-600 underline"
              onClick={() => setSelectedOrder(null)}
            >
              {" "}
              ← Back to Order List
            </button>
          </div>
        )}
      </div>
    </>
  );
}
