import React, { useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { getBrandSlide } from "../redux/reducers/brandSlide";
import AliceCarousel from "react-alice-carousel";
import "./style.css";

const BrandSlide = () => {
  const dispatch = useDispatch();

  const { brandSlides } = useSelector((state) => state.brandSlide);

  const getBrand = () => {
    axios
      .get(`${process.env.REACT_APP_API}/brand`)
      .then((res) => {
        dispatch(getBrandSlide(res.data));
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getBrand();
  }, []);

  const responsive = {
    0: { items: 1 },
    568: { items: 2 },
    1024: { items: 3 },
  };

  const items = brandSlides.map((brand) => {
    return (
      <div className="item" key={brand._id}>
        <img src={brand.image} alt={brand.name} />
      </div>
    );
  });

  return (
    <div>
      <AliceCarousel
        mouseTracking
        autoPlay
        disableButtonsControls
        infinite
        autoPlayInterval="3000"
        items={items}
        responsive={responsive}
        controlsStrategy="alternate"
      />
    </div>
  );
};

export default BrandSlide;
