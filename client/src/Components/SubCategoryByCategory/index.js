import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import { Card } from "antd";

const SubCategoryByCategory = () => {
  const { id } = useParams();

  const [subCategory, setSubCategory] = useState([]);

  const getSubCategoryByCategory = () => {
    axios
      .get(`${process.env.REACT_APP_API}/subcategory/category/${id}`)
      .then((res) => {
        setSubCategory(res.data.subCategories);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getSubCategoryByCategory();
  }, []);

  return (
    <div>
      <div className="container">
        <h2 className="text-align">الأصناف الفرعية</h2>
        <div className="row">
          {subCategory.map((item) => (
            <div className="col-md-2 p-2" key={item._id}>
              <Link to={`/product/category/${item.category}/sub/${item._id}`}>
                <Card
                  cover={
                    <img
                      src={item.image[0].original}
                      style={{ height: "200px", objectFit: "cover" }}
                      className="p-1"
                      alt={item.name}
                    />
                  }
                >
                  <p className="text-align-p">{item.name}</p>
                </Card>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SubCategoryByCategory;
