import React, { useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { getSliderImages } from "../redux/reducers/sliderImage";
import AliceCarousel from "react-alice-carousel";
import "./style.css";

const SliderImage = () => {
  const dispatch = useDispatch();

  const { sliderImages } = useSelector((state) => state.sliderImage);

  const getSliderImage = () => {
    axios
      .get(`${process.env.REACT_APP_API}/sliderImage`)
      .then((res) => {
        dispatch(getSliderImages(res.data));
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getSliderImage();
  }, []);

  return (
    <div>
      <AliceCarousel
        autoPlay
        disableButtonsControls
        infinite
        autoPlayInterval="4000"
        responsive={{
          0: { items: 1 },
          600: { items: 1 },
          1000: { items: 1 },
        }}
      >
        {sliderImages.map((sliderImage) => (
          <img src={sliderImage.image} alt="sliderImage" />
        ))}
      </AliceCarousel>
    </div>
  );
};

export default SliderImage;
