import { CaretLeftOutlined, CaretRightOutlined } from "@ant-design/icons";
import { React, useEffect, useState } from "react";
import Slider from "react-slick";
import { TRANSFER_PRICE, URL_IMAGE } from "../../constants";
import AxiosClient from "../../networks/AxiosClient";

function SampleNextArrow(props) {
  const { onClick } = props;
  return (
    <div
      onClick={onClick}
      className="absolute z-50 bottom-[5%] right-[2%] w-[50px] h-[50px] cursor-pointer flex justify-center items-center rounded-xl bg-[#EDF0F8]"
    >
      <CaretRightOutlined className="text-2xl" />
    </div>
  );
}

function SamplePrevArrow(props) {
  const { onClick } = props;
  return (
    <div
      onClick={onClick}
      className="absolute z-50 bottom-[5%] right-[6%] w-[50px] h-[50px] cursor-pointer flex justify-center items-center rounded-xl bg-[#EDF0F8]"
    >
      <CaretLeftOutlined className="text-2xl" />
    </div>
  );
}

const Home = () => {
  const [lstProducts, setLstProducts] = useState();

  useEffect(() => {
    (async () => {
      const products = await AxiosClient.post("/products/lst-products");
      setLstProducts(products?.data || []);
    })();
  }, []);

  return (
    <div className="bg-[#1f1f21] px-[4%]">
      <div className="mb-10">
        <Slider
          arrows={true}
          slidesToShow={1}
          autoplay={true}
          autoplaySpeed={1500}
          nextArrow={<SampleNextArrow />}
          prevArrow={<SamplePrevArrow />}
        >
          <div className="w-full aspect-[3]">
            <img
              className="w-full h-full object-cover"
              src="https://file.hstatic.net/200000642007/file/1920x640_f3fc87c077684b3782a0a793403bbf65.jpg"
            />
          </div>
          <div className="w-full aspect-[3]">
            <img
              className="w-full h-full object-cover"
              src="https://file.hstatic.net/200000642007/file/desktop-1920x640_690adfdae05f4db8a2b7ca47d95f236d.jpg"
            />
          </div>
          <div className="w-full aspect-[3]">
            <img
              className="w-full h-full object-cover"
              src="https://static.nike.com/a/images/f_auto/dpr_1.0,cs_srgb/h_1444,c_limit/097d1ab5-aed3-4a3e-a87a-2bc7941a3e37/nike-just-do-it.jpg"
            />
          </div>
        </Slider>
      </div>
    
      <h1 className="text-white font-bold text-3xl mb-6">HÀNG MỚI VỀ</h1>
      <Slider
        className="custom-slider"
        arrows={false}
        slidesToShow={5}
        autoplay={true}
        autoplaySpeed={2000}
      >
        {lstProducts?.map((product) => (
          <div>
            <div className="">
              <div className="w-full aspect-[97/120] mb-4">
                <img
                  className="w-full h-full object-cover"
                  src={URL_IMAGE(product?.gallery?.[0]?.path)}
                />
              </div>
              <h3 className="text-white mb-1 text-lg min-h-[3.5rem] line-clamp-2">
                {product?.name}
              </h3>
              <h3 className="text-white">{TRANSFER_PRICE(product?.price)}</h3>
            </div>
          </div>
        ))}
      </Slider>
      <div className="w-full aspect-[807/410] relative mt-16">
        <div className="absolute inset-0">
          <img
            className="w-full h-full"
            src="https://file.hstatic.net/200000642007/file/1614x820_76ccb179b274411685d3d1fbeab117ed.jpg"
          />
        </div>
        <div className="w-[58%] absolute h-full top-0 right-0 overflow-hidden flex flex-col justify-center">
          <h1 className="text-black font-bold text-3xl mb-5">HÀNG BÁN CHẠY</h1>
          <Slider
            className="custom-slider"
            arrows={false}
            slidesToShow={3}
            autoplay={true}
            autoplaySpeed={2000}
          >
            {lstProducts?.map((product, idx) => (
              <div>
                <div className="bg-[#ffffff] text-black relative">
                  <div className="w-full aspect-[97/120] mb-4">
                    <img
                      className="w-full h-full object-cover"
                      src={URL_IMAGE(product?.gallery?.[0]?.path)}
                    />
                  </div>
                  <div className="p-4">
                    <h3 className=" mb-1 text-lg min-h-[3.5rem] line-clamp-2">
                      {product?.name}
                    </h3>
                    <h3 className="">{TRANSFER_PRICE(product?.price)}</h3>
                  </div>
                  <div className="absolute w-[32px] top-0 left-0">
                    <img
                      className="w-full"
                      src="https://file.hstatic.net/200000642007/file/bg_rank_c21e90ddb3c74242970a777d424a1ae5.png"
                    />
                    <h1 className="text-center absolute top-[10%] right-1/2 text-white font-bold translate-x-1/2">
                      {idx + 1}
                    </h1>
                  </div>
                </div>
              </div>
            ))}
          </Slider>
        </div>
      </div>
    </div>
  );
};

export default Home;
