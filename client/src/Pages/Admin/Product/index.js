import React, { useEffect, useState } from "react";
import AdminNav from "../AdminNav";
import axios from "axios";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { Card } from "antd";
import { Link } from "react-router-dom";

const AdminProducts = () => {
  const [products, setProducts] = useState([]);

  const { token } = useSelector((state) => state.auth);

  const getAllProducts = () => {
    axios
      .get(`${process.env.REACT_APP_API}/product/admin/all`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setProducts(res.data);
      })
      .then((err) => {
        console.log(err);
      });
  };

  const handelRemove = (id) => {
    axios
      .delete(`${process.env.REACT_APP_API}/product/delete/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        toast.error("Product Deleted");
        getAllProducts();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getAllProducts();
  }, []);

  return (
    <div>
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-2">
            <AdminNav />
          </div>

          <div className="col">
            <h4>جميع المنتجات</h4>

            <div className="row">
              {products.map((product) => (
                <div className="col-md-4" key={product._id}>
                  <Card
                    cover={
                      <img
                        src={product.image[0].original}
                        style={{ height: "300px", objectFit: "cover" }}
                        className="p-1"
                        alt={product.name}  
                      />
                    }
                    actions={[
                      <Link to={`/admin/update/product/${product._id}`}>
                        <EditOutlined className="text-warning" />
                      </Link>,
                      <DeleteOutlined
                        className="text-danger"
                        onClick={() => handelRemove(product._id)}
                      />,
                    ]}
                  >
                    <Card.Meta title={product.name} />
                  </Card>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminProducts;
