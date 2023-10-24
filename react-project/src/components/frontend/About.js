import React from "react";
import "./css/about.css";
import img from "./imgs/petshop.jpg";
import { Link } from "react-router-dom";

function About() {
  return (
    <div className="about_page">
      <main id="main">
        {/* <!-- ======= Breadcrumbs ======= --> */}
        <section id="breadcrumbs" className="breadcrumbs">
          <div className="container">
            <ol>
              <li>
                <Link to={"/"}>Trang chủ</Link>
              </li>
              <li>Giới thiệu</li>
            </ol>
            <h2>Giới thiệu về cửa hàng thú cưng</h2>
          </div>
        </section>
        {/* <!-- ======= About Section ======= --> */}
        <section id="about" className="about">
          <div className="container">
            <div className="row">
              <div className="col-lg-6">
                <img src={img} className="img-fluid" alt="" />
              </div>
              <div className="col-lg-6 pt-4 pt-lg-0 content">
                <h3>Điểm nổi bật của các dòng sản phẩm</h3>
                <p className="fst-italic">
                  Danh mục sản phẩm mang nhãn hiệu Pet Shop rất đa dạng gồm: ba
                  lô, túi xách, túi du lịch, túi đựng điện thoại, túi đựng
                  laptop, iPad; quần áo người lớn, quần áo trẻ em; đồ dùng phòng
                  ngủ; vật dụng nhà bếp; bóp, ví; nón, khẩu trang…
                </p>
                <ul>
                  <li>
                    <i className="bi bi-check-circle"></i> Sản phẩm thân thiện
                    với môi trường, an toàn cho tất cả mọi người.
                  </li>
                  <li>
                    <i className="bi bi-check-circle"></i> Sản phẩm được đa dạng
                    hóa, phù hợp với nhiều mục đích sử dụng khác nhau.
                  </li>
                  <li>
                    <i className="bi bi-check-circle"></i> Giá bán sản phẩm được
                    thống nhất trên cả nước và phù hợp với túi tiền của nhiều
                    đối tượng khách hàng (gia đình Việt).
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>
        {/* <!-- ======= Counts Section ======= --> */}
        <section id="counts" className="counts">
          <div className="container">
            <div className="row no-gutters">
              <div className="col-lg-3 col-md-6 d-md-flex align-items-md-stretch">
                <div className="count-box">
                  <i className="bi bi-emoji-smile"></i>
                  <span className="purecounter">412</span>
                  <p>
                    <strong>Khách hàng</strong> đánh giá sản phẩm
                  </p>
                  <Link to={"#"}>Xem thêm &raquo;</Link>
                </div>
              </div>

              <div className="col-lg-3 col-md-6 d-md-flex align-items-md-stretch">
                <div className="count-box">
                  <i className="bi bi-journal-richtext"></i>
                  <span className="purecounter">150</span>
                  <p>
                    <strong>Sản phẩm</strong> được đánh giá cao
                  </p>
                  <Link to={"#"}>Xem thêm &raquo;</Link>
                </div>
              </div>

              <div className="col-lg-3 col-md-6 d-md-flex align-items-md-stretch">
                <div className="count-box">
                  <i className="bi bi-headset"></i>
                  <span className="purecounter">123</span>
                  <p>
                    <strong>Phản hồi</strong> tích cực từ người dùng
                  </p>
                  <Link to={"#"}>Xem thêm &raquo;</Link>
                </div>
              </div>

              <div className="col-lg-3 col-md-6 d-md-flex align-items-md-stretch">
                <div className="count-box">
                  <i className="bi bi-people"></i>
                  <span className="purecounter">423</span>
                  <p>
                    <strong>Nhân viên</strong> đang làm việc tại các chi nhánh
                  </p>
                  <Link to={"#"}>Xem thêm &raquo;</Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

export default About;
