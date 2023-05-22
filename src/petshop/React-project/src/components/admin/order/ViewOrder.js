import axios from "axios";
import React, { useEffect, useState } from "react";
import swal from "sweetalert";
import { useHistory } from "react-router-dom";
import numeral from "numeral"; // format vnd

function ViewOrder(props) {
  const [order, setOrder] = useState([]);
  const history = useHistory();

  useEffect(() => {
    document.title = "Xem chi tiết đơn hàng";

    const order_id = props.match.params.id;
    axios.get(`admin/view-order/${order_id}`).then((res) => {
      if (res.data.status === 200) {
        setOrder(res.data.order);
      } else if (res.data.status === 404) {
        swal("Error", res.data.errors, "error");
        history.push("/admin/orders");
      }
    });
  }, [props.match.params.id, history]);

  return (
    <div class="container py-5 h-100">
      <div class="row d-flex justify-content-center align-items-center h-100">
        <div class="col-lg-10 col-xl-8">
          <div class="card">
            <div class="card-header px-4 py-5">
              <h5 class="text-muted mb-0">Chi tiết về đơn hàng</h5>
            </div>
            <div class="card-body p-4">
              <div class="card shadow-0 border mb-4">
                <div class="d-flex justify-content-between pt-2">
                  <p class="fw-bold mb-0 fs-4">Thông tin chi tiết</p>
                  <p class="text-muted mb-0">
                    <span class="fw-bold me-4">Tổng tiền</span>
                    {numeral(order.amount).format("0,0")}đ
                  </p>
                </div>
                <div>
                  <div class="d-flex justify-content-between pt-2">
                    <p class="text-muted mb-0">
                      <u>
                        <b>Mã đơn hàng</b>
                      </u>{" "}
                      : {order.tracking_no}
                    </p>
                    <p class="text-muted mb-0">
                      <span class="fw-bold me-4">Vào lúc:</span>
                      {new Date(order.created_at).toLocaleDateString("vi-VN")}
                    </p>
                  </div>

                  <div class="d-flex justify-content-between">
                    <p class="text-muted mb-0">
                      <u>
                        <b>Hình thức thanh toán</b>
                      </u>
                      : {order.payment_mode}
                    </p>
                    <p class="text-muted mb-0">
                      <span class="fw-bold me-4">Phí ship</span> Miễn phí
                    </p>
                  </div>

                  <div class="d-flex justify-content-between mb-5">
                    <p class="text-muted mb-0">
                      <u>
                        <b>Địa chỉ giao hàng</b>
                      </u>
                      :
                      <br />
                      {order.address}
                    </p>
                  </div>
                </div>
              </div>
              <div
                class="card-footer border-0 px-4 py-5"
                className="bg-primary"
              >
                <h5 class="d-flex align-items-center justify-content-end text-white text-uppercase mb-0">
                  Tổng thanh toán:
                  <span class="h2 mb-0 ms-2">
                    {numeral(order.amount).format("0,0")}đ
                  </span>
                </h5>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ViewOrder;
