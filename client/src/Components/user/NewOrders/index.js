import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import ShowPaymentInfo from "../../ShowPaymentInfo";
import { toast } from "react-toastify";
import { Button, Modal } from "antd";
import "./style.css";

const NewOrders = () => {
  const { token } = useSelector((state) => state.auth);

  const [orders, setOrders] = useState([]);

  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };
  const getOrders = () => {
    axios
      .get(`${process.env.REACT_APP_API}/order/history`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setOrders(res.data.orders.reverse());
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleOk = (id) => {
    axios
      .put(
        `${process.env.REACT_APP_API}/order/user/delete/${id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        toast.warn("تم إلغاء الطلب");
        setIsModalVisible(false);

        getOrders();
      });
  };

  const confirmOrder = (orderId) => {
    axios
      .put(
        `${process.env.REACT_APP_API}/order/confirm/${orderId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        toast.success("يمكنك الذهاب الى تفاصيل مشترياتك لتحميل الفاتورة");
        getOrders();
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
              <td>{order.price}</td>
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
        {showOrderInTable(order)}
        <h5>هل تم توصيل المنتج؟</h5>
        <span>
          {" "}
          <button
            className="btn button-color-yes"
            onClick={() => confirmOrder(order._id)}
          >
            نعم{" "}
          </button>
          <button className="btn button-color-no">لا </button>
        </span>

        <hr />

        <Button onClick={showModal}>الغاء الطلب</Button>

        <Modal
          title="إلغاء الطلب"
          visible={isModalVisible}
          onOk={() => handleOk(order._id)}
          onCancel={handleCancel}
        >
          <p>هل انت متأكد من إلغاء الطلب؟</p>
        </Modal>
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

export default NewOrders;
