import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import AdminNav from "../AdminNav";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { useSelector } from "react-redux";
import axios from "axios";
import LocalSearch from "../../../Components/Forms/LocalSearch";
import { Link } from "react-router-dom";
import SubCategoryForm from "../../../Components/Forms/SubCategoryForm";

const CreateSubCategory = () => {
  const { token } = useSelector((state) => state.auth);

  const [name, setName] = useState("");
  const [subCategory, setSubCategory] = useState([]);
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState("");
  const [loading, setLoading] = useState(false);
  const [keyword, setKeyword] = useState("");

  const getAllSubCategory = () => {
    axios
      .get(`${process.env.REACT_APP_API}/subCategory`)
      .then((res) => setSubCategory(res.data.subCategories))
      .catch((err) => console.log(err));
  };

  const getCategory = () => {
    axios
      .get(`${process.env.REACT_APP_API}/category`)
      .then((res) => setCategories(res.data))
      .catch((err) => console.log(err));
  };

  const handleRemove = async (id) => {
    setLoading(true);
    try {
      const res = await axios.delete(
        `${process.env.REACT_APP_API}/subCategory/delete/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setLoading(false);
      toast.success(res.data.message);
      getAllSubCategory();
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
        `${process.env.REACT_APP_API}/subCategory`,
        { name, category },

        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setLoading(false);
      toast.success(res.data.message);
      setName("");
      getAllSubCategory();
    } catch (err) {
      setLoading(false);
      toast.error(err.response.data.message);
    }
  };

  useEffect(() => {
    getAllSubCategory();
    getCategory();
  }, []);

  const searched = (keyword) => (s) => s.name.toLowerCase().includes(keyword);

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
              <h4>انشاء صنف فرعي (الفئة)</h4>
            )}

            <div className="form-group">
              <label>اختر الصنف</label>
              <select
                name="category"
                className="form-control"
                onChange={(e) => setCategory(e.target.value)}
              >
                <option>Please select</option>
                {categories.length > 0 &&
                  categories.map((c) => (
                    <option key={c._id} value={c._id}>
                      {c.name}
                    </option>
                  ))}
              </select>
            </div>

            <SubCategoryForm
              handleSubmit={handleSubmit}
              name={name}
              setName={setName}
            />

            {/* step 2 and step 3 */}
            <LocalSearch keyword={keyword} setKeyword={setKeyword} />

            {/* step 5 */}
            {subCategory &&
              subCategory.filter(searched(keyword)).map((s) => (
                <div className="alert alert-secondary" key={s._id}>
                  {s.name}
                  <span
                    onClick={() => handleRemove(s._id)}
                    className="btn btn-sm"
                  >
                    <DeleteOutlined className="text-danger" />
                  </span>
                  <Link to={`/admin/subCategory/${s._id}`}>
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

export default CreateSubCategory;
