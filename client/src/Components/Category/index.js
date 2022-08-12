import React, { useState, useEffect } from "react";
import axios from "axios";
import "./style.css";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Nav from "react-bootstrap/Nav";

const Category = () => {
  const [category, setCategory] = useState([]);
  const [subCategory, setsubCategory] = useState([]);

  const getSubCategory = () => {
    axios
      .get(`${process.env.REACT_APP_API}/subCategory`)
      .then((res) => {
        setsubCategory(res.data.subCategories);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getCategory = () => {
    axios
      .get(`${process.env.REACT_APP_API}/category`)
      .then((res) => {
        setCategory(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getSubCategory();
    getCategory();
  }, []);

  return (
    <>
      <Navbar className="navbar nav-color" expand="lg">
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-left my-2 my-lg-0 nav-dropdown"
            style={{ maxHeight: "200px" }}
            navbarScroll
          >
            {category &&
              category.map((item) => (
                <NavDropdown
                  key={item._id}
                  title={item.name}
                  id="navbarScrollingDropdown"
                >
                  {subCategory &&
                    subCategory.map((subItem) => (
                      <NavDropdown.Item
                        key={subItem._id}
                        href={`/product/category/${item._id}/sub/${subItem._id}`}
                      >
                        {subItem.name}
                      </NavDropdown.Item>
                    ))}
                </NavDropdown>
              ))}
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      <br />
    </>
  );
};

export default Category;
