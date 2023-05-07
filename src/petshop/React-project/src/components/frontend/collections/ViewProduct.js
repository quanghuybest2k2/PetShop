import React, { useEffect, useState } from "react";
import axios from "axios";
import swal from "sweetalert";
import { Link, useHistory } from "react-router-dom";
import config from "../../../config";
import { BiSkipPrevious, BiSkipNext } from "react-icons/bi";

function ViewProduct(props) {
    const history = useHistory();
    const [loading, setLoading] = useState(true);
    const [product, setProduct] = useState([]);
    const [category, setCategory] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    useEffect(() => {
        let isMounted = true;

        const product_slug = props.match.params.slug;
        axios
            .get(`/api/fetchproducts/${product_slug}?page=${currentPage}`)
            .then((res) => {
                if (isMounted) {
                    if (res.data.status === 200) {
                        setProduct(res.data.product_data.product.data);
                        setCategory(res.data.product_data.category);
                        setTotalPages(res.data.pagination.last_page);
                        setLoading(false);
                    } else if (res.data.status === 400) {
                        swal("Warning", res.data.message, "");
                    } else if (res.data.status === 404) {
                        history.push("/collections");
                        swal("Warning", res.data.message, "error");
                    }
                }
            });

        return () => {
            isMounted = false;
        };
    }, [props.match.params.slug, currentPage, history]);

    function handlePageChange(pageNumber) {
        setCurrentPage(pageNumber);
    }

    if (loading) {
        return <h4>Xin vui lòng chờ...</h4>;
    } else {
        var showProductList = "";
        if (product.length) {
            showProductList = product.map((item, idx) => {
                return (
                    <div className="col-md-3" key={idx}>
                        <div className="card h-100">
                            <div className="card-body d-flex justify-content-center align-items-center">
                                <Link to={`/collections/${item.category.slug}/${item.slug}`}>
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
                                <Link to={`/collections/${item.category.slug}/${item.slug}`}>
                                    <h5>{item.name}</h5>
                                </Link>
                            </div>
                        </div>
                    </div>
                );
            });
        } else {
            showProductList = (
                <div className="col-md-12">
                    <h4>Không có thú cưng thuộc về {category.name}</h4>
                </div>
            );
        }
    }
    function Pagination({ currentPage, totalPages, onPageChange }) {
        const pageNumbers = [];

        for (let i = 1; i <= totalPages; i++) {
            pageNumbers.push(i);
        }

        return (
            <nav>
                <ul className="pagination">
                    <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
                        <button
                            className="page-link"
                            onClick={() => onPageChange(currentPage - 1)}
                        >
                            <BiSkipPrevious style={{ fontSize: "30px" }} />
                            Trước
                        </button>
                    </li>
                    {pageNumbers.map((number) => (
                        <li
                            key={number}
                            className={`page-item ${currentPage === number ? "active" : ""}`}
                        >
                            <button
                                className="page-link"
                                onClick={() => onPageChange(number)}
                            >
                                {number}
                            </button>
                        </li>
                    ))}
                    <li
                        className={`page-item ${currentPage === totalPages ? "disabled" : ""
                            }`}
                    >
                        <button
                            className="page-link"
                            onClick={() => onPageChange(currentPage + 1)}
                        >
                            Sau
                            <BiSkipNext style={{ fontSize: "30px" }} />
                        </button>
                    </li>
                </ul>
            </nav>
        );
    }

    return (
        <div>
            <div className="py-3 bg-info">
                <div className="container">
                    <h6>Album / {category.name}</h6>
                </div>
            </div>

            <div className="py-3">
                <div className="container">
                    <div className="row">{showProductList}</div>
                </div>
            </div>
            <div className="py-3">
                <div className="container">
                    <Pagination
                        currentPage={currentPage}
                        totalPages={totalPages}
                        onPageChange={handlePageChange}
                    />
                </div>
            </div>
        </div>
    );
}

export default ViewProduct;
