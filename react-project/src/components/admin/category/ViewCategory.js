import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import swal from "sweetalert";
import config from "../../../config";
import LoadingSpinner from "../../LoadingSpinner";

function ViewCategory() {
  const [loading, setLoading] = useState(true);
  const [categorylist, setCategorylist] = useState([]);

  useEffect(() => {
    let isMounted = true;

    axios.get(`view-category`).then((res) => {
      if (isMounted) {
        if (res.status === 200) {
          setCategorylist(res.data.category);
          setLoading(false);
        }
      }
    });

    return () => {
      isMounted = false;
    };
  }, []);

  const deleteCategory = (e, id) => {
    e.preventDefault();

    const thisClicked = e.currentTarget;
    thisClicked.innerText = "Đã xóa";

    axios.delete(`delete-category/${id}`).then((res) => {
      if (res.data.status === 200) {
        swal("Success", res.data.message, "success");
        thisClicked.closest("tr").remove();
      } else if (res.data.status === 404) {
        swal("Success", res.data.message, "success");
        thisClicked.innerText = "Xóa";
      }
    });
  };

  var viewcategory_HTMLTABLE = "";
  var stt = 1;
  if (loading) {
    return <LoadingSpinner />;
  } else {
    viewcategory_HTMLTABLE = categorylist.map((item) => {
      return (
        <tr key={item.id}>
          <td>{stt++}</td>
          <td>{item.name}</td>
          <td>{item.slug}</td>
          <td>
            <img
              src={`${config.BASE_URL}/${item.image}`}
              width="50px"
              alt={item.name}
            />
          </td>
          <td>{item.status}</td>
          <td>
            <Link
              to={`edit-category/${item.id}`}
              className="btn btn-success btn-sm"
            >
              sửa
            </Link>
          </td>
          <td>
            <button
              type="button"
              onClick={(e) => deleteCategory(e, item.id)}
              className="btn btn-danger btn-sm"
            >
              Xóa
            </button>
          </td>
        </tr>
      );
    });
  }

  return (
    <div className="container px-4">
      <div className="card mt-4">
        <div className="card-header">
          <h4>
            Danh mục
            <Link
              to="/admin/add-category"
              className="btn btn-primary btn-sm float-end"
            >
              Thêm danh mục
            </Link>
          </h4>
        </div>
        <div className="card-body">
          <table className="table table-bordered table-striped">
            <thead>
              <tr>
                <th>STT</th>
                <th>Tên danh mục</th>
                <th>Slug</th>
                <th>Hình ảnh</th>
                <th>Trạng thái</th>
                <th>Chỉnh sửa</th>
                <th>Xóa</th>
              </tr>
            </thead>
            <tbody>{viewcategory_HTMLTABLE}</tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default ViewCategory;
