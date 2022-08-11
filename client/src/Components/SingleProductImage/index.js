import React from "react";
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";

const SingleProductImages = ({ product }) => {
  const { image } = product;

  let newArr = [];

  image &&
    image.map((item) => {
      newArr.push({
        original: item.original,
        thumbnail: item.thumbnail,
        originalHeight: 500,
        originalWidth: 500,
        thumbnailHeight: 100,
      });
      return newArr;
    });

  return (
    <div className="single-product-image">
      <ImageGallery items={newArr}  with="100"/>
    </div>
  );
};

export default SingleProductImages;
