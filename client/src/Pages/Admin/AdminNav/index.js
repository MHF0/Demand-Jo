import React from "react";
import { Link } from "react-router-dom";
import "./adminNav.css";

const AdminNav = () => {
  return (
    <nav>
      <ul className="nav flex-column">
        <li className="nav-item">
          <Link to="/admin/dashboard" className="nav-link admin-color">
            الاوردرات
          </Link>
        </li>

        <li className="nav-item">
          <Link to="/admin/product" className="nav-link admin-color">
            انشاء منتجات
          </Link>
        </li>

        <li className="nav-item">
          <Link to="/admin/products" className="nav-link admin-color">
            جميع المنتجات
          </Link>
        </li>

        <li className="nav-item">
          <Link to="/admin/brand" className="nav-link admin-color">
            انشاء براند
          </Link>
        </li>

        <li className="nav-item">
          <Link to="/admin/category" className="nav-link admin-color">
            الصنف
          </Link>
        </li>

        <li className="nav-item">
          <Link to="/admin/sub" className="nav-link admin-color">
            الاصناف الفرعية
          </Link>
        </li>

        <li className="nav-item">
          <Link to="/admin/slideImage" className="nav-link admin-color">
            اضافة صور ايجابيات الموقع
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default AdminNav;
