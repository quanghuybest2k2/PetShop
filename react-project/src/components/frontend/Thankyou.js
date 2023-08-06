import { useLocation } from "react-router-dom";
import React, { useEffect, useState } from "react";
import axios from "axios";
import swal from "sweetalert";
import numeral from "numeral"; // format vnd

function Thankyou() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);

  const vnp_Amount = queryParams.get("vnp_Amount");
  const vnp_TxnRef = queryParams.get("vnp_TxnRef");

  useEffect(() => {
    if (vnp_Amount && vnp_TxnRef) {
      axios
        .post("save-payment", {
          vnp_Amount: vnp_Amount / 100,
          vnp_TxnRef: vnp_TxnRef,
        })
        .then((res) => {
          if (res.status === 200) {
            swal("Success", "Thanh toán thành công.", "success");
          } else {
            swal("Error", "Lỗi rồi", "error");
          }
        })
        .catch((error) => {
          if (error.response && error.response.status === 409) {
            swal("Error", error.response.data.message, "error");
          }
        });
    } else {
      console.log("Tham số truy vấn bị thiếu!");
    }
  }, [vnp_Amount, vnp_TxnRef]);

  return (
    <div>
      <div className="py-3 bg-info">
        <div className="container">
          <h6>Trang chủ / Lời cảm ơn</h6>
        </div>
      </div>

      <div className="py-4">
        <div className="container">
          <div className="col-md-12">
            <div className="card text-center p-5">
              <h4>Cảm ơn bạn đã đặt hàng.</h4>
              {vnp_Amount && (
                <p>
                  Số tiền:
                  {numeral(vnp_Amount / 100).format("0,0")}đ
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Thankyou;
