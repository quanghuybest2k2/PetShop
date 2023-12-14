import React from "react";

function Profile() {
  return (
    <section className="vh-200" style={{ backgroundColor: "#f4f5f7" }}>
      <div className="container py-5 h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col col-lg-8 mb-4 mb-lg-0">
            <div className="card mb-3" style={{ borderRadius: ".5rem" }}>
              <div className="row g-0">
                <div
                  className="col-md-4 text-center text-white"
                  style={{
                    borderTopLeftRadius: ".5rem",
                    borderBottomLeftRadius: ".5rem",
                  }}
                >
                  <img
                    src={process.env.PUBLIC_URL + "/images/Logo_Huy.png"}
                    alt="Avatar"
                    className="img-fluid my-5 img-thumbnail"
                    style={{ width: "200px" }}
                  />
                  <h5>Đoàn Quang Huy</h5>
                  <p className="text-secondary">Web Developer</p>
                  <i className="far fa-edit mb-5"></i>
                </div>
                <div className="col-md-8">
                  <div className="card-body p-4">
                    <h4 className="text-center">Thông tin cá nhân</h4>
                    <hr className="mt-0 mb-4" />
                    <div className="row pt-1">
                      <div className="col-6 mb-3">
                        <h6>Email</h6>
                        <p className="text-muted">quanghuybest@gmail.com</p>
                      </div>
                      <div class="col-6 mb-3">
                        <h6>Số điện thoại</h6>
                        <p className="text-muted">0123456789</p>
                      </div>
                    </div>
                    <div class="col-6 mb-3">
                      <h6>Địa chỉ</h6>
                      <p className="text-muted">Ninh Thuận, Việt Nam</p>
                    </div>
                    <hr className="mt-0 mb-4" />
                    <div className="row pt-1">
                      <div className="col-6 mb-3">
                        <h6>Sở thích</h6>
                        <p className="text-muted">
                          Code, Chơi game, Nghe nhạc, Xem Phim
                        </p>
                      </div>
                      <div className="col-6 mb-3">
                        <h6>Cung hoàng đạo</h6>
                        <p className="text-muted">Bảo Bình - Aquarius (♒)</p>
                      </div>
                    </div>
                    <div className="d-flex justify-content-center">
                      <a href="https://github.com/quanghuybest2k2/">
                        <i
                          className="fab fa-github fa-lg me-3"
                          style={{ color: "black" }}
                        ></i>
                      </a>
                      <a href="https://www.facebook.com/quanghuybest2k2/">
                        <i className="fab fa-facebook-f fa-lg me-3"></i>
                      </a>
                      <a href="https://www.tiktok.com/@quanghuybest2k2">
                        <i
                          className="fab fa-tiktok fa-lg me-3"
                          style={{ color: "#000000" }}
                        ></i>
                      </a>
                      <a href="https://www.instagram.com/quanghuybest2k2/">
                        <i
                          className="fab fa-instagram fa-lg"
                          style={{ color: "#C13584" }}
                        ></i>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Profile;
