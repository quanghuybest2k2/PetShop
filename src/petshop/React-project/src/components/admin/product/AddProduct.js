import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import swal from "sweetalert";
import slugify from "slugify";

function AddProduct() {
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
    featured: "",
    status: "",
  });
  const [pricture, setPicture] = useState([]);
  const [errorlist, setError] = useState([]);

  const handleInput = (e) => {
    e.persist();
    const name = e.target.name;
    const value = e.target.value;
    if (name === "name") {
      const slug = createSlug(value);
      setProduct({ ...productInput, [name]: value, slug: slug });
    } else {
      setProduct({ ...productInput, [name]: value });
    }
  };

  const createSlug = (text) => {
    return slugify(text.toLowerCase(), {
      remove: /[*+~.()'"!:@]/g,
      lower: true,
    });
  };

  const handleImage = (e) => {
    setPicture({ image: e.target.files[0] });
  };

  useEffect(() => {
    let isMounted = true;

    axios.get(`api/v1/all-category`).then((res) => {
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

  const submitProduct = (e) => {
    e.preventDefault();

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
    formData.append("featured", productInput.featured);
    formData.append("status", productInput.status);

    axios.post(`api/v1/store-product`, formData).then((res) => {
      if (res.data.status === 200) {
        swal("Success", res.data.message, "success");
        setProduct({
          ...productInput,
          category_id: "",
          slug: "",
          name: "",
          description: "",
          selling_price: "",
          original_price: "",
          qty: "",
          brand: "",
          featured: "",
          status: "",
        });
        setError([]);
      } else if (res.data.status === 422) {
        swal("Lỗi rồi bạn ơi!", "", "error");
        setError(res.data.errors);
      }
    });
  };

  return (
    <div className="container-fluid px-4">
      <div className="card mt-4">
        <div className="card-header">
          <h4>
            Thêm thú cưng
            <Link
              to="/admin/view-product"
              className="btn btn-primary btn-sm float-end"
            >
              Xem thú cưng
            </Link>
          </h4>
        </div>
        <div className="card-body">
          <form onSubmit={submitProduct} encType="multipart/form-data">
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
                    <small className="text-danger">{errorlist.image}</small>
                  </div>
                  <div className="col-md-4 form-group mb-3">
                    <label>Thú cưng nổi bật (check = Hiển thị)</label>
                    <input
                      type="checkbox"
                      name="featured"
                      onChange={handleInput}
                      value={productInput.featured}
                      className="w-50 h-50"
                    />
                  </div>
                  <div className="col-md-4 form-group mb-3">
                    <label>Trạng thái (check = Ẩn đi)</label>
                    <input
                      type="checkbox"
                      name="status"
                      onChange={handleInput}
                      value={productInput.status}
                      className="w-50 h-50"
                    />
                  </div>
                </div>
              </div>
            </div>
            <button type="submit" className="btn btn-primary px-4 mt-2">
              Thêm thú cưng
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AddProduct;
