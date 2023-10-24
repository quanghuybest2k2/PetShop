// media
import video from "./imgs/background.mp4";
import doitac1 from "./imgs/brand-1.jpg";
import doitac2 from "./imgs/brand-2.jpg";
import doitac3 from "./imgs/brand-3.jpg";
// lib
import config from "../../config";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./css/home.css";
import BackToTopButton from "./BackToTopButton";
import NewsletterForm from "./NewsletterForm";
import numeral from "numeral"; // format vnd

const RenderHome = () => {
  const [loading, setLoading] = useState(true);
  const [product, setProduct] = useState([]);
  const [popularProducts, setpopularProducts] = useState([]);
  const [category, setcategory] = useState([]);
  const [featuredProducts, setfeaturedProducts] = useState([]);

  useEffect(() => {
    let isMountered = true;

    axios.get(`viewHomePage`).then((res) => {
      if (isMountered) {
        if (res.data.status === 200) {
          setProduct(res.data.products);
          setpopularProducts(res.data.popularProducts);
          setcategory(res.data.category);
          setfeaturedProducts(res.data.featuredProducts);
          setLoading(false);
        }
      }
    });
    return () => {
      isMountered = false;
    };
  }, []);

  if (loading) {
    return <h4>Xin vui lòng chờ...</h4>;
  } else {
    var showProductList = "";
    var showCategoryList = "";
    var showPopularProducts = "";
    var featuredProduct = "";
    // product
    showProductList = product.map((item, idx) => {
      return (
        <div className="col-12 col-sm-6 col-md-6 col-lg-3 mt-4" key={idx}>
          <div className="card h-100 w-100  ">
            <div className="ratio ratio-1x1">
              {/* Tạo tỷ lệ khung 1:1 cho ảnh bằng nhau */}
              <img
                src={`${config.BASE_URL}/${item.image}`}
                className="card-img-top"
                alt={item.name}
                style={{ objectFit: "cover" }} // Đảm bảo không bị vỡ ảnh
              />
            </div>
            <div className="card-body d-flex flex-column justify-content-between ">
              <Link to={`collections/${item.category.slug}/${item.slug}`}>
                <h5 className="card-title">{item.name}</h5>
              </Link>
              <p className="card-text">{item.description}</p>
              <h6 className="text-danger text-decoration-line-through">
                {numeral(item.original_price).format("0,0")}đ
              </h6>
              <div className="mt-auto">
                <h4>{numeral(item.selling_price).format("0,0")}đ</h4>
                <Link to={`collections/${item.category.slug}/${item.slug}`}>
                  <button type="button" className="custom-btn transitions">
                    Xem chi tiết
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      );
    });
    // category
    showCategoryList = category.map((item, idx) => {
      return (
        <div
          className="col-12 col-sm-6 col-md-6 col-lg-4 text-center transitions"
          key={idx}
        >
          <img
            src={`${config.BASE_URL}/${item.image}`}
            className="img-thumbnail h-50 w-30"
            alt={item.name}
          />
          <h3 className="text-uppercase"> {item.name}</h3>
          <Link to={`collections/${item.slug}`}>
            <button className="text-center custom-btn ">Xem ngay</button>
          </Link>
        </div>
      );
    });
    // pho bien
    showPopularProducts = popularProducts.map((item, idx) => {
      return (
        <div className="col-12 col-sm-12 col-md-3 col-lg-3 mb-3" key={idx}>
          <div className="card category-card d-flex flex-column justify-content-center align-items-center">
            <figure
              className="card-banner img-holder"
              style={{
                width: 250,
                height: 250,
                border: "2px solid #ccc",
                borderRadius: "8px",
                overflow: "hidden",
              }}
            >
              <div className="ratio ratio-1x1 d-flex justify-content-center align-items-center">
                <img
                  src={`${config.BASE_URL}/${item.image}`}
                  className="card-img-top"
                  alt={item.name}
                  style={{
                    objectFit: "cover",
                    maxWidth: "100%",
                    maxHeight: "100%",
                  }}
                />
              </div>
            </figure>
            <div className="card-body text-center">
              <h3 className="h5 card-title">
                <Link to={`collections/${item.category.slug}/${item.slug}`}>
                  {item.name}
                </Link>
              </h3>
            </div>
          </div>
        </div>
      );
    });
    // noi bat
    featuredProduct = featuredProducts.map((item, idx) => {
      return (
        <div className="col-12 col-sm-6 col-md-6 col-lg-3 mt-4" key={idx}>
          <div className="card h-100 w-100  ">
            <div className="ratio ratio-1x1">
              <img
                src={`${config.BASE_URL}/${item.image}`}
                className="card-img-top"
                alt={item.name}
                style={{ objectFit: "cover" }}
              />
            </div>
            <div className="card-body d-flex flex-column justify-content-between ">
              <Link to={`collections/${item.category.slug}/${item.slug}`}>
                <h5 className="card-title">{item.name}</h5>
              </Link>
              <p className="card-text">{item.description}</p>
              <h6 className="text-danger text-decoration-line-through">
                {numeral(item.original_price).format("0,0")}đ
              </h6>
              <div className="bottom d-flex justify-content-between">
                <h4>{numeral(item.selling_price).format("0,0")}đ</h4>
              </div>
            </div>
          </div>
        </div>
      );
    });
  }

  if (
    showProductList.length > 0 ||
    showCategoryList.length > 0 ||
    showPopularProducts.length > 0
  ) {
    return (
      <div>
        {/* pet category */}
        <section className="products " id="product_2">
          <div className="container">
            <div className="row">
              <div className="section-title pt-5 pb-5 mt-5">
                <h2 className="fs-1">Loại thú cưng</h2>
              </div>
              {showCategoryList}
            </div>
          </div>
        </section>
        {/* end pet category */}
        {/* pho bien */}
        <section className="categorys" id="product_3">
          <div className="container">
            <div className="section-title mb-5 pb-5">
              <h2 className="fs-1">Thú cưng phổ biến</h2>
            </div>
            <ul className="row text-center d-flex j-center ">
              {/* list product popular */}
              {showPopularProducts}
              {/* end list product popular */}
            </ul>
          </div>
        </section>
        {/* noi bat */}
        <section className="products " id="product_1">
          <div className="container ">
            <div className="section-title pt-5 mt-5 mb-5 pb-5">
              <h2 className="fs-1">Thú cưng nổi bật</h2>
            </div>
            {/* <!-- item product --> */}
            <div className="row ">
              {/* featuredProduct */}
              {featuredProduct}
              {/* end featuredProduct */}
            </div>
          </div>
        </section>
        {/* pet hien co */}
        <section className="products " id="product_1">
          <div className="container ">
            <div className="section-title pt-5 mt-5 mb-5 pb-5">
              <h2 className="fs-1">Thú cưng hiện có</h2>
            </div>
            {/* <!-- item product --> */}
            <div className="row ">
              {/* list prduct */}
              {showProductList}
              {/* end list product */}
            </div>
            <div className="text-center mt-5 mb-5">
              <Link to="/collections">
                <button
                  href="#"
                  className="btn custom-btn "
                  style={{ width: 300 }}
                >
                  Xem thêm
                </button>
              </Link>
            </div>
          </div>
        </section>
      </div>
    );
  } else {
    return (
      <div className="py-3">
        <div className="container">
          <h4>Hiện chưa có gì, rất xin lỗi vì vấn đề này.</h4>
        </div>
      </div>
    );
  }
};

