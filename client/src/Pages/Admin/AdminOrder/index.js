import React, { useState } from "react";
import ShowPaymentInfo from "../../../Components/ShowPaymentInfo";
import { Link } from "react-router-dom";

const AdminOrder = ({ orders, handelStatusChange }) => {
  const [showOrderInTables, setShowOrderInTables] = useState(false);
  const [orderId, setOrderId] = useState("");

  const showOrderInTable = (order) => (
    <table className="table table-bordered">
      <thead className="thead-light">
        <tr>
          <th scope="col">اسم المنتج</th>
          <th scope="col">السعر</th>
          <th scope="col">العدد</th>
          <th scope="col">البائع</th>
        </tr>
      </thead>

      <tbody>
        {order.products.map((p, i) => (
          <tr key={i}>
            <td>
              <b>{order.orderdBy}</b>
            </td>
            <td>
              <Link to={`/product/${p.product.slug}`}>
                <td>{order.product.name}</td>
              </Link>
            </td>
            <td>{order.product.name}</td>
            <td>{order.price} JD</td>
            <td>{order.count}</td>
            <td>{order.product.theSeller}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );

  return (
    <div>
      {orders.map((order) => (
        <div key={order._id} className="row pb-5">
          <div className="btn btn-block bg-light">
            <ShowPaymentInfo order={order} showStatus={false} />

            <div className="row">
              <div className="col-md-4">حالة الطلب</div>
              <div className="col-md-8">
                <select
                  onChange={(e) =>
                    handelStatusChange(order._id, e.target.value)
                  }
                  className="form-control"
                  defaultValue={order.orderStatus}
                  name="status"
                >
                  <option value="لم تتم معالجتها بعد">
                    لم تتم معالجتها بعد
                  </option>
                  <option value="يتم المعالجة">يتم المعالجة</option>
                  <option value="لقد تم الارسال">لقد تم الارسال</option>
                  <option value="مرتجع">مرتجع</option>
                  <option value="ألغيت">ألغيت</option>
                  <option value="مكتمل">مكتمل</option>
                </select>
              </div>
            </div>
          </div>
          <br />
          {showOrderInTable(order)}
        </div>
      ))}
    </div>
  );
};

export default AdminOrder;
