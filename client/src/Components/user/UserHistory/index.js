import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import ShowPaymentInfo from "../../ShowPaymentInfo";
import "./style.css";

const UserHistory = () => {
  const { token } = useSelector((state) => state.auth);

  const [orders, setOrders] = useState([]);

  const [showOrderInTables, setShowOrderInTables] = useState(false);
  const [orderId, setOrderId] = useState("");

  const getOrders = () => {
    axios
      .get(`${process.env.REACT_APP_API}/order/delivered`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setOrders(res.data.orders);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const showOrderInTable = (orders) => (
    <table className="table table-bordered">
      <thead className="thead-light">
        <tr>
          <th scope="col">اسم المنتج</th>
          <th scope="col">السعر</th>
          <th scope="col">العدد</th>
        </tr>
      </thead>

      <tbody>
        {orders.products.map((order) => (
          <>
            <tr>
              <td>{order.product.name}</td>
              <td>{order.price} JD</td>
              <td>{order.count}</td>
            </tr>
          </>
        ))}
      </tbody>
    </table>
  );

  const showEachOrder = () =>
    orders.reverse().map((order, i) => (
      <div key={i} className="m-5 p-3 card">
        <ShowPaymentInfo order={order} />

        <button
          onClick={() => {
            setOrderId(order._id);
            setShowOrderInTables(!showOrderInTables);
          }}
        >
          عرض تفاصيل الطلب
        </button>

        {orderId === order._id && showOrderInTables && showOrderInTable(order)}
      </div>
    ));

  useEffect(() => {
    getOrders();
  }, []);

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col">
          <h4>
            {orders.length ? "المشتريات القائمة" : "لا يوجد مشتريات قائمة"}
          </h4>
          <hr />
          {showEachOrder()}
        </div>
      </div>
    </div>
  );
};

export default UserHistory;
