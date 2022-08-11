import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { Card, Tooltip } from "antd";
import { EyeOutlined, ShoppingCartOutlined } from "@ant-design/icons";
import { getAddToCart } from "../redux/reducers/addToCart";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import _ from "lodash";
import Meta from "antd/lib/card/Meta";
import "./style.css";

const ProductByCategoryAndSub = () => {
  const { categoryId, subCategoryId } = useParams();
  const dispatch = useDispatch();

  const [product, setProduct] = useState([]);

  const { token } = useSelector((state) => state.auth);

  const getProductByCategoryAndSub = () => {
    axios
      .get(
        `${process.env.REACT_APP_API}/product/category/${categoryId}/subCategory/${subCategoryId}`
      )
      .then((res) => {
        setProduct(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const addToCartHandler = (product) => {
    let cart = [];
    if (typeof window !== undefined) {
      if (localStorage.getItem("cart")) {
        cart = JSON.parse(localStorage.getItem("cart"));
      }

      // push new product to cart
      cart.push({
        ...product,
        count: 1,
      });

      // remove duplicates
      let unique = _.uniqWith(cart, _.isEqual);

      localStorage.setItem("cart", JSON.stringify(unique));

      // dispatch action to add to cart
      dispatch(getAddToCart(unique));

      axios
        .post(
          `${process.env.REACT_APP_API}/cart`,
          { cart: unique },
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        )
        .then((res) => {
          toast.success("تمت إضافة المنتج إلى السلة");
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  useEffect(() => {
    getProductByCategoryAndSub();
  }, []);

  return (
    <div>
      <div className="container">
        <>
          <h2 className="text-align">المنتجات</h2>
          <div className="row">
            {product &&
              product.map((item) => (
                <div className="col-md-3 p-2" key={item._id}>
                  <Card
                    cover={
                      <img
                        src={item.image[0].original}
                        style={{ height: "150px", objectFit: "cover" }}
                        className="p-1"
                        alt={item.name}
                      />
                    }
                    actions={[
                      <Link to={`/product/${item._id}`} className="hover">
                        <Tooltip title="عرض المنتج">
                          <EyeOutlined className="buttonColor" /> <br /> عرض
                          المنتج
                        </Tooltip>
                      </Link>,
                      <Tooltip
                        title="أضف إلى السلة"
                        onClick={() => addToCartHandler(item)}
                      >
                        <p className="hover">
                          <ShoppingCartOutlined className="buttonColor" />
                          <br />
                          أضاف إلى السلة
                        </p>
                      </Tooltip>,
                    ]}
                  >
                    <Meta
                      title={`${item.name} - JD ${item.price}`}
                      description={`${item.description &&
                        item.description.substring(0, 40)}...`}
                    />
                  </Card>
                </div>
              ))}
          </div>
        </>
      </div>
    </div>
  );
};

export default ProductByCategoryAndSub;
