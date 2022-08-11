import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import AdminNav from "../AdminNav";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { useSelector } from "react-redux";
import axios from "axios";
import LocalSearch from "../../../Components/Forms/LocalSearch";
import { Link } from "react-router-dom";
import CategoryForm from "../../../Components/Forms/CategoryForm";

const CreateCategory = () => {
  const { token } = useSelector((state) => state.auth);

  const [name, setName] = useState("");
  const [category, setCategory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [keyword, setKeyword] = useState("");

  const getAllCategory = () => {
    axios
      .get(`${process.env.REACT_APP_API}/category`)
      .then((res) => setCategory(res.data))
      .catch((err) => console.log(err));
  };

  const handleRemove = async (id) => {
    setLoading(true);
    try {
      const res = await axios.delete(
        `${process.env.REACT_APP_API}/category/delete/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setLoading(false);
      toast.success(res.data.message);
      getAllCategory();
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
        `${process.env.REACT_APP_API}/category`,
        { name },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setLoading(false);
      toast.success(res.data.message);
      setName("");
      getAllCategory();
    } catch (err) {
      setLoading(false);
      toast.error(err.response.data.message);
    }
  };

  useEffect(() => {
    getAllCategory();
  }, []);

  const searched = (keyword) => (c) => c.name.toLowerCase().includes(keyword);

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
              <h4>انشاء صنف</h4>
            )}

            <CategoryForm
              handleSubmit={handleSubmit}
              name={name}
              setName={setName}
            />

            {/* step 2 and step 3 */}
            <LocalSearch keyword={keyword} setKeyword={setKeyword} />

            {/* step 5 */}
            {category &&
              category.filter(searched(keyword)).map((c) => (
                <div className="alert alert-secondary" key={c._id}>
                  {c.name}
                  <span
                    onClick={() => handleRemove(c._id)}
                    className="btn btn-sm"
                  >
                    <DeleteOutlined className="text-danger" />
                  </span>
                  <Link to={`/admin/category/${c._id}`}>
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

export default CreateCategory;
