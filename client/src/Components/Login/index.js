import React, { useState } from "react";
import { login } from "../redux/reducers/auth";
import { EyeInvisibleOutlined, EyeOutlined } from "@ant-design/icons";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";

import "./style.css";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");

  const handelShowPassword = () => setShowPassword(!showPassword);

  const handleLogin = () => {
    if (password.length === 0) {
      toast.error("يجب ملئ جميع الحقول");
      return;
    }

    if (email === "") {
      axios
        .post(`${process.env.REACT_APP_API}/login`, {
          phoneNumber,
          password,
        })
        .then((res) => {
          dispatch(login(res.data.token));
          localStorage.setItem("role", res.data.role);
          navigate("/");
        })
        .catch((err) => {
          console.log(err);
        });

      return;
    } else {
      axios
        .post(`${process.env.REACT_APP_API}/login`, {
          email,
          password,
        })
        .then((res) => {
          dispatch(login(res.data.token));
          navigate("/");
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };
  return (
    <div className="container p-5">
      <div className="row">
        <div className="col-md-6">
          <h1>تسجيل الدخول</h1>
          <form onSubmit={handleLogin}>
            <div className="form-group">
              <label className="label"> :E-mail</label>

              <input
                type="email"
                className="login_input"
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                required
              />
            </div>
            <h5>أو</h5>
            <div className="form-group">
              <label className="label">رقم الهاتف:</label>

              <input
                type="email"
                className="login_input"
                onChange={(e) => {
                  setPhoneNumber(e.target.value);
                }}
                required
              />
            </div>

            <div className="form-group">
              <label className="label">كلمة المرور:</label>

              <input
                type={showPassword ? "text" : "password"}
                className="login_input"
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              {showPassword ? (
                <EyeOutlined
                  className="showPassword"
                  onClick={handelShowPassword}
                />
              ) : (
                <EyeInvisibleOutlined
                  className="showPassword"
                  onClick={handelShowPassword}
                />
              )}
            </div>
          </form>
          <button
            onClick={(e) => {
              e.preventDefault();
              handleLogin();
            }}
            className="button"
          >
            سجل الدخول
          </button>

          <div className="not_Register">
            <span>لا تمتلك حساب؟ </span>

            <span>
              <Link to="/register">انضم الان </Link>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
