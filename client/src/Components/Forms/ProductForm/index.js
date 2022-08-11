import React from "react";

const ProductForm = ({
  handleSubmit,
  imageUpload,
  name,
  setName,
  description,
  setDescription,
  price,
  setPrice,
  setCategory,
  setBrand,
  setSubCategories,
  size,
  setSize,
  theSeller,
  setTheSeller,
  productNum,
  setProductNum,
  getCategory,
  getSubCategory,
  getBrand,
}) => {
  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label>الصور</label>
        {imageUpload()}
      </div>
      <div className="form-group">
        <label>الاسم</label>
        <input
          type="text"
          className="form-control"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>

      <div className="form-group">
        <label>الوصف</label>
        <input
          type="text"
          className="form-control"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
      </div>

      <div className="form-group">
        <label>السعر</label>
        <input
          type="number"
          className="form-control"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          required
        />
      </div>

      <div className="form-group">
        <label>الماركة</label>
        <select
          name="brand"
          className="form-control"
          onChange={(e) => setBrand(e.target.value)}
        >
          <option>اختر الماركة</option>
          {getBrand.length > 0 &&
            getBrand.map((b) => (
              <option key={b._id} value={b._id}>
                {b.name}
              </option>
            ))}
        </select>
      </div>

      <div className="form-group">
        <label>الحجم</label>
        <input
          type="text"
          className="form-control"
          value={size}
          onChange={(e) => setSize(e.target.value)}
          required
        />
      </div>

      <div className="form-group">
        <label>المتاجر</label>
        <input
          type="text"
          className="form-control"
          value={theSeller}
          onChange={(e) => setTheSeller(e.target.value)}
          required
        />
      </div>

      <div className="form-group">
        <label>رقم المنتج</label>
        <input
          type="text"
          className="form-control"
          value={productNum}
          onChange={(e) => setProductNum(e.target.value)}
          required
        />
      </div>

      <div className="form-group">
        <label>الصنف</label>
        <select
          name="category"
          className="form-control"
          onChange={(e) => setCategory(e.target.value)}
        >
          <option>اختار الصنف</option>
          {getCategory.length > 0 &&
            getCategory.map((c) => (
              <option key={c._id} value={c._id}>
                {c.name}
              </option>
            ))}
        </select>
      </div>

      <div className="form-group">
        <label>الفئة</label>
        <select
          name="subCategories"
          className="form-control"
          onChange={(e) => setSubCategories(e.target.value)}
        >
          <option>اختار الفئة</option>
          {getSubCategory.length > 0 &&
            getSubCategory.map((s) => (
              <option key={s._id} value={s._id}>
                {s.name}
              </option>
            ))}
        </select>
      </div>

      <button
        onClick={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
        className="btn btn-outline-info"
      >
        حفظ
      </button>
    </form>
  );
};

export default ProductForm;
