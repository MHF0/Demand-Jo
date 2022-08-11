import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { Card } from "antd";
import { Button } from "antd";
import Modal from "react-bootstrap/Modal";
import "./style.css";

const GetUserAddress = () => {
  const { token } = useSelector((state) => state.auth);

  const [address, setAddress] = useState([]);
  const [show, setShow] = useState(false);
  const [street, setStreet] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");

  const handleShow = () => setShow(true);

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

  const createAddress = () => {
    axios
      .post(
        `${process.env.REACT_APP_API}/address/`,
        {
          street,
          city,
          state,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        getAddress();
        setShow(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const UpdateAddress = (id) => {
    axios
      .put(
        `${process.env.REACT_APP_API}/address/update/${id}`,
        {
          street,
          city,
          state,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        getAddress();
        setShow(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleClose = (id) => {
    if (address.length === 0) {
      createAddress();
    } else {
      UpdateAddress(id);
    }
    setShow(false);
  };

  useEffect(() => {
    getAddress();
  }, []);
  return (
    <>
      {address.length !== 0 ? (
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <Card title="العنوان الخاصة بك" bordered={true}>
                {address.map((item) => (
                  <div className="row address" key={item._id}>
                    <p>الشارع: {item.street}</p>
                    <p>المدينة: {item.city}</p>
                    <p>المنطقة: {item.state}</p>
                  </div>
                ))}

                <button className="btn button_color" onClick={handleShow}>
                  تعديل العنوان
                </button>
              </Card>
            </div>
          </div>
        </div>
      ) : (
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <h4>اضف عنوانك</h4>

              <button className="btn button_color" onClick={handleShow}>
                اضف العنوان
              </button>
            </div>
          </div>
        </div>
      )}

      <Modal show={show} onHide={handleClose}>
        <Modal.Header>
          <Modal.Title>
            {address && address.length > 0 ? "تعديل العنوان" : "اضف العنوان"}{" "}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form>
            <div className="form-group">
              <label>الشارع</label>
              <input
                type="text"
                className="form-control input-color"
                placeholder="الشارع"
                name="street"
                defaultValue={street}
                onChange={(e) => setStreet(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label>المدينة</label>
              <input
                type="text"
                className="form-control input-color"
                placeholder="المدينة"
                name="city"
                defaultValue={city}
                onChange={(e) => setCity(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label>المنطقة</label>
              <input
                type="text"
                className="form-control input-color"
                placeholder="المنطقة"
                name="state"
                defaultValue={state}
                onChange={(e) => setState(e.target.value)}
              />
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            className="close-button"
            onClick={handleClose}
          >
            إلغاء
          </Button>

          {address.length !== 0 ? (
            <Button
              variant="primary"
              className="save-button"
              onClick={() => handleClose(address[0]._id)}
            >
              حفظ التغييرات
            </Button>
          ) : (
            <Button
              variant="primary"
              className="save-button"
              onClick={() => createAddress()}
            >
              اضافة عنوان جديد
            </Button>
          )}
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default GetUserAddress;
