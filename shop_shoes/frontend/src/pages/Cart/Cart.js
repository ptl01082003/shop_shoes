import { Button, Divider, InputNumber } from "antd";
import { motion } from "framer-motion";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { emptyCart } from "../../assets/images/index";
import Breadcrumbs from "../../components/pageProps/Breadcrumbs";
import { TRANSFER_PRICE, URL_IMAGE } from "../../constants";
import {
  addToCard,
  changeCarts,
  selectCarts,
} from "../../redux/slices/cartsSlice";
import AxiosClient from "../../networks/AxiosClient";
import { toast } from "react-toastify";

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
        <div>
          <div className="space-y-10">
            {selCarts.cartItems.map((items) => (
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
                    {TRANSFER_PRICE(items?.priceDiscount)}
                  </h1>
                  <h1 className="mb-4 text-xl">
                    Size: <span>{items?.sizeName}</span>
                  </h1>
                  <h1 className="mb-5 italic">
                    Kho: <span>{items?.quanityLimit}</span>
                  </h1>
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
                  <Button
                    onClick={() => {
                      removeCartProduct(items?.productDetailId);
                    }}
                    type="dashed"
                  >
                    Xoá
                  </Button>
                </div>
              </div>
            ))}
          </div>
          <Divider />
          <h3 className="text-xl">
            Số lượng: <span>{selCarts?.totals}</span>
          </h3>
          <h3 className="text-2xl">
            Giá tiền: <span>{TRANSFER_PRICE(selCarts?.amount)}</span>{" "}
          </h3>
          <button
            onClick={async () => {
              navigation("/create-orders");            
            }}
          >
            Thanh Toan
          </button>
          <Divider />
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
              Your Cart feels lonely.
            </h1>
            <p className="px-10 -mt-2 text-sm text-center">
              Your Shopping cart lives to serve. Give it purpose - fill it with
              books, electronics, videos, etc. and make it happy.
            </p>
            <Link to="/shop">
              <button className="px-8 py-2 text-lg font-semibold text-gray-200 duration-300 rounded-md cursor-pointer bg-primeColor font-titleFont active:bg-gray-900 hover:text-white hover:bg-black">
                Continue Shopping
              </button>
            </Link>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default Cart;
