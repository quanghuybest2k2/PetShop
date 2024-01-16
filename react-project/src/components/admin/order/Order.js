import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import numeral from "numeral"; // format vnd
import LoadingSpinner from "../../LoadingSpinner";

function Order() {
  const [loading, setLoading] = useState(true);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    let isMounted = true;
    document.title = "Đặt hàng";

    axios.get(`admin/orders`).then((res) => {
      if (isMounted) {
        if (res.data.status === 200) {
          setOrders(res.data.orders);
          setLoading(false);
        }
      }
    });
    return () => {
      isMounted = false;
    };
  }, []);

  var display_orders = "";
  if (loading) {
    return <LoadingSpinner />;
  } else {
    display_orders = orders.map((item) => {
      return (
        <tr key={item.id}>
          <td>{item.tracking_no}</td>
          <td>{numeral(item.amount).format("0,0")}đ</td>
          <td>{item.address}</td>
          <td>{item.payment_mode}</td>
          <td>
            <Link
              to={`view-order/${item.id}`}
              className="btn btn-success btn-sm"
            >
              Xem
            </Link>
          </td>
        </tr>
      );
    });
  }

  return (
    <div className="container px-4 mt-3">
      <div className="card">
        <div className="card-header">
          <h4>Đặt hàng </h4>
        </div>
        <div className="card-body">
          <div className="table-responsive">
            <table className="table table-bordered table-striped">
              <thead>
                <tr>
                  <th>Mã đặt hàng</th>
                  <th>Tổng tiền</th>
                  <th>Địa chỉ</th>
                  <th>Hình thức thanh toán</th>
                  <th>Xem chi tiết</th>
                </tr>
              </thead>
              <tbody>{display_orders}</tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Order;
