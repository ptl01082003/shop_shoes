import React, { useEffect, useState } from "react";
import AxiosClient from "../../networks/AxiosClient";
import { TRANSFER_PRICE, URL_IMAGE } from "../../constants";

export default function Shop() {
  const [lstProducts, setLstProducts] = useState([]);
  useEffect(() => {
    (async () => {
      const response = await AxiosClient.post("/products/lst-products");
      setLstProducts(response?.data || []);
    })();
  }, []);
  return (
    <>
      <div className="container flex mx-auto">
        <div className="w-[330px]"></div>
        <div className="grid flex-1 grid-cols-4 gap-x-4 gap-y-6">
          {lstProducts?.map((product) => (
            <div className="border-[2px] overflow-hidden border-[#F7F5F7] rounded-xl">
              <div className="w-full aspect-square bg-[#F7F5F7]">
                <img className="object-contain w-full h-full" src={URL_IMAGE(product?.gallery?.[0]?.path)} />
              </div>
              <div className="p-4">
                <h1 className="text-lg text-[#667085] mb-3">{product?.name}</h1>
                <h1 className="text-[#344054] font-bold mb-4">{TRANSFER_PRICE(product?.price)}</h1>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
