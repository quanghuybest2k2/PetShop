import React, { useEffect, useState } from "react";
import axios from "axios";
import swal from "sweetalert";
import { useHistory } from "react-router-dom";
import Stripe from "stripe";
import numeral from "numeral"; // format vnd
import LoadingSpinner from "../LoadingSpinner";

function Checkout() {
  const history = useHistory();
  const stripe = new Stripe(
    "sk_test_51MOdsaBCh84YXtaxp0S4jew28dChl1938IJTqs8BmgiCef6S38RiUxhWdM9hKgWUmy5keDoVXzzCaIFW5plmrnEZ00cAzgXBZN"
  );

  if (!localStorage.getItem("auth_token")) {
    history.push("/");
    swal("Warning", "Bạn phải đăng nhập!", "error");
  }

  const [loading, setLoading] = useState(true);
  const [cart, setCart] = useState([]);
  var totalCartPrice = 0;

  const [checkoutInput, setCheckoutInput] = useState({
    amount: "",
    address: "",
    nameCard: "",
    cardNumber: "",
    cvc: "",
    month: "",
    year: "",
  });
  const [error, setError] = useState([]);

  useEffect(() => {
    let isMounted = true;

    axios.get(`cart`).then((res) => {
      if (isMounted) {
        if (res.data.status === 200) {
          setCart(res.data.cart);
          setLoading(false);
        } else if (res.data.status === 401) {
          history.push("/");
          swal("Warning", res.data.message, "error");
        }
      }
    });

    return () => {
      isMounted = false;
    };
  }, [history]);

  const handleInput = (e) => {
    e.persist();
    setCheckoutInput({ ...checkoutInput, [e.target.name]: e.target.value });
  };

  const submitOrder = async (e, payment_mode) => {
    e.preventDefault();
    var data = {
      amount: totalCartPrice,
      address: checkoutInput.address,
      nameCard: checkoutInput.nameCard,
      cardNumber: checkoutInput.cardNumber,
      cvc: checkoutInput.cvc,
      month: checkoutInput.month,
      year: checkoutInput.year,
      payment_mode: payment_mode,
    };
    switch (payment_mode) {
      case "stripe":
        try {
          const token = await stripe.tokens.create({
            card: {
              number: data.cardNumber,
              exp_month: data.month,
              exp_year: data.year,
              cvc: data.cvc,
              name: data.nameCard,
            },
          });
          axios
            .post("place-order", {
              ...data,
              stripeToken: token.id,
            })
            .then((res) => {
              if (res.data.status === 200) {
                swal("Success", res.data.message, "success");
                setError([]);
                history.push("/thank-you");
              } else if (res.data.status === 422) {
                swal("Bạn phải điền tất cả thông tin!", "", "error");
                setError(res.data.errors);
              }
            });
        } catch (error) {
          console.log(error);
          swal("Lỗi rồi", error.message, "error");
        }
        break;
      case "vnpay":
        try {
          const response = await axios.post("checkout", {
            total: totalCartPrice,
            bankcode: "NCB",
          });
          if (response.data.code === "00") {
            window.location.href = response.data.data;
          } else {
            swal("Error", "Thanh toán thất bại!", "error");
          }
        } catch (error) {
          console.log(error);
          swal(
            "Error",
            "Đã xảy ra lỗi trong quá trình khởi tạo thanh toán VnPay!",
            "error"
          );
        }
        break;
      default:
        break;
    }
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  var checkout_HTML = "";
  if (cart.length > 0) {
    checkout_HTML = (
      <div>
        <div className="row">
          <div className="col-md-7">
            <div className="card">
              <div className="card-header">
                <h4>Thông tin thanh toán</h4>
              </div>
              <div className="card-body">
                <div className="row">
                  <div className="col-md-6">
                    <div className="form-group mb-3">
                      <label> Tên chủ thẻ</label>
                      <input
                        type="text"
                        name="nameCard"
                        onChange={handleInput}
                        value={checkoutInput.nameCard}
                        className="form-control"
                        placeholder={"vd: DOAN QUANG HUY"}
                      />
                      <small className="text-danger">{error.nameCard}</small>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group mb-3">
                      <label> Số thẻ</label>
                      <input
                        type="text"
                        name="cardNumber"
                        onChange={handleInput}
                        value={checkoutInput.cardNumber}
                        className="form-control"
                        placeholder={"vd: 4242 4242 4242 4242"}
                      />
                      <small className="text-danger">{error.cardNumber}</small>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group mb-3">
                      <label> CVC Code</label>
                      <input
                        type="number"
                        name="cvc"
                        onChange={handleInput}
                        value={checkoutInput.cvc}
                        className="form-control"
                        placeholder={"vd: 123"}
                      />
                      <small className="text-danger">{error.cvc}</small>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group mb-3">
                      <label> Tháng hết hạn</label>
                      <input
                        type="number"
                        name="month"
                        onChange={handleInput}
                        value={checkoutInput.month}
                        className="form-control"
                        min={1}
                        max={12}
                        placeholder={"vd: 12"}
                      />
                      <small className="text-danger">{error.month}</small>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group mb-3">
                      <label> Năm hết hạn</label>
                      <input
                        type="number"
                        name="year"
                        onChange={handleInput}
                        value={checkoutInput.year}
                        className="form-control"
                        min={new Date().getFullYear()}
                        placeholder={"vd: 2028"}
                      />
                      <small className="text-danger">{error.year}</small>
                    </div>
                  </div>
                  <div className="col-md-12">
                    <div className="form-group mb-3">
                      <label> Địa chỉ giao hàng</label>
                      <textarea
                        rows="3"
                        name="address"
                        onChange={handleInput}
                        value={checkoutInput.address}
                        className="form-control"
                        placeholder={
                          "vd: 6/5 ABC, Phạm Ngữ Lão, Phường 8, TP. Phan Rang, Ninh Thuận"
                        }
                      ></textarea>
                      <small className="text-danger">{error.address}</small>
                    </div>
                  </div>
                  <div className="col-md-12">
                    <div className="form-group text-end">
                      <button
                        type="button"
                        className="btn btn-primary mx-1"
                        onClick={(e) => submitOrder(e, "stripe")}
                      >
                        Thanh toán Stripe
                      </button>
                      <button
                        type="button"
                        className="btn btn-warning mx-1"
                        onClick={(e) => submitOrder(e, "vnpay")}
                      >
                        Thanh toán VnPay
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="col-md-5">
            <table className="table table-bordered">
              <thead>
                <tr>
                  <th width="50%">Thú cưng</th>
                  <th>Giá bán</th>
                  <th>Số lượng</th>
                  <th>Tổng</th>
                </tr>
              </thead>
              <tbody>
                {cart.map((item, idx) => {
                  totalCartPrice +=
                    item.product.selling_price * item.product_qty;
                  return (
                    <tr key={idx}>
                      <td>{item.product.name}</td>
                      <td>
                        {numeral(item.product.selling_price).format("0,0")}đ
                      </td>
                      <td>{item.product_qty}</td>
                      <td>
                        {numeral(
                          item.product.selling_price * item.product_qty
                        ).format("0,0")}
                        đ
                      </td>
                    </tr>
                  );
                })}
                <tr>
                  <td colSpan="2" className="text-end fw-bold">
                    Tổng cộng
                  </td>
                  <td colSpan="2" className="text-end fw-bold">
                    {numeral(totalCartPrice).format("0,0")}đ
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  } else {
    checkout_HTML = (
      <div>
        <div className="card card-body py-5 text-center shadow-sm">
          <h4>Giỏ hàng của bạn đang trống. Bạn đang ở trang thanh toán.</h4>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="py-3 bg-info">
        <div className="container">
          <h6>Trang chủ / Thanh toán</h6>
        </div>
      </div>
      <div className="py-4">
        <div className="container">{checkout_HTML}</div>
      </div>
    </div>
  );
}

export default Checkout;
