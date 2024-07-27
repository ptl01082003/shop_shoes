import Slider from "react-slick";
import { useNavigate, useParams } from "react-router-dom";
import React, { useEffect, useRef, useState } from "react";
import AxiosClient from "../../networks/AxiosClient";
import { URL_IMAGE, TRANSFER_PRICE, PATH_ROUTER } from "../../constants";
import { Divider, InputNumber, Tabs } from "antd";
import clsx from "clsx";
import { useDispatch, useSelector } from "react-redux";
import { selectUserInfo } from "../../redux/slices/usersSlice";

export default function ProductDetails() {
  const dispatch = useDispatch();
  const navigation = useNavigate();
  const selUserInfo = useSelector(selectUserInfo);

  let sliderRef2 = useRef(null);
  let sliderRef1 = useRef(null);
  const [nav1, setNav1] = useState(null);
  const [nav2, setNav2] = useState(null);

  const { code } = useParams();
  const [products, setProducts] = useState({});
  const [counterSize, setCounterSize] = useState(1);
  const [currentSize, setCurrentSize] = useState();

  useEffect(() => {
    (async () => {
      const response = await AxiosClient.post("/products/product-details", {
        code,
      });
      setCurrentSize(response?.data?.sizes?.[0] || {});
      setProducts(response?.data || {});
    })();
  }, []);

  useEffect(() => {
    setNav1(sliderRef1);
    setNav2(sliderRef2);
  }, []);

  const selectSize = (size) => {
    setCurrentSize(size);
  };

  const addProductsToCart = (products) => {
    if (selUserInfo) {
      alert("them");
    } else {
      navigation(PATH_ROUTER.SIGN_IN);
    }
  };

  return (
    <div className="container mx-auto">
      <div className="flex">
        <div className="w-[550px]">
          <Slider
            arrows={false}
            asNavFor={nav2}
            ref={(slider) => (sliderRef1 = slider)}
          >
            {products?.gallery?.map((images) => (
              <div className="aspect-square w-full overflow-hidden rounded-xl">
                <img
                  src={URL_IMAGE(images?.path)}
                  className="w-full h-full object-cover rounded-xl transition-all duration-200 ease-out hover:scale-150"
                />
              </div>
            ))}
          </Slider>
          <div className="">
            <Slider
              asNavFor={nav1}
              ref={(slider) => (sliderRef2 = slider)}
              slidesToShow={4}
              swipeToSlide={true}
              arrows={true}
              focusOnSelect={true}
            >
              {products?.gallery?.map((images) => (
                <div className="aspect-square w-full overflow-hidden rounded-xl">
                  <img
                    src={URL_IMAGE(images?.path)}
                    className="w-full h-full object-cover rounded-xl transition-all duration-200 ease-out hover:scale-150"
                  />
                </div>
              ))}
            </Slider>
          </div>
        </div>
        <div class="flex-1">
          <h1 className="mb-3 text-4xl font-bold">
            <span>{products?.name}</span>
          </h1>
          <h3 className="text-lg">
            Giá: <span>{TRANSFER_PRICE(products?.price)}</span>
          </h3>
          <Divider />
          <h3>Chọn sizes:</h3>
          <div className="flex flex-wrap gap-4 mb-5">
            {products?.sizes?.map((size) => (
              <div
                key={size?.sizeId}
                onClick={() => {
                  setCounterSize(1);
                  selectSize(size);
                }}
                className={clsx(
                  "px-4 py-3 cursor-pointer rounded-lg  text-center w-[85px]",
                  {
                    "bg-[#cad7fb]": currentSize?.sizeId == size?.sizeId,
                    "bg-[#F3F3F3]": currentSize?.sizeId != size?.sizeId,
                  }
                )}
              >
                <h3
                  className={clsx("text-lg font-bold", {
                    "text-[#3A4980]": currentSize?.sizeId == size?.sizeId,
                    "text-[#726C6C]": currentSize?.sizeId != size?.sizeId,
                  })}
                >
                  {size?.sizes?.name}
                </h3>
              </div>
            ))}
          </div>
          <h3 className="italic">
            Kho: <span>{currentSize?.quantity}</span>
          </h3>
          <Divider />
          <div className="flex items-center gap-5">
            <InputNumber
              min={1}
              className=""
              defaultValue={1}
              value={counterSize}
              max={currentSize?.quantity}
              onChange={(e) => setCounterSize(e)}
            />
            <button
              onClick={addProductsToCart}
              className="w-[330px] px-5 py-3 rounded-full tex-center bg-[#3A4980] font-bold text-white"
            >
              THÊM VÀO GIỎ HÀNG
            </button>
          </div>
        </div>
      </div>
      <Tabs
        defaultActiveKey="1"
        items={[
          {
            key: "1",
            label: "Mô tả",
            children: (
              <div
                dangerouslySetInnerHTML={{ __html: products?.description }}
              />
            ),
          },
          {
            key: "2",
            label: "Đánh giá",
            children: "Content of Tab Pane 2",
          },
        ]}
      />
    </div>
  );
}
