import { Divider, Empty, Tabs } from "antd";
import React, { useEffect, useRef, useState } from "react";
import {
  ODER_STATUS,
  ODER_STATUS_STRING,
  TRANSFER_PRICE,
  URL_IMAGE,
} from "../../../constants";
import AxiosClient from "../../../networks/AxiosClient";

export default function OderDetails() {
  const [lstOders, setLstOders] = useState();
  const [orderStatus, setOrderStatus] = useState(ODER_STATUS.CHO_XAC_NHAN);

  useEffect(() => {
    (async () => {
      const lstOders = await AxiosClient.post("/orders/lst-orders", {
        status: orderStatus,
      });
      setLstOders(lstOders?.data || []);
    })();
  }, [orderStatus]);

  const onChange = (status) => {
    setOrderStatus(status);
  };

  const renderActionByOrderStatus = (orders) => {
    switch (orderStatus) {
      case ODER_STATUS.DA_GIAO:
        return (
          !orders?.isReview && (
            <button className="flex space-x-3 items-center px-4 py-2 rounded-lg border">
              <svg
                width="25px"
                height="25px"
                viewBox="0 0 24 25"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M8.89509 15.5629L15.1445 9.31348M7.47122 5.12563L7.07062 4.9469C5.46119 4.22887 3.81481 5.87526 4.53284 7.48468L4.71156 7.88529C5.16052 8.89161 4.67301 10.0686 3.64397 10.4627L3.23432 10.6196C1.58856 11.2499 1.58856 13.5782 3.23432 14.2085L3.64397 14.3654C4.67301 14.7595 5.16052 15.9365 4.71156 16.9428L4.53284 17.3434C3.81481 18.9529 5.46119 20.5993 7.07062 19.8812L7.47123 19.7025C8.47755 19.2535 9.65451 19.7411 10.0486 20.7701L10.2055 21.1797C10.8358 22.8255 13.1642 22.8255 13.7945 21.1797L13.9514 20.7701C14.3455 19.7411 15.5225 19.2535 16.5288 19.7025L16.9294 19.8812C18.5388 20.5993 20.1852 18.9529 19.4672 17.3434L19.2884 16.9428C18.8395 15.9365 19.327 14.7595 20.356 14.3654L20.7657 14.2085C22.4114 13.5782 22.4114 11.2499 20.7657 10.6196L20.356 10.4627C19.327 10.0686 18.8395 8.89161 19.2884 7.88529L19.4672 7.48468C20.1852 5.87525 18.5388 4.22887 16.9294 4.9469L16.5288 5.12563C15.5225 5.57459 14.3455 5.08707 13.9514 4.05803L13.7945 3.64838C13.1642 2.00262 10.8358 2.00262 10.2055 3.64838L10.0486 4.05803C9.65451 5.08707 8.47754 5.57459 7.47122 5.12563ZM10.781 9.82947C10.781 10.5845 10.1689 11.1965 9.41394 11.1965C8.65893 11.1965 8.04687 10.5845 8.04688 9.82947C8.04688 9.07446 8.65893 8.4624 9.41394 8.4624C10.1689 8.4624 10.781 9.07446 10.781 9.82947ZM15.9998 15.0487C15.9998 15.8037 15.3877 16.4158 14.6327 16.4158C13.8777 16.4158 13.2656 15.8037 13.2656 15.0487C13.2656 14.2937 13.8777 13.6816 14.6327 13.6816C15.3877 13.6816 15.9998 14.2937 15.9998 15.0487Z"
                  stroke="currentColor"
                  stroke-width="null"
                  stroke-linecap="round"
                  class="my-path"
                ></path>
              </svg>
              <span>Đánh giá</span>
            </button>
          )
        );
      default:
        return <></>;
    }
  };

  const items = ODER_STATUS_STRING.map((oders) => ({
    key: oders.value,
    label: oders.label,
    icon: oders.icon,
    children: (
      <div className="flex-1 space-y-8 mt-6">
        {Array.isArray(lstOders) && lstOders?.length > 0 ? (
          lstOders?.map((items) => (
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
              <div className="flex w-full justify-end">
                {renderActionByOrderStatus(items)}
              </div>
              <Divider />
            </>
          ))
        ) : (
          <div className="min-h-[40vh] flex justify-center items-center">
            <Empty description="Không có dữ liệu" />
          </div>
        )}
      </div>
    ),
  }));

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
