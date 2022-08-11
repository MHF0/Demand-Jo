import React, { useState, useEffect } from "react";
import ImageUploading from "react-images-uploading";
import AdminNav from "../AdminNav";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import axios from "axios";
import { Card } from "antd";

const CreateSlideImage = () => {
  const { token } = useSelector((state) => state.auth);
  const [images, setImages] = useState("");
  const maxNumber = 69;
  const [loading, setLoading] = useState(false);
  const [slides, setSlides] = useState([]);

  const onChange = (imageList) => {
    setImages(imageList[0].original);
  };

  const imageUpload = () => (
    <ImageUploading
      value={images}
      onChange={onChange}
      maxNumber={maxNumber}
      dataURLKey={"original"}
      acceptType={["jpg", "png", "gif", "jpeg", "PNG", "JPEG", "GIF"]}
    >
      {({ imageList, onImageUpload, isDragging, dragProps }) => (
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
          <div className="image-item">
            <img src={imageList} alt="" width="100" />
            <div className="image-item__btn-wrapper"></div>
          </div>
        </div>
      )}
    </ImageUploading>
  );

  const handelSubmit = async () => {
    setLoading(true);
    try {
      await axios.post(
        `${process.env.REACT_APP_API}/sliderImage`,
        { image: images },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setLoading(false);
      toast.success("تم اضافة الصورة بنجاح");
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };

  const getAllImages = async () => {
    try {
      const res = await axios.get(`${process.env.REACT_APP_API}/sliderImage`);
      setSlides(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleRemove = async (id) => {
    try {
      await axios.delete(
        `${process.env.REACT_APP_API}/sliderImage/delete/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast.error("تم حذف الصورة بنجاح");
      getAllImages();
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getAllImages();
  }, []);

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-2">
          <AdminNav />
        </div>
        <div className="col">
          {loading ? (
            <h4 className="text-danger">تحميل..</h4>
          ) : (
            <h4>انشاء صورة</h4>
          )}
          {imageUpload()}

          <button
            className="btn btn-outline-info"
            onClick={handelSubmit}
            disabled={!images}
          >
            انشاء
          </button>

          <div className="row">
            {slides.map((slide) => (
              <div className="col-md-4" key={slide._id}>
                <Card
                  cover={
                    <img
                      src={slide.image}
                      style={{ height: "150px", objectFit: "cover" }}
                      className="p-1"
                      alt={slide._id}
                    />
                  }
                ></Card>

                <br />

                <button
                  className="btn btn-sm btn-danger"
                  onClick={() => handleRemove(slide._id)}
                >
                  حذف
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateSlideImage;
