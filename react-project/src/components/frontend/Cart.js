import React, { useEffect, useState } from "react";
import axios from "axios";
import swal from "sweetalert";
import { Link, useHistory } from "react-router-dom";
import config from "../../config";
import numeral from "numeral"; // format vnd
import LoadingSpinner from "../LoadingSpinner";

function Cart() {
  const history = useHistory();
  const [loading, setLoading] = useState(true);
  const [cart, setCart] = useState([]);
  var totalCartPrice = 0;

  useEffect(() => {
    let isMounted = true;

    axios
      .get(`cart`)
      .then((res) => {
        if (isMounted) {
          if (res.data.status === 200) {
            setCart(res.data.cart);
            setLoading(false);
          } else if (res.data.status === 401) {
            history.push("/");
            swal("Warning", res.data.message, "error");
          }
        }
      })
      .catch((error) => {
        if (error.response && error.response.status === 401) {
          history.push("/");
          swal("Error", error.response.data.message, "error");
        }
      });

    return () => {
      isMounted = false;
    };
  }, [history]);

  const handleDecrement = (cart_id) => {
    setCart((cart) =>
      cart.map((item) =>
        cart_id === item.id
          ? {
              ...item,
              product_qty: item.product_qty - (item.product_qty > 1 ? 1 : 0),
            }
          : item
      )
    );
    updateCartQuantity(cart_id, "dec");
  };
  const handleIncrement = (cart_id) => {
    setCart((cart) =>
      cart.map((item) =>
        cart_id === item.id
          ? {
              ...item,
              product_qty: item.product_qty + (item.product_qty < 10 ? 1 : 0),
            }
          : item
      )
    );
    updateCartQuantity(cart_id, "inc");
  };
  function updateCartQuantity(cart_id, scope) {
    axios.put(`cart-updatequantity/${cart_id}/${scope}`).then((res) => {
      if (res.data.status === 200) {
        swal("Success", res.data.message, "success");
      }
    });
  }

  const deleteCartItem = (e, cart_id) => {
    // ngăn không cho chuyển trang khi submit
    e.preventDefault();

    const thisClicked = e.currentTarget;
    thisClicked.innerText = "Đã xóa";

    axios.delete(`delete-cartitem/${cart_id}`).then((res) => {
      if (res.data.status === 200) {
        swal("Success", res.data.message, "success");
        thisClicked.closest("tr").remove();
      } else if (res.data.status === 404) {
        swal("Error", res.data.message, "error");
        thisClicked.innerText = "Xóa";
      }
    });
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  var cart_HTML = "";
  if (cart.length > 0) {
    cart_HTML = (
      <div>
        <div className="table-responsive">
          <table className="table table-bordered">
            <thead>
              <tr>
                <th>Hình ảnh</th>
                <th>Sản phẩm</th>
                <th className="text-center">Giá bán</th>
                <th className="text-center">Số lượng</th>
                <th className="text-center">Tổng giá</th>
                <th>Xóa</th>
              </tr>
            </thead>
            <tbody>
              {cart.map((item, idx) => {
                totalCartPrice += item.product.selling_price * item.product_qty;
                return (
                  <tr key={idx}>
                    <td width="10%">
                      <img
                        src={`${config.BASE_URL}/${item.product.image}`}
                        alt={item.product.name}
                        width="50px"
                        height="50px"
                      />
                    </td>
                    <td>{item.product.name}</td>
                    <td width="15%" className="text-center">
                      {numeral(item.product.selling_price).format("0,0")}đ
                    </td>
                    <td width="15%">
                      <div className="input-group">
                        <button
                          type="button"
                          onClick={() => handleDecrement(item.id)}
                          className="input-group-text"
                        >
                          -
                        </button>
                        <div className="form-control text-center">
                          {item.product_qty}
                        </div>
                        <button
                          type="button"
                          onClick={() => handleIncrement(item.id)}
                          className="input-group-text"
                        >
                          +
                        </button>
                      </div>
                    </td>
                    <td width="15%" className="text-center">
                      {numeral(
                        item.product.selling_price * item.product_qty
                      ).format("0,0")}
                      đ
                    </td>
                    <td width="10%">
                      <button
                        type="button"
                        onClick={(e) => deleteCartItem(e, item.id)}
                        className="btn btn-danger btn-sm"
                      >
                        Xóa
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <div className="row">
          <div className="col-md-8"></div>
          <div className="col-md-4">
            <div className="card card-body mt-3">
              <h4>
                Tổng cộng:
                {/* <span className="float-end">{totalCartPrice.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}đ</span> */}
                <span className="float-end">
                  {numeral(totalCartPrice).format("0,0")}đ
                </span>
              </h4>
              <h4>
                Tổng tiền:
                <span className="float-end">
                  {numeral(totalCartPrice).format("0,0")}đ
                </span>
              </h4>
              <hr />
              <Link to="/checkout" className="btn btn-primary">
                Thanh toán
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  } else {
    cart_HTML = (
      <div>
        <div className="card card-body py-5 text-center shadow-sm">
          <h4>Giỏ hàng của bạn chưa có gì.</h4>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="py-3 bg-info">
        <div className="container">
          <h6>Trang chủ / Giỏ hàng</h6>
        </div>
      </div>

      <div className="py-4">
        <div className="container">
          <div className="row">
            <div className="col-md-12">{cart_HTML}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cart;
