import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import Heading from "../Products/Heading";
import Product from "../Products/Product";
import SampleNextArrow from "./SampleNextArrow";
import SamplePrevArrow from "./SamplePrevArrow";
import AxiosClient from "../../../networks/AxiosClient"; // Đảm bảo đã cài đặt AxiosClient đúng cách
import { newArrOne } from "../../../assets/images";

const NewArrivals = () => {
  const [products, setProducts] = useState([]);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await AxiosClient.post("/products"); // Thay đổi endpoint tùy theo API của bạn
        if (response && response.code === 0) {
          setProducts(response.data);
        } else {
          console.error("Error fetching new arrivals:", response.data.message);
        }
      } catch (error) {
        console.error("Error fetching new arrivals:", error);
      }
    };

    fetchData();
  }, []);

  console.log(products)

  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    responsive: [
      {
        breakpoint: 1025,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
        },
      },
      {
        breakpoint: 769,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          infinite: true,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
        },
      },
    ],
  };

  return (
    <div className="w-full pb-16">
      <Heading heading="New Arrivals" />
      <Slider {...settings}>
        {products.map((product) => (
          <div key={product._id} className="px-2">
            <Product
              _id={product.productsID}
              img={newArrOne} // Thay đổi tùy thuộc vào cách bạn lưu trữ URL hình ảnh
              productName={product.productsName}
              price={product.price}
              color={product.color}
              badge={product.badge}
              des={product.description}
            />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default NewArrivals;
