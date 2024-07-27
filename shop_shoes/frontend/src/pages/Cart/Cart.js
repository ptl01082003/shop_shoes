import { motion } from "framer-motion";
import React from "react";
import { Link } from "react-router-dom";
import { emptyCart } from "../../assets/images/index";
import Breadcrumbs from "../../components/pageProps/Breadcrumbs";
import { resetCart } from "../../redux/orebiSlice";
import ItemCard from "./ItemCard";
import { useSelector } from "react-redux";
import { selectCarts } from "../../redux/slices/cartsSlice";
import { TRANSFER_PRICE, URL_IMAGE } from "../../constants";

const Cart = () => {
  const selCarts = useSelector(selectCarts);
  return (
    <div className="max-w-container mx-auto px-4">
      <Breadcrumbs title="Cart" />
      {selCarts?.cartItems?.length > 0 ? (
        <div className="">
          {selCarts.cartItems.map((items) => (
            <div className="flex items-center">
              <div className="w-[200px] aspect-square">
                  <img src={URL_IMAGE(items?.productDetails?.products?.gallery?.[0]?.path)} />
              </div>
              <div></div>
            </div>
          ))}
          <h3 className="text-xl">
            Số lượng: <span>{selCarts?.totals}</span>{" "}
          </h3>
          <h3 className="text-2xl">
            Giá tiền: <span>{TRANSFER_PRICE(selCarts?.amount)}</span>{" "}
          </h3>
        </div>
      ) : (
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.4 }}
          className="flex flex-col justify-center items-center gap-4 pb-20 mdl:flex-row"
        >
          <div>
            <img
              className="mx-auto w-80 p-4 rounded-lg"
              src={emptyCart}
              alt="emptyCart"
            />
          </div>
          <div className="max-w-[500px] p-4 py-8 bg-white flex gap-4 flex-col items-center rounded-md shadow-lg">
            <h1 className="font-titleFont text-xl font-bold uppercase">
              Your Cart feels lonely.
            </h1>
            <p className="-mt-2 px-10 text-sm text-center">
              Your Shopping cart lives to serve. Give it purpose - fill it with
              books, electronics, videos, etc. and make it happy.
            </p>
            <Link to="/shop">
              <button className="bg-primeColor font-titleFont px-8 py-2 text-lg font-semibold text-gray-200 rounded-md duration-300 cursor-pointer active:bg-gray-900 hover:text-white hover:bg-black">
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
