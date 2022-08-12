import React from "react";
import { Link } from "react-router-dom";
import "./style.css";

const Footer = () => {
  return (
    <div className="Box_footer">
      <div className="Row_footer">
        <div className="Container_footer">
          <div className="Column_footer">
            <h1 className="Heading_footer">اعرف المزيد عنا</h1>
            <Link to={`/jops`} className="FooterLink">
              وظائف
            </Link>
            <Link to={`/privicy`} className="FooterLink">
              خصوصية الموقع
            </Link>
            <Link to={`/about`} className="FooterLink">
              من نحن
            </Link>
          </div>
        </div>

        <div className="Container_footer">
          <div className="Column_footer">
            <h1 className="Heading_footer">كن شريكاً معنا</h1>
            <Link to={`/saller`} className="FooterLink">
              انضم لنا
            </Link>

            <Link to={`/saller`} className="FooterLink">
              البيع على Demand
            </Link>

            <Link to={`/saller`} className="FooterLink">
              أعلن عن منتجاتك
            </Link>
          </div>
        </div>

        <div className="Container_footer">
          <div className="Column_footer">
            <h1 className="Heading_footer">دعنا نساعدك</h1>
            <Link to={`/user/history`} className="FooterLink">
              حسابك
            </Link>

            <Link to={`/user/orders`} className="FooterLink">
              مشترياتك
            </Link>

            <Link to={`/about`} className="FooterLink">
              خاصية الدفع عند التوصيل
            </Link>
          </div>
        </div>

        <div className="Container_footer">
          <div className="Column_footer">
            <h1 className="Heading_footer">حساباتنا</h1>
            <Link to={`/about`} className="FooterLink">
              فيس بوك
            </Link>

            <Link to={`/about`} className="FooterLink">
              لينكد اين
            </Link>

            <Link to={`/about`} className="FooterLink">
              تويتر
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
