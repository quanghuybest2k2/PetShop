import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import $ from "jquery";
import "magnific-popup";
import "./css/album.css";
import axios from "axios";
import config from "../../config";
import swal from "sweetalert";

const Gallery = () => {
  const [categorylist, setCategorylist] = useState([]);
  const [petList, setPetList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState("all");
  const history = useHistory();
  const handleCategoryChange = (category) => {
    setActiveCategory(category);

    if (category === "all") {
      $(".image").show(400);
    } else {
      $(".image").not(`.${category}`).hide(200);
      $(`.image.${category}`).show(400);
    }
  };
  useEffect(() => {
    let isMounted = true;

    axios.get(`getAlbumPet`).then((res) => {
      if (isMounted) {
        if (res.data.status === 200) {
          setPetList(res.data.pets);
          setLoading(false);
        }
      }
    });

    return () => {
      isMounted = false;
    };
  }, []);
  useEffect(() => {
    let isMounted = true;

    axios.get(`get-all-category`).then((res) => {
      if (isMounted) {
        if (res.data.status === 200) {
          setCategorylist(res.data.category);
        }
      }
    });
    return () => {
      isMounted = false;
    };
  }, []);
  const renderImages = () =>
    petList.map((pet, index) => (
      <a
        key={index}
        href={`${config.BASE_URL}/${pet.image_pet}`}
        className={`image ${pet.category.slug}`}
      >
        <span className="username">{pet.user.name}</span>
        <img src={`${config.BASE_URL}/${pet.image_pet}`} alt="" />
        <span className="emotion">{pet.emotion}</span>
      </a>
    ));

  const submitAddPet = () => {
    if (!localStorage.getItem("auth_token")) {
      // chua dang nhap
      swal("Lỗi rồi cưng ơi", "Bạn phải đăng nhập", "warning");
      history.push("/login");
    } else {
      history.push("/addPet");
    }
  };
  // hiển thị theo loại
  const renderCategories = () =>
    categorylist.map((item) => (
      <li
        key={item.id}
        className={`buttons ${activeCategory === item.slug ? "active" : ""}`}
        onClick={() => handleCategoryChange(item.slug)}
        data-filter={item.slug}
      >
        {item.name}
      </li>
    ));

  if (loading) {
    return <h4>Xin vui lòng chờ...</h4>;
  } else {
    if (petList.length > 0) {
      return (
        <div className="gallery">
          <ul className="controls">
            <li
              className={`buttons ${activeCategory === "all" ? "active" : ""}`}
              onClick={() => handleCategoryChange("all")}
              data-filter="all"
            >
              Tất cả
            </li>
            {renderCategories()}
            <li>
              <button className="btn btn-primary" onClick={submitAddPet}>
                Thêm thú cưng
              </button>
            </li>
          </ul>
          <div className="image-container">{renderImages()}</div>
        </div>
      );
    } else {
      return (
        <>
          <div className="gallery">
            <ul className="controls">
              <li>
                <button className="btn btn-primary" onClick={submitAddPet}>
                  Thêm thú cưng
                </button>
              </li>
            </ul>
            <h4 className="text-danger text-center">
              Hiện chưa có gì! rất xin lỗi về vấn đề này.
            </h4>
          </div>
        </>
      );
    }
  }
};

function Album() {
  return (
    <div className="main">
      <Gallery />
    </div>
  );
}

export default Album;
