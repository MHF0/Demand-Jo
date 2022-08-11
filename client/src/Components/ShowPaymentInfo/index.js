import React from "react";
import "./style.css";
const ShowPaymentInfo = ({ order, showStatus = true }) => {
  return (
    <div>
      <p className="text-center">
        <span>رقم الطلب: {order._id.substring(7, 3)}</span>
        {" / "}
        <span>العملة: {order.paymentIntent.currency.toUpperCase()}</span>
        {" / "}

        <span>طريقة الدفع: {order.paymentIntent.status.toUpperCase()}</span>
        {" / "}
        <span>
          تم انشاء الطلب في:{" / "}
          {new Date(order.createdAt).toLocaleString()}
        </span>
        <br />
        {showStatus && (
          <span className="badge color text-white">
            حالة الطلب: {order.orderStatus}
          </span>
        )}
      </p>
    </div>
  );
};

export default ShowPaymentInfo;
