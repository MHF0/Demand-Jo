import React from "react";

const Jops = () => {
  return (
    <>
      <div className="container">
        <br />
        <div id="accordion">
          <div className="card">
            <div className="card-header">
              <h4 className="card-link col-md-5">الوظائف</h4>
            </div>
            <div>
              <h6 className="card-body">
                لا يوجد وظائف متاحة حاليا، يرجى التواصل معنا لمزيد من المعلومات
              </h6>
            </div>
            <div>
              <h6 className="card-body">
                {" "}
                أو ارسل سيرتك الذاتية إلى البريد الإلكتروني التالي:{" "}
                <a href="mailto: info@demandjo.com">info@demandjo.com</a>{" "}
              </h6>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Jops;
