import React, { useState, useEffect } from "react";
import { Card, Tabs, Tooltip } from "antd";
import { HeartOutlined, ShoppingCartOutlined } from "@ant-design/icons";
import SingleProductImages from "../SingleProductImage";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";
import axios from "axios";
import ProductListItem from "../ProductListItem";
import { getAddToCart } from "../redux/reducers/addToCart";
import { useDispatch } from "react-redux";
import RelatedProduct from "../RelatedProduct";
import { getProducts } from "../redux/reducers/product";
import _ from "lodash";
import "./style.css";

const SingleProduct = () => {
  const { TabPane } = Tabs;
  const { id } = useParams();
  const dispatch = useDispatch();

  const [tooltip, setTooltip] = useState("Click to add");
  const [product, setProduct] = useState({});
  const [relatedProduct, setRelatedProduct] = useState([]);

  const getProductById = () => {
    axios
      .get(`${process.env.REACT_APP_API}/product/${id}`)
      .then((res) => {
        setProduct(res.data);
        dispatch(getProducts(res.data));

        axios
          .get(
            `${process.env.REACT_APP_API}/product/category/${res.data.category._id}/subCategory/${res.data.subCategory._id}`
          )
          .then((related) => {
            setRelatedProduct(related.data);
          })
          .catch((err) => {
            console.log(err);
          });
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getProductById();
  }, [id]);

  const addToCartHandler = () => {
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
      setTooltip("Added");

      // dispatch action to add to cart
      dispatch(getAddToCart(unique));
      toast.success("تمت إضافة المنتج إلى السلة");
    }
  };

  const { name, description } = product;

  return (
    <>
      <div className="container-fluid">
        <div className="row pt-4">
          <div className="col-md-7">
            <SingleProductImages product={product} />

            <Tabs type="card">
              <TabPane tab="تفاصيل المنتج" key="1">
                <p className="text-description-hero">
                  {description && description}
                </p>
              </TabPane>
            </Tabs>
          </div>
          <div className="col-md-5">
            <h1 className="jumbotron p-3">{name}</h1>

            <Card
              actions={[
                <Tooltip
                  placement="top"
                  title={tooltip}
                  onClick={addToCartHandler}
                >
                  <ShoppingCartOutlined className="text-danger" />
                  <br />
                  اضف الى السلة
                </Tooltip>,

                <Tooltip placement="top" title={"اضغط للأضافة"}>
                  <HeartOutlined className="text-info" /> <br /> اضف الى المفضلة
                </Tooltip>,
              ]}
            >
              <ProductListItem product={product} />
            </Card>
          </div>

          <div className="row">
            <div className="col text-center pt-5 pb-5">
              <hr />
              <h4>المنتجات المشابهة</h4>
              <hr />
            </div>
          </div>
          <div className="row pb-5">
            <RelatedProduct products={relatedProduct} />
          </div>
        </div>
      </div>
    </>
  );
};

export default SingleProduct;
