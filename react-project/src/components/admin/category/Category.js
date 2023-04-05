import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import swal from 'sweetalert';

function Category() {

    const [categoryInput, setCategory] = useState({
        slug: '',
        name: '',
        descrip: '',
        status: '',
        error_list: [],
    });
    const [pricture, setPicture] = useState([]);

    const handleInput = (e) => {
        e.persist();
        setCategory({ ...categoryInput, [e.target.name]: e.target.value })
    }
    const handleImage = (e) => {
        setPicture({ image: e.target.files[0] });
    }
    const submitCategory = (e) => {
        e.preventDefault();

        const data = new FormData();
        data.append('image', pricture.image);
        data.append('slug', categoryInput.slug);
        data.append('name', categoryInput.name);
        data.append('description', categoryInput.descrip);
        data.append('status', categoryInput.status);
        axios.post(`api/store-category`, data).then(res => {
            if (res.data.status === 200) {
                e.target.reset();
                swal("Success", res.data.message, "success");
                setCategory({
                    ...categoryInput,
                    slug: '',
                    name: '',
                    descrip: '',
                    status: '',
                });
            }
            else if (res.data.status === 400) {
                swal("Warning", res.data.errors, "warning");
                setCategory({ ...categoryInput, error_list: res.data.errors });
            }
        });

    }

    var display_errors = [];
    if (categoryInput.error_list) {
        display_errors = [
            categoryInput.error_list.slug,
            categoryInput.error_list.name,
        ]
    }

    return (
        <div className="container-fluid px-4">

            {
                display_errors.map((item) => {
                    return (<p className="mb-1" key={item}>{item}</p>)
                })
            }

            <div className="card mt-4">
                <div className="card-header">
                    <h4>Thêm danh mục
                        <Link to="/admin/view-category" className="btn btn-primary btn-sm float-end">Xem danh mục</Link>
                    </h4>
                </div>
                <div className="card-body">

                    <form onSubmit={submitCategory} id="CATEGORY_FORM">
                        <ul className="nav nav-tabs" id="myTab" role="tablist">
                            <li className="nav-item" role="presentation">
                                <button className="nav-link active" id="home-tab" data-bs-toggle="tab" data-bs-target="#home" type="button" role="tab" aria-controls="home" aria-selected="true">Chung</button>
                            </li>
                            <li className="nav-item" role="presentation">
                                <button className="nav-link" id="otherdetails-tab" data-bs-toggle="tab" data-bs-target="#otherdetails" type="button" role="tab" aria-controls="otherdetails" aria-selected="false">Thông tin khác</button>
                            </li>
                        </ul>
                        <div className="tab-content" id="myTabContent">
                            <div className="tab-pane card-body border fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
                                <div className="form-group mb-3">
                                    <label>Tên danh mục</label>
                                    <input type="text" name="name" onChange={handleInput} value={categoryInput.name} className="form-control" />
                                </div>
                                <div className="form-group mb-3">
                                    <label>Slug</label>
                                    <input type="text" name="slug" onChange={handleInput} value={categoryInput.slug} className="form-control" />
                                    <span>{categoryInput.error_list.slug}</span>
                                </div>
                                <div className="form-group mb-3">
                                    <label>Mô tả</label>
                                    <textarea name="descrip" onChange={handleInput} value={categoryInput.descrip} className="form-control"></textarea>
                                </div>
                                <div className="form-group mb-3">
                                    <label>Trạng thái:</label><br />
                                    <input type="checkbox" name="status" onChange={handleInput} value={categoryInput.status} /> Status 0 = hiển thị / 1 = ẩn
                                </div>

                            </div>
                            <div className="tab-pane card-body border fade" id="otherdetails" role="tabpanel" aria-labelledby="otherdetails-tab">

                                <div className="row">
                                    <div className="col-md-8 form-group mb-3">
                                        <label>Hình ảnh</label>
                                        <input type="file" name="image" onChange={handleImage} className="form-control" />
                                        {/* <small className="text-danger">{error_list.image}</small> */}
                                    </div>
                                </div>

                            </div>
                        </div>
                        <button type="submit" className="btn btn-primary px-4 float-end">Thêm danh mục</button>
                    </form>

                </div>
            </div>
        </div>
    )
}

export default Category;

