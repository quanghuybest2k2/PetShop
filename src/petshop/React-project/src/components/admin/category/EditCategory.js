import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import axios from "axios";
import swal from "sweetalert";
import config from "../../../config";

function EditCategory(props) {
  const history = useHistory();
  const [loading, setLoading] = useState(true);
  const [categoryInput, setCategory] = useState([]);
  const [error, setError] = useState([]);
  const [pricture, setPicture] = useState([]);
  useEffect(() => {
    const category_id = props.match.params.id;
    axios.get(`api/v1/edit-category/${category_id}`).then((res) => {
      if (res.data.status === 200) {
        setCategory(res.data.category);
      } else if (res.data.status === 404) {
        swal("Error", res.data.message, "error");
        history.push("/admin/view-category");
      }
      setLoading(false);
    });
  }, [props.match.params.id, history]);

  const handleInput = (e) => {
    e.persist();
    setCategory({ ...categoryInput, [e.target.name]: e.target.value });
  };
  const handleImage = (e) => {
    setPicture({ image: e.target.files[0] });
  };
  const updateCategory = (e) => {
    e.preventDefault();

    const category_id = props.match.params.id;
    const data = categoryInput;
    axios.put(`api/v1/update-category/${category_id}`, data).then((res) => {
      if (res.data.status === 200) {
        swal("Success", res.data.message, "success");
        setError([]);
      } else if (res.data.status === 422) {
        swal("Bạn phải điền các ô trên", "", "error");
        setError(res.data.errors);
      } else if (res.data.status === 404) {
        swal("Error", res.data.message, "error");
        history.push("admin/view-category");
      }
    });
  };

  if (loading) {
    return <h4>Xin vui lòng chờ...</h4>;
  }

  return (
    <div className="container px-4">
      <div className="card mt-4">
        <div className="card-header">
          <h4>
            Sửa danh mục
            <Link
              to="/admin/view-category"
              className="btn btn-primary btn-sm float-end"
            >
              Trở về
            </Link>
          </h4>
        </div>
        <div className="card-body">
          <form onSubmit={updateCategory}>
            <ul className="nav nav-tabs" id="myTab" role="tablist">
              <li className="nav-item" role="presentation">
                <button
                  className="nav-link active"
                  id="home-tab"
                  data-bs-toggle="tab"
                  data-bs-target="#home"
                  type="button"
                  role="tab"
                  aria-controls="home"
                  aria-selected="true"
                >
                  Chung
                </button>
              </li>
              <li className="nav-item" role="presentation">
                <button
                  className="nav-link"
                  id="otherdetails-tab"
                  data-bs-toggle="tab"
                  data-bs-target="#otherdetails"
                  type="button"
                  role="tab"
                  aria-controls="otherdetails"
                  aria-selected="false"
                >
                  Thông tin khác
                </button>
              </li>
            </ul>
            <div className="tab-content" id="myTabContent">
              <div
                className="tab-pane card-body border fade show active"
                id="home"
                role="tabpanel"
                aria-labelledby="home-tab"
              >
                <div className="form-group mb-3">
                  <label>Tên danh mục</label>
                  <input
                    type="text"
                    name="name"
                    onChange={handleInput}
                    value={categoryInput.name}
                    className="form-control"
                  />
                  <small className="text-danger">{error.name}</small>
                </div>
                <div className="form-group mb-3">
                  <label>Slug</label>
                  <input
                    type="text"
                    name="slug"
                    onChange={handleInput}
                    value={categoryInput.slug}
                    className="form-control"
                  />
                  <small className="text-danger">{error.slug}</small>
                </div>
                <div className="form-group mb-3">
                  <label>Mô tả</label>
                  <textarea
                    name="description"
                    onChange={handleInput}
                    value={categoryInput.description}
                    className="form-control"
                  ></textarea>
                </div>
                <div className="form-group mb-3">
                  <label>Trạng thái</label>
                  <br />
                  <input
                    type="checkbox"
                    name="status"
                    onChange={handleInput}
                    value={categoryInput.status}
                  />{" "}
                  Status 0 = hiển thị / 1 = ẩn
                </div>
              </div>
              <div
                className="tab-pane card-body border fade"
                id="otherdetails"
                role="tabpanel"
                aria-labelledby="otherdetails-tab"
              >
                <div className="row">
                  <div className="col-md-8 form-group mb-3">
                    <label>Hình ảnh</label>
                    <input
                      type="file"
                      name="image"
                      onChange={handleImage}
                      className="form-control"
                    />
                    <img
                      src={`${config.BASE_URL}/${categoryInput.image}`}
                      width="50px"
                      alt={categoryInput.name}
                    />
                    {/* <small className="text-danger">{error_list.image}</small> */}
                  </div>
                </div>
              </div>
            </div>
            <button type="submit" className="btn btn-primary px-4 float-end">
              Cập nhật
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default EditCategory;
