import React, { useEffect, useState } from 'react';
import axios from 'axios';
import swal from 'sweetalert';
import { handleAddToCart } from '../AddToCart';
import { Link, useHistory } from 'react-router-dom';
import { Container, Segment } from "semantic-ui-react";
import { FacebookShareButton, TwitterShareButton } from "react-share";
import { FacebookIcon, TwitterIcon } from "react-share";
import { format } from 'date-fns';
import config from '../../../config';
import numeral from 'numeral';// format vnd

function ProductDetail(props) {
    const history = useHistory();
    const [loading, setLoading] = useState(true);
    const [product, setProduct] = useState([]);
    const [quantity, setQuantity] = useState(1);
    const [commentInput, setComment] = useState({
        comment: '',
    });
    // hien thi comments
    const [comments, setComments] = useState([]);
    const [errorlist, setError] = useState([]);

    useEffect(() => {
        let isMounted = true;

        const category_slug = props.match.params.category;
        const product_slug = props.match.params.product;

        axios.get(`/api/viewproductdetail/${category_slug}/${product_slug}`).then(res => {
            if (isMounted) {
                if (res.data.status === 200) {
                    setProduct(res.data.product);
                    setComments(res.data.commentData);// lay comments
                    setLoading(false);
                }
                else if (res.data.status === 404) {
                    history.push('/collections');
                    swal("Warning", res.data.message, "error");
                }
            }
        });

        return () => {
            isMounted = false
        };
    }, [props.match.params.category, props.match.params.product, history]);
    // warning comment
    const handleInput = (e) => {
        e.persist();
        setComment({ ...commentInput, [e.target.name]: e.target.value });
    }
    // Quantity Increment/Decrement in Hooks - Start
    const handleDecrement = () => {
        if (quantity > 1) {
            setQuantity(prevCount => prevCount - 1);
        }
    }
    const handleIncrement = () => {
        if (quantity < 10) {
            setQuantity(prevCount => prevCount + 1);
        }
    }
    // Quantity Increment/Decrement in Hooks - End

    const submitAddtocart = (e) => {
        e.preventDefault();
        const data = {
            product_id: product.id,
            product_qty: quantity,
        }
        handleAddToCart(data);
    };

    const submitComment = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('comment', commentInput.comment);

        axios.post(`/api/store-comment/${product.slug}`, formData).then(res => {
            if (res.data.status === 200) {
                // swal("Success", res.data.message, "success");
                setComment({
                    ...commentInput,
                    comment: '',
                });
                setError([]);
                // Reload the page
                window.location.reload();
                // history.push(`/collections/${product.category.slug}/${product.slug}`);
            } else if (res.data.status === 401) {
                swal("Lỗi rồi bạn ơi!", res.data.message, "warning");
                history.push('/login');
                setError(res.data.errors);
            }
            else if (res.data.status === 422) {
                swal("Bạn phải viết bình luận!", "", "error");
                setError(res.data.errors);
            }
        });
    }
    const deleteComment = (e, id) => {
        e.preventDefault();

        axios.delete(`/api/delete-comment/${id}`).then(res => {
            if (res.data.status === 202) {
                swal("Thành công", res.data.message, "success");
                setError([]);
                // Reload the page
                window.location.reload();
            } else if (res.data.status === 204) {
                swal("Lỗi rồi bạn ơi!", res.data.message, "warning");
                setError(res.data.errors);
            }
        });
    }

    if (loading) {
        return <h4>Xin vui lòng chờ...</h4>
    }
    else {

        var avail_stock = '';
        if (product.qty > 0) {
            avail_stock = <div>
                <label className="btn-sm btn-success px-4 mt-2">Còn trong kho</label>
                <div className="row">
                    <div className="col-md-3 mt-3">
                        <div className="input-group">
                            <button type="button" onClick={handleDecrement} className="input-group-text">-</button>
                            <div className="form-control text-center">{quantity}</div>
                            <button type="button" onClick={handleIncrement} className="input-group-text">+</button>
                        </div>
                    </div>
                    <div className="col-md-3 mt-3">
                        <button type="button" className="btn btn-primary w-100" onClick={submitAddtocart}>Thêm vào giỏ hàng</button>
                    </div>
                </div>
            </div>
        }
        else {
            avail_stock = <div>
                <label className="btn-sm btn-danger px-4 mt-2">Hết hàng</label>
            </div>
        }
    }

    return (
        <div>
            <div className="py-3 bg-info">
                <div className="container">
                    <h6>Album / {product.category.name} / {product.name}</h6>
                </div>
            </div>

            <div className="py-3">
                <div className="container">
                    <div className="row">

                        <div className="col-md-4 border-end">
                            <img src={`${config.BASE_URL}/${product.image}`} alt={product.name} className="w-100" />
                        </div>

                        <div className="col-md-8">
                            <h4>
                                {product.name}
                                <span className="float-end badge btn-sm btn-danger badge-pil"> {product.brand} </span>
                            </h4>
                            <p> {product.description} </p>
                            <h4 className="mb-1">
                                Giá bán: {numeral(product.selling_price).format('0,0')}đ
                                <s className="ms-2 text-danger"> {numeral(product.original_price).format('0,0')}đ </s>
                            </h4>
                            <h4>
                                <i class="bi bi-eye"></i>
                                <span className='ms-2'>{product.count}</span>
                            </h4>
                            {/* Hiển thị thú cưng */}
                            <div>
                                {avail_stock}
                            </div>
                            {/* share social */}
                            <div className="mt-3">
                                <Container>
                                    <Segment>
                                        {/* facebook */}
                                        <FacebookShareButton url={`http://127.0.0.1:3000/collections/${product.category.slug}/${product.slug}`}
                                            quote={"Mã nguồn petshop"}
                                            hashtag="#PetShop"
                                        >
                                            <FacebookIcon size={40} logoFillColor="white" round={true}></FacebookIcon>
                                        </FacebookShareButton>
                                        {/* twitter */}
                                        <TwitterShareButton url={`http://127.0.0.1:3000/collections/${product.category.slug}/${product.slug}`}
                                            title={"Cửa hàng thú cưng"}
                                            hashtag="#PetShop"
                                        >
                                            <TwitterIcon size={40} logoFillColor="white" round={true}></TwitterIcon>
                                        </TwitterShareButton>
                                    </Segment>
                                </Container>
                            </div>
                            {/* Comment */}
                            <div className="comment-area mt-4">
                                <div className="card card-body">
                                    <h5 className='card-title'>Bình luận</h5>
                                    <form onSubmit={submitComment} encType="multipart/form-data">
                                        <textarea name="comment" className='form-control' rows="3" onChange={handleInput} value={commentInput.comment}></textarea>
                                        <small className="text-danger">{errorlist.comment}</small>
                                        <button type="submit" className="btn btn-primary px-4 mt-2">Bình luận</button>
                                    </form>
                                </div>
                                {/* All Comments */}
                                {comments.map(comment => (
                                    <div className='card card-body shadow-sm mt-3' key={comment.id}>
                                        <div className='detail-area' >
                                            <h6 className='user-name mb-1'>
                                                {/* Đoàn Quang Huy */}
                                                {comment.username}
                                                <small className='ms-3 text-primary'>Vào lúc: {format(new Date(comment.created_at), 'HH:mm:ss dd/MM/yyyy')}</small>
                                            </h6>
                                            <p className='user-comment mb-1'>
                                                {/* Con chó này mua về rất mất dạy.... */}
                                                {comment.comment}
                                            </p>
                                            <div>
                                                <Link to={`edit-comment/${comment.id}`} className="btn btn-primary btn-sm me-2">sửa</Link>
                                                <button type="button" onClick={(e) => deleteComment(e, comment.id)} className="btn btn-danger btn-sm me-2">Xóa</button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProductDetail;
