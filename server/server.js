const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

// Routes require
const registerRouter = require("./routers/register");
const loginRouter = require("./routers/login");
const categoryRouter = require("./routers/category");
const brandRouter = require("./routers/brand");
const addressRouter = require("./routers/address");
const sliderImageRouter = require("./routers/sliderImage");
const subCategoryRouter = require("./routers/subCategory");
const productRouter = require("./routers/product");
const cartRouter = require("./routers/cart");
const orderRouter = require("./routers/order");
const userRouter = require("./routers/user");
const cloudinaryRouter = require("./routers/cloudinary");
//

// DB Connection
const connect = mongoose.connect(process.env.DB_CONNECTION);
connect
  .then(() => console.log("DB Connected"))
  .catch((err) => console.log(err));
//

// dev routes
const app = express();
app.use(cors());
app.use(express.json({ limit: "50mb" }));
app.use(morgan("dev"));
app.use(bodyParser.json({ limit: "50mb" }));
//

// routes
app.use("/api/register", registerRouter);
app.use("/api/login", loginRouter);
app.use("/api/category", categoryRouter);
app.use("/api/brand", brandRouter);
app.use("/api/address", addressRouter);
app.use("/api/sliderImage", sliderImageRouter);
app.use("/api/subCategory", subCategoryRouter);
app.use("/api/product", productRouter);
app.use("/api/cart", cartRouter);
app.use("/api/order", orderRouter);
app.use("/api/user", userRouter);
app.use("/api/cloudinary", cloudinaryRouter);
//

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server conecting on port ${PORT}`));
