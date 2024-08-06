import { Divider, Tabs } from "antd";
import React, { useEffect, useRef, useState } from "react";
import {
  ODER_STATUS_STRING,
  TRANSFER_PRICE,
  URL_IMAGE,
} from "../../../constants";
import AxiosClient from "../../../networks/AxiosClient";

export default function OderDetails() {
  const lstOdersRaw = useRef();
  const [lstOders, setLstOders] = useState();

  useEffect(() => {
    (async () => {
      const lstOders = await AxiosClient.post("/payment-orders/lst-orders");
      lstOdersRaw.current = lstOders?.data || [];
      filterOrderItemsByStatus(ODER_STATUS_STRING[0].value);
    })();
  }, []);
  const onChange = (status) => {
    filterOrderItemsByStatus(status);
  };

  const filterOrderItemsByStatus = (status) => {
    const orders = lstOdersRaw.current?.filter(
      (orders) => orders?.status === status
    );
    setLstOders(orders);
  };

  const items = ODER_STATUS_STRING.map((oders) => ({
    key: oders.value,
    label: oders.label,
    icon: oders.icon,
    children: (
      <div className="flex-1 space-y-8">
        {lstOders?.map((items) => (
          <>
            <div className="flex items-start gap-5">
              <div className="w-[120px] aspect-square flex-shrink-0">
                <img
                  src={URL_IMAGE(items?.path)}
                  className="object-cover w-full h-full rounded-xl"
                />
              </div>
              <div className="flex-1">
                <div className="flex items-start gap-4 mb-4">
                  <h1 className="flex-1 text-lg font-bold">{items?.name}</h1>
                  <h1 className="flex-shrink-0 text-lg font-bold">
                    {TRANSFER_PRICE(items?.amount)}
                  </h1>
                </div>
                {items?.priceDiscount === items?.price ? (
                  <h1 className="mb-2 text-xl">
                    <span>{items?.quanity} x </span>
                    {TRANSFER_PRICE(items?.price)}
                  </h1>
                ) : (
                  <div className="flex mb-2 space-x-4 items-center">
                    <h1 className="text-xl">
                      <span>{items?.quanity} x </span>
                      {TRANSFER_PRICE(items?.priceDiscount)}
                    </h1>
                    <h1 className="text-lg line-through">
                      {TRANSFER_PRICE(items?.price)}
                    </h1>
                  </div>
                )}
                <h1 className="mb-4 text-xl">
                  Size: <span>{items?.sizeName}</span>
                </h1>
              </div>
            </div>
            <Divider />
          </>
        ))}
      </div>
    ),
  }));

  console.log("lstOders", lstOders);

  return (
    <>
      <Tabs
        className="custom-order-details-tabs"
        items={items}
        onChange={onChange}
      />
    </>
  );
}
