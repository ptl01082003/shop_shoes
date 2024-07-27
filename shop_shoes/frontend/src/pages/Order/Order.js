import { Button, Divider, InputNumber, Radio } from "antd";
import { motion } from "framer-motion";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { emptyCart } from "../../assets/images/index";
import Breadcrumbs from "../../components/pageProps/Breadcrumbs";
import { TRANSFER_PRICE, URL_IMAGE } from "../../constants";
import AxiosClient from "../../networks/AxiosClient";
import { selectCarts } from "../../redux/slices/cartsSlice";

const Oders = () => {
  const dispatch = useDispatch();
  const selCarts = useSelector(selectCarts);
  const createNewOders = async () => {
    const response = await AxiosClient.post("/payment-orders/create-order", {
      provider: "MOMO",
    });
    if (response.code === 0) {
      window.location.replace(response.data);
    } else {
    }
  };
  return (
    <div className="px-4 mx-auto max-w-container">
      <div className="grid grid-cols-2 gap-5">
        <div>
          <div className="space-y-10">
            {selCarts.cartItems?.map((items) => (
              <div className="flex items-start gap-5">
                <div className="w-[160px] aspect-square flex-shrink-0">
                  <img
                    src={URL_IMAGE(items?.path)}
                    className="object-cover w-full h-full rounded-xl"
                  />
                </div>
                <div>
                  <h1 className="mb-4 text-xl font-bold">{items?.name}</h1>
                  <h1 className="mb-4 text-xl">
                    Size: <span>{items?.sizeName}</span>
                  </h1>
                  <div className="flex items-center space-x-4">
                    <h1 className="mb-4 text-xl">
                      {TRANSFER_PRICE(items?.priceDiscount)}
                    </h1>
                    <h1 className="mb-4 text-xl">x {items?.quanity}</h1>
                  </div>
                  <h1 className="mb-5 italic">
                    Giá: <span> {TRANSFER_PRICE(items?.amount)}</span>
                  </h1>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div>
          <h1 className="mb-4 text-lg italic">Lựa chọn hình thức thanh toán</h1>
          <div className="flex items-center space-x-5">
            <div className="w-[60px]">
              <img
                className="w-full"
                src="https://cdn.haitrieu.com/wp-content/uploads/2022/10/Logo-MoMo-Circle.png"
              />
            </div>
            <h1>QR Momo</h1>
          </div>
          <Divider />
          <h3 className="mb-3 text-xl">
            Số lượng: <span>{selCarts?.totals}</span>
          </h3>
          <h3 className="text-2xl">
            Giá tiền: <span>{TRANSFER_PRICE(selCarts?.amount)}</span>{" "}
          </h3>
          <Divider />
          <button
            onClick={createNewOders}
            className="w-[260px] px-5 py-3 rounded-full tex-center bg-[#3A4980] font-bold text-white"
          >
            THANH TOÁN NGAY
          </button>
        </div>
      </div>
    </div>
  );
};

export default Oders;