function Home() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="home">
      <section className="hero-section" id="home">
        <div className="section-overlay "></div>
        <div className="container d-flex justify-content-center align-items-center">
          <div className="row  d-flex justify-content-center align-items-center">
            <div className="mb-5 text-center">
              <small className="secondary">Pet Shop</small>
              <h1 className="text-white mb-5 fs-1">
                Tạo nên sự hạnh phúc
                <br />
                cho thú cưng
              </h1>
              <a className="btn custom-btn smoothscroll" href="#product_1">
                Hãy bắt đầu nào
              </a>
            </div>
          </div>
        </div>
        <div className="video-wrap">
          <video autoPlay="autoplay" loop muted className="custom-video">
            <source src={video} type="video/mp4" />
          </video>
        </div>
      </section>
      {/* show main content */}
      <RenderHome />
      {/* NewsletterForm */}
      <NewsletterForm />
      {/* end NewsletterForm */}

      {/* <!--brands--> */}
      <section className="brands" id="brand">
        <div className="container">
          <div className="section-title pt-5 mt-5 mb-5 pb-5">
            <h2 className="span">Đối tác</h2>
          </div>
          <ul className="row text-center">
            <li className="col-12 col-sm-6 col-md-12 col-lg-4 transitions">
              <div
                className="brand-card img-holder"
                style={{ width: 150, height: 150 }}
              >
                <img
                  src={doitac1}
                  width="150"
                  height="150"
                  loading="lazy"
                  alt="brand logo"
                  className="img-cover"
                />
              </div>
            </li>
            <li className="col-12 col-sm-6 col-md-6 col-lg-4 transitions">
              <div
                className="brand-card img-holder"
                style={{ width: 150, height: 150 }}
              >
                <img
                  src={doitac2}
                  width="150"
                  height="150"
                  loading="lazy"
                  alt="brand logo"
                  className="img-cover"
                />
              </div>
            </li>
            <li className="col-12 col-sm-6 col-md-6 col-lg-4 transitions">
              <div
                className="brand-card img-holder"
                style={{ width: 150, height: 150 }}
              >
                <img
                  src={doitac3}
                  width="150"
                  height="150"
                  loading="lazy"
                  alt="brand logo"
                  className="img-cover"
                />
              </div>
            </li>
          </ul>
        </div>
      </section>
      {/* Back to top button */}
      <BackToTopButton />
      {/* end Back to top button */}
    </div>
  );
}

export default Home;
