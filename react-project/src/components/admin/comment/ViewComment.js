import React, { useEffect, useState } from 'react';
import axios from 'axios';
import swal from 'sweetalert';

function ViewComment() {

    const [loading, setLoading] = useState(true);
    const [viewComment, setComment] = useState([]);

    useEffect(() => {

        let isMounted = true;
        document.title = "Xem bình luận khách hàng";

        axios.get(`/api/view-comment`).then(res => {
            if (isMounted) {
                if (res.data.status === 200) {
                    setComment(res.data.comments);
                    setLoading(false);
                }
            }
        });
        return () => {
            isMounted = false
        };
    }, []);

    const deleteCategory = (e, id) => {
        e.preventDefault();

        const thisClicked = e.currentTarget;
        thisClicked.innerText = "Đã xóa";

        axios.delete(`/api/delete-comment/${id}`).then(res => {
            if (res.data.status === 200) {
                swal("Success", res.data.message, "success");
                thisClicked.closest("tr").remove();
            }
            else if (res.data.status === 404) {
                swal("Success", res.data.message, "success");
                thisClicked.innerText = "Delete";
            }
        });
    }

    var display_Commentdata = "";
    if (loading) {
        return <h4>Xin vui lòng chờ...</h4>
    }
    else {
        var stt = 1;
        display_Commentdata = viewComment.map((item) => {
            return (
                <tr key={item.id}>
                    <td>{stt++}</td>
                    <td>{item.comment}</td>
                    <td>{item.product.name}</td>
                    <td>
                        <button type="button" onClick={(e) => deleteCategory(e, item.id)} className="btn btn-danger btn-sm">Xóa</button>
                    </td>
                </tr>
            )
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
                                    <th>Bình luận</th>
                                    <th>Tên thú cưng</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {display_Commentdata}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default ViewComment