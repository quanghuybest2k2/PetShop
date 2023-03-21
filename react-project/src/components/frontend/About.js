import React from 'react';
import './css/about.css';
import img from './img/petshop.jpg'

function About() {
    return (
        <div>
            <main id="main">
                {/* <!-- ======= Breadcrumbs ======= --> */}
                <section id="breadcrumbs" class="breadcrumbs">
                    <div class="container">
                        <ol>
                            <li><a href="#">Trang chủ</a></li>
                            <li>Giới thiệu</li>
                        </ol>
                        <h2>Giới thiệu về cửa hàng thú cưng</h2>

                    </div>
                </section>
                {/* <!-- ======= About Section ======= --> */}
                <section id="about" class="about">
                    <div class="container">

                        <div class="row">
                            <div class="col-lg-6">
                                <img src={img} class="img-fluid" alt="" />
                            </div>
                            <div class="col-lg-6 pt-4 pt-lg-0 content">
                                <h3>Điểm nổi bật của các dòng sản phẩm</h3>
                                <p class="fst-italic">
                                    Danh mục sản phẩm mang nhãn hiệu Pet Shop rất đa dạng gồm: ba lô, túi xách, túi du lịch, túi đựng điện thoại, túi đựng laptop, iPad; quần áo người lớn, quần áo trẻ em; đồ dùng phòng ngủ; vật dụng nhà bếp; bóp, ví; nón, khẩu trang…
                                </p>
                                <ul>
                                    <li><i class="bi bi-check-circle"></i> Sản phẩm thân thiện với môi trường, an toàn cho tất cả mọi người.</li>
                                    <li><i class="bi bi-check-circle"></i> Sản phẩm được đa dạng hóa, phù hợp với nhiều mục đích sử dụng khác nhau.</li>
                                    <li><i class="bi bi-check-circle"></i> Giá bán sản phẩm được thống nhất trên cả nước và phù hợp với túi tiền của nhiều đối tượng khách hàng (gia đình Việt).</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </section>
                {/* <!-- ======= Counts Section ======= --> */}
                <section id="counts" class="counts">
                    <div class="container">

                        <div class="row no-gutters">

                            <div class="col-lg-3 col-md-6 d-md-flex align-items-md-stretch">
                                <div class="count-box">
                                    <i class="bi bi-emoji-smile"></i>
                                    <span class="purecounter">412</span>
                                    <p><strong>Khách hàng</strong> đánh giá sản phẩm</p>
                                    <a href="#">Xem thêm &raquo;</a>
                                </div>
                            </div>

                            <div class="col-lg-3 col-md-6 d-md-flex align-items-md-stretch">
                                <div class="count-box">
                                    <i class="bi bi-journal-richtext"></i>
                                    <span class="purecounter">150</span>
                                    <p><strong>Sản phẩm</strong> được đánh giá cao</p>
                                    <a href="#">Xem thêm &raquo;</a>
                                </div>
                            </div>

                            <div class="col-lg-3 col-md-6 d-md-flex align-items-md-stretch">
                                <div class="count-box">
                                    <i class="bi bi-headset"></i>
                                    <span class="purecounter">123</span>
                                    <p><strong>Phản hồi</strong> tích cực từ người dùng</p>
                                    <a href="#">Xem thêm &raquo;</a>
                                </div>
                            </div>

                            <div class="col-lg-3 col-md-6 d-md-flex align-items-md-stretch">
                                <div class="count-box">
                                    <i class="bi bi-people"></i>
                                    <span class="purecounter">423</span>
                                    <p><strong>Nhân viên</strong> đang làm việc tại các chi nhánh</p>
                                    <a href="#">Xem thêm &raquo;</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
        </div>
    )
}

export default About;
