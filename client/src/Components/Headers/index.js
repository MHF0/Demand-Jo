import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./style.css";
import {
  EnvironmentOutlined,
  SearchOutlined,
  ShoppingOutlined,
  TransactionOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { getUserInfo } from "../redux/reducers/auth";
import Category from "../Category";
import { Menu, Dropdown } from "antd";
import { logout } from "../redux/reducers/auth";
import Logo from "./D2.png";

const Header = () => {
  const { isLoggedIn, token, userInfo } = useSelector((state) => state.auth);

  const navigate = useNavigate();

  const { addToCart } = useSelector((state) => state.addToCart);
  const dispatch = useDispatch();

  const [searchResult, setSearchResult] = useState([]);
  const [search, setSearch] = useState(false);
  const [address, setAddress] = useState([]);

  const getSearchResult = (searchValue) => {
    if (searchValue.length > 0) {
      axios
        .get(`${process.env.REACT_APP_API}/product/search/${searchValue}`)
        .then((res) => {
          setSearchResult(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
    setSearch(!search);
  };

  const handelGetCarrentUser = () => {
    axios
      .get(`${process.env.REACT_APP_API}/user`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        dispatch(getUserInfo(res.data));
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getAddress = () => {
    axios
      .get(`${process.env.REACT_APP_API}/address/user`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setAddress(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getAddress();
    handelGetCarrentUser();
  }, [token]);

  const fullName = userInfo && userInfo.fullName;

  const menu = (
    <Menu>
      <Menu.Item key="1">
        <Link to="/user/orders">حالة الطلب</Link>
      </Menu.Item>
      <Menu.Item key="2">
        <Link to="/user/address">عنوانك</Link>
      </Menu.Item>
      <Menu.Item
        key="3"
        onClick={() => {
          navigate("/login");
          dispatch(logout());
          window.location.reload();
        }}
      >
        تسجيل الخروج
      </Menu.Item>
    </Menu>
  );

  return (
    <>
      <div className="header">
        <Link to="/">
          <div className="header_logo">
            <img src={Logo} alt="logo" width="120" className="logo"/>
          </div>
        </Link>

        <div className="header_nav">
          <div className="header_text">
            <Link to={isLoggedIn ? "/user/address" : "/login"}>
              <div className="header_text1">التوصيل إلى</div>

              <div className="header_text2">
                {<EnvironmentOutlined className="EnvironmentOutlined" />}
                {address.length
                  ? address[0].street.substring(0, 8) + "..."
                  : "ادخل العنوان"}
              </div>
            </Link>
          </div>
        </div>

        <div className="header_search">
          <input
            type="text"
            placeholder="البحث"
            className="header_searchInput"
            onChange={(e) => {
              setSearch(!search);

              getSearchResult(e.target.value);
            }}
          />
          <SearchOutlined
            style={{ fontSize: "20px" }}
            className="headerSearchIcon"
          />
        </div>
        <div className="search_result_countainer">
          {searchResult &&
            search &&
            searchResult.map((item) => {
              return (
                <Link
                  to={`/product/${item._id}`}
                  className="search_result"
                  onClick={() => {
                    setSearch(!search);
                  }}
                >
                  <p>{item.name}</p>
                </Link>
              );
            })}
        </div>

        <div className="header_text_right">
          <div className="header_text">
            <div className="header_text1">اللغة</div>
            <div className="header_text2">
              {<TransactionOutlined className="TranslationOutlined" />}
              العربية
            </div>
          </div>
        </div>

        {isLoggedIn ? (
          <div className="header_text_right1">
            <Dropdown overlay={menu} placement="bottomRight">
              <div className="header_text">
                <div className="header_text1">
                  مرحبا، {fullName && fullName.split(" ")[0]}
                </div>
                <div className="header_text2">
                  <UserOutlined className="UserOutlined" />
                  الحساب والقوائم
                </div>
              </div>
            </Dropdown>
          </div>
        ) : (
          <div className="header_text_right1">
            <Link to="/login">
              <div className="header_text">
                <div className="header_text1">مرحبا، سجل الدخول</div>
                <div className="header_text2">
                  <UserOutlined className="UserOutlined" />
                  الحساب والقوائم
                </div>
              </div>
            </Link>
          </div>
        )}

        <div className="header_text_right2">
          <Link to={isLoggedIn ? "/user/history" : "/login"}>
            <div className="header_text">
              <div className="header_text1">تفاصيل</div>
              <div className="header_text2">مشترياتك</div>
            </div>
          </Link>
        </div>

        <div className="UserOutlined">
          <Dropdown overlay={menu} placement="bottomRight">
            <Link to={!isLoggedIn && "/login"}>
              <UserOutlined className="UserOutlined" />
            </Link>
          </Dropdown>
        </div>

        <div className="header_cart">
          <Link to={"/cart"}>
            <ShoppingOutlined
              className="ShoppingOutlined"
              style={{ fontSize: "40px" }}
            />
            <span className="number_of_cart">{addToCart.length}</span>
          </Link>
        </div>
      </div>
      <Category />
    </>
  );
};

export default Header;
