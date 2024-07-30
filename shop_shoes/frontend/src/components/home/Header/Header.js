import { ShoppingCartOutlined } from "@ant-design/icons";
import { Badge, Dropdown } from "antd";
import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import { HiMenuAlt2 } from "react-icons/hi";
import { MdClose } from "react-icons/md";
import { useSelector } from "react-redux";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { logo, logoLight } from "../../../assets/images";
import {
  isLogin,
  navBarList,
  PATH_ROUTER,
  removeStorage,
} from "../../../constants";
import AxiosClient from "../../../networks/AxiosClient";
import { selectCarts } from "../../../redux/slices/cartsSlice";
import { selectUserInfo } from "../../../redux/slices/usersSlice";
import Flex from "../../designLayouts/Flex";
import Image from "../../designLayouts/Image";

const Header = () => {
  const navigation = useNavigate();
  const selUserInfo = useSelector(selectUserInfo);
  const selCarts = useSelector(selectCarts);

  const [showMenu, setShowMenu] = useState(true);
  const [sidenav, setSidenav] = useState(false);
  const [category, setCategory] = useState(false);
  const [brand, setBrand] = useState(false);
  const location = useLocation();
  
  useEffect(() => {
    let ResponsiveMenu = () => {
      if (window.innerWidth < 667) {
        setShowMenu(false);
      } else {
        setShowMenu(true);
      }
    };
    ResponsiveMenu();
    window.addEventListener("resize", ResponsiveMenu);
  }, []);

  const onLogout = async () => {
    const response = await AxiosClient.post("/auth/logout");
    if (response.code == 0) {
      removeStorage();
      window.location.replace(PATH_ROUTER.SIGN_IN);
    } else {
    }
  };

  const items = [
    {
      label: (
        <>
          <h3 className="mb-1 font-bold text-center">
            {selUserInfo?.fullName}
          </h3>
          <div className="flex items-center justify-center space-x-1 text-xs italic">
            <h3>ID:</h3>
            <h3>{selUserInfo?.userId}</h3>
          </div>
        </>
      ),
      key: "0",
    },
    {
      type: "divider",
    },
    {
      label: (
        <button
          className="w-full py-2 font-bold text-center text-white rounded-md bg-slate-500"
          onClick={onLogout}
        >
          Đăng xuất
        </button>
      ),
      key: "3",
    },
  ];

  return (
    <div className="w-full h-20 bg-[#111111] sticky top-0 z-50 border-b-[1px] border-b-gray-200">
      <nav className="relative h-full px-4 mx-auto max-w-container">
        <Flex className="flex items-center justify-between h-full">
          <Link to="/">
            <div>
              {/* <Image className="object-cover w-32" imgSrc={logo} /> */}
            </div>
          </Link>
          <div>
            {showMenu && (
              <motion.ul
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="z-50 flex items-center w-auto p-0"
              >
                {navBarList.map(({ _id, title, link }) => (
                  <NavLink
                    key={_id}
                    className="flex font-normal hover:font-bold justify-center items-center px-6 h-4 text-base text-white hover:underline underline-offset-[4px] decoration-[1px] hover:text-[#fffafa] md:border-r-[2px] border-r-gray-300 last:border-r-0"
                    to={link}
                    state={{ data: location.pathname.split("/")[1] }}
                  >
                    <li>{title}</li>
                  </NavLink>
                ))}

                {isLogin ? (
                  <div
                    className="flex items-center pl-5 space-x-1 cursor-pointer"
                  
                  >
                    <Badge count={selCarts?.cartItems?.length || 0}   onClick={() => {
                      navigation("/cart");
                    }}>
                      <ShoppingCartOutlined className="text-2xl text-white" />
                    </Badge>
                    <Dropdown
                      menu={{
                        items,
                      }}
                    >
                      <p className="flex font-normal hover:font-bold px-5 text-base text-white hover:underline underline-offset-[4px] decoration-[1px] hover:text-[#fffafa] md:border-r-[2px] border-r-gray-300 hoverEffect last:border-r-0">
                        Thông tin
                      </p>
                    </Dropdown>
                  </div>
                ) : (
                  <NavLink
                    className="flex font-normal hover:font-bold justify-center items-center px-6 h-4 text-base text-white hover:underline underline-offset-[4px] decoration-[1px] hover:text-[#fffafa] md:border-r-[2px] border-r-gray-300 hoverEffect last:border-r-0"
                    to={PATH_ROUTER.SIGN_IN}
                    state={{ data: location.pathname.split("/")[1] }}
                  >
                    <li>Đăng nhập</li>
                  </NavLink>
                )}
              </motion.ul>
            )}
            <HiMenuAlt2
              onClick={() => setSidenav(!sidenav)}
              className="absolute inline-block w-8 h-6 cursor-pointer right-4 top-6 md:hidden"
            />
            {sidenav && (
              <div className="fixed top-0 left-0 z-50 w-full h-screen text-white bg-black bg-opacity-80">
                <motion.div
                  initial={{ x: -300, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ duration: 0.5 }}
                  className="w-[80%] h-full relative"
                >
                  <div className="w-full h-full p-6 bg-primeColor">
                    <img
                      className="mb-6 w-28"
                      src={logoLight}
                      alt="logoLight"
                    />
                    <ul className="flex flex-col gap-2 text-white">
                      {navBarList.map((item) => (
                        <li
                          className="font-normal hover:font-bold items-center text-lg text-white hover:underline underline-offset-[4px] decoration-[1px] hover:text-white md:border-r-[2px] border-r-gray-300 hoverEffect last:border-r-0"
                          key={item._id}
                        >
                          <NavLink
                            to={item.link}
                            state={{ data: location.pathname.split("/")[1] }}
                            onClick={() => setSidenav(false)}
                          >
                            {item.title}
                          </NavLink>
                        </li>
                      ))}
                    </ul>
                    <div className="mt-4">
                      <h1
                        onClick={() => setCategory(!category)}
                        className="flex items-center justify-between mb-2 text-base cursor-pointer font-titleFont"
                      >
                        Shop by Category{" "}
                        <span className="text-lg">{category ? "-" : "+"}</span>
                      </h1>
                      {category && (
                        <motion.ul
                          initial={{ y: 15, opacity: 0 }}
                          animate={{ y: 0, opacity: 1 }}
                          transition={{ duration: 0.4 }}
                          className="flex flex-col gap-1 text-sm"
                        >
                          <li className="headerSedenavLi">New Arrivals</li>
                          <li className="headerSedenavLi">Gudgets</li>
                          <li className="headerSedenavLi">Accessories</li>
                          <li className="headerSedenavLi">Electronics</li>
                          <li className="headerSedenavLi">Others</li>
                        </motion.ul>
                      )}
                    </div>
                    <div className="mt-4">
                      <h1
                        onClick={() => setBrand(!brand)}
                        className="flex items-center justify-between mb-2 text-base cursor-pointer font-titleFont"
                      >
                        Shop by Brand
                        <span className="text-lg">{brand ? "-" : "+"}</span>
                      </h1>
                      {brand && (
                        <motion.ul
                          initial={{ y: 15, opacity: 0 }}
                          animate={{ y: 0, opacity: 1 }}
                          transition={{ duration: 0.4 }}
                          className="flex flex-col gap-1 text-sm"
                        >
                          <li className="headerSedenavLi">New Arrivals</li>
                          <li className="headerSedenavLi">Gudgets</li>
                          <li className="headerSedenavLi">Accessories</li>
                          <li className="headerSedenavLi">Electronics</li>
                          <li className="headerSedenavLi">Others</li>
                        </motion.ul>
                      )}
                    </div>
                  </div>
                  <span
                    onClick={() => setSidenav(false)}
                    className="w-8 h-8 border-[1px] border-gray-300 absolute top-2 -right-10 text-gray-300 text-2xl flex justify-center items-center cursor-pointer hover:border-red-500 hover:text-red-500 duration-300"
                  >
                    <MdClose />
                  </span>
                </motion.div>
              </div>
            )}
          </div>
        </Flex>
      </nav>
    </div>
  );
};

export default Header;
