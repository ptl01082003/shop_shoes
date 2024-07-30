import React, { useEffect, useState } from "react";
import AxiosClient from "../../networks/AxiosClient";
import { TRANSFER_PRICE, URL_IMAGE } from "../../constants";
import { useNavigate } from "react-router-dom";
import { Divider } from "antd";
export default function Shop() {
  const navigation = useNavigate();
  const [lstProducts, setLstProducts] = useState();
  const [lstFilterRaw, setFilterRaw] = useState({});
  const [filterParams, setFilterParams] = useState({});
  const [isFetchLstProducts, setFetchLstProducts] = useState(false);

  const goToProductDetails = (products) => {
    navigation(`/product/${products?.code}`);
  };

  useEffect(() => {
    (async () => {
      setFetchLstProducts(true);
      const products = await AxiosClient.post(
        "/products/lst-products",
        filterParams
      );
      setTimeout(() => {
        setFetchLstProducts(false);
        setLstProducts(products?.data || []);
      }, 250);
    })();
  }, [filterParams]);

  useEffect(() => {
    (async () => {
      const brands = AxiosClient.post("/brands");
      const styles = AxiosClient.post("/styles");
      const sizes = AxiosClient.post("/sizes");

      Promise.all([brands, styles, sizes]).then((data) => {
        setFilterRaw({
          brands: data[0]?.data || [],
          styles: data[1]?.data || [],
          sizes: data[2]?.data || [],
        });
      });
    })();
  }, []);

  return (
    <>
      <div className="container flex mx-auto my-10 px-5 gap-6">
        <div className="w-[350px]">
          <h1 className="mb-3 italic font-bold">Thương hiệu</h1>
          <div className="flex flex-wrap gap-3">
            {lstFilterRaw?.brands?.map((brands) => (
              <div
                onClick={() => {
                  setFilterParams((previous) => ({
                    ...previous,
                    brandId: brands?.brandId,
                  }));
                }}
                className="px-3 py-2 text-sm border rounded-xl cursor-pointer"
              >
                {brands?.name}
              </div>
            ))}
          </div>

          <Divider />
        </div>
        {isFetchLstProducts ? (
          <div className="grid flex-1 grid-cols-4 gap-x-4 gap-y-6">
            {Array.from(new Array(8)).map((_) => (
              <ProductBoxSkeleton />
            ))}
          </div>
        ) : Array.isArray(lstProducts) && lstProducts?.length != 0 ? (
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
                  <h1 className="text-[#344054] mb-1">
                    <span className=""> {product?.brand?.name}</span>
                  </h1>
                  <h1 className="text-[#344054]">
                    Mã sản phẩm:
                    <span className=""> {product?.code}</span>
                  </h1>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center w-full">
            <iframe
              width={400}
              height={400}
              src="https://lottie.host/embed/0f13753a-e76b-43ec-8d9d-81938b202733/IxEkFyWkxz.json"
            />
            <h1 className="italic font-bold text-xl mt-4">Không tìm thấy sản phẩm</h1>
          </div>
        )}
      </div>
    </>
  );
}

const ProductBoxSkeleton = () => (
  <div className="border-[2px] overflow-hidden border-[#F7F5F7] rounded-xl cursor-pointer">
    <div className="w-full aspect-square bg-[#F7F5F7] box-skeleton"></div>
    <div className="p-4">
      <h1 className="text-lg text-[#667085] mb-3 line-clamp-2 min-h-[3.5rem] box-skeleton rounded-lg"></h1>
      <h1 className="text-[#344054] font-bold mb-4 min-h-[1.5rem] box-skeleton rounded-lg"></h1>
      <h1 className="text-[#344054] mb-1 min-h-[1.5rem] box-skeleton rounded-lg"></h1>
      <h1 className="text-[#344054] min-h-[1.5rem] box-skeleton rounded-lg"></h1>
    </div>
  </div>
);
