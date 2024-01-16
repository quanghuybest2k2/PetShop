import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import swal from "sweetalert";
import config from "../../../config";
import LoadingSpinner from "../../LoadingSpinner";

function EditProduct(props) {
  const history = useHistory();

  const [categorylist, setCategorylist] = useState([]);
  const [productInput, setProduct] = useState({
    category_id: "",
    slug: "",
    name: "",
    description: "",
    selling_price: "",
    original_price: "",
    qty: "",
    brand: "",
  });
  const [pricture, setPicture] = useState([]);
  const [errorlist, setError] = useState([]);
  const [loading, setLoading] = useState(true);

  const handleInput = (e) => {
    e.persist();
    setProduct({ ...productInput, [e.target.name]: e.target.value });
  };

  const handleImage = (e) => {
    setPicture({ image: e.target.files[0] });
  };

  const [allcheckbox, setCheckboxes] = useState([]);
  const handleCheckbox = (e) => {
    e.persist();
    setCheckboxes({ ...allcheckbox, [e.target.name]: e.target.checked });
  };

  useEffect(() => {
    axios.get(`all-category`).then((res) => {
      if (res.data.status === 200) {
        setCategorylist(res.data.category);
      }
    });

    const product_id = props.match.params.id;
    axios.get(`edit-product/${product_id}`).then((res) => {
      if (res.data.status === 200) {
        // console.log(res.data.product);
        setProduct(res.data.product);
        setCheckboxes(res.data.product);
      } else if (res.data.status === 404) {
        swal("Error", res.data.message, "error");
        history.push("/admin/view-product");
      }
      setLoading(false);
    });
  }, [props.match.params.id, history]);

  const updateProduct = (e) => {
    e.preventDefault();

    const product_id = props.match.params.id;

    const formData = new FormData();
    formData.append("image", pricture.image);
    formData.append("category_id", productInput.category_id);
    formData.append("slug", productInput.slug);
    formData.append("name", productInput.name);
    formData.append("description", productInput.description);

    formData.append("selling_price", productInput.selling_price);
    formData.append("original_price", productInput.original_price);
    formData.append("qty", productInput.qty);
    formData.append("brand", productInput.brand);
    formData.append("featured", allcheckbox.featured ? "1" : "0");
    formData.append("status", allcheckbox.status ? "1" : "0");

    axios.post(`update-product/${product_id}`, formData).then((res) => {
      if (res.data.status === 200) {
        swal("Success", res.data.message, "success");
        console.log(allcheckbox);
        setError([]);
      } else if (res.data.status === 422) {
        swal("bạn phải điền các ô trên", "", "error");
        setError(res.data.errors);
      } else if (res.data.status === 404) {
        swal("Error", res.data.message, "error");
        history.push("/admin/view-product");
      }
    });
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="container-fluid px-4">
      <div className="card mt-4">
        <div className="card-header">
          <h4>
            Sửa thú cưng
            <Link
              to="/admin/view-product"
              className="btn btn-primary btn-sm float-end"
            >
              Xem thú cưng
            </Link>
          </h4>
        </div>
        <div className="card-body">
          <form onSubmit={updateProduct} encType="multipart/form-data">
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
                  <label>Chọn danh mục</label>
                  <select
                    name="category_id"
                    onChange={handleInput}
                    value={productInput.category_id}
                    className="form-control"
                  >
                    <option>Chọn danh mục</option>
                    {categorylist.map((item) => {
                      return (
                        <option value={item.id} key={item.id}>
                          {item.name}
                        </option>
                      );
                    })}
                  </select>
                  <small className="text-danger">{errorlist.category_id}</small>
                </div>
                <div className="form-group mb-3">
                  <label>Tên thú cưng</label>
                  <input
                    type="text"
                    name="name"
                    onChange={handleInput}
                    value={productInput.name}
                    className="form-control"
                  />
                  <small className="text-danger">{errorlist.name}</small>
                </div>
                <div className="form-group mb-3">
                  <label>Slug</label>
                  <input
                    type="text"
                    name="slug"
                    onChange={handleInput}
                    value={productInput.slug}
                    className="form-control"
                  />
                  <small className="text-danger">{errorlist.slug}</small>
                </div>
                <div className="form-group mb-3">
                  <label>Mô tả</label>
                  <textarea
                    name="description"
                    onChange={handleInput}
                    value={productInput.description}
                    className="form-control"
                  ></textarea>
                </div>
              </div>
              <div
                className="tab-pane card-body border fade"
                id="otherdetails"
                role="tabpanel"
                aria-labelledby="otherdetails-tab"
              >
                <div className="row">
                  <div className="col-md-4 form-group mb-3">
                    <label>Giá bán</label>
                    <input
                      type="text"
                      name="selling_price"
                      onChange={handleInput}
                      value={productInput.selling_price}
                      className="form-control"
                    />
                    <small className="text-danger">
                      {errorlist.selling_price}
                    </small>
                  </div>
                  <div className="col-md-4 form-group mb-3">
                    <label>Giá gốc</label>
                    <input
                      type="text"
                      name="original_price"
                      onChange={handleInput}
                      value={productInput.original_price}
                      className="form-control"
                    />
                    <small className="text-danger">
                      {errorlist.original_price}
                    </small>
                  </div>
                  <div className="col-md-4 form-group mb-3">
                    <label>Số lượng</label>
                    <input
                      type="text"
                      name="qty"
                      onChange={handleInput}
                      value={productInput.qty}
                      className="form-control"
                    />
                    <small className="text-danger">{errorlist.qty}</small>
                  </div>
                  <div className="col-md-4 form-group mb-3">
                    <label>Thương hiệu</label>
                    <input
                      type="text"
                      name="brand"
                      onChange={handleInput}
                      value={productInput.brand}
                      className="form-control"
                    />
                    <small className="text-danger">{errorlist.brand}</small>
                  </div>
                  <div className="col-md-8 form-group mb-3">
                    <label>Hình ảnh</label>
                    <input
                      type="file"
                      name="image"
                      onChange={handleImage}
                      className="form-control"
                    />
                    <img
                      src={`${config.BASE_URL}/${productInput.image}`}
                      width="50px"
                      alt={productInput.name}
                    />
                    <small className="text-danger">{errorlist.image}</small>
                  </div>
                  <div className="col-md-4 form-group mb-3">
                    <label>Thú cưng nổi bật (check = Hiển thị)</label>
                    <input
                      type="checkbox"
                      name="featured"
                      onChange={handleCheckbox}
                      defaultChecked={allcheckbox.featured === 1 ? true : false}
                      className="w-50 h-50"
                    />
                  </div>
                  <div className="col-md-4 form-group mb-3">
                    <label>Trạng thái (check = Ẩn đi)</label>
                    <input
                      type="checkbox"
                      name="status"
                      onChange={handleCheckbox}
                      defaultChecked={allcheckbox.status === 1 ? true : false}
                      className="w-50 h-50"
                    />
                  </div>
                </div>
              </div>
            </div>
            <button type="submit" className="btn btn-primary px-4 mt-2">
              Cập nhật
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default EditProduct;
