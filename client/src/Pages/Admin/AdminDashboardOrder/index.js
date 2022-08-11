import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import axios from "axios";
import AdminNav from "../AdminNav";
import ShowPaymentInfo from "../../../Components/ShowPaymentInfo";
import { Button, Modal } from "antd";

const AdminDashboardOrder = () => {
  const [orders, setOrders] = useState([]);
  const [showOrderInTables, setShowOrderInTables] = useState(false);
  const [orderId, setOrderId] = useState("");
  const [showUser, setShowUser] = useState(false);
  const [userAddress, setUserAddress] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isDone, setIsDone] = useState(false);

  const showModal = (userId) => {
    setIsModalVisible(true);

    axios
      .get(`${process.env.REACT_APP_API}/address/admin/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setUserAddress(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleOk = () => {
    setIsModalVisible(false);
    setIsDone(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setIsDone(false);
  };

  const isDonShow = (id) => {
    setIsDone(true);
    axios
      .put(
        `${process.env.REACT_APP_API}/order/admin/${id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        toast.success("تم تحديث الطلب");
        getOrders();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const { token } = useSelector((state) => state.auth);
  useEffect(() => {
    getOrders();
  }, []);

  const getOrders = () => {
    axios
      .get(`${process.env.REACT_APP_API}/order/admin/order`, {
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

  const showOrderInTable = (order) => (
    <table className="table table-bordered">
      <thead className="thead-light">
        <tr>
          <th scope="col">اسم المنتج</th>
          <th scope="col">السعر</th>
          <th scope="col">العدد</th>
          <th scope="col">البائع</th>
          <th scope="col">رقم المنتج</th>
        </tr>
      </thead>

      <tbody>
        {order.products.map((p, i) => (
          <tr key={i}>
            {/*      <td>
              <b>{p.orderdBy}</b>
            </td> */}
            <td>
              <td>{p.product.name}</td>
            </td>
            <td>{p.price} JD</td>
            <td>{p.count}</td>
            <td>{p.product.theSeller}</td>
            <td>{p.product.productNum}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );

  const handelStatusChange = (orderId, orderStatus) => {
    axios
      .put(
        `${process.env.REACT_APP_API}/order/admin/update/order/${orderId}`,
        { orderStatus },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        toast.success("تم تحديث حالة الطلب");
        getOrders();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const showUserDetels = (order) => (
    <table className="table table-bordered">
      <thead className="thead-light">
        <tr>
          <th scope="col">اسم المستخدم</th>
          <th scope="col">البريد الالكتروني</th>
          <th scope="col">رقم الهاتف</th>
          <th scope="col">العنوان</th>
        </tr>
      </thead>

      <tbody>
        <tr key={order.orderBy._id}>
          <td>{order.orderBy.fullName}</td>
          <td>{order.orderBy.email}</td>
          <td>{order.orderBy.phoneNumber}</td>
          <td>
            <Button type="primary" onClick={() => showModal(order.orderBy._id)}>
              عرض العنوان
            </Button>
          </td>
        </tr>
      </tbody>
    </table>
  );

  const handelClicks = (order) => {
    setOrderId(order._id);
    setShowUser(!showUser);
  };

  return (
    <>
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-2">
            <AdminNav />
          </div>

          <div className="col-md-10">
            <h4>Admin Dashboard</h4>
            {orders.map((order) => (
              <div key={order._id} className="row pb-5">
                <div className="btn btn-block bg-light">
                  <ShowPaymentInfo order={order} showStatus={false} />

                  <div className="row">
                    <div className="col-md-4">Delivery Status</div>
                    <div className="col-md-8">
                      <select
                        onChange={(e) =>
                          handelStatusChange(order._id, e.target.value)
                        }
                        className="form-control"
                        defaultValue={order.orderStatus}
                        name="status"
                      >
                        <option value="Not Processed">
                          لم تتم معالجتها بعد
                        </option>
                        <option value="Processing">يتم المعالجة</option>
                        <option value="Dispatched">لقد تم الارسال</option>
                        <option value="Cancelled">ألغيت</option>
                        <option value="Completed">مكتمل</option>
                      </select>
                    </div>
                  </div>
                </div>
                <br />
                <button
                  onClick={() => {
                    setOrderId(order._id);
                    setShowOrderInTables(!showOrderInTables);
                  }}
                >
                  عرض تفاصيل الطلب
                </button>

                {orderId === order._id &&
                  showOrderInTables &&
                  showOrderInTable(order)}
                <br />
                <button
                  onClick={() => {
                    handelClicks(order);
                  }}
                >
                  عرض تفاصيل المشتري
                </button>

                {orderId === order._id && showUser && showUserDetels(order)}

                <Modal
                  title="تفاصيل العنوان"
                  visible={isModalVisible}
                  onOk={handleOk}
                  onCancel={handleCancel}
                >
                  {userAddress.length > 0 && (
                    <table className="table table-bordered">
                      <thead className="thead-light">
                        <tr>
                          <th scope="col">المدينة</th>
                          <th scope="col">الشارع</th>
                          <th scope="col">المنطقة</th>
                        </tr>
                      </thead>

                      <tbody>
                        {userAddress.map((address, i) => (
                          <tr key={i}>
                            <td>{address.city}</td>
                            <td>{address.street}</td>
                            <td>{address.state}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  )}
                </Modal>

                <br />
                <button onClick={() => isDonShow(order._id)}>
                  تم توصيل الطلب
                </button>

                <Modal
                  title="توصيل الطلب"
                  visible={isDone}
                  onOk={handleOk}
                  onCancel={handleCancel}
                >
                  هل انت نتأكد؟
                </Modal>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminDashboardOrder;
