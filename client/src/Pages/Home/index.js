import React from "react";
import SliderImage from "../../Components/SliderImage";
import GetAllProduct from "../../Components/GetAllProduct";
import BrandSlide from "../../Components/BrandSlider";
import "./style.css";

const Home = () => {
  return (
    <div>
      <BrandSlide />

      <br />
      <h3 className="text-center p-3 mt-5 mb-5 display-4 home-background">
        المنتجات الجديدة
      </h3>
      <GetAllProduct />
      <br />

      <h3 className="text-center p-3 mt-5 mb-5 display-4 home-background">
       الايجابيات وميزات الموقع
      </h3>
      <SliderImage />
    </div>
  );
};

export default Home;
