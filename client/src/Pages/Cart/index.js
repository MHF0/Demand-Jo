import React from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useSelector } from "react-redux";
import ProductCardInCheckout from "../../Components/ProductCardInCheckout/index";
import "./style.css";

const Cart = () => {
  const navigate = useNavigate();
  const { addToCart } = useSelector((state) => state.addToCart);
  const { token } = useSelector((state) => state.auth);

  const cardTotal = () => {
    return addToCart.reduce((currentValue, nextValue) => {
      return currentValue + nextValue.count * nextValue.price;
    }, 0);
  };

  const saveToDatabase = () => {
    axios
      .post(
        `${process.env.REACT_APP_API}/cart`,
        { cart: addToCart },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then((res) => {
        console.log(res);
        navigate("/order");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const showUserCart = () => (
    <table className="table table-bordered">
      <thead className="thead-light">
        <tr>
          <th>الصورة</th>
          <th>الأسم</th>
          <th>الصنف</th>
          <th>الصنف الفرعي</th>
          <th>الكمية</th>
          <th>العدد</th>
          <th>السعر</th>
          <th>ازالة المنتج</th>
        </tr>
      </thead>

      {addToCart &&
        addToCart.map((item) => (
          <ProductCardInCheckout key={item._id} p={item} />
        ))}
    </table>
  );

  return (
    <div className="container-fluid pt-2">
      <div className="row">
        <div className="col-md-8">
          <h4>السلة / المنتجات {addToCart.length}</h4>

          {!addToCart.length ? (
            <p>
              لا يوجد منتجات <Link to="/">تابع الشراء.</Link>
            </p>
          ) : (
            showUserCart()
          )}
        </div>

        <div className="col-md-4">
          <h4>تفاصيل الطلب</h4>
          <hr />
          <p>المنتج</p>
          {addToCart.map((c, i) => (
            <div key={i}>
              <p>
                x {c.count} {c.name}= {c.price * c.count}JD
              </p>
            </div>
          ))}
          <hr />
          <p>المبلغ كامل: {cardTotal()} JD</p>
          <hr />
          {token ? (
            <button
              onClick={saveToDatabase}
              className="btn btn-sm mt-2 button-color"
              disabled={!addToCart.length}
            >
              تاكيد الطلب
            </button>
          ) : (
            <button className="btn btn-sm button-color mt-2">
              <Link
                to={{
                  pathname: "/login",
                  state: { from: "cart" },
                }}
              >
                يجب تسجيل الدخول لتتمكن من تأكيد الطلب
              </Link>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Cart;
