import React from "react";
import { Link } from "react-router-dom";
import { Card, Tooltip } from "antd";
import { EyeOutlined, ShoppingCartOutlined } from "@ant-design/icons";
import Meta from "antd/lib/card/Meta";
import "./style.css";

const RelatedProduct = ({ products }) => {
  return (
    <div>
      <div className="container">
        <>
          <div className="row">
            {products &&
              products.map((item) => (
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
                      <Tooltip title="أضف إلى السلة">
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

export default RelatedProduct;
