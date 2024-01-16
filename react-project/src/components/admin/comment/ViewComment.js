import React, { useEffect, useState } from "react";
import axios from "axios";
import swal from "sweetalert";
import config from "../../../config";
import LoadingSpinner from "../../LoadingSpinner";

function ViewComment() {
  const [loading, setLoading] = useState(true);
  const [viewComment, setComment] = useState([]);

  useEffect(() => {
    let isMounted = true;
    document.title = "Xem bình luận khách hàng";

    axios.get(`view-comment`).then((res) => {
      if (isMounted) {
        if (res.data.status === 200) {
          setComment(res.data.comments);
          setLoading(false);
        }
      }
    });
    return () => {
      isMounted = false;
    };
  }, []);

  const deleteComment = (e, id) => {
    e.preventDefault();

    const thisClicked = e.currentTarget;
    thisClicked.innerText = "Đã xóa";

    axios.delete(`deleteComment/${id}`).then((res) => {
      if (res.data.status === 200) {
        swal("Success", res.data.message, "success");
        thisClicked.closest("tr").remove();
      } else if (res.data.status === 404) {
        swal("Success", res.data.message, "success");
        thisClicked.innerText = "Xóa";
      }
    });
  };

  var display_Commentdata = "";
  if (loading) {
    return <LoadingSpinner />;
  } else {
    var stt = 1;
    display_Commentdata = viewComment.map((item) => {
      return (
        <tr key={item.id}>
          <td>{stt++}</td>
          <td>{item.product.name}</td>
          <td>{item.comment}</td>
          <td>{item.user.name}</td>
          <td>
            <img
              src={`${config.BASE_URL}/${item.product.image}`}
              width="50px"
              alt={item.name}
            />
          </td>
          <td>
            <button
              type="button"
              onClick={(e) => deleteComment(e, item.id)}
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
    <div className="container px-4 mt-3">
      <div className="card">
        <div className="card-header">
          <h4>Xem bình luận của khách hàng</h4>
        </div>
        <div className="card-body">
          <div className="table-responsive">
            <table className="table table-bordered table-striped">
              <thead>
                <tr>
                  <th>STT</th>
                  <th>Tên thú cưng</th>
                  <th>Bình luận</th>
                  <th>Người bình luận</th>
                  <th>Hình ảnh</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>{display_Commentdata}</tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
export default ViewComment;
