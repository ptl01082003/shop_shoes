import { Divider, InputNumber } from "antd";
import { motion } from "framer-motion";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { emptyCart } from "../../assets/images/index";
import Breadcrumbs from "../../components/pageProps/Breadcrumbs";
import { TRANSFER_PRICE, URL_IMAGE } from "../../constants";
import AxiosClient from "../../networks/AxiosClient";
import { changeCarts, selectCarts } from "../../redux/slices/cartsSlice";

const Cart = () => {
  const navigation = useNavigate();
  const dispatch = useDispatch();
  const selCarts = useSelector(selectCarts);

  const changeQuanityProducts = async (params) => {
    const newCarts = await AxiosClient.post("/carts/create", {
      quanity: params?.counter,
      productDetailId: params?.productDetailId,
    });
    if (newCarts?.code === 0) {
      dispatch(changeCarts(newCarts.data?.carts));
    } else {
      toast.error(newCarts?.messsage);
    }
  };

  const removeCartProduct = async (productDetailId) => {
    const newCarts = await AxiosClient.post("/carts/remove", {
      productDetailId,
    });
    if (newCarts?.code === 0) {
      dispatch(changeCarts(newCarts.data));
    } else {
      toast.error(newCarts?.messsage);
    }
  };

  return (
    <div className="px-4 mx-auto max-w-container">
      <Breadcrumbs title="Cart" />
      {selCarts?.cartItems?.length > 0 ? (
        <div className="flex gap-12">
          <div className="flex-1 space-y-8">
            {selCarts.cartItems.map((items) => (
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
                      <h1 className="flex-1 text-xl font-bold">
                        {items?.name}
                      </h1>
                      <h1 className="flex-shrink-0 text-xl">
                        {TRANSFER_PRICE(items?.amount)}
                      </h1>
                    </div>
                    <h1 className="mb-2 text-xl">
                      {TRANSFER_PRICE(items?.priceDiscount)}
                    </h1>
                    <h1 className="mb-4 text-xl">
                      Size: <span>{items?.sizeName}</span>
                    </h1>
                    <h1 className="mb-5 italic">
                      Kho: <span>{items?.quanityLimit}</span>
                    </h1>
                    <div className="flex items-center gap-5">
                      <InputNumber
                        min={1}
                        className=""
                        value={items?.quanity}
                        max={items?.quanityLimit}
                        onChange={(counter) => {
                          changeQuanityProducts({
                            counter,
                            ...items,
                          });
                        }}
                      />
                      <div
                        className="cursor-pointer"
                        onClick={() => {
                          removeCartProduct(items?.productDetailId);
                        }}
                      >
                        <svg
                          aria-hidden="true"
                          focusable="false"
                          viewBox="0 0 24 24"
                          role="img"
                          width="24px"
                          height="24px"
                          fill="none"
                        >
                          <path
                            stroke="currentColor"
                            stroke-miterlimit="10"
                            stroke-width="1.5"
                            d="M14.25 7.5v12m-4.5-12v12M5.25 6v13.5c0 1.24 1.01 2.25 2.25 2.25h9c1.24 0 2.25-1.01 2.25-2.25V5.25h2.75m-2.75 0H21m-12-3h5.25c.83 0 1.5.67 1.5 1.5s-.67 1.5-1.5 1.5H3"
                          ></path>
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
                <Divider />
              </>
            ))}
          </div>
          <div className="w-[30%]">
            <h3 className="mb-2 text-xl">
              Số lượng: <span>{selCarts?.totals}</span>
            </h3>
            <h3 className="text-2xl">
              Giá tiền: <span>{TRANSFER_PRICE(selCarts?.amount)}</span>{" "}
            </h3>
            <Divider />
            <button
              onClick={async () => {
                navigation("/create-orders");
              }}
              className="w-[260px] px-5 py-3 rounded-full tex-center bg-[#3A4980] font-bold text-white"
            >
              THANH TOÁN
            </button>
          </div>
        </div>
      ) : (
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.4 }}
          className="flex flex-col items-center justify-center gap-4 pb-20 mdl:flex-row"
        >
          <div>
            <img
              className="p-4 mx-auto rounded-lg w-80"
              src={emptyCart}
              alt="emptyCart"
            />
          </div>
          <div className="max-w-[500px] p-4 py-8 bg-white flex gap-4 flex-col items-center rounded-md shadow-lg">
            <h1 className="text-xl font-bold uppercase font-titleFont">
              Giỏ hàng của bạn đang trống
            </h1>
            <Link to="/shop">
              <button className="px-8 py-2 text-lg font-semibold text-gray-200 duration-300 rounded-md cursor-pointer bg-primeColor font-titleFont active:bg-gray-900 hover:text-white hover:bg-black">
                Mua hàng
              </button>
            </Link>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default Cart;
