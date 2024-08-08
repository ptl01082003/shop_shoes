import { yupResolver } from "@hookform/resolvers/yup";
import { Checkbox, Divider } from "antd";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import * as yup from "yup";
import Breadcrumbs from "../../components/pageProps/Breadcrumbs";
import { TRANSFER_PRICE, URL_IMAGE } from "../../constants";
import AxiosClient from "../../networks/AxiosClient";
import { changeCarts, selectCarts } from "../../redux/slices/cartsSlice";
import { useNavigate } from "react-router-dom";

const schema = yup
  .object({
    name: yup.string().required("Họ tên không được để trống"),
    address: yup
      .string()
      .min(10, "Địa chỉ tối thiểu 10 ký tự")
      .required("Địa chỉ không được để trống"),
    phone: yup
      .string()
      .matches(/^0\d{9}$/, "Số điện thoại gồm 10 chữ số, bắt đầu bằng số 0")
      .required("Số điện thoại không được để trống"),
  })
  .required();

const Oders = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const dispatch = useDispatch();
  const navigation = useNavigate();
  const selCarts = useSelector(selectCarts);
  const [provider, setProvider] = useState("MOMO");

  const createNewOders = async (params) => {
    const response = await AxiosClient.post("/payment-orders/create-order", {
      ...params,
      provider,
    });
    if (response?.code === 0) {
      if (response?.data) {
        window.location.replace(response.data);
      } else {
        dispatch(changeCarts({}));
        navigation("/payment?type=cash", { replace: true , });
      }
    } else {
    }
  };

  return (
    <div className="px-4 mx-auto max-w-container py-[3%]">
      <Breadcrumbs title="Cart" />
      <div className="grid grid-cols-3 gap-10">
        <div className="col-span-2 space-y-8">
          {selCarts.cartItems?.map((items) => (
            <>
              <div className="flex items-start gap-5">
                <div className="w-[160px] aspect-square flex-shrink-0">
                  <img
                    src={URL_IMAGE(items?.path)}
                    className="object-cover w-full h-full rounded-xl"
                  />
                </div>
                <div className="flex-1">
                  <div className="flex items-start gap-4 mb-4">
                    <h1 className="flex-1 text-xl font-bold">{items?.name}</h1>
                    <h1 className="flex-shrink-0 text-xl">
                      {TRANSFER_PRICE(items?.amount)}
                    </h1>
                  </div>{" "}
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
              <Divider />
            </>
          ))}
        </div>
        <form
          className="space-y-4"
          onSubmit={handleSubmit(createNewOders)}
          autoComplete="false"
        >
          <h1 className="text-lg font-bold text-center">Thông tin nhận hàng</h1>
          <div>
            <label className="block mb-2 text-sm text-gray-800">Họ tên</label>
            <div className="relative flex items-center">
              <input
                {...register("name")}
                type="text"
                placeholder="Nhập tại đây"
                className="w-full px-4 py-3 text-sm text-gray-800 border border-gray-300 rounded-lg outline-blue-600"
              />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-[18px] h-[18px] absolute right-4"
              >
                <path
                  fill-rule="evenodd"
                  d="M18.685 19.097A9.723 9.723 0 0 0 21.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 0 0 3.065 7.097A9.716 9.716 0 0 0 12 21.75a9.716 9.716 0 0 0 6.685-2.653Zm-12.54-1.285A7.486 7.486 0 0 1 12 15a7.486 7.486 0 0 1 5.855 2.812A8.224 8.224 0 0 1 12 20.25a8.224 8.224 0 0 1-5.855-2.438ZM15.75 9a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z"
                  clip-rule="evenodd"
                />
              </svg>
            </div>
            <p className="mt-2 text-sm italic text-red-600">
              {errors.name?.message}
            </p>
          </div>
          <div>
            <label className="block mb-2 text-sm text-gray-800">
              Số điện thoại
            </label>
            <div className="relative flex items-center">
              <input
                {...register("phone")}
                type="text"
                placeholder="Nhập tại đây"
                className="w-full px-4 py-3 text-sm text-gray-800 border border-gray-300 rounded-lg outline-blue-600"
              />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-[18px] h-[18px] absolute right-4"
              >
                <path d="M10.5 18.75a.75.75 0 0 0 0 1.5h3a.75.75 0 0 0 0-1.5h-3Z" />
                <path
                  fill-rule="evenodd"
                  d="M8.625.75A3.375 3.375 0 0 0 5.25 4.125v15.75a3.375 3.375 0 0 0 3.375 3.375h6.75a3.375 3.375 0 0 0 3.375-3.375V4.125A3.375 3.375 0 0 0 15.375.75h-6.75ZM7.5 4.125C7.5 3.504 8.004 3 8.625 3H9.75v.375c0 .621.504 1.125 1.125 1.125h2.25c.621 0 1.125-.504 1.125-1.125V3h1.125c.621 0 1.125.504 1.125 1.125v15.75c0 .621-.504 1.125-1.125 1.125h-6.75A1.125 1.125 0 0 1 7.5 19.875V4.125Z"
                  clip-rule="evenodd"
                />
              </svg>
            </div>
            <p className="mt-2 text-sm italic text-red-600">
              {errors.phone?.message}
            </p>
          </div>
          <div>
            <label className="block mb-2 text-sm text-gray-800">Email</label>
            <div className="relative flex items-center">
              <input
                {...register("address")}
                type="text"
                placeholder="Nhập tại đây"
                className="w-full px-4 py-3 text-sm text-gray-800 border border-gray-300 rounded-lg outline-blue-600"
              />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-[18px] h-[18px] absolute right-4"
              >
                <path
                  fill-rule="evenodd"
                  d="M6.912 3a3 3 0 0 0-2.868 2.118l-2.411 7.838a3 3 0 0 0-.133.882V18a3 3 0 0 0 3 3h15a3 3 0 0 0 3-3v-4.162c0-.299-.045-.596-.133-.882l-2.412-7.838A3 3 0 0 0 17.088 3H6.912Zm13.823 9.75-2.213-7.191A1.5 1.5 0 0 0 17.088 4.5H6.912a1.5 1.5 0 0 0-1.434 1.059L3.265 12.75H6.11a3 3 0 0 1 2.684 1.658l.256.513a1.5 1.5 0 0 0 1.342.829h3.218a1.5 1.5 0 0 0 1.342-.83l.256-.512a3 3 0 0 1 2.684-1.658h2.844Z"
                  clip-rule="evenodd"
                />
              </svg>
            </div>
            <p className="mt-2 text-sm italic text-red-600">
              {errors.address?.message}
            </p>
          </div>
          <Divider />
          <div>
            <h1 className="mb-4 text-lg italic">
              Lựa chọn hình thức thanh toán
            </h1>
            <div className="space-y-5">
              <div className="flex justify-between items-center">
                <div className="flex items-center space-x-4">
                  <div className="w-[38px]">
                    <img
                      className="w-full"
                      src="https://upload.wikimedia.org/wikipedia/vi/f/fe/MoMo_Logo.png"
                    />
                  </div>
                  <h1>QR Momo</h1>
                </div>
                <Checkbox
                  value={"MOMO"}
                  checked={provider === "MOMO"}
                  onChange={(e) => setProvider(e.target.value)}
                />
              </div>
              <div className="flex justify-between items-center">
                <div className="flex items-center space-x-4">
                  <div className="w-[38px]">
                    <img
                      className="w-full"
                      src="https://static.vecteezy.com/system/resources/previews/013/484/039/original/secure-payment-3d-icon-png.png"
                    />
                  </div>
                  <h1>Thanh toánnhận hàng</h1>
                </div>
                <Checkbox
                  value={"CASH"}
                  checked={provider === "CASH"}
                  onChange={(e) => setProvider(e.target.value)}
                />
              </div>
            </div>
            <Divider />
            <h3 className="mb-2 text-lg">
              Số lượng: <span>{selCarts?.totals}</span>
            </h3>
            <h3 className="text-2xl">
              Giá tiền: <span>{TRANSFER_PRICE(selCarts?.amount)}</span>{" "}
            </h3>
            <Divider />
            <button
              type="submit"
              className="w-[260px] px-5 py-3 rounded-full tex-center bg-[#3A4980] font-bold text-white"
            >
              THANH TOÁN NGAY
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Oders;
