import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = () => {
    return (
        <nav className="sb-sidenav accordion sb-sidenav-dark" id="sidenavAccordion">
            <div className="sb-sidenav-menu">
                <div className="nav">
                    <div className="sb-sidenav-menu-heading">Menu</div>
                    <Link className="nav-link" to="/admin/dashboard">
                        <div className="sb-nav-link-icon"><i className="fas fa-tachometer-alt"></i></div>
                        Dashboard
                    </Link>
                    <Link className="nav-link" to="/admin/add-category">
                        <div className="sb-nav-link-icon"><i class="bi bi-file-earmark-plus-fill"></i></div>
                        Thêm danh mục
                    </Link>
                    <Link className="nav-link" to="/admin/view-category">
                        <div className="sb-nav-link-icon"><i className="fas fa-tachometer-alt"></i></div>
                        Xem danh mục
                    </Link>
                    <Link className="nav-link collapsed" to="#" data-bs-toggle="collapse" data-bs-target="#collapseProduct" aria-expanded="false" aria-controls="collapseProduct">
                        <div className="sb-nav-link-icon"><i className="fas fa-columns"></i></div>
                        Thú cưng
                        <div className="sb-sidenav-collapse-arrow"><i className="fas fa-angle-down"></i></div>
                    </Link>
                    <div className="collapse" id="collapseProduct" aria-labelledby="headingOne" data-bs-parent="#sidenavAccordion">
                        <nav className="sb-sidenav-menu-nested nav">
                            <Link className="nav-link" to="/admin/add-product">Thêm thú cưng</Link>
                            <Link className="nav-link" to="/admin/view-product">Xem thú cưng</Link>
                        </nav>
                    </div>
                    <Link className="nav-link" to="/admin/orders">
                        <div className="sb-nav-link-icon"><i class="bi bi-card-checklist"></i></div>
                        Đặt hàng
                    </Link>
                    <Link className="nav-link" to="/admin/viewcomment">
                        <div className="sb-nav-link-icon"><i class="bi bi-file-post"></i></div>
                        Bình luận
                    </Link>
                    <Link className="nav-link" to="/admin/profile">
                        <div className="sb-nav-link-icon"><i className="fas fa-tachometer-alt"></i></div>
                        Hồ sơ
                    </Link>
                </div>
            </div>
        </nav>
    );
}

export default Sidebar;
