import React, { useState, useEffect } from "react";
import ImageUploading from "react-images-uploading";
import { toast } from "react-toastify";
import AdminNav from "../AdminNav";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { useSelector } from "react-redux";
import axios from "axios";
import LocalSearch from "../../../Components/Forms/LocalSearch";
import { Link } from "react-router-dom";
import BrandForm from "../../../Components/Forms/BrandForm";

const CreateBrand = () => {
  const { token } = useSelector((state) => state.auth);

  const [images, setImages] = useState("");
  const [name, setName] = useState("");
  const [brands, setBrands] = useState([]);
  const [loading, setLoading] = useState(false);
  const [keyword, setKeyword] = useState("");

  const maxNumber = 69;

  const onChange = (imageList) => {
    setImages(imageList[0].original);
  };

  const getAllBrands = () => {
    axios
      .get(`${process.env.REACT_APP_API}/brand`)
      .then((res) => setBrands(res.data))
      .catch((err) => console.log(err));
  };

  const handleRemove = async (id) => {
    setLoading(true);
    try {
      const res = await axios.delete(
        `${process.env.REACT_APP_API}/brand/delete/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setLoading(false);
      toast.success(res.data.message);
      getAllBrands();
    } catch (err) {
      setLoading(false);
      toast.error(err.response.data.message);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API}/brand`,
        { name, image: images },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setLoading(false);
      toast.success(res.data.message);
      setName("");
      setImages("");
      getAllBrands();
    } catch (err) {
      setLoading(false);
      toast.error(err.response.data.message);
    }

  };

  useEffect(() => {
    getAllBrands();
  }, []);

  const imageUpload = () => (
    <ImageUploading
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
          <div className="image-item">
            <img src={imageList} alt="" width="100" />
            <div className="image-item__btn-wrapper"></div>
          </div>
        </div>
      )}
    </ImageUploading>
  );

  const searched = (keyword) => (b) => b.name.toLowerCase().includes(keyword);

  return (
    <>
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-2">
            <AdminNav />
          </div>
          <div className="col">
            {loading ? (
              <h4 className="text-danger">تحميل..</h4>
            ) : (
              <h4>انشاء براند</h4>
            )}

            <BrandForm
              handleSubmit={handleSubmit}
              name={name}
              setName={setName}
              imageUpload={imageUpload}
            />

            {/* step 2 and step 3 */}
            <LocalSearch keyword={keyword} setKeyword={setKeyword} />

            {/* step 5 */}
            {brands &&
              brands.filter(searched(keyword)).map((b) => (
                <div className="alert alert-secondary" key={b._id}>
                  {b.name}
                  <span
                    onClick={() => handleRemove(b._id)}
                    className="btn btn-sm"
                  >
                    <DeleteOutlined className="text-danger" />
                  </span>
                  <Link to={`/admin/brand/${b._id}`}>
                    <span className="btn btn-sm">
                      <EditOutlined className="text-warning" />
                    </span>
                  </Link>
                </div>
              ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default CreateBrand;
