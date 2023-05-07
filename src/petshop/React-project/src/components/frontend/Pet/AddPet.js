import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useHistory } from 'react-router-dom';
import swal from 'sweetalert';


function AddPet() {
    const history = useHistory();
    const [categorylist, setCategorylist] = useState([]);
    const [petInput, setPet] = useState({
        category_id: '',
        emotion: '',
        image_pet: '',
    });
    const [pricture, setPicture] = useState([]);
    const [errorlist, setError] = useState([]);

    const handleInput = (e) => {
        e.persist();
        setPet({ ...petInput, [e.target.name]: e.target.value });
    }

    const handleImage = (e) => {
        setPicture({ image_pet: e.target.files[0] });
    }

    useEffect(() => {
        let isMounted = true;

        axios.get(`/api/get-all-category`).then(res => {
            if (isMounted) {
                if (res.data.status === 200) {
                    setCategorylist(res.data.category);
                }
            }
        });

        return () => {
            isMounted = false
        };

    }, []);

    const submitPet = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('category_id', petInput.category_id);
        formData.append('emotion', petInput.emotion);
        formData.append('image_pet', pricture.image_pet);

        axios.post(`/api/store-albumPet`, formData).then(res => {
            if (res.data.status === 200) {
                swal("Success", res.data.message, "success");
                history.push('/album');
                setPet({
                    ...petInput,
                    category_id: '',
                    emotion: '',
                    image_pet: '',
                });
                setError([]);
            } else if (res.data.status === 401) {
                swal("Lỗi rồi", res.data.message, "warning");
                history.push('/login');
            }
            else if (res.data.status === 422) {
                swal("Bạn phải điền tất cả thông tin!", "", "error");
                setError(res.data.errors);
            }
        });

    }
    return (
        <div className="container-fluid px-4">
            <div className="card mt-4">
                <div className="card-header">
                    <h4>Thêm thú cưng
                        <Link to="/album" className="btn btn-primary btn-sm float-end">Xem Album</Link>
                    </h4>
                </div>
                <div className="card-body">
                    <form onSubmit={submitPet} encType="multipart/form-data">

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
                                    <label>Chọn danh mục</label>
                                    <select name="category_id" onChange={handleInput} value={petInput.category_id} className="form-control">
                                        <option>Chọn danh mục</option>
                                        {
                                            categorylist.map((item) => {
                                                return (
                                                    <option value={item.id} key={item.id}>{item.name}</option>
                                                )
                                            })
                                        }
                                    </select>
                                    <small className="text-danger">{errorlist.category_id}</small>
                                </div>
                                <div className="form-group mb-3">
                                    <label>Trạng thái cảm xúc</label>
                                    <input type="text" name="emotion" onChange={handleInput} value={petInput.emotion} className="form-control" />
                                    <small className="text-danger">{errorlist.emotion}</small>
                                </div>
                            </div>
                            <div className="tab-pane card-body border fade" id="otherdetails" role="tabpanel" aria-labelledby="otherdetails-tab">
                                <div className="row">
                                    <div className="col-md-8 form-group mb-3">
                                        <label>Hình ảnh</label>
                                        <input type="file" name="image_pet" onChange={handleImage} className="form-control" />
                                        <small className="text-danger">{errorlist.image_pet}</small>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <button type="submit" className="btn btn-primary px-4 mt-2">Thêm thú cưng</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default AddPet   