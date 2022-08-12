import React from "react";
import { Button, Result } from "antd";
import { useNavigate } from "react-router-dom";

const OrderSecsusess = () => {
  const navigate = useNavigate();
  return (
    <Result
      status="success"
      title="تم عملية الشراء بنجاح"
      subTitle="سوف يتم مراجعة الطلب قريبا وسيتم الاتصال بك باسرع وقت"
      extra={[
        <Button type="primary" key="Home" onClick={() => navigate("/")}>
          الذهاب الى الرئيسية
        </Button>,
      ]}
    />
  );
};

export default OrderSecsusess;
