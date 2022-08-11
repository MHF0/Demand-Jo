import React, { useState } from "react";
import { CloseOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getAddToCart } from "../redux/reducers/addToCart";
import { Image } from "antd";
import "./style.css";

const ProductCardInCheckout = ({ p }) => {
  const dispatch = useDispatch();
  const { _id, name, price, size, count, category, subCategory } = p;

  const [butonCount, setButtonCount] = useState(count);

  const handelCountChange = (e) => {
    let count = e.target.value < 1 ? 1 : e.target.value;

    let cart = [];

    if (typeof window !== "undefined") {
      if (localStorage.getItem("cart")) {
        cart = JSON.parse(localStorage.getItem("cart"));
      }

      // eslint-disable-next-line
      cart.map((product, i) => {
        if (product._id === p._id) {
          cart[i].count = count;
        }
      });

      localStorage.setItem("cart", JSON.stringify(cart));
      dispatch(getAddToCart(cart));
    }
  };

  const handleRemove = () => {
    let cart = [];

    if (typeof window !== undefined) {
      if (localStorage.getItem("cart")) {
        cart = JSON.parse(localStorage.getItem("cart"));
      }

      // eslint-disable-next-line
      cart.map((product, i) => {
        if (product._id === p._id) {
          cart.splice(i, 1);
        }
      });

      localStorage.setItem("cart", JSON.stringify(cart));

      dispatch(getAddToCart(cart));
    }
  };

  return (
    <tbody>
      <tr>
        <td className="text-center">
          {<Image width={100} src={p.image && p.image[0].original} />}
        </td>

        <td>
          <Link to={`/product/${_id}`}>{name}</Link>
        </td>
        <td>{category && category.name}</td>
        <td>{subCategory && subCategory.name}</td>
        <td>{size}</td>

        <td className="text-center">
          <button
            className="buttonCount"
            onClick={() => {
              if (butonCount === 0) {
                setButtonCount(1);
                return;
              }
              setButtonCount(butonCount - 1);
              handelCountChange({ target: { value: count - 1 } });
            }}
          >
            -
          </button>

          <input
            type="number"
            className="form-control inputCount"
            defaultValue={butonCount || count}
            value={butonCount}
            onChange={handelCountChange}
            disabled={true}
          />
          <button
            className="buttonCount"
            onClick={() => {
              setButtonCount(butonCount + 1);
              handelCountChange({ target: { value: count + 1 } });
            }}
          >
            +
          </button>
        </td>
        <td className="text-center">{price} JD</td>

        <td className="text-center">
          <CloseOutlined
            onClick={handleRemove}
            className="text-danger pointer"
          />
        </td>
      </tr>
    </tbody>
  );
};

export default ProductCardInCheckout;
