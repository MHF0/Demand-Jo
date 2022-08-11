import React, { useState, useEffect } from "react";
import AdminNav from "../AdminNav";
import axios from "axios";
import ImageUploading from "react-images-uploading";
import { toast } from "react-toastify";
import ProductForm from "../../../Components/Forms/ProductForm";

const CreateProduct = () => {
  const [images, setImages] = useState([]);
  const [getCategory, setGetCategory] = useState([]);
  const [getSubCategory, setGetSubCategory] = useState([]);
  const [getBrand, setGetBrand] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [subCategories, setSubCategories] = useState("");
  const [brand, setBrand] = useState("");
  const [size, setSize] = useState("");
  const [theSeller, setTheSeller] = useState("");
  const [productNum, setProductNum] = useState("");

  const maxNumber = 69;

  const onChange = (imageList) => {
    setImages(imageList);
  };

  const handleCategory = () => {
    axios
      .get(`${process.env.REACT_APP_API}/category`)
      .then((res) => setGetCategory(res.data))
      .catch((err) => console.log(err));
  };

  const handleSubCategory = () => {
    axios
      .get(`${process.env.REACT_APP_API}/subCategory`)
      .then((res) => setGetSubCategory(res.data.subCategories))
      .catch((err) => console.log(err));
  };

  const imageUpload = () => (
    <ImageUploading
      multiple
      value={images}
      onChange={onChange}
      maxNumber={maxNumber}
      dataURLKey={"original"}
      acceptType={["jpg", "png", "gif", "jpeg", "PNG", "JPEG", "GIF"]}
    >
      {({
        imageList,
        onImageUpload,
        onImageUpdate,
        onImageRemove,
        isDragging,
        dragProps,
      }) => (
        // write your building UI
        <div className="upload__image-wrapper">
          <button
            style={isDragging ? { color: "red" } : null}
            onClick={onImageUpload}
            {...dragProps}
          >
            Upload
          </button>
          &nbsp;
          {imageList.map((image, index) => (
            <div key={index} className="image-item">
              <img src={image.original} alt={index} width="100" />
              <div className="image-item__btn-wrapper">
                <button onClick={() => onImageUpdate(index)}>Update</button>
                <button onClick={() => onImageRemove(index)}>Remove</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </ImageUploading>
  );

  const handelBrand = () => {
    axios
      .get(`${process.env.REACT_APP_API}/brand`)
      .then((res) => setGetBrand(res.data))
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    handleCategory();
    handleSubCategory();
    handelBrand();
  }, []);

  const handleSubmit = async () => {
    let savedimage = [];
    // eslint-disable-next-line
    images.map((item) => {
      savedimage.push({ original: item.original, thumbnail: item.original });
      // return item;
    });

    const product = {
      image: savedimage,
      name,
      description,
      price,
      category,
      subCategory: subCategories,
      brand,
      size,
      theSeller,
      productNum,
    };

    try {
      await axios.post(`${process.env.REACT_APP_API}/product`, product, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      toast.success("Product Created");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-2">
            <AdminNav />
          </div>
          <div className="col-md-10">
            <h4>Product create</h4>
            <ProductForm
              imageUpload={imageUpload}
              handleSubmit={handleSubmit}
              name={name}
              setName={setName}
              description={description}
              setDescription={setDescription}
              price={price}
              setPrice={setPrice}
              category={category}
              setCategory={setCategory}
              subCategories={subCategories}
              setSubCategories={setSubCategories}
              brand={brand}
              setBrand={setBrand}
              size={size}
              setSize={setSize}
              theSeller={theSeller}
              setTheSeller={setTheSeller}
              productNum={productNum}
              setProductNum={setProductNum}
              getCategory={getCategory}
              getSubCategory={getSubCategory}
              getBrand={getBrand}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateProduct;
