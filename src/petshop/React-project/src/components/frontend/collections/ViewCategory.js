import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import config from "../../../config";

function ViewCategory() {
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState([]);

  useEffect(() => {
    let isMountered = true;

    axios.get(`api/v1/getCategory`).then((res) => {
      if (isMountered) {
        if (res.data.status === 200) {
          // console.log(res.data.category);
          setCategory(res.data.category);
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
    var showCategoryList = "";
    showCategoryList = category.map((item, idx) => {
      return (
        <div className="col-md-4" key={idx}>
          <div className="card h-100">
            <div className="card-body d-flex justify-content-center align-items-center">
              <Link to={`collections/${item.slug}`}>
                <img
                  src={`${config.BASE_URL}/${item.image}`}
                  className="rounded img-fluid"
                  width="300"
                  height="300"
                  alt={item.name}
                />
              </Link>
            </div>
            <div className="card-footer text-center">
              <Link to={`collections/${item.slug}`}>
                <h5>{item.name}</h5>
              </Link>
            </div>
          </div>
        </div>
      );
    });
  }

  if (showCategoryList.length > 0) {
    return (
      <div>
        <div className="py-3 bg-info">
          <div className="container">
            <h6>Bộ sưu tập theo loại</h6>
          </div>
        </div>

        <div className="py-3">
          <div className="container">
            <div className="row">{showCategoryList}</div>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div>
        <div className="py-3 bg-info">
          <div className="container">
            <h6>Bộ sưu tập theo loại</h6>
          </div>
        </div>

        <div className="py-3">
          <div className="container">
            <h4>Hiện chưa có gì, rất xin lỗi vì vấn đề này.</h4>
          </div>
        </div>
      </div>
    );
  }
}

export default ViewCategory;
