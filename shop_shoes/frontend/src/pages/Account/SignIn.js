import { Button, Form, Input } from "antd";
import React from "react";
import { BsCheckCircleFill } from "react-icons/bs";
import { Link, useNavigate } from "react-router-dom";
import { logoLight } from "../../assets/images";
import { KEY_STORAGE } from "../../constants";
import { toast } from "react-toastify";
import AxiosClient from "../../networks/AxiosClient";

const SignIn = () => {

  const onLogin = async (params) => {
    console.log(params);
    const response = await AxiosClient.post("/auth/login", params);
    if (response.code === 0) {
      localStorage.setItem(KEY_STORAGE.TOKEN, response.data.accessToken);
      localStorage.setItem(KEY_STORAGE.RF_TOKEN, response.data.refreshToken);
      navigation("/", { replace: true });
    } else {
      toast.error(response.message);
    }
  };
  
  const navigation = useNavigate();

  return (
    <div className="w-full h-screen flex justify-center items-center">
      <div className="w-1/2 h-full hidden text-white lgl:inline-flex">
        <div className="w-[450px] h-full bg-primeColor px-10 flex flex-col gap-6 justify-center">
          <Link to="/">
            <img src={logoLight} alt="logoImg" className="w-28" />
          </Link>
          <div className="-mt-1 flex flex-col gap-1">
            <h1 className="font-titleFont text-xl font-medium">
              Stay sign in for more
            </h1>
            <p className="text-base">When you sign in, you are with us!</p>
          </div>
          <div className="w-[300px] flex items-start gap-3">
            <span className="mt-1 text-green-500">
              <BsCheckCircleFill />
            </span>
            <p className="text-base text-gray-300">
              <span className="font-titleFont font-semibold text-white">
                Get started fast with OREBI
              </span>
              <br />
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ab omnis
              nisi dolor recusandae consectetur!
            </p>
          </div>
          <div className="w-[300px] flex items-start gap-3">
            <span className="mt-1 text-green-500">
              <BsCheckCircleFill />
            </span>
            <p className="text-base text-gray-300">
              <span className="font-titleFont font-semibold text-white">
                Access all OREBI services
              </span>
              <br />
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ab omnis
              nisi dolor recusandae consectetur!
            </p>
          </div>
          <div className="w-[300px] flex items-start gap-3">
            <span className="mt-1 text-green-500">
              <BsCheckCircleFill />
            </span>
            <p className="text-base text-gray-300">
              <span className="font-titleFont font-semibold text-white">
                Trusted by online Shoppers
              </span>
              <br />
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ab omnis
              nisi dolor recusandae consectetur!
            </p>
          </div>
          <div className="flex justify-between items-center mt-10">
            <Link to="/">
              <p className="font-titleFont text-sm font-semibold text-gray-300 duration-300 cursor-pointer hover:text-white">
                © OREBI
              </p>
            </Link>
            <p className="font-titleFont text-sm font-semibold text-gray-300 duration-300 cursor-pointer hover:text-white">
              Terms
            </p>
            <p className="font-titleFont text-sm font-semibold text-gray-300 duration-300 cursor-pointer hover:text-white">
              Privacy
            </p>
            <p className="font-titleFont text-sm font-semibold text-gray-300 duration-300 cursor-pointer hover:text-white">
              Security
            </p>
          </div>
        </div>
      </div>
      <div className="w-full h-full lgl:w-1/2">
        <div className="px-6 py-4 w-full h-[90%] flex flex-col justify-center overflow-y-scroll scrollbar-thin scrollbar-thumb-primeColor">
          <h1 className="font-titleFont underline underline-offset-4 decoration-[1px] font-semibold text-3xl mdl:text-4xl mb-4">
            Sign in
          </h1>
          <div className="w-1/2 flex flex-col gap-3">
            <Form onFinish={onLogin} layout="vertical" className="row-col">
              <Form.Item
                className="userName"
                label="Tài khoản"
                name="userName"
                rules={[
                  {
                    required: true,
                    message: "Tài khoản không được để trống!",
                  },
                ]}
              >
                <Input placeholder="Nhập tại đây" />
              </Form.Item>
              <Form.Item
                className="password"
                label="Mật khẩu"
                name="password"
                rules={[
                  {
                    required: true,
                    message: "Mật khẩu không được để trống!",
                  },
                ]}
              >
                <Input type="password" placeholder="Nhập tại đây" />
              </Form.Item>
              <Form.Item>
                <Button htmlType="submit" style={{ width: "100%" }}>
                  ĐĂNG NHẬP
                </Button>
              </Form.Item>
            </Form>

            <p className="font-titleFont text-sm font-medium text-center">
              Don't have an Account?{" "}
              <Link to="/signup">
                <span className="duration-300 hover:text-blue-600">
                  Sign up
                </span>
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
