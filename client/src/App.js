import React, { lazy, Suspense } from "react";
import Header from "./Components/Headers";
import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AdminNav from "./Pages/Admin/AdminNav";
import "./App.css";
import Footer from "./Components/Footer";
import { LoadingOutlined } from "@ant-design/icons";

const Register = lazy(() => import("./Components/Register"));
const Login = lazy(() => import("./Components/Login"));
const Home = lazy(() => import("./Pages/Home"));
const ProductCategory = lazy(() => import("./Components/ProductCategory"));
const ProductByCategoryAndSub = lazy(() =>
  import("./Components/ProductByCategoryAndSub")
);
const SingleProduct = lazy(() => import("./Components/SingleProduct"));
const Cart = lazy(() => import("./Pages/Cart"));
const GetUserAddress = lazy(() => import("./Components/user/GetUserAddress"));
const Order = lazy(() => import("./Pages/Order"));
const NewOrders = lazy(() => import("./Components/user/NewOrders"));
const UserHistory = lazy(() => import("./Components/user/UserHistory"));
const AdminDashboardOrder = lazy(() =>
  import("./Pages/Admin/AdminDashboardOrder")
);
const CreateProduct = lazy(() => import("./Pages/Admin/CreateProduct"));
const AdminProducts = lazy(() => import("./Pages/Admin/Product"));
const UpdateProduct = lazy(() => import("./Pages/Admin/UpdateProduct"));
const CreateBrand = lazy(() => import("./Pages/Admin/CreateBrand"));
const CreateCategory = lazy(() => import("./Pages/Admin/CreateCategory"));
const CreateSubCategory = lazy(() => import("./Pages/Admin/CreateSubCategory"));
const CreateSlideImage = lazy(() => import("./Pages/Admin/CreateSlideImage"));
const OrderSecsusess = lazy(() => import("./Pages/OrderSecsusess"));
const Jops = lazy(() => import("./Pages/FooterPages/Jops"));
const PrivacyPolicy = lazy(() => import("./Pages/FooterPages/Privicy"));
const Advertise = lazy(() => import("./Pages/FooterPages/Advertise"));
const SallerWithUs = lazy(() => import("./Pages/FooterPages/SallerWithUs"));

const App = () => {
  return (
    <div className="App">
      <Suspense
        fallback={
          <div className="col text-center p-5">
            __ Demand
            <LoadingOutlined />
            __
          </div>
        }
      >
        <ToastContainer />
        {localStorage.getItem("role") &&
        localStorage.getItem("role") === "admin" ? (
          <>
            <Routes>
              <Route path="/" element={<AdminNav />} />
              <Route
                path="/admin/dashboard"
                element={<AdminDashboardOrder />}
              />
              <Route path="/admin/product" element={<CreateProduct />} />
              <Route path="/admin/products" element={<AdminProducts />} />
              <Route
                path="/admin/update/product/:id"
                element={<UpdateProduct />}
              />
              <Route path="/admin/brand" element={<CreateBrand />} />
              <Route path="/admin/category" element={<CreateCategory />} />
              <Route path="/admin/sub" element={<CreateSubCategory />} />
              <Route path="/admin/slideImage" element={<CreateSlideImage />} />
            </Routes>
          </>
        ) : (
          <>
            <Header />

            <>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route
                  path="/product/category/:id"
                  element={<ProductCategory />}
                />
                <Route
                  path="/product/category/:categoryId/sub/:subCategoryId"
                  element={<ProductByCategoryAndSub />}
                />
                <Route path="/product/:id" element={<SingleProduct />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/user/address" element={<GetUserAddress />} />
                <Route path="/order" element={<Order />} />
                <Route path="/user/orders" element={<NewOrders />} />
                <Route path="/user/history" element={<UserHistory />} />
                <Route path="/admin" element={<AdminNav />} />
                <Route path="/order/success" element={<OrderSecsusess />} />
                <Route path="/jops" element={<Jops />} />
                <Route path="/privicy" element={<PrivacyPolicy />} />
                <Route path="/advertise" element={<Advertise />} />
                <Route path="/saller" element={<SallerWithUs />} />
              </Routes>
            </>
            <Footer />
          </>
        )}
      </Suspense>
    </div>
  );
};

export default App;
