import React, { useEffect, useState } from "react";
import AxiosClient from "../../networks/AxiosClient";
import { TRANSFER_PRICE, URL_IMAGE } from "../../constants";
import { useNavigate } from "react-router-dom";

export default function Shop() {
  const navigation = useNavigate();
  const [lstProducts, setLstProducts] = useState([]);

  const goToProductDetails = (products) => {
    navigation(`/product/${products?.code}`);
  };

  useEffect(() => {
    (async () => {
      const response = await AxiosClient.post("/products/lst-products");
      setLstProducts(response?.data || []);
    })();
  }, []);
  
  return (
    <>
      <div className="container flex mx-auto my-10">
        <div className="w-[350px]"></div>
        <div className="grid flex-1 grid-cols-4 gap-x-4 gap-y-6">
          {lstProducts?.map((product) => (
            <div
              key={product?.code}
              onClick={() => {
                goToProductDetails(product);
              }}
              className="border-[2px] overflow-hidden border-[#F7F5F7] rounded-xl cursor-pointer"
            >
              <div className="w-full aspect-square bg-[#F7F5F7]">
                <img
                  className="object-contain w-full h-full"
                  src={URL_IMAGE(product?.gallery?.[0]?.path)}
                />
              </div>
              <div className="p-4">
                <h1 className="text-lg text-[#667085] mb-3 line-clamp-2 min-h-[3.5rem]">
                  {product?.name}
                </h1>
                <h1 className="text-[#344054] font-bold mb-4">
                  {TRANSFER_PRICE(product?.price)}
                </h1>
                <h1 className="text-[#344054]">
                  Mã sản phẩm:{" "}
                  <span className="font-bold">{product?.code}</span>
                </h1>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
