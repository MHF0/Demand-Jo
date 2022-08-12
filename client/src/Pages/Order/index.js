import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAddToCart } from "../../Components/redux/reducers/addToCart";
import { useNavigate } from "react-router-dom";
import GetUserAddress from "../../Components/user/GetUserAddress";
import axios from "axios";
import "./style.css";
const Order = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { token } = useSelector((state) => state.auth);

  const [order, setOrder] = useState([]);
  const [total, setTotal] = useState(0);

  const getCart = (id) => {
    axios
      .get(`${process.env.REACT_APP_API}/cart`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        setOrder(res.data.products);
        setTotal(res.data.cartTotal);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const emptyCart = () => {
    axios
      .delete(`${process.env.REACT_APP_API}/cart`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        dispatch(getAddToCart([]));
        localStorage.removeItem("cart");
        setTotal(0);
        navigate("/");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const showAddresses = () => (
    <>
      <GetUserAddress />
    </>
  );

  const showProductSummary = () =>
    order.map((item) => (
      <div key={item._id}>
        <p>
          {item.count} x {item.product.name} ={item.product.price * item.count}
        </p>
      </div>
    ));

  const createOrder = () => {
    axios
      .post(
        `${process.env.REACT_APP_API}/order/create`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then((res) => {
        emptyCart();
        dispatch(getAddToCart([]));
        navigate("/order/success");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getCart();
  }, []);

  return (
    <div className="row">
      <div className="col-md-5">
        <h4>عنوانك</h4>
        {showAddresses()}
      </div>
      <div className="col-md-5">
        <h4>الطلب</h4>
        <hr />
        <p>المنتجات {order.length}</p>
        <hr />
        {showProductSummary()}
        <hr />
        <p>المجموع {total}</p>

        <button className="btn button-order" onClick={createOrder}>
          موافق
        </button>
      </div>
    </div>
  );
};

export default Order;
