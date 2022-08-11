import React from "react";

const ProductListItem = ({ product }) => {
  const { price, category, subCategory, brand, size } = product;
  return (
    <div>
      <ul className="">
        <li className="list-group-item">
          السعر
          <span className="label label-default label-pill pull-xs-right">
            <span className="text">{price && price} JD</span>
          </span>
        </li>
        <br />
        <li className="list-group-item">
          التصنيف
          <span className="label label-default label-pill pull-xs-right">
            <span className="text">{category && category.name}</span>
          </span>
        </li>
        <br />
        <li className="list-group-item">
          التصنيف الفرعي
          <span className="label label-default label-pill pull-xs-right">
            <span className="text">{subCategory && subCategory.name}</span>
          </span>
        </li>

        <br />
        <li className="list-group-item">
          الماركة
          <span className="label label-default label-pill pull-xs-right">
            <span className="text">{brand && brand.name}</span>
          </span>
        </li>

        <br />
        <li className="list-group-item">
          الكمية
          <span className="label label-default label-pill pull-xs-right">
            <span className="text">
              {size && size.map((s) => <span className="size">{s}</span>)}
            </span>
          </span>
        </li>

        <br />
      </ul>
    </div>
  );
};

export default ProductListItem;
