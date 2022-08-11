import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "../redux/reducers/auth";
import { EyeInvisibleOutlined, EyeOutlined } from "@ant-design/icons";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import "./style.css";

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [fullName, setFullName] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handelShowPassword = () => setShowPassword(!showPassword);

  const handleRegister = () => {
    if (
      fullName.length === 0 ||
      companyName.length === 0 ||
      phoneNumber.length === 0 ||
      email.length === 0 ||
      password.length === 0
    ) {
      toast.error("يجب ملئ جميع الحقول");
      return;
    } else if (password.length < 6) {
      toast.error("كلمة المرور قصيرة جداً");
      return;
    } else if (phoneNumber.length < 10) {
      toast.error("رقم الهاتف غير صحيح");
      return;
    } else if (email.includes("@") === false) {
      toast.error("البريد الالكتروني غير صحيح");
      return;
    } else {
      axios
        .post(`${process.env.REACT_APP_API}/register`, {
          fullName,
          companyName,
          phoneNumber,
          email,
          password,
        })
        .then((res) => {
          dispatch(login(res.data.token));
          navigate("/");
        })
        .catch((err) => {
          toast.error("البريد الالكتروني موجود مسبقاً");
          console.log(err);
        });
    }
  };
  return (
    <div className="container p-5">
      <div className="row">
        <div className="col-md-6">
          <h1>انشاء حساب</h1>
          <form onSubmit={handleRegister}>
            <div className="form-group">
              <label className="label">الاسم الكامل:</label>
              <input
                type="text"
                className="register_input"
                onChange={(e) => setFullName(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label className="label">اسم المنشئة او المطعم:</label>

              <input
                type="text"
                className="register_input"
                onChange={(e) => setCompanyName(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label className="label">رقم الهاتف:</label>

              <input
                type="number"
                className="register_input"
                placeholder="7911234567"
                onChange={(e) => setPhoneNumber(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label className="label"> :E-mail</label>

              <input
                type="email"
                className="register_input"
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label className="label">كلمة المرور:</label>

              <input
                type={showPassword ? "text" : "password"}
                className="register_input"
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

            <button
              onClick={(e) => {
                e.preventDefault();
                handleRegister();
              }}
              className="button"
            >
              انضم الان
            </button>
          </form>
          <div className="not_Register">
            <span>لديك حساب؟ </span>

            <span>
              <Link to="/login">سجل الان</Link>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
