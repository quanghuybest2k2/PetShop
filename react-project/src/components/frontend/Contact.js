import React from 'react';
import { MdLocationOn, MdEmail, MdPhone } from 'react-icons/md';
import './css/style.css';
function Contact() {
    return (
        <div>
            <main id="main">
                {/* <!-- ======= Contact Section ======= --> */}
                <section id="contact" className="contact">
                    <div className="container" data-aos="fade-up">

                        <div className="section-title">
                            <h2>Liên hệ</h2>
                            <p>Pet Shop là nhãn hiệu độc quyền của Công ty TNHH May Mặc Thăng Long đã được Cục sở hữu trí tuệ cấp Giấy chứng nhận nhãn hiệu hàng hóa. Pet Shop chuyên về dòng sản phẩm may mặc cho cả người lớn và trẻ em. Với ý tưởng sử dụng hình ảnh những thú cưng quen thuộc trong gia đình.</p>
                        </div>

                        <div className="row">

                            <div className="col-lg-5 d-flex align-items-stretch">
                                <div className="info">
                                    <div className="address">
                                        <i className="bi bi-phone"><MdLocationOn /></i>
                                        <h4>Địa chỉ:</h4>
                                        <p>1 Phù Đổng Thiên Vương - P8 - TP.Đà Lạt</p>
                                    </div>

                                    <div className="email">
                                        <i className="bi bi-envelope"><MdEmail /></i>
                                        <h4>Email:</h4>
                                        <p>info@dlu.edu.vn</p>
                                    </div>

                                    <div className="phone">
                                        <i className="bi bi-phone"><MdPhone /></i>
                                        <h4>Số điện thoại:</h4>
                                        <p>0263 3822 246</p>
                                    </div>
                                    <iframe style={{ width: 600, height: 450, border: 0 }} allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3903.2877902405344!2d108.4420162141259!3d11.954565639612163!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x317112d959f88991%3A0x9c66baf1767356fa!2zVHLGsOG7nW5nIMSQ4bqhaSBI4buNYyDEkMOgIEzhuqF0!5e0!3m2!1svi!2s!4v1678180529869!5m2!1svi!2s"></iframe>
                                </div>

                            </div>

                            <div className="col-lg-7 mt-5 mt-lg-0 d-flex align-items-stretch">
                                <form method="post" className="php-email-form">
                                    <div className="row">
                                        <div className="form-group col-md-6">
                                            <label for="name">Tên của bạn</label>
                                            <input type="text" name="name" className="form-control" id="name" required />
                                        </div>
                                        <div className="form-group col-md-6">
                                            <label for="name">Email</label>
                                            <input type="email" className="form-control" name="email" id="email" required />
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <label for="name">Tiêu đề</label>
                                        <input type="text" class="form-control" name="subject" id="subject" required />
                                    </div>
                                    <div className="form-group">
                                        <label for="name">Lời nhắn</label>
                                        <textarea className="form-control" name="message" rows="10" required></textarea>
                                    </div>
                                    <div className="text-center"><button type="submit">Gửi phản hồi</button></div>
                                </form>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
        </div>
    )
}

export default Contact;
